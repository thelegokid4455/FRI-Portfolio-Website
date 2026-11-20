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
      {label: "AVELS Heavy Vehicle Simulator", url: "project.html?p=avels-heavy-vehicle-simulator"},
      {label: "The Legend of Toakala", url: "project.html?p=the-legend-of-toakala"},
      {label: "Supermarket VR", url: "project.html?p=supermarket-vr"}
    ],
    chips: ["Unity", "C#", "VR / XR", "Multiplayer (Netcode)", "Vehicle physics", "Arduino controls", "Android", "Blender"],
    // Looping, muted clip beside the intro. It only plays when the visitor allows motion.
    video: {
      src: "assets/work/avels/avels-loading.mp4",
      poster: "assets/work/avels/avels-loading.webp",
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

  // Selected work. Each project also gets its own case-study page: project.html?p=<slug>
  // `kind` and `status` show as badges; leave them out if unconfirmed.
  // `credit` says who it was built with or for; `role` is my own role.
  // `caseStudy` sections (overview, challenge, approach, features, statusNote, contribution, feedback)
  // only appear when filled in. `media` feeds the case-study viewer: images, or clips with a poster.
  // `links` are extra buttons on the case-study page.
  projects: [
    {
      slug: "avels-heavy-vehicle-simulator",
      title: "AVELS Heavy Vehicle Simulator",
      category: "Multiplayer training simulator",
      kind: "Internal prototype",
      status: "Ready for testing",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      role: "Director and main programmer at Ave Ludum. Studio's role: simulation design, vehicle systems, multiplayer.",
      image: "assets/work/avels/avels-loading.webp",
      imageAlt: "A wheel loader loading a dump truck in the AVELS simulator",
      description: "A multiplayer PC simulator for heavy equipment. Trainees drive dump trucks, wheel loaders and backhoes around a work yard, guided by spotters on foot using hand signals and push-to-talk voice chat.",
      tags: ["Unity 6", "C#", "Netcode for GameObjects", "Vivox voice chat", "PC"],
      caseStudy: {
        challenge: "Several people have to work the same yard at once: drivers in different machines, and spotters on foot guiding them. The simulator needs all of them in one shared session, talking and signalling to each other.",
        approach: "A networked Unity session built on Netcode for GameObjects that players join with a code. Each machine has its own controls and a cab view, spotters walk the yard on foot, and everyone can talk with push-to-talk voice or send hand signals from a gesture wheel. The yard is shown in snow and in rain.",
        features: ["Drive a dump truck, a wheel loader and a backhoe", "First-person cab view", "Load rocks with the loader and tip them from the dump truck", "Join a shared session with a join code, up to 4 players so far", "Push-to-talk voice chat between players", "Spotters send hand signals from a gesture wheel", "Snow and rain, with mud building up on the vehicles"],
        statusNote: "In progress and ready for testing. The PC build runs multiplayer sessions with up to 4 concurrent players so far.",
        contribution: "Built in-house at Ave Ludum, where I'm the director and main programmer. It's a prototype that can be adapted into the simulator a client needs: different vehicles, equipment, sites or training procedures."
      },
      media: [
        {video: "assets/work/avels/avels-loading.mp4", poster: "assets/work/avels/avels-loading.webp", caption: "Loading the dump truck with a wheel loader.", alt: "A wheel loader raises its bucket over a dump truck"},
        {video: "assets/work/avels/avels-tipping.mp4", poster: "assets/work/avels/avels-tipping.webp", caption: "Tipping the load at the drop-off point.", alt: "A dump truck tips its bed and drops a load of rocks"},
        {video: "assets/work/avels/avels-spotter.mp4", poster: "assets/work/avels/avels-spotter.webp", caption: "A spotter on foot guides the driver in with hand signals.", alt: "A worker in a hi-vis vest waves a dump truck forward"},
        {video: "assets/work/avels/avels-gestures.mp4", poster: "assets/work/avels/avels-gestures.webp", caption: "Spotters pick hand signals from a quick gesture wheel.", alt: "A worker picks a hand signal from a radial menu"},
        {video: "assets/work/avels/avels-cab-view.mp4", poster: "assets/work/avels/avels-cab-view.webp", caption: "Operating the loader from the cab.", alt: "Cab view of a loader lifting rocks toward a row of skips"},
        {image: "assets/work/avels/avels-snowy-yard.webp", caption: "The yard under snow.", alt: "Trucks, a trailer and wheel loaders parked in a snowy yard between brick warehouses"},
        {image: "assets/work/avels/avels-loaders.webp", caption: "Backhoe, wheel loader and dump truck.", alt: "A backhoe and a wheel loader covered in snow beside a dump truck"},
        {image: "assets/work/avels/avels-rain-truck.webp", caption: "Rain, and a mud-caked dump truck.", alt: "A mud-covered dump truck in the rain outside a brick warehouse"}
      ],
      links: [{label: "Ave Ludum case study", url: "https://aveludumstudio.com/project.html?p=avels-heavy-vehicle-simulator"}]
    },
    {
      slug: "heavy-vehicle-simulator",
      title: "Heavy Vehicle Simulator",
      year: "2023",
      category: "Training · VR",
      kind: "Client project",
      status: "Delivered",
      credit: "PT. Maxxima Innovative, for a government institution",
      role: "Programmer, PT. Maxxima Innovative",
      image: "assets/experience/heavy-vehicle-real.webp",
      imageAlt: "Triple-monitor simulator rig with joysticks and a steering wheel, showing an excavator cab view",
      description: "Training simulator for heavy and construction vehicles used in runway-repair scenarios. Runs on a triple-monitor rig or in VR, with physical joysticks and controls wired in through Arduino.",
      tags: ["Unity", "C#", "VR", "Arduino", "Vehicle physics"],
      caseStudy: {
        challenge: "New vehicle mechanics had to be learned and built on the spot, then revised as the client's needs changed. Work also moved slowly between modelling, programming and integration in the game engine, across several office branches.",
        approach: "I raised the workflow problem with my supervisor, then met the CEO and the other office branches and set up a three-way meeting between them to agree how modelling, programming and engine integration should hand work to each other.",
        features: ["Heavy and construction vehicles for runway-repair training", "Runs on a triple-monitor rig or in a VR headset", "Physical joysticks and controls connected through Arduino"],
        statusNote: "Delivered to the client. The new cross-branch workflow made programmers' work between branches significantly smoother.",
        contribution: "I was a programmer on this simulator during my time as a Software Programmer at PT. Maxxima Innovative (July 2023 to July 2024), working on the vehicle mechanics, hardware integration and performance optimization."
      },
      media: [
        {image: "assets/experience/heavy-vehicle-real.webp", caption: "The simulator rig: three monitors, joysticks, a steering wheel and a tablet.", alt: "Triple-monitor simulator rig with joysticks and a steering wheel, showing an excavator cab view"}
      ]
    },
    {
      slug: "driving-convoy-simulator",
      title: "Driving & Convoy Simulator",
      year: "2024",
      category: "Large-scale simulation",
      kind: "Client project",
      status: "Delivered",
      credit: "PT. Maxxima Innovative, for a government institution",
      role: "Lead programmer, PT. Maxxima Innovative",
      image: "assets/work/avels/avels-rain-truck.webp",
      imageAlt: "Two dump trucks parked in the rain outside a brick warehouse",
      imageCaption: "Image: driving in AVELS, Ave Ludum's heavy vehicle simulator. No footage of this project is available.",
      description: "Driving simulator built on a real-world-scale, ~100 km environment of Jakarta, with route selection, vehicle handling, convoy scenarios and an instructor console. A lot of the work went into keeping a map that size running smoothly.",
      tags: ["Unity", "C#", "Optimization", "Large environments", "VR"],
      caseStudy: {
        challenge: "Keeping a real-world-scale, ~100 km environment of Jakarta running smoothly while trainees drive through it, while learning new mechanics on the spot and revising them as the client's needs changed. The hand-off from modelling to programming to engine integration also had to get faster across several office branches.",
        approach: "I raised the workflow problem with my supervisor, then met the CEO and the other office branches and set up a three-way meeting between them to agree how modelling, programming and engine integration should hand work to each other.",
        features: ["Route selection", "Vehicle handling", "Convoy training scenarios", "An instructor console"],
        statusNote: "Delivered to the client. The new cross-branch workflow made programmers' work between branches significantly smoother.",
        contribution: "I was the lead programmer on this simulator during my time as a Software Programmer at PT. Maxxima Innovative (July 2023 to July 2024), including the ~100 km environment and its performance optimization."
      },
      media: [
        {image: "assets/work/avels/avels-rain-truck.webp", caption: "Driving in AVELS, Ave Ludum's heavy vehicle simulator. Shown here because no footage of this project is available.", alt: "Two dump trucks parked in the rain outside a brick warehouse"}
      ]
    },
    {
      slug: "the-legend-of-toakala",
      title: "The Legend of Toakala",
      category: "Mobile folklore adventure",
      kind: "Original IP",
      status: "In development",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      role: "Director and main programmer at Ave Ludum. Studio's role: game development, level design, narrative, 3D.",
      image: "assets/work/toakala/tk-explore.webp",
      imageAlt: "Exploring a forest in The Legend of Toakala",
      description: "A 3D mobile adventure that retells the Toa Kala folktale from Maros, South Sulawesi, as something you can walk through and play, with puzzles drawn from local culture.",
      tags: ["Unity 6", "C#", "Android"],
      caseStudy: {
        challenge: "Turn a folktale from Maros into a game people can play on their phones, while staying true to the region's landscapes, stories and culture.",
        approach: "Story first: the story is written with storywriter Rizka Aulia Sabila and discussed with Dinas Kebudayaan dan Kepariwisataan Sulawesi Selatan. Each level is planned on paper as a route, explored in mood paintings, then built in Unity for mobile. The painted concept style carries into the story cutscenes, and local heritage is woven into the quests.",
        features: ["Explore forests, rivers, karst cliffs and a royal village", "Touch controls with an on-screen joystick, jump and sprint", "Quests with on-screen objectives and distance markers", "Dialogue with character portraits", "Painted story cutscenes with narration", "A Lipa' Sabbe weaving puzzle: match a traditional pattern thread by thread", "Notes on local heritage, like the Bugis silk sarong", "A cave puzzle built around the handprints of Leang-Leang", "Catching Bantimurung butterflies"],
        statusNote: "In development for mobile, with a new art style. Pitched to Dinas Kebudayaan dan Kepariwisataan Sulawesi Selatan on 31 October 2026.",
        contribution: "Ave Ludum's own game, where I'm the director and main programmer: concept, game and level design, art and development by the studio, with the story written together with Rizka Aulia Sabila."
      },
      media: [
        {video: "assets/work/toakala/tk-explore.mp4", poster: "assets/work/toakala/tk-explore.webp", caption: "Exploring with touch controls.", alt: "Toakala, a white monkey warrior, runs along a stone path with touch controls on screen"},
        {video: "assets/work/toakala/tk-cutscene.mp4", poster: "assets/work/toakala/tk-cutscene.webp", caption: "A painted story cutscene.", alt: "A greyscale painted scene of a jungle kingdom gate with narration text"},
        {video: "assets/work/toakala/tk-weaving.mp4", poster: "assets/work/toakala/tk-weaving.webp", caption: "The Lipa' Sabbe weaving puzzle, then a note on the Bugis silk sarong.", alt: "A weaving puzzle matching a red, yellow and purple sarong pattern"},
        {video: "assets/work/toakala/tk-dialogue.mp4", poster: "assets/work/toakala/tk-dialogue.webp", caption: "Meeting Putri I Bissu Daeng.", alt: "Toakala meets Putri I Bissu Daeng, with character portraits in the dialogue box"},
        {video: "assets/work/toakala/tk-handprints.mp4", poster: "assets/work/toakala/tk-handprints.webp", caption: "The Leang-Leang handprint puzzle.", alt: "Toakala runs through a rocky cave area touching red handprints on the walls"},
        {video: "assets/work/toakala/tk-village.mp4", poster: "assets/work/toakala/tk-village.webp", caption: "The royal village.", alt: "A village street with thatched houses and tall tiered roofs in the distance"},
        {image: "assets/work/toakala/tk-lagoon-huts.webp", caption: "The lagoon.", alt: "A turquoise lagoon with lily pads and thatched huts on the far bank"},
        {image: "assets/work/toakala/tk-forest-lagoon.webp", caption: "Forest lagoon.", alt: "A woman in green stands by a lagoon in the forest"},
        {image: "assets/work/toakala/tk-bridge.webp", caption: "A bridge into the mist.", alt: "A wooden bridge leading into a misty forest"},
        {image: "assets/work/toakala/tk-river-hut.webp", caption: "River crossing.", alt: "A shallow river running past a thatched hut in the forest"},
        {image: "assets/work/toakala/tk-title.webp", caption: "Title screen.", alt: "The Legend of Toa Kala title screen with Play, About and Quit"},
        {image: "assets/work/toakala/concept-toakala-lakeside.webp", caption: "Concept painting: lakeside.", alt: "Greyscale painting of a long-haired figure standing by a lake, with butterflies and karst hills behind"},
        {image: "assets/work/toakala/concept-toakala-village-gate.webp", caption: "Concept painting: village gate.", alt: "Greyscale painting of a torch-lit stone archway leading into a jungle village"}
      ],
      links: [{label: "Ave Ludum case study", url: "https://aveludumstudio.com/project.html?p=the-legend-of-toakala"}]
    },
    {
      slug: "supermarket-vr",
      title: "Supermarket VR",
      category: "VR training simulator",
      kind: "Client project",
      status: "Delivered",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      role: "Director and main programmer at Ave Ludum. Studio's role: simulation design, 3D environment, interaction.",
      image: "assets/work/supermarket-vr/supermarket-vr.webp",
      imageAlt: "A tester wearing a VR headset tries Supermarket VR while the view is mirrored on a laptop",
      description: "A VR recreation of a client's supermarket, built so staff can practise checkout and customer service before they stand at a real till.",
      tags: ["Unity", "C#", "VR"],
      caseStudy: {
        challenge: "Give staff somewhere to practise checkout and customer service before they work at a real till.",
        approach: "Recreate the client's own supermarket in VR, so practice happens in a space that matches the store staff will work in. It was tested with the client on a standalone VR headset.",
        features: ["A VR recreation of the client's store", "Practise checkout", "Practise customer service"],
        statusNote: "Delivered. The client was satisfied and has since asked the studio for a new project, which is under NDA.",
        contribution: "Built at Ave Ludum, where I'm the director and main programmer. The studio handled the simulation design, the 3D environment and the VR interactions.",
        feedback: {quote: "Good quality project, as initially agreed.", source: "The client"}
      },
      media: [
        {image: "assets/work/supermarket-vr/supermarket-vr.webp", caption: "Testing Supermarket VR with the client on a standalone headset.", alt: "A tester wearing a VR headset tries Supermarket VR while the view is mirrored on a laptop"}
      ],
      links: [{label: "Ave Ludum case study", url: "https://aveludumstudio.com/project.html?p=supermarket-vr"}]
    },
    {
      slug: "medical-vr-simulation",
      title: "Medical VR Simulation",
      year: "2022",
      category: "Medical · VR evaluation",
      kind: "Client project",
      status: "Delivered",
      credit: "Dhelangan Studio, for a private client",
      role: "Game Programmer, Dhelangan Studio",
      image: "assets/selected-works/medical-vr-simulation.webp",
      imageAlt: "VR scene of a vial filling machine with volume controls and a Next button",
      description: "A VR evaluation for students learning pharmaceutical production. Testers run the equipment step by step, choose materials and recipes, and work against the clock; how they do counts toward their final score.",
      tags: ["Unity", "C#", "VR", "Android"],
      caseStudy: {
        features: ["Step-by-step operation of pharmaceutical production equipment", "Adjustable machine settings, like fill volume, with on-screen controls", "Material and recipe selection", "A working-time limit", "Each tester's result contributes to their final score", "Built with Android deployment in mind"],
        statusNote: "Delivered to the client, who uses it to evaluate students.",
        contribution: "As a Game Programmer at Dhelangan Studio (October 2021 to October 2022), I built medical VR and gameplay systems in Unity/C#, including this evaluation."
      },
      media: [
        {image: "assets/selected-works/medical-vr-simulation.webp", caption: "A vial filling machine, with volume controls and a Next button to move through the steps.", alt: "VR scene of a vial filling machine with volume controls and a Next button"}
      ]
    },
    {
      slug: "pilah-bumi",
      title: "Pilah Bumi",
      category: "Environmental mobile game",
      status: "Base game complete",
      credit: "Ave Ludum Studio. I direct the studio and lead programming.",
      role: "Director and main programmer at Ave Ludum. Studio's role: game design, systems, 3D.",
      image: "assets/work/pilah-bumi/pilah-title.webp",
      imageAlt: "Pilah Bumi title screen",
      description: "A free-roam waste-sorting game for mobile. You pick up litter scattered around an open 3D map and sort it into the right bins.",
      tags: ["Unity 6", "C#", "Mobile"],
      caseStudy: {
        challenge: "Teach waste sorting by doing it: players have to find the litter themselves and decide which bin each piece belongs in.",
        approach: "A first-person, free-roam neighbourhood with litter scattered around it. Players grab or pick up items, carry them in an inventory, and drop each one into the matching bin until the area is clean.",
        features: ["Free-roam 3D neighbourhood", "Grab or pick up litter", "Carry items in a storage inventory and hotbar", "Sort each item into the right bin", "An objective counter that tracks the clean-up", "Day and night"],
        statusNote: "The base game is complete. An expansion with a new island map has been proposed to a client and is in progress.",
        contribution: "Built at Ave Ludum, where I'm the director and main programmer. The studio handled the game design, the gameplay systems and the 3D world."
      },
      media: [
        {video: "assets/work/pilah-bumi/pilah-sorting.mp4", poster: "assets/work/pilah-bumi/pilah-sorting.webp", caption: "Sorting litter into the right bin.", alt: "Dropping a banana peel into a green bin"},
        {video: "assets/work/pilah-bumi/pilah-pickup.mp4", poster: "assets/work/pilah-bumi/pilah-pickup.webp", caption: "Finding and picking up litter.", alt: "A plastic bottle on the road with grab and pick-up prompts"},
        {video: "assets/work/pilah-bumi/pilah-storage.mp4", poster: "assets/work/pilah-bumi/pilah-storage.webp", caption: "The storage inventory.", alt: "A storage grid holding oranges and bananas"},
        {video: "assets/work/pilah-bumi/pilah-complete.mp4", poster: "assets/work/pilah-bumi/pilah-complete.webp", caption: "Clearing the area completes the task.", alt: "A Complete banner after the last item is sorted"},
        {image: "assets/work/pilah-bumi/pilah-title.webp", caption: "Title screen.", alt: "Pilah Bumi title screen with Play and Quit buttons beside two bins"},
        {image: "assets/work/pilah-bumi/pilah-night.webp", caption: "The neighbourhood at night.", alt: "The neighbourhood at night under street lights"}
      ],
      links: [{label: "Ave Ludum case study", url: "https://aveludumstudio.com/project.html?p=pilah-bumi"}]
    },
    {
      slug: "gameplay-mobile-projects",
      title: "Gameplay & Mobile Projects",
      year: "2021–2022",
      category: "Game development",
      kind: "Personal & client projects",
      credit: "Octaverse Studio, Dhelangan Studio and my own projects",
      role: "Junior Game Programmer at Octaverse Studio; Game Programmer at Dhelangan Studio",
      image: "assets/games/necrospore/1.webp",
      imageAlt: "Necrospore key art",
      description: "Gameplay systems across mobile and PC: Metaverse FPS, a multiplayer shooter; a strategic ship-battle game; and Catch The Doge, a Dogecoin-inspired endless runner. Plus top-down shooters and prototypes of my own.",
      tags: ["Unity", "C#", "Gameplay", "Multiplayer", "Mobile"],
      caseStudy: {
        features: ["Metaverse FPS: multiplayer first-person shooter", "A strategic ship-battle game", "Catch The Doge: an endless runner inspired by Dogecoin", "Top-down shooters and other prototypes of my own"],
        statusNote: "Catch The Doge was left unfinished. My own games and jam entries are in the Games section, with their current status on itch.io.",
        contribution: "At Octaverse Studio (April to September 2022) I contributed to mobile and PC projects, including Metaverse FPS, the ship-battle game and Catch The Doge. At Dhelangan Studio (October 2021 to October 2022) I built gameplay systems, supported commissioned and in-house projects, and contributed to 3D asset production."
      },
      media: [
        {image: "assets/games/necrospore/1.webp", caption: "Necrospore key art.", alt: "Necrospore key art"}
      ],
      links: [{label: "See all 21 games", url: "index.html#games"}]
    }
  ],
  // Mirrors the itch.io profile (thelegokid4455.itch.io), in the same order.
  // Screenshots live in assets/games/<slug>/1.webp, 2.webp ... `shots` is how many there are.
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
    {period:"2025 — Present", role:"Manager, Information Systems & Technology", company:"Universitas Negeri Makassar · Makassar", description:"Developed 3D simulations and interactive visualizations for institutional projects, and designed a modular CSL/OSCE examination timer system with configurable station rotation, timing and duration.", visual:"assets/experience/unm-phinisi.webp", visualAlt:"Universitas Negeri Makassar Phinisi building"},
    {period:"Jul 2023 — Jul 2024", role:"Software Programmer", company:"PT. Maxxima Innovative · Surabaya", description:"Developed Unity/C# training simulations for government clients across PC and VR, including heavy-vehicle simulation, a ~100 km real-world driving simulator, hardware integration and performance optimization.", visual:"assets/experience/heavy-vehicle-real.webp", visualAlt:"Heavy vehicle simulator rig"},
    {period:"Apr 2022 — Sep 2022", role:"Junior Game Programmer", company:"Octaverse Studio · Yogyakarta", description:"Contributed to mobile and PC projects including multiplayer FPS and strategic ship-battle games, plus an endless-runner mobile title.", visual:"assets/experience/octaverse-real.webp", visualAlt:"Octaverse game artwork"},
    {period:"Oct 2021 — Oct 2022", role:"Game Programmer", company:"Dhelangan Studio · Yogyakarta", description:"Built medical VR and gameplay systems in Unity/C#, supported commissioned and in-house projects, and contributed to 3D asset production.", visual:"assets/experience/dhelangan-logo.webp", visualAlt:"Dhelangan Studio logo"}
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
