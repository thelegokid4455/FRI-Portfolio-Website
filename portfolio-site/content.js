// EDIT THIS FILE to update the content on your portfolio.
// Keep the same field names so the site renders correctly.
const siteContent = {
  nameFull: "Farhan Ramadhani Irsyad",
  nameShort: "Farhan Irsyad",
  headline: "Unity / VR Simulation Developer",
  location: "Makassar, Indonesia",
  availability: "Open to remote work and relocation",

  // Home: the first thing visitors read
  hero: {
    title: "I build training simulators, VR apps and games in Unity.",
    audience: "For studios hiring a Unity programmer, and for teams that need a simulator, VR experience or game built.",
    intro: "I've built heavy-vehicle and driving simulators for a government institution, VR training for clients, and games from jams to team releases. I'm the director and main programmer at Ave Ludum Studio in Makassar.",
    primary: {label: "Work with me", href: "#contact"},
    secondary: {label: "See my work", href: "#work"},
    // Recent work: shown as links under the buttons
    recent: [
      {label: "AVELS Heavy Vehicle Simulator", url: "https://aveludumstudio.com/project.html?p=avels-heavy-vehicle-simulator"},
      {label: "The Legend of Toakala", url: "https://aveludumstudio.com/project.html?p=the-legend-of-toakala"},
      {label: "Supermarket VR", url: "https://aveludumstudio.com/project.html?p=supermarket-vr"}
    ],
    chips: ["Unity", "C#", "VR / XR", "Multiplayer (Netcode)", "Vehicle physics", "Arduino controls", "Android", "Blender"],
    // Looping, muted clip beside the intro. It only plays when the visitor allows motion.
    video: {
      src: "assets/work/avels-loading.mp4",
      poster: "assets/work/avels-loading.webp",
      caption: "AVELS: loading a dump truck with a wheel loader in a shared multiplayer session.",
      alt: "A wheel loader raises its bucket over a dump truck in the AVELS simulator"
    }
  },

  about: "I've been writing Unity/C# professionally since 2021. I started on gameplay and medical VR at Dhelangan Studio and Octaverse Studio, then spent a year at PT. Maxxima Innovative building heavy-vehicle and driving simulators for a government institution, including Arduino-connected controls and a ~100 km map of Jakarta. I now manage information systems and technology at Universitas Negeri Makassar, and I'm the director and main programmer at Ave Ludum Studio. I work closely with artists, domain experts and clients who aren't technical.",
  // Portfolio document: `pdf` downloads it as a PDF, `doc` opens it in Google Docs
  portfolio: {
    pdf: "https://docs.google.com/document/d/12sPx-OYtfmaX9mNVSZ-YitUQzO_cBcccfpRe9RqhPxk/export?format=pdf",
    doc: "https://docs.google.com/document/d/12sPx-OYtfmaX9mNVSZ-YitUQzO_cBcccfpRe9RqhPxk/edit",
    pages: 51
  },
  email: "farhan.r.irsyad@gmail.com",

  // "What I do" cards: what you get, who it's for, and a real example
  services: [
    {
      title: "Training simulators",
      get: "A Unity simulator people can practise on: vehicles, equipment or procedures, on PC, in VR or with real controls wired in.",
      for: "Training centres, institutions and companies with risky or expensive tasks to teach.",
      example: "Heavy Vehicle Simulator, PT. Maxxima Innovative"
    },
    {
      title: "VR training & experiences",
      get: "A VR app that walks people through a task step by step, built for the headset you use.",
      for: "Teams that train staff, and anyone who wants a space or process people can step into.",
      example: "Supermarket VR, Ave Ludum Studio"
    },
    {
      title: "Games & gameplay programming",
      get: "Gameplay systems, prototypes or a full game in Unity for PC or mobile.",
      for: "Studios that need a Unity programmer, and teams with a game idea to build.",
      example: "The Legend of Toakala, Ave Ludum Studio"
    },
    {
      title: "Multiplayer & hardware",
      get: "Shared sessions with voice chat, or physical controls such as joysticks connected through Arduino.",
      for: "Projects where several people train together, or where a keyboard isn't realistic enough.",
      example: "AVELS Heavy Vehicle Simulator, Ave Ludum Studio"
    }
  ],

  // "How I work" steps (please check these match how you actually work)
  process: [
    {title: "Talk it through", text: "We go over what you need, who will use it, which platform it runs on and when you need it."},
    {title: "Plan and quote", text: "You get a written scope with milestones and a price before any work starts."},
    {title: "Build in playable steps", text: "You get regular builds to try, so feedback comes early, while it's still cheap to change things."},
    {title: "Hand over", text: "The final build, plus anything else we agreed on, such as source files or documentation."}
  ],

  // Selected work. `kind` and `status` show as badges; leave them out if unconfirmed.
  // `credit` says who it was built with or for. `link` is an optional case-study page.
  projects: [
    {
      title: "AVELS Heavy Vehicle Simulator",
      category: "Multiplayer training simulator",
      kind: "Internal prototype",
      status: "Ready for testing",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      image: "assets/work/avels-loading.webp",
      imageAlt: "A wheel loader loading a dump truck in the AVELS simulator",
      description: "A multiplayer PC simulator for heavy equipment. Trainees drive dump trucks, wheel loaders and backhoes around a work yard, guided by spotters on foot using hand signals and push-to-talk voice chat.",
      tags: ["Unity 6", "C#", "Netcode for GameObjects", "Vivox voice chat", "PC"],
      link: "https://aveludumstudio.com/project.html?p=avels-heavy-vehicle-simulator"
    },
    {
      title: "Heavy Vehicle Simulator",
      year: "2023",
      category: "Training · VR",
      kind: "Client project",
      credit: "PT. Maxxima Innovative, for a government institution",
      image: "assets/experience/heavy-vehicle-real.jpg",
      imageAlt: "Triple-monitor simulator rig with joysticks and a steering wheel, showing an excavator cab view",
      description: "Training simulator for heavy and construction vehicles used in runway-repair scenarios. Runs on a triple-monitor rig or in VR, with physical joysticks and controls wired in through Arduino.",
      tags: ["Unity", "C#", "VR", "Arduino", "Vehicle physics"]
    },
    {
      title: "Driving & Convoy Simulator",
      year: "2024",
      category: "Large-scale simulation",
      kind: "Client project",
      credit: "PT. Maxxima Innovative, for a government institution",
      image: "assets/work/avels-rain-truck.webp",
      imageAlt: "Two dump trucks parked in the rain outside a brick warehouse",
      imageCaption: "Image: driving in AVELS, Ave Ludum's heavy vehicle simulator. No footage of this project is available.",
      description: "Driving simulator built on a real-world-scale, ~100 km environment of Jakarta, with route selection, vehicle handling, convoy scenarios and an instructor console. A lot of the work went into keeping a map that size running smoothly.",
      tags: ["Unity", "C#", "Optimization", "Large environments", "VR"]
    },
    {
      title: "The Legend of Toakala",
      category: "Mobile folklore adventure",
      kind: "Original IP",
      status: "In development",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      image: "assets/work/tk-explore.webp",
      imageAlt: "Exploring a forest in The Legend of Toakala",
      description: "A 3D mobile adventure that retells the Toa Kala folktale from Maros, South Sulawesi, as something you can walk through and play, with puzzles drawn from local culture.",
      tags: ["Unity 6", "C#", "Android"],
      link: "https://aveludumstudio.com/project.html?p=the-legend-of-toakala"
    },
    {
      title: "Supermarket VR",
      category: "VR training simulator",
      kind: "Client project",
      status: "Delivered",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      image: "assets/work/supermarket-vr.webp",
      imageAlt: "A tester wearing a VR headset tries Supermarket VR while the view is mirrored on a laptop",
      description: "A VR recreation of a client's supermarket, built so staff can practise checkout and customer service before they stand at a real till.",
      tags: ["Unity", "C#", "VR"],
      link: "https://aveludumstudio.com/project.html?p=supermarket-vr"
    },
    {
      title: "Medical VR Simulation",
      year: "2022",
      category: "Medical · VR",
      kind: "Client project",
      credit: "Dhelangan Studio, for a private client",
      image: "assets/selected-works/medical-vr-simulation.jpg",
      imageAlt: "VR scene of a vial filling machine with volume controls and a Next button",
      description: "Step-by-step interactive training on pharmaceutical production equipment, built in Unity/C# with Android deployment in mind.",
      tags: ["Unity", "C#", "VR", "Android"]
    },
    {
      title: "Pilah Bumi",
      category: "Environmental mobile game",
      status: "Base game complete",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      image: "assets/work/pilah-bumi.webp",
      imageAlt: "Pilah Bumi title screen",
      description: "A free-roam waste-sorting game for mobile. You pick up litter scattered around an open 3D map and sort it into the right bins.",
      tags: ["Unity 6", "C#", "Mobile"],
      link: "https://aveludumstudio.com/project.html?p=pilah-bumi"
    },
    {
      title: "Gameplay & Mobile Projects",
      year: "2021–2022",
      category: "Game development",
      kind: "Personal & client projects",
      credit: "Octaverse Studio, Dhelangan Studio and my own projects",
      image: "assets/games/necrospore/1.jpg",
      imageAlt: "Necrospore key art",
      description: "Gameplay systems and prototypes across mobile and PC: a multiplayer FPS, a strategic ship-battle game, top-down shooters and an endless runner.",
      tags: ["Unity", "C#", "Gameplay", "Multiplayer", "Mobile"]
    }
  ],
  // Mirrors the itch.io profile (thelegokid4455.itch.io), in the same order.
  // Screenshots live in assets/games/<slug>/1.jpg, 2.jpg ... `shots` is how many there are.
  // `with` lists the co-authors credited on the itch.io page.
  // `focus` (optional) sets which part of a tall image shows in the thumbnail, e.g. "center 75%".
  games: [
    {title: "Dagon Shows No Mercy", slug: "dagon-shows-no-mercy", url: "https://ray-ark.itch.io/dagon-shows-no-mercy", shots: 5, tagline: "An RTS for a new era, set in a Lovecraft-inspired world.", genre: "Strategy", status: "Released", with: ["ray_ark", "Ray557"]},
    {title: "Shift 7: Gamejam Edition", slug: "shift-7", url: "https://ray-ark.itch.io/shift-7", shots: 5, tagline: "Stop the train before it reaches its final stop … Hell.", genre: "Adventure", status: "Prototype", with: ["ray_ark", "mhakasyah", "ammmmp", "Racky"]},
    {title: "Banyu: Reclaiming Hope", slug: "banyu", url: "https://ray-ark.itch.io/banyu", shots: 4, tagline: "A cozy sailing journey to reclaim, restore and reshape the future.", genre: "Adventure", status: "Released", with: ["ray_ark", "waimus"]},
    {title: "Minitank Shooter", slug: "minitank-shooter", url: "https://thelegokid4455.itch.io/minitank-shooter", shots: 2, tagline: "Mini roguelike top-down tank shooter.", genre: "Shooter, Action", status: "In development", video: "https://www.youtube.com/watch?v=PF6yH0qjXQY"},
    {title: "Necrospore", slug: "necrospore", url: "https://ray-ark.itch.io/necrospore", shots: 5, genre: "Strategy, Action", status: "Released", with: ["ray_ark", "MintJelly", "munou_"], video: "https://www.youtube.com/watch?v=IYZOilgmV9o"},
    {title: "Demo Warplanes", slug: "demo-warplanes", url: "https://thelegokid4455.itch.io/demo-warplanes", shots: 5, genre: "Shooter, Action, Simulation", status: "In development"},
    {title: "Nexus Bloom", slug: "nexus-bloom", url: "https://ray-ark.itch.io/nexus-bloom", shots: 4, tagline: "Seed the Bloom, fight the Void.", genre: "Action, Shooter", status: "Released", with: ["ray_ark"], video: "https://www.youtube.com/watch?v=n9lg_wuROzc"},
    {title: "Salvia's Scroll Atelier", slug: "salvias-scroll-atelier", url: "https://thelegokid4455.itch.io/salvias-scroll-atelier", shots: 5, tagline: "Learn with Salvia to channel your magic into a scroll and sell it!", genre: "Simulation", status: "In development", with: ["Rexfortis", "Madan", "MegaBite Interactive"]},
    {title: "Petaroeng: Short Fighting Game", slug: "petaroeng", url: "https://thelegokid4455.itch.io/petaroeng", shots: 4, tagline: "A short two-player fighting game.", genre: "Fighting", status: "Released"},
    {title: "Lontara Warrior", slug: "lontara-warrior", url: "https://thelegokid4455.itch.io/lontara-warrior", shots: 1, focus: "center 75%", tagline: "Casual mobile game about the Lontara Makassar script.", genre: "Educational, Fighting", status: "Released", video: "https://www.youtube.com/watch?v=RkWLKuIWwkk"},
    {title: "Roots Run Deep", slug: "roots-run-deep", url: "https://thelegokid4455.itch.io/roots-run-deep", shots: 5, tagline: "Made for Global Game Jam 2023.", genre: "Platformer", status: "Released", with: ["dwy", "munou_"]},
    {title: "Mangalam", slug: "mangalam", url: "https://thelegokid4455.itch.io/mangalam", shots: 5, tagline: "Floating-island survival simulation.", genre: "Survival, Simulation", status: "Released", with: ["BsXWa369"], video: "https://www.youtube.com/watch?v=PxzA05rdWO8"},
    {title: "LUCID", slug: "lucid", url: "https://thelegokid4455.itch.io/lucid", shots: 4, tagline: "Made for Binus Game Development 2022.", genre: "Platformer", status: "Released", with: ["Eunoiala", "eve130", "dwy", "iql.dnr"]},
    {title: "Mister Bakso", slug: "mister-bakso", url: "https://thelegokid4455.itch.io/mister-bakso", shots: 1, tagline: "Indonesian bakso vendor simulator.", genre: "Simulation", status: "In development"},
    {title: "Food Melody: \"Indonesian Edition\"", slug: "food-melody-indonesian-edition", url: "https://thelegokid4455.itch.io/food-melody-indonesian-edition", shots: 5, tagline: "A rhythm game about Indonesian food.", genre: "Rhythm", status: "Released", with: ["Rexfortis", "zipoxx02"], video: "https://www.youtube.com/watch?v=R0_5fiVEPZU"},
    {title: "Upscroll Bullet Hell Starter Pack", slug: "upscroll-bullet-hell-starter-pack", url: "https://thelegokid4455.itch.io/upscroll-bullet-hell-starter-pack", shots: 4, tagline: "A starter pack for upscrolling 2D shooters.", genre: "Shooter", status: "Released"},
    {title: "SURUP! by CUPIL", slug: "surup", url: "https://thelegokid4455.itch.io/surup", shots: 5, tagline: "Made for Indigo Game Startup Incubation 2021.", genre: "Platformer, Visual Novel", status: "Released", with: ["zipoxx02", "BsXWa369", "DeStreak"], video: "https://www.youtube.com/watch?v=1TNZnQMSGOc"},
    {title: "Samurai Suit X", slug: "samurai-suit-x", url: "https://thelegokid4455.itch.io/samurai-suit-x", shots: 4, tagline: "Hack-and-slash action adventure.", genre: "Action", status: "In development", video: "https://www.youtube.com/watch?v=H0mcQdNvUWk"},
    {title: "HITAM", slug: "hitam-game", url: "https://thelegokid4455.itch.io/hitam-game", shots: 3, tagline: "A short top-down audio-visual horror game.", genre: "Puzzle", status: "Released"},
    {title: "Office Backrooms", slug: "office-backrooms", url: "https://thelegokid4455.itch.io/office-backrooms", shots: 5, tagline: "FRI's office backroom.", status: "Released"},
    {title: "FRIDA", slug: "frida", url: "https://thelegokid4455.itch.io/frida", shots: 4, tagline: "A text-based console RPG.", genre: "Adventure, Role Playing", status: "Released"}
  ],
  experience: [
    {period:"2026 — Present", role:"Director / Founder", company:"Ave Ludum Studio · Makassar", description:"Lead game-development projects and advise clients and developers on technical architecture, production workflows and project execution.", visual:"assets/experience/ave-ludum-logo.svg", visualAlt:"Ave Ludum Studio logo"},
    {period:"2025 — Present", role:"Manager, Information Systems & Technology", company:"Universitas Negeri Makassar · Makassar", description:"Developed 3D simulations and interactive visualizations for institutional projects, and designed a modular CSL/OSCE examination timer system with configurable station rotation, timing and duration.", visual:"assets/experience/unm-phinisi.jpg", visualAlt:"Universitas Negeri Makassar Phinisi building"},
    {period:"Jul 2023 — Jul 2024", role:"Software Programmer", company:"PT. Maxxima Innovative · Surabaya", description:"Developed Unity/C# training simulations for government clients across PC and VR, including heavy-vehicle simulation, a ~100 km real-world driving simulator, hardware integration and performance optimization.", visual:"assets/experience/heavy-vehicle-real.jpg", visualAlt:"Heavy vehicle simulator rig"},
    {period:"Apr 2022 — Sep 2022", role:"Junior Game Programmer", company:"Octaverse Studio · Yogyakarta", description:"Contributed to mobile and PC projects including multiplayer FPS and strategic ship-battle games, plus an endless-runner mobile title.", visual:"assets/experience/octaverse-real.jpg", visualAlt:"Octaverse game artwork"},
    {period:"Oct 2021 — Oct 2022", role:"Game Programmer", company:"Dhelangan Studio · Yogyakarta", description:"Built medical VR and gameplay systems in Unity/C#, supported commissioned and in-house projects, and contributed to 3D asset production.", visual:"assets/experience/dhelangan-logo.png", visualAlt:"Dhelangan Studio logo"}
  ],
  skills: [
    ["Unity & programming", "Unity, C#, gameplay programming, object-oriented design, simulation systems, prototyping, Git"],
    ["VR & simulation", "VR/XR development, training simulators, vehicle systems, physics, large-scale environments, real-world mapping"],
    ["Optimization & hardware", "Performance optimization, Unity Profiler, 3D optimization, Arduino/hardware integration, PC/VR/Android builds"],
    ["Art & tools", "Blender, Photoshop, 3D modeling, programmer–artist workflows, technical leadership, client advisory"]
  ],
  facts: [
    ["Based in", "Makassar, Indonesia"],
    ["Education", "B.A.Sc. Computer Science, Game Development"],
    ["Certification", "Unity Certified User: Programmer (2024)"],
    ["English", "IELTS Academic, overall 8.0"],
    ["Currently studying", "S2 Pendidikan Teknologi dan Kejuruan, UNM"],
    ["Platforms", "PC, VR, Android"]
  ],
  contact: [
    {label:"LinkedIn", url:"https://www.linkedin.com/in/thelegokid4455/"},
    {label:"GitHub", url:"https://github.com/thelegokid4455"},
    {label:"itch.io", url:"https://thelegokid4455.itch.io/"},
    {label:"Sketchfab", url:"https://sketchfab.com/thelegokid4455"},
    {label:"Instagram", url:"https://www.instagram.com/fri.devmode/"},
    {label:"Linktree", url:"https://linktr.ee/thelegokid4455"}
  ]
};
