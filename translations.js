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
const languages = ["fr", "en"]
let userLanguage = (navigator.language || navigator.userLanguage).split("-")[0];
if (!languages.includes(userLanguage)) userLanguage = "fr"

loadXMLFile(userLanguage + ".xml", function (xml) {
  var translations = extractTranslations(xml);
  ApplyTranslations(translations)
});

function ApplyTranslations(translations) {
  // Get Elements To Translate
  var elementsToTranslate = document.querySelectorAll('[toTranslate]');

  elementsToTranslate.forEach(element => {
    let html = translations[element.id]
    if (html != null) element.innerHTML = html;
  })
}

// Debug Function
function setLanguage(language) {
  loadXMLFile(language + ".xml", function (xml) {
    var translations = extractTranslations(xml);
    ApplyTranslations(translations)
  });
}

