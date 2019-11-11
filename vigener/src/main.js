let tabsDiv = document.getElementsByClassName("tabsDiv")[0].childNodes;
let titlePlain = document.getElementById('titlePlain');
let titleCipher = document.getElementById('titleCipher');

let tabsDivRec = document.getElementsByClassName("tabsDivRec")[0].childNodes;
let titlePlainRec = document.getElementById('titlePlainRec');
let titleCipherRec = document.getElementById('titleCipherRec');

tabsDiv[1].addEventListener("click", () => {
  titlePlain.innerText = "Enter Plain Text";
  titleCipher.innerText = "Cipher Text";
  actionBtn.innerHTML = "encrypt";
  tabsDiv[1].classList.add('target');
  tabsDiv[3].classList.remove('target');
});

tabsDiv[3].addEventListener("click", () => {
  titlePlain.innerText = "Enter Cipher Text";
  titleCipher.innerText = "Plain Text";
  actionBtn.innerHTML = "decrypt";
  tabsDiv[3].classList.add('target');
  tabsDiv[1].classList.remove('target');
});

tabsDivRec[1].addEventListener("click", () => {
  titlePlainRec.innerText = "Enter Plain Text";
  titleCipherRec.innerText = "Cipher Text";
  actionBtnRec.innerHTML = "encrypt";
  tabsDivRec[1].classList.add('target');
  tabsDivRec[3].classList.remove('target');
});

tabsDivRec[3].addEventListener("click", () => {
  titlePlainRec.innerText = "Enter Cipher Text";
  titleCipherRec.innerText = "Plain Text";
  actionBtnRec.innerHTML = "decrypt";
  tabsDivRec[3].classList.add('target');
  tabsDivRec[1].classList.remove('target');
});