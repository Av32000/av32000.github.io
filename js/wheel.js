const wheelsData = [];

function initSkillsWheel(wheelDiv, skills, direction) {
  const wheelId = wheelsData.length;
  const directionsShift = [0, skills.length / 2, skills.length / 4];

  const wheelData = {
    currentSkill: 0,
    currentShift: 0,
    skills: skills,
    locked: false,
    lockTimeout: null,
    directionsShift: directionsShift[direction],
  };
  wheelsData.push(wheelData);

  wheelDiv.setAttribute("wheelid", wheelId);

  const wheel = wheelDiv.querySelector(".wheel");
  Array.from(wheel.childNodes).forEach((skillContainer) => {
    const skillId = parseInt(skillContainer.getAttribute("skillid"));

    skillContainer.addEventListener("click", () => {
      rotateToSkill(wheelId, skillId);
      wheelData.locked = true;
      if (wheelData.lockTimeout) clearTimeout(wheelData.lockTimeout);
      wheelData.lockTimeout = setTimeout(() => {
        wheelData.locked = false;
        wheelData.lockTimeout = null;
      }, 20000);
    });
  });

  updateWheel(wheelId);

  setInterval(() => {
    if (!wheelData.locked) {
      shiftWheel(wheelId, -1);
    }
  }, 6000);
}

function updateWheel(wheelId, autoUpdateContent = true) {
  const wheelDiv = document.querySelector(`[wheelid="${wheelId}"`);

  const wheelData = wheelsData[wheelId];

  const wheel = wheelDiv.querySelector(".wheel");
  const skillsCount = wheelData.skills.length;
  const radius = 170;

  const skillAngle = (2 * Math.PI) / skillsCount;

  Array.from(wheel.childNodes).forEach((skillContainer) => {
    const id = parseInt(skillContainer.getAttribute("skillid"));
    const transalteX =
      Math.cos(
        skillAngle * (id + wheelData.currentShift + wheelData.directionsShift)
      ) * radius;
    const transalteY =
      Math.sin(
        skillAngle * (id + wheelData.currentShift + wheelData.directionsShift)
      ) * radius;

    const iconElem = skillContainer.querySelector("img");
    const skill = wheelData.skills.find((s) => s.id == id);
    iconElem.src = `/assets/${skill.icon || skill.name}${
      wheelData.currentSkill == id ? "-Selected" : ""
    }.svg`;

    skillContainer.style.transform = `translate(${transalteX}px, ${transalteY}px)`;
  });

  if (autoUpdateContent) updateContent(wheelId);
}

async function rotateToSkill(wheelId, skillId) {
  const wheelData = wheelsData[wheelId];
  if (!wheelData) throw new Error("Invalid wheelId provided !");

  let wheelPosition =
    (skillId + wheelData.currentShift) % wheelData.skills.length;

  if (wheelPosition < 0)
    wheelPosition = wheelData.skills.length + wheelPosition;

  let shiftOffset =
    wheelPosition < wheelData.skills.length / 2
      ? -wheelPosition
      : wheelData.skills.length - wheelPosition;

  wheelData.currentSkill = skillId;
  updateContent(wheelId);

  for (let i = 0; i < Math.abs(shiftOffset); i++) {
    wheelData.currentShift += shiftOffset / Math.abs(shiftOffset);
    updateWheel(wheelId, false);
    await new Promise((resolve) =>
      setTimeout(resolve, 300 / Math.abs(shiftOffset))
    );
  }
}

function shiftWheel(wheelId, shift) {
  const wheelData = wheelsData[wheelId];
  if (!wheelData) throw new Error("Invalid wheelId provided !");

  wheelData.currentShift += shift;
  if (wheelData.currentSkill - shift > wheelData.currentShift.length - 1) {
    wheelData.currentSkill = 0;
  } else if (wheelData.currentSkill - shift < 0) {
    wheelData.currentSkill = wheelData.currentShift.length - 1;
  } else {
    wheelData.currentSkill = wheelData.currentSkill - shift;
  }

  updateWheel(wheelId);
}

function updateContent(wheelId) {
  const wheelData = wheelsData[wheelId];
  if (!wheelData) throw new Error("Invalid wheelId provided !");

  const skill = wheelData.skills.find(
    (skill) => skill.id == wheelData.currentSkill
  );

  const wheelDiv = document.querySelector(`[wheelid="${wheelId}"`);
  const contentDiv = wheelDiv.querySelector(".wheel-content");

  contentDiv.innerHTML = "";

  const title = document.createElement("p");
  title.classList.add("title");
  title.innerText = skill.name;

  contentDiv.appendChild(title);

  skill.content.forEach((str) => {
    const contentText = document.createElement("p");
    contentText.innerHTML = str;
    contentDiv.appendChild(contentText);
  });
}
