let inputMatrixRec = document.getElementsByClassName("inputMatrixRec")[0].childNodes;
let tabsDivRec = document.getElementsByClassName("tabsDivRec")[0].childNodes;
let titlePlainRec = document.getElementById('titlePlainRec');
let titleCipherRec = document.getElementById('titleCipherRec');
let keyRec = [
    [],
    [],
    []
];
let detRec;

btnNextRec.addEventListener("click", () => {
    let index = 1;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            key[i][j] = parseInt(inputMatrix[index].value);
            index += 2;
        }
    }
    index = 1
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            keyRec[i][j] = parseInt(inputMatrixRec[index].value);
            index += 2;
        }
    }
    console.log(key);
    console.log(keyRec);

    if (checkRelativelyPrimeRec()) {
        alertFunc(1, "Relatively prime");
        console.log("Relatively prime");

        containers[0].classList.add("hide");
        containers[2].classList.add("hide");
        panelId.classList.add('hide');
        containers[3].classList.remove('hide');
    } else {
        alertFunc(0, "Not relatively prime or det = 0");
        console.log("Not relatively prime or det = 0");
    }
});

actionBtnRec.addEventListener("click", () => {
    if (actionBtn.innerHTML === "encrypt") {
        txtRec.value = encryptRec(txtRec.value.toLowerCase());
    } else {
        console.log(txtRec.value);
        txtRec.value = decryptRec(txtRec.value.toLowerCase());
    }
});

function checkRelativelyPrimeRec() {

    det = parseInt(getDeterminant(key));
    detRec = parseInt(getDeterminant(keyRec));
    console.log("det = " + det);
    console.log("det2 = " + detRec);

    let g = gcd(det, n);
    console.log("gcd = " + g);
    let r = gcd(detRec, n);
    console.log("gcd = " + r);

    if (g == 1 && r == 1) {
        return true;
    } else {
        return false;
    }
}

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

//Encryption and Decryption Functions
function encryptRec(plain) {}
function decryptRec(cipher) {}