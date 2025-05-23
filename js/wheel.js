const wheelsData = [];

function startSkillsWheel(wheelDiv, skills) {
  const wheelId = wheelsData.length;
  const wheelData = {
    currentSkill: 0,
    currentShift: 0,
    skills: skills,
  };
  wheelsData.push(wheelData);

  wheelDiv.setAttribute("wheelid", wheelId);

  const wheel = wheelDiv.querySelector(".wheel");
  Array.from(wheel.childNodes).forEach((skillContainer) => {
    const skillId = parseInt(skillContainer.getAttribute("skillid"));

    skillContainer.addEventListener("click", () => {
      rotateToSkill(wheelId, skillId);
    });
  });

  updateWheel(wheelId);
}

function updateWheel(wheelId) {
  const wheelDiv = document.querySelector(`[wheelid="${wheelId}"`);

  const wheelData = wheelsData[wheelId];

  const wheel = wheelDiv.querySelector(".wheel");
  const skillsCount = wheelData.skills.length;
  const radius = 170;

  const skillAngle = (2 * Math.PI) / skillsCount;

  Array.from(wheel.childNodes).forEach((skillContainer) => {
    const id = parseInt(skillContainer.getAttribute("skillid"));
    const transalteX =
      Math.cos(skillAngle * (id + wheelData.currentShift)) * radius;
    const transalteY =
      Math.sin(skillAngle * (id + wheelData.currentShift)) * radius;

    const iconElem = skillContainer.querySelector("img");
    const skill = wheelData.skills.find((s) => s.id == id);
    iconElem.src = `/assets/${skill.icon || skill.name}${
      wheelData.currentSkill == id ? "-Selected" : ""
    }.svg`;

    skillContainer.style.transform = `translate(${transalteX}px, ${transalteY}px)`;
  });
}

async function rotateToSkill(wheelId, skillId) {
  const wheelData = wheelsData[wheelId];
  if (!wheelData) throw new Error("Invalid wheelId provided !");

  const wheelPosition = skillId - wheelData.currentSkill;

  const shiftOffset =
    wheelPosition < wheelData.skills.length / 2
      ? -wheelPosition
      : wheelData.skills.length - wheelPosition;

  wheelData.currentSkill = skillId;
  for (let i = 0; i < Math.abs(shiftOffset); i++) {
    wheelData.currentShift += shiftOffset / Math.abs(shiftOffset);
    updateWheel(wheelId);
    await new Promise((resolve) =>
      setTimeout(resolve, 300 / Math.abs(shiftOffset))
    );
  }
}
