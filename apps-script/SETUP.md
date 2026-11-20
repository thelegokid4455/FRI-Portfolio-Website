# Contact form backend: setup

The contact form on the portfolio sends each inquiry to a small Google Apps Script web app that lives inside a Google Sheet. It's free and needs no server. This folder isn't published with the website.

Setup takes about 15 minutes. Do it once.

## Before you start

**Pick one Google account and use only that one.** It matters which:

- Every email the form sends (your notification and the sender's confirmation) comes *from* the account that publishes the web app.
- The Sheet holding the inquiries lives in that account's Google Drive.

Right now the live form uses a web app published from the Ave Ludum Studio account, so emails come from there. Notifications still go to `OWNER_EMAIL` in `Code.gs` (farhan.r.irsyad@gmail.com). To send from your personal account instead, redo these steps signed in to farhan.r.irsyad@gmail.com, then swap the new `/exec` URL into `content.js`.

Do every step below in an **incognito window signed in to only the chosen account**. Apps Script breaks in confusing ways when a browser is signed in to several Google accounts at once.

1. Open an incognito / private window (Chrome: Ctrl+Shift+N).
2. Go to <https://accounts.google.com> and sign in with the chosen account only.
3. Check the account picture at the top right of every Google page you open: it should always be that account.

## 1. Create the Sheet

1. Go to <https://sheets.new>. A blank spreadsheet opens.
2. Click the title "Untitled spreadsheet" at the top left and rename it to **Portfolio inquiries**.

## 2. Add the script

1. In the Sheet's menu, click **Extensions → Apps Script**. A new tab opens with a file called `Code.gs`.
2. Click the project name "Untitled project" at the top and rename it to **Portfolio inquiries**.
3. In `Code.gs`, select everything (Ctrl+A) and delete it.
4. Open `apps-script/Code.gs` from this repository, copy all of it, and paste it into the editor.
5. Add the manager sidebar:
   1. In the left panel next to **Files**, click **+ → HTML**.
   2. Name it exactly **Manager** (Apps Script adds `.html` itself) and press Enter.
   3. Delete what's in it, then paste in all of `apps-script/Manager.html`.
6. Set the time zone (so reference numbers use your local date):
   1. Click the **gear icon (Project Settings)** on the far left.
   2. Under **Time zone**, choose **(GMT+08:00) Makassar** or whichever matches you.
7. Press **Ctrl+S** to save.

## 3. Allow it to run

1. Back in the editor (the **< >** icon on the left), pick **setupSheets** from the function dropdown in the toolbar, then click **Run**.
2. A window says "Authorization required". Click **Review permissions**, then choose your account.
3. Google warns "Google hasn't verified this app". That's expected for your own script. Click **Advanced → Go to Portfolio inquiries (unsafe)**.
4. Check the list: it asks to see and edit this spreadsheet, send email as you, and show content in Sheets. Click **Allow**.
5. Switch to the Sheet tab. You should now see two sheets, **Inquiries** and **Replies**. (Delete the empty "Sheet1" if you like.)

## 4. Publish it as a web app

1. In the Apps Script tab, click the blue **Deploy → New deployment**.
2. Click the **gear icon** next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** Portfolio contact form
   - **Execute as:** Me (the account you chose). If it shows a different address, stop: you are in the wrong account.
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/AKfy…/exec`.
6. **Send me that URL.** I'll check it, connect the form, and deploy the site. Then you send one real test inquiry.

The URL only accepts form submissions; it can't read your Sheet or email.

## After any change to the script

**Deploy → Manage deployments →** click the **pencil (Edit)** on your deployment → **Version: New version → Deploy**.

This keeps the same `/exec` URL. Creating a *new* deployment instead would give you a new URL, and the site would keep sending to the old one.

## Using it day to day

- Each inquiry arrives by email with the subject `[FI-20261121-001] Project type from Name`. Replying to that email goes straight to the sender.
- The sender gets an automatic "Got your message" email with the same reference number (up to 40 a day, to stay inside Gmail's sending limit).
- In the Sheet, use **Inquiries → Open manager** (reload the Sheet once if the menu isn't there yet) to:
  - list and search inquiries, and filter them by status
  - set a status (New, Replied, Quoted, In progress, Won, Lost, Spam) and keep private notes
  - start from the **Reply** or **Quote** template, edit it, and **Send as me**. Every reply is logged in the **Replies** sheet, and the inquiry's status and "Last reply" update.

## Changing the form's options

The project types and budget ranges appear in two places, and they must match exactly:

- `PROJECT_TYPES` and `BUDGETS` in `Code.gs` (then make a new version, as above)
- `inquiry.projectTypes` and `inquiry.budgets` in `portfolio-site/content.js`

## Protection built in

- Every field is checked again on the server, not only in the browser.
- A hidden "website" field catches bots; anything that fills it is quietly dropped.
- Each email address can send at most 3 inquiries an hour.
- Text is stored as plain text, so input that starts with `=`, `+`, `-` or `@` can never run as a spreadsheet formula.
