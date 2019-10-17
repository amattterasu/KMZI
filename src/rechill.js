let inputMatrixRec = document.getElementsByClassName("inputMatrixRec")[0].childNodes;
let tabsDivRec = document.getElementsByClassName("tabsDivRec")[0].childNodes;
let titlePlainRec = document.getElementById('titlePlainRec');
let titleCipherRec = document.getElementById('titleCipherRec');
let keyRec = [
    [],
    [],
    []
];

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
    if (actionBtnRec.innerHTML === "encrypt") {
        txtRec2.value = encryptRec(txtRec1.value.toLowerCase());
    } else {
        console.log(txtRec2.value);
        txtRec2.value = decryptRec(txtRec1.value.toLowerCase());
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
function encryptRec(plain) {
    let cipher = "";

    if (alphaTxt.indexOf(" ") == -1) {
        plain = plain.split(" ").join("");
    }

    let key1 = key;
    let key2 = keyRec;

    for (let index = 0; index < plain.length; index += 3) {
        let x = alphaTxt.indexOf(plain[index]);
        let y, z, result = 0;

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

        if (index === 0) {
            result = multiplyMatrix(key1, [x, y, z]);
            //console.log('index:', index, result);
        } else if (index === 3) {
            result = multiplyMatrix(key2, [x, y, z]);
            //console.log('index:', index, result);
        } else if (index > 3) {

            let c = multiplyMatrix3x3(key2, key1);
            console.log(c);
            result = multiplyMatrix(c, [x, y, z]);

            console.log('index:', index, result);

            key1 = key2.slice();
            key2 = c.slice();
        }

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

function decryptRec(cipher) {
    let plain = "";
    let m = det;
    let mRec = detRec;
    console.log('det = ', det);

    if (det < 0) {
        m = getRidOfNeg(det, n);
    }
    m = m % n;

    if (detRec < 0) {
        mRec = getRidOfNeg(detRec, n);
    }
    mRec = mRec % n;

    console.log("n: " + n);
    console.log("m:  " + m);
    console.log("mRec:  " + mRec);

    let modularInv = modularInverse(m, n);
    let matrixInv = inverseMatrix(key); //обратная матрица без умножения по модулю
    let modularInvRec = modularInverse(mRec, n);
    let matrixInvRec = inverseMatrix(keyRec); //обратная матрица 2 без умножения по модулю
    console.log('modularInv', modularInv);
    console.log('matrixInv', matrixInv);
    console.log('modularInvRec', modularInvRec);
    console.log('matrixInvRec', matrixInvRec);

    let res = multiplyMatrixMod(matrixInv, n);
    let keyMinusPervoy = multplyMatrixAndNum(modularInv, res);
    console.log('kvminuspervoy', keyMinusPervoy);
    console.log("matinv: " + res);
    let resRec = multiplyMatrixMod(matrixInvRec, n);
    let keyMinusPervoyRec = multplyMatrixAndNum(modularInvRec, resRec);
    console.log('kvminuspervoyRec', keyMinusPervoyRec);
    console.log("matinvRec: " + resRec);
    let j;

    let key1 = keyMinusPervoy;
    let key2 = keyMinusPervoyRec;

    for (let index = 0; index < cipher.length; index += 3) {
        let x = alphaTxt.indexOf(cipher[index]);
        let y = alphaTxt.indexOf(cipher[index + 1]);
        let z = alphaTxt.indexOf(cipher[index + 2]);

        console.log("3 Symbols:", [x, y, z]);

        if (index === 0) {
            j = multiplyMatrix(keyMinusPervoy, [x, y, z]);
        } else if (index === 3) {
            j = multiplyMatrix(keyMinusPervoyRec, [x, y, z]);
        } else if (index > 3) {
            let c = multiplyMatrix3x3(key1, key2);

            console.log(c);

            j = multiplyMatrix(c, [x, y, z]);

            console.log('index:', index, j);

            key1 = key2.slice();
            key2 = c.slice();
        }

        for (let i = 0; i < j.length; i++) {
            let a = j[i] % n;
            plain += alphaTxt[a];
        }
    }
    return plain;
}