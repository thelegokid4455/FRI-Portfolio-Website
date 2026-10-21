// EDIT THIS FILE to update the content on your portfolio.
// Keep the same field names so the site renders correctly.
const siteContent = {
  nameFull: "Farhan Ramadhani Irsyad",
  nameShort: "Farhan Irsyad",
  headline: "Unity / VR Simulation Developer",
  location: "Makassar, Indonesia",
  availability: "Open to remote work and relocation",
  intro: "I write Unity/C# for training simulators, VR and games. Most of my professional work has been government and enterprise training software for PC, VR and Android: heavy-vehicle simulators with physical controls, a ~100 km driving environment of Jakarta, and medical VR.",
  about: "I build interactive systems that sit between games, simulation and real-world training. My work combines gameplay programming, vehicle and physics systems, VR/XR interaction, performance optimization, 3D pipelines and hardware integration. I enjoy turning complex requirements into modular, usable software and working closely with artists, domain experts and non-technical stakeholders.",
  // Hero button. To link your CV instead, add it as assets/FRI-Resume.pdf and set url to "assets/FRI-Resume.pdf".
  cv: {label: "Portfolio PDF", url: "https://shorturl.at/ZeDXY"},
  email: "farhan.r.irsyad@gmail.com",
  projects: [
    {
      title: "Heavy Vehicle Simulator",
      year: "2023",
      category: "Training · VR",
      client: "PT. Maxxima Innovative, for a government client",
      image: "assets/experience/heavy-vehicle-real.jpg",
      imageAlt: "Triple-monitor simulator rig with joysticks and a steering wheel, showing an excavator cab view",
      description: "Training simulator for heavy and construction vehicles used in runway-repair scenarios. Runs on a triple-monitor rig or in VR, with physical joysticks and controls wired in through Arduino.",
      tags: ["Unity", "C#", "VR", "Arduino", "Vehicle physics"]
    },
    {
      title: "Driving & Convoy Simulator",
      year: "2024",
      category: "Large-scale simulation",
      client: "PT. Maxxima Innovative, for a government client",
      image: "assets/selected-works/driving-simulator-hero.jpg",
      imageAlt: "Instructor view of the driving simulator showing open terrain and scenario controls",
      description: "Driving simulator built on a real-world-scale, ~100 km environment of Jakarta, with route selection, vehicle handling, convoy scenarios and an instructor console. A lot of the work went into keeping a map that size running smoothly.",
      tags: ["Unity", "C#", "Optimization", "Large environments", "VR"]
    },
    {
      title: "Medical VR Simulation",
      year: "2022",
      category: "Medical · VR",
      client: "Dhelangan Studio, for a pharmaceutical client",
      image: "assets/selected-works/medical-vr-simulation.jpg",
      imageAlt: "VR scene of a vial filling machine with volume controls and a Next button",
      description: "Step-by-step interactive training on pharmaceutical production equipment, built in Unity/C# with Android deployment in mind.",
      tags: ["Unity", "C#", "VR", "Android"]
    },
    {
      title: "Gameplay & Mobile Projects",
      year: "2021–2022",
      category: "Game development",
      client: "Octaverse Studio, Dhelangan Studio and personal projects",
      image: "assets/games/necrospore/1.jpg",
      imageAlt: "Necrospore key art",
      description: "Gameplay systems and prototypes across mobile and PC: a multiplayer FPS, a strategic ship-battle game, top-down shooters and an endless runner.",
      tags: ["Unity", "C#", "Gameplay", "Multiplayer", "Mobile"]
    }
  ],
  // Mirrors the itch.io profile (thelegokid4455.itch.io), in the same order.
  // Screenshots live in assets/games/<slug>/1.jpg, 2.jpg ... `shots` is how many there are.
  // `with` lists the co-authors credited on the itch.io page.
  games: [
    {title: "Dagon Shows No Mercy", slug: "dagon-shows-no-mercy", url: "https://ray-ark.itch.io/dagon-shows-no-mercy", shots: 5, tagline: "An RTS for a new era, set in a Lovecraft-inspired world.", genre: "Strategy", status: "Released", with: ["ray_ark", "Ray557"]},
    {title: "Shift 7: Gamejam Edition", slug: "shift-7", url: "https://ray-ark.itch.io/shift-7", shots: 5, tagline: "Stop the train before it reaches its final stop … Hell.", genre: "Adventure", status: "Prototype", with: ["ray_ark", "mhakasyah", "ammmmp", "Racky"]},
    {title: "Banyu: Reclaiming Hope", slug: "banyu", url: "https://ray-ark.itch.io/banyu", shots: 4, tagline: "A cozy sailing journey to reclaim, restore and reshape the future.", genre: "Adventure", status: "Released", with: ["ray_ark", "waimus"]},
    {title: "Nexus Bloom", slug: "nexus-bloom", url: "https://ray-ark.itch.io/nexus-bloom", shots: 4, tagline: "Seed the Bloom, fight the Void.", genre: "Action, Shooter", status: "Released", with: ["ray_ark"], video: "https://www.youtube.com/watch?v=n9lg_wuROzc"},
    {title: "Necrospore", slug: "necrospore", url: "https://ray-ark.itch.io/necrospore", shots: 5, genre: "Strategy, Action", status: "Released", with: ["ray_ark", "MintJelly", "munou_"], video: "https://www.youtube.com/watch?v=IYZOilgmV9o"},
    {title: "Salvia's Scroll Atelier", slug: "salvias-scroll-atelier", url: "https://thelegokid4455.itch.io/salvias-scroll-atelier", shots: 5, tagline: "Learn with Salvia to channel your magic into a scroll and sell it!", genre: "Simulation", status: "In development", with: ["Rexfortis", "Madan", "MegaBite Interactive"]},
    {title: "Lontara Warrior", slug: "lontara-warrior", url: "https://thelegokid4455.itch.io/lontara-warrior", shots: 1, tagline: "Casual mobile game about the Lontara Makassar script.", genre: "Educational, Fighting", status: "Released"},
    {title: "Roots Run Deep", slug: "roots-run-deep", url: "https://thelegokid4455.itch.io/roots-run-deep", shots: 5, tagline: "Made for Global Game Jam 2023.", genre: "Platformer", status: "Released", with: ["dwy", "munou_"]},
    {title: "Petaroenk: Short Fighting Game", slug: "petaroenk", url: "https://thelegokid4455.itch.io/petaroenk", shots: 4, tagline: "A short two-player fighting game.", genre: "Fighting", status: "Released"},
    {title: "Mangalam", slug: "mangalam", url: "https://thelegokid4455.itch.io/mangalam", shots: 5, tagline: "Floating-island survival simulation.", genre: "Survival, Simulation", status: "Released", with: ["BsXWa369"], video: "https://www.youtube.com/watch?v=PxzA05rdWO8"},
    {title: "LUCID", slug: "lucid", url: "https://thelegokid4455.itch.io/lucid", shots: 4, tagline: "Made for Binus Game Development 2022.", genre: "Platformer", status: "Released", with: ["Eunoiala", "eve130", "dwy", "iql.dnr"]},
    {title: "Mister Bakso", slug: "mister-bakso", url: "https://thelegokid4455.itch.io/mister-bakso", shots: 1, tagline: "Indonesian bakso vendor simulator.", genre: "Simulation", status: "In development"},
    {title: "Food Melody: \"Indonesian Edition\"", slug: "food-melody-indonesian-edition", url: "https://thelegokid4455.itch.io/food-melody-indonesian-edition", shots: 5, tagline: "A rhythm game about Indonesian food.", genre: "Rhythm", status: "Released", with: ["Rexfortis", "zipoxx02"], video: "https://www.youtube.com/watch?v=R0_5fiVEPZU"},
    {title: "Upscroll Bullet Hell Starter Pack", slug: "upscroll-bullet-hell-starter-pack", url: "https://thelegokid4455.itch.io/upscroll-bullet-hell-starter-pack", shots: 4, tagline: "A starter pack for upscrolling 2D shooters.", genre: "Shooter", status: "Released"},
    {title: "SURUP! by CUPIL", slug: "surup", url: "https://thelegokid4455.itch.io/surup", shots: 5, tagline: "Made for Indigo Game Startup Incubation 2021.", genre: "Platformer, Visual Novel", status: "Released", with: ["zipoxx02", "BsXWa369", "DeStreak"], video: "https://www.youtube.com/watch?v=1TNZnQMSGOc"},
    {title: "Samurai Suit X", slug: "samurai-suit-x", url: "https://thelegokid4455.itch.io/samurai-suit-x", shots: 4, tagline: "Hack-and-slash action adventure.", genre: "Action", status: "In development", video: "https://www.youtube.com/watch?v=H0mcQdNvUWk"},
    {title: "HITAM", slug: "hitam-game", url: "https://thelegokid4455.itch.io/hitam-game", shots: 3, tagline: "A short top-down audio-visual horror game.", genre: "Puzzle", status: "Released"},
    {title: "Minitank Shooter", slug: "minitank-shooter", url: "https://thelegokid4455.itch.io/minitank-shooter", shots: 2, tagline: "Mini roguelike top-down tank shooter.", genre: "Shooter, Action", status: "In development", video: "https://www.youtube.com/watch?v=PF6yH0qjXQY"},
    {title: "Office Backrooms", slug: "office-backrooms", url: "https://thelegokid4455.itch.io/office-backrooms", shots: 5, tagline: "FRI's office backroom.", status: "Released"},
    {title: "Demo Warplanes", slug: "demo-warplanes", url: "https://thelegokid4455.itch.io/demo-warplanes", shots: 1, genre: "Shooter", status: "In development"},
    {title: "FRIDA", slug: "frida", url: "https://thelegokid4455.itch.io/frida", shots: 4, tagline: "A text-based console RPG.", genre: "Adventure, Role Playing", status: "Released"}
  ],
  experience: [
    {period:"2026 — Present", role:"Director / Founder", company:"Ave Ludum Studio · Makassar", description:"Lead game-development projects and advise clients and developers on technical architecture, production workflows and project execution.", visual:"assets/experience/ave-ludum-logo.svg", visualAlt:"Ave Ludum Studio logo"},
    {period:"2025 — Present", role:"Manager, Information Systems & Technology", company:"Universitas Negeri Makassar · Makassar", description:"Developed 3D simulations and interactive visualizations for institutional projects, and designed a modular CSL/OSCE examination timer system with configurable station rotation, timing and duration.", visual:"assets/experience/unm-phinisi.jpg", visualAlt:"Universitas Negeri Makassar Phinisi building"},
    {period:"Jul 2023 — Jul 2024", role:"Software Programmer", company:"PT. Maxxima Innovative · Surabaya", description:"Developed Unity/C# training simulations for government clients across PC and VR, including heavy-vehicle simulation, a ~100 km real-world driving simulator, hardware integration and performance optimization.", visual:"assets/experience/heavy-vehicle-real.jpg", visualAlt:"Heavy vehicle simulator rig"},
    {period:"Apr 2022 — Sep 2022", role:"Junior Game Programmer", company:"Octaverse Studio · Yogyakarta", description:"Contributed to mobile and PC projects including multiplayer FPS and strategic ship-battle games, plus an endless-runner mobile title.", visual:"assets/experience/octaverse-real.jpg", visualAlt:"Octaverse game artwork"},
    {period:"Oct 2021 — Oct 2022", role:"Game Programmer", company:"Dhelangan Studio · Yogyakarta", description:"Built medical VR and gameplay systems in Unity/C#, supported commissioned and in-house projects, and contributed to 3D asset production.", visual:"https://www.dhelangan.com/logo.png", visualAlt:"Dhelangan Studio logo"}
  ],
  skills: [
    ["Unity & programming", "Unity, C#, gameplay programming, object-oriented design, simulation systems, prototyping, Git"],
    ["VR & simulation", "VR/XR development, training simulators, vehicle systems, physics, large-scale environments, real-world mapping"],
    ["Optimization & hardware", "Performance optimization, Unity Profiler, 3D optimization, Arduino/hardware integration, PC/VR/Android builds"],
    ["Also", "Blender, Photoshop, 3D modeling, programmer–artist workflows, technical leadership, client advisory"]
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
