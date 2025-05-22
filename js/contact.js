function render() {
  const navBar = document.getElementById("navbar");
  const footerDiv = document.getElementById("socials");

  renderNavBar(navBar);
  renderFooter(footerDiv);
}

function copyTextContent(elem) {
  let textElem = elem.querySelector("p");
  const text = textElem.innerText;
  navigator.clipboard.writeText(text).then(() => {
    textElem.innerText = "Copied !";
    setTimeout(() => (textElem.innerText = text), 2000);
  });
}

render();
