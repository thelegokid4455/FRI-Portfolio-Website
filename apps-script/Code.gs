/**
 * Portfolio inquiries: a Google Apps Script web app bound to a Google Sheet.
 *
 * - doPost receives the contact form (sent as text/plain JSON), checks every field again,
 *   saves a row with an ID like FI-20261121-001, emails you, and sends the sender an
 *   acknowledgement (capped per day to protect your Gmail quota).
 * - doGet answers a harmless "is it up?" check.
 * - The "Inquiries" menu in the Sheet opens a manager to list, filter, update and reply.
 *
 * After any change to this file: Deploy → Manage deployments → Edit (pencil) →
 * Version: New version → Deploy. The /exec URL stays the same.
 */

const CONFIG = {
  OWNER_EMAIL: 'farhan.r.irsyad@gmail.com',
  OWNER_NAME: 'Farhan Ramadhani Irsyad',
  ID_PREFIX: 'FI',
  SITE_URL: 'https://thelegokid4455.github.io/FRI-Portfolio-Website/',
  INQUIRY_SHEET: 'Inquiries',
  REPLY_SHEET: 'Replies',
  MAX_PER_EMAIL_PER_HOUR: 3,
  MAX_ACKS_PER_DAY: 40,
  // Must match `inquiry.projectTypes` and `inquiry.budgets` in content.js
  PROJECT_TYPES: [
    'Training simulator',
    'VR training or experience',
    'Game or gameplay programming',
    'Multiplayer or hardware integration',
    'Job opening (full-time or contract)',
    'Something else'
  ],
  BUDGETS: [
    'Not sure yet',
    'Under $1,000',
    '$1,000 – $5,000',
    '$5,000 – $15,000',
    'Over $15,000',
    'Salaried role'
  ],
  STATUSES: ['New', 'Replied', 'Quoted', 'In progress', 'Won', 'Lost', 'Spam']
};

const HEADERS = ['ID', 'Received', 'Status', 'Name', 'Email', 'Organization', 'Project type', 'Budget',
  'Timeline', 'Description', 'Links', 'Consent', 'Page', 'Notes', 'Last reply'];
const REPLY_HEADERS = ['Sent', 'Inquiry ID', 'To', 'Template', 'Subject', 'Body'];

/* ---------- Web app ---------- */

function doGet() {
  return json_({ok: true, service: 'portfolio-inquiries'});
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ok: false, error: 'bad_request'});
  }

  // Honeypot: real people never fill the hidden "website" field. Pretend it worked.
  if (clean_(data.website, 200)) return json_({ok: true, id: CONFIG.ID_PREFIX + '-RECEIVED'});

  const input = {
    name: clean_(data.name, 100),
    email: clean_(data.email, 200).toLowerCase(),
    organization: clean_(data.organization, 150),
    projectType: clean_(data.projectType, 100),
    budget: clean_(data.budget, 100),
    timeline: clean_(data.timeline, 100),
    description: clean_(data.description, 5000, true),
    links: clean_(data.links, 1000, true),
    consent: data.consent === true,
    page: clean_(data.page, 300)
  };

  const errors = validate_(input);
  if (errors.length) return json_({ok: false, error: 'invalid', fields: errors});

  if (isRateLimited_(input.email)) return json_({ok: false, error: 'rate_limited'});

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let id;
  try {
    id = nextId_();
    const sheet = getSheet_(CONFIG.INQUIRY_SHEET, HEADERS);
    const row = [id, new Date(), 'New', input.name, input.email, input.organization, input.projectType,
      input.budget, input.timeline, input.description, input.links, input.consent ? 'Yes' : 'No', input.page, '', ''];
    const r = sheet.getLastRow() + 1;
    // Store every text column as plain text so values like "=SUM()" or "+62..." are never run as formulas.
    // Column 2 (Received) stays a real date.
    sheet.getRange(r, 1).setNumberFormat('@');
    sheet.getRange(r, 3, 1, row.length - 2).setNumberFormat('@');
    sheet.getRange(r, 2).setNumberFormat('yyyy-mm-dd hh:mm');
    sheet.getRange(r, 1, 1, row.length).setValues([row.map((v, i) => i === 1 ? v : String(v))]);
  } finally {
    lock.releaseLock();
  }

  notifyOwner_(id, input);
  acknowledge_(id, input);
  return json_({ok: true, id: id});
}

/* ---------- Validation and safety ---------- */

function clean_(value, max, multiline) {
  let s = String(value == null ? '' : value);
  s = multiline ? s.replace(/\r\n?/g, '\n') : s.replace(/[\r\n\t]+/g, ' ');
  // Drop control characters, trim, cap length
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  return s.slice(0, max);
}

function validate_(d) {
  const errors = [];
  if (d.name.length < 2) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.push('email');
  if (CONFIG.PROJECT_TYPES.indexOf(d.projectType) === -1) errors.push('projectType');
  if (CONFIG.BUDGETS.indexOf(d.budget) === -1) errors.push('budget');
  if (d.description.length < 20) errors.push('description');
  if (!d.consent) errors.push('consent');
  return errors;
}

function isRateLimited_(email) {
  const cache = CacheService.getScriptCache();
  const key = 'rate:' + Utilities.base64EncodeWebSafe(email).slice(0, 200);
  const count = Number(cache.get(key) || 0);
  if (count >= CONFIG.MAX_PER_EMAIL_PER_HOUR) return true;
  cache.put(key, String(count + 1), 3600);
  return false;
}

function nextId_() {
  const tz = Session.getScriptTimeZone();
  const day = Utilities.formatDate(new Date(), tz, 'yyyyMMdd');
  const props = PropertiesService.getScriptProperties();
  const key = 'seq:' + day;
  const n = Number(props.getProperty(key) || 0) + 1;
  props.setProperty(key, String(n));
  return CONFIG.ID_PREFIX + '-' + day + '-' + ('00' + n).slice(-3);
}

/* ---------- Email ---------- */

function notifyOwner_(id, d) {
  const body = [
    'New inquiry ' + id + ' from your portfolio site.',
    '',
    'Name: ' + d.name,
    'Email: ' + d.email,
    'Organization: ' + (d.organization || '-'),
    'Project type: ' + d.projectType,
    'Budget: ' + d.budget,
    'Timeline: ' + (d.timeline || '-'),
    'Links: ' + (d.links || '-'),
    'Sent from: ' + (d.page || '-'),
    '',
    d.description,
    '',
    'Reply to this email to answer them directly, or use Inquiries → Open manager in the Sheet.'
  ].join('\n');
  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    replyTo: d.email,
    subject: '[' + id + '] ' + d.projectType + ' from ' + d.name,
    body: body,
    name: 'Portfolio inquiries'
  });
}

function acknowledge_(id, d) {
  const tz = Session.getScriptTimeZone();
  const props = PropertiesService.getScriptProperties();
  const key = 'acks:' + Utilities.formatDate(new Date(), tz, 'yyyyMMdd');
  const sent = Number(props.getProperty(key) || 0);
  if (sent >= CONFIG.MAX_ACKS_PER_DAY || MailApp.getRemainingDailyQuota() < 10) return;
  props.setProperty(key, String(sent + 1));
  const body = [
    'Hi ' + d.name + ',',
    '',
    'Thanks for getting in touch. I got your message about "' + d.projectType + '" and will reply by email,',
    'usually within a few working days. Your reference number is ' + id + '.',
    '',
    'If you need to add anything, just reply to this email.',
    '',
    CONFIG.OWNER_NAME,
    CONFIG.SITE_URL
  ].join('\n');
  MailApp.sendEmail({
    to: d.email,
    replyTo: CONFIG.OWNER_EMAIL,
    subject: 'Got your message (' + id + ')',
    body: body,
    name: CONFIG.OWNER_NAME
  });
}

/* ---------- Sheet helpers ---------- */

function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Inquiries menu and manager ---------- */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Inquiries')
    .addItem('Open manager', 'openManager')
    .addItem('Set up sheets', 'setupSheets')
    .addToUi();
}

function setupSheets() {
  getSheet_(CONFIG.INQUIRY_SHEET, HEADERS);
  getSheet_(CONFIG.REPLY_SHEET, REPLY_HEADERS);
  try { SpreadsheetApp.getUi().alert('The Inquiries and Replies sheets are ready.'); } catch (e) { Logger.log('The Inquiries and Replies sheets are ready.'); }
}

function openManager() {
  const html = HtmlService.createHtmlOutputFromFile('Manager').setTitle('Inquiries');
  SpreadsheetApp.getUi().showSidebar(html);
}

function listInquiries() {
  const sheet = getSheet_(CONFIG.INQUIRY_SHEET, HEADERS);
  const last = sheet.getLastRow();
  if (last < 2) return {statuses: CONFIG.STATUSES, items: []};
  const rows = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  const tz = Session.getScriptTimeZone();
  const items = rows.map(r => {
    const o = {};
    HEADERS.forEach((h, i) => { o[h] = r[i] instanceof Date ? Utilities.formatDate(r[i], tz, 'yyyy-MM-dd HH:mm') : String(r[i]); });
    return o;
  }).reverse();
  return {statuses: CONFIG.STATUSES, items: items};
}

function findRow_(id) {
  const sheet = getSheet_(CONFIG.INQUIRY_SHEET, HEADERS);
  const ids = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) return {sheet: sheet, row: i + 2};
  throw new Error('Inquiry ' + id + ' not found');
}

function saveInquiry(id, status, notes) {
  if (CONFIG.STATUSES.indexOf(status) === -1) throw new Error('Unknown status');
  const f = findRow_(id);
  f.sheet.getRange(f.row, HEADERS.indexOf('Status') + 1).setValue(status);
  const notesCell = f.sheet.getRange(f.row, HEADERS.indexOf('Notes') + 1);
  notesCell.setNumberFormat('@');
  notesCell.setValue(clean_(notes, 5000, true));
  return true;
}

function getTemplate(id, kind) {
  const f = findRow_(id);
  const r = f.sheet.getRange(f.row, 1, 1, HEADERS.length).getValues()[0];
  const name = String(r[HEADERS.indexOf('Name')]).split(' ')[0];
  const type = String(r[HEADERS.indexOf('Project type')]);
  if (kind === 'quote') {
    return {
      subject: 'Quote for your ' + type.toLowerCase() + ' (' + id + ')',
      body: 'Hi ' + name + ',\n\nThanks again for the details. Here is what I propose:\n\n' +
        'Scope:\n- \n\nMilestones:\n1. \n2. \n3. \n\nTimeline: \nPrice: \nPayment: \n\n' +
        'Each milestone comes with a build you can try. Let me know if anything should change.\n\n' + CONFIG.OWNER_NAME
    };
  }
  return {
    subject: 'Re: your ' + type.toLowerCase() + ' (' + id + ')',
    body: 'Hi ' + name + ',\n\nThanks for reaching out. A few questions so I can understand the project:\n\n' +
      '1. Who will use it, and on which device or headset?\n2. What should someone be able to do by the end?\n' +
      '3. Is there a deadline or event it needs to be ready for?\n\nHappy to jump on a call if that is easier.\n\n' + CONFIG.OWNER_NAME
  };
}

function sendReply(id, kind, subject, body) {
  const f = findRow_(id);
  const r = f.sheet.getRange(f.row, 1, 1, HEADERS.length).getValues()[0];
  const to = String(r[HEADERS.indexOf('Email')]);
  subject = clean_(subject, 200);
  body = clean_(body, 20000, true);
  if (!subject || !body) throw new Error('Subject and message are required');
  MailApp.sendEmail({to: to, subject: subject, body: body, name: CONFIG.OWNER_NAME, replyTo: CONFIG.OWNER_EMAIL});

  const log = getSheet_(CONFIG.REPLY_SHEET, REPLY_HEADERS);
  const range = log.getRange(log.getLastRow() + 1, 1, 1, REPLY_HEADERS.length);
  range.setNumberFormat('@');
  range.setValues([[new Date().toISOString(), id, to, kind, subject, body]]);

  const now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm');
  f.sheet.getRange(f.row, HEADERS.indexOf('Last reply') + 1).setNumberFormat('@').setValue(now);
  const statusCell = f.sheet.getRange(f.row, HEADERS.indexOf('Status') + 1);
  if (statusCell.getValue() === 'New') statusCell.setValue(kind === 'quote' ? 'Quoted' : 'Replied');
  return true;
}
