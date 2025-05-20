// Load Translations
function loadXMLFile(filename, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseXML);
    }
  };
  xhttp.open("GET", "locales/" + filename, true);
  xhttp.send();
}

function extractTranslations(xml) {
  var translations = {};
  var nodes = xml.getElementsByTagName("translation");
  for (var i = 0; i < nodes.length; i++) {
    var key = nodes[i].getAttribute("key");
    var translationNode = nodes[i].getElementsByTagName("value")[0];
    var translationHTML = translationNode.innerHTML;
    translations[key] = translationHTML;
  }
  return translations;
}

// Detect User Preferences
const languages = ["fr", "en"];
// let userLanguage = (navigator.language || navigator.userLanguage).split("-")[0];
let userLanguage = "en";

setLanguage(userLanguage);

function ApplyTranslations(translations) {
  // Get Elements To Translate
  var elementsToTranslate = document.querySelectorAll("[toTranslate]");

  elementsToTranslate.forEach((element) => {
    let html = translations[element.id];
    if (html != null) element.innerHTML = html;
  });

  // Load LocalSelector
  const loaclSelector = document.getElementById("local");
  loaclSelector.innerHTML = "";
  languages.forEach((l) => {
    const option = document.createElement("option");
    option.value = l;
    option.innerText = l.toUpperCase();
    option.onclick = (e) => setLanguage(e.target.value);
    if (userLanguage == l) option.selected = "selected";
    loaclSelector.appendChild(option);
  });
}

function setLanguage(language) {
  userLanguage = language;
  loadXMLFile(language + ".xml", function (xml) {
    var translations = extractTranslations(xml);
    ApplyTranslations(translations);
    ApplyLastUpdate(translations);
  });
}

// Last Update Projects
const githubApiEndpoint = "https://api.github.com/repos/";
const projectsList = document.querySelectorAll(".projects-list .project");

function ApplyLastUpdate(translations) {
  document.querySelectorAll(".last-update-project").forEach((e) => e.remove());
  projectsList.forEach(async (project) => {
    const url = project.querySelector(".link p").innerHTML.trim();
    const lastUpdate = await (await fetch(githubApiEndpoint + url)).json();

    let span = document.createElement("span");
    span.innerHTML = ` • ${FormatDate(lastUpdate.pushed_at, translations)}`;
    span.className = "last-update-project";

    project.querySelector(".link").appendChild(span);
  });
}

function FormatDate(sDate, translations) {
  const date = new Date(sDate);
  const now = new Date();

  const diffTime = Math.abs(now - date);
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  const languages = ["fr", "en"];
  let userLanguage = (navigator.language || navigator.userLanguage).split(
    "-"
  )[0];
  if (!languages.includes(userLanguage)) userLanguage = "fr";

  if (diffSeconds < 10) {
    return translations["now"];
  } else if (diffSeconds < 60) {
    return translations["seconds-ago"].replace("${time}", diffSeconds);
  } else if (diffMinutes < 60) {
    return translations["minutes-ago"]
      .replace("${time}", diffMinutes)
      .replace("${plural}", diffMinutes > 1 ? "s" : "");
  } else if (diffHours < 24) {
    return translations["hours-ago"]
      .replace("${time}", diffHours)
      .replace("${plural}", diffHours > 1 ? "s" : "");
  } else if (diffDays == 1) {
    return translations["yesterday"];
  } else if (diffDays < 30) {
    return translations["days-ago"].replace("${time}", diffDays);
  } else if (diffMonths < 12) {
    return translations["month-ago"]
      .replace("${time}", diffMonths)
      .replace("${plural}", diffMonths > 1 ? "s" : "");
  } else if (diffYears == 1) {
    return translations["last-year"];
  } else {
    return translations["years-ago"].replace("${time}", diffYears);
  }
}
