const projects = [
  {
    id: 0,
    name: "Finance Tracker",
    type: "dev",
    description:
      "Simple tool to monitor bank accounts with cool statistics. Finance Tracker allows you to keep track of every transaction and create useful charts. Organize, analyze and manage your transactions thanks to powerful filters and tags.",
    link: {
      icon: "GitHub.svg",
      text: "Av32000/Finance-Tracker",
      url: "https://github.com/Av32000/Finance-Tracker",
    },
    favorite: 0,
    cover: {
      type: "icon",
      value: "Node.Js.svg",
    },
    cardFields: [
      {
        type: "key",
        key: "Language",
        value: "Typescript",
      },
      {
        type: "key",
        key: "Tools Used",
        value: "React, Tailwind CSS, Chart.js",
      },
      {
        type: "last-commit",
        key: "Last Update",
        value: "Av32000/Finance-Tracker",
      },
    ],
    contentBlocks: [
      {
        type: "images",
        value: ["embed.png", "roadkill.webp", "sdt.jpg"],
      },
      {
        type: "image",
        value: "embed.png",
      },
    ],
  },
  {
    id: 1,
    name: "Discord-Badge",
    link: {
      icon: "GitHub.svg",
      text: "Av32000/Discord-Badge",
      url: "https://github.com/Av32000/CodeLyoko-UHC",
    },
    description:
      "Discord Badge is a Discord Bot that expose an API to generate a badge indicating your Discord status (Online, Offline...). It's very easy to use, and can be used on a website or GitHub profile, for example.",
    type: "dev",
    favorite: 1,
    cover: {
      type: "icon",
      value: "Node.Js.svg",
    },
    cardFields: [
      {
        type: "key",
        key: "Language",
        value: "Javascript",
      },
      {
        type: "last-commit",
        key: "Last Update",
        value: "Av32000/Discord-Badge",
      },
    ],
  },
  {
    id: 2,
    name: "Code Lyoko UHC",
    type: "dev",
    link: {
      icon: "GitHub.svg",
      text: "Av32000/CodeLyoko-UHC",
      url: "https://github.com/Av32000/CodeLyoko-UHC",
    },
    description:
      "Code Lyoko UHC is a UHC Minecraft plugin based on the Code Lyoko universe. Each player is assigned a role corresponding to a character from the series, and must, alone or with allies, eliminate all other players to win the game. Each role has its own powers and characteristics, creating a wide range of possible strategies.",
    favorite: 2,
    cover: {
      type: "icon",
      value: "Java.svg",
    },
    cardFields: [
      {
        type: "key",
        key: "Language",
        value: "Java",
      },
      {
        type: "last-commit",
        key: "Last Update",
        value: "Av32000/CodeLyoko-UHC",
      },
    ],
  },
  {
    id: 3,
    name: "Soirée des talents 2025",
    type: "films",
    description:
      "Live production of the annual evening event at Lycée Descartes in Montigny-le-Bretonneux.",
    favorite: 3,
    cover: {
      type: "image",
      value: "sdt.jpg",
    },
    cardFields: [
      {
        type: "key",
        key: "Roles",
        value: "Pre-Production / Director / Editing",
      },
    ],
    contentBlocks: [
      {
        type: "youtube",
        value: "ESbr3xTVNks",
      },
    ],
  },
  {
    id: 4,
    name: "Roadkill",
    type: "films",
    favorite: 4,
    cover: {
      type: "image",
      value: "roadkill.webp",
    },
    cardFields: [
      {
        type: "key",
        key: "Roles",
        value: "Pre-Production /  Assistant Director / 1st Camera Assistant",
      },
    ],
    contentBlocks: [
      {
        type: "youtube",
        value: "8fHyNr-5Uv0",
      },
    ],
  },
  {
    id: 5,
    name: "View More...",
    type: "more",
    favorite: 5,
    url: "/projects.html",
    cover: {
      type: "text",
      value: "View More...",
    },
  },
  {
    id: 6,
    name: "Kintsugi",
    type: "films",
    favorite: -1,
    cover: {
      type: "image",
      value: "kintsugi.jpg",
    },
    cardFields: [
      {
        type: "key",
        key: "Roles",
        value: "Pre-Production",
      },
    ],
    contentBlocks: [
      {
        type: "youtube",
        value: "k6A2jz8GRcg",
      },
      {
        type: "related",
        value: ["films"],
      },
    ],
  },
];
