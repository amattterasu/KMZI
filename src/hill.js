let inputMatrix = document.getElementsByClassName("inputMatrix")[0].childNodes;
const panelId = document.getElementById('panel');
let btnNext = document.getElementById("btnNext");
const containers = document.getElementsByClassName('container');
let tabsDiv = document.getElementsByClassName("tabsDiv")[0].childNodes;
let titlePlain = document.getElementById('titlePlain');
let titleCipher = document.getElementById('titleCipher');

let key = [
    [],
    [],
    []
];
const n = 29;

btnNext.addEventListener("click", () => {
    let index = 1;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            key[i][j] = parseInt(inputMatrix[index].value);
            index += 2;
        }
    }
    console.log(key);

    if (checkRelativelyPrime()) {
        alertFunc(1, "Relatively prime");
        console.log("Relatively prime");

        containers[0].classList.add("hide");
        containers[1].classList.remove("hide");
        panelId.classList.add('hide');
    } else {
        alertFunc(0, "Not relatively prime or det = 0");
        console.log("Not relatively prime or det = 0");
    }
});

//start is here
actionBtn.addEventListener("click", () => {
    if (actionBtn.innerHTML === "encrypt") {
        txt2.value = encrypt(txt1.value.toLowerCase());
    } else {
        txt2.value = decrypt(txt1.value.toLowerCase());
    }
});

function checkRelativelyPrime() {

    det = parseInt(getDeterminant(key));
    console.log("det = " + det);

    let g = gcd(det, n);
    console.log("gcd = " + g);

    if (g == 1) {
        return true;
    } else {
        return false;
    }
}

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

//Encryption and Decryption Functions
function encrypt(plain) {
    let cipher = "";

    if (alphaTxt.indexOf(" ") == -1) {
        plain = plain.split(" ").join("");
    }

    for (let index = 0; index < plain.length; index += 3) {
        let x = alphaTxt.indexOf(plain[index]);
        let y, z;
        
        if (index + 1 == plain.length) {
            y = 26;
            z = 26;
        } else {
            y = alphaTxt.indexOf(plain[index + 1]);

            if (index + 2 == plain.length) {
                z = 26;
            } else {
                z = alphaTxt.indexOf(plain[index + 2]);
            }
        }
        console.log(x, y, z);
        let result = multiplyMatrix(key, [x, y, z]);
        console.log(result);

        for (let i = 0; i < result.length; i++) {

            if (result[i] < 0) {
                result[i] = getRidOfNeg(result[i], n);
                console.log(result[i]);
            }
            let j = result[i] % n;
            cipher += alphaTxt[j];
        }
    }
    return cipher;
}

function decrypt(cipher) {
    let plain = "";
    let m = det;
    console.log('det = ', det);

    if (det < 0) {
        m = getRidOfNeg(det, n);
        console.log('check here!!!', m);
    }
    m = m % n;

    console.log("n: " + n);
    console.log("m:  " + m);

    let modularInv = modularInverse(m, n);
    let matrixInv = inverseMatrix(key); //обратная матрица без умножения по модулю
    console.log('modularInv', modularInv);
    console.log('matrixInv', matrixInv);

    let keyMinusPervoy;

    for (let index = 0; index < cipher.length; index += 3) {
        let x = alphaTxt.indexOf(cipher[index]);
        let y = alphaTxt.indexOf(cipher[index + 1]);
        let z = alphaTxt.indexOf(cipher[index + 2]);

        console.log("3 Symbols:", [x, y, z]);
        
        let res = multiplyMatrixMod(matrixInv, n);
        keyMinusPervoy =  multplyMatrixAndNum(modularInv, res);
        console.log("matinv: " + res);

        let j = multiplyMatrix(keyMinusPervoy, [x, y, z]);
        for (let i = 0; i < j.length; i++) {
           let a = j[i] % n;
            plain += alphaTxt[a];
        }
    }
    return plain;
}