let inputMatrix = document.getElementsByClassName("inputMatrix")[0].childNodes;
let btnNext = document.getElementById("btnNext");
const containers = document.getElementsByClassName('container');
let tabsDiv = document.getElementsByClassName("tabsDiv")[0].childNodes;
let titlePlain = document.getElementById('titlePlain');
let titleCipher = document.getElementById('titleCipher');
const alphaTxt = "abcdefghijklmnopqrstuvwxyz .,";
let key = [
    [],
    [],
    []
];
let det;
const n = 29;

function getDeterminant(matrix) {
    let x = matrix[0][0] * ((matrix[1][1] * matrix[2][2]) - (matrix[2][1] * matrix[1][2]));
    let y = matrix[0][1] * ((matrix[1][0] * matrix[2][2]) - (matrix[2][0] * matrix[1][2]));
    let z = matrix[0][2] * ((matrix[1][0] * matrix[2][1]) - (matrix[2][0] * matrix[1][1]));
    return (x - y + z);
}

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

function gcd(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);

    while (y) {
        let t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function multiplyMatrix(a, b) {
    let result = [];

    for (let i = 0; i < a.length; i++) {
        result[i] = 0;
        
        for (let j = 0; j < a[i].length; j++) {
            result[i] += b[j] * a[i][j];
        }
    }
    return result;
}

function getRidOfNeg(x, n) {

    while (x < 0) {
        x += n;
    }
    return x;
}

function modularInverse(m, n) {
    let x = m;
    let y = n;
    let divs = [];
    let adds = [];
    let result;

    if (y > x) {
        let i = 1;

        while (x != 0) {
            divs[i] = Math.floor(y / x);
            let temp = x;
            x = y % x;
            y = temp;
            i++;
        }

        let len = divs.length;
        adds[len - 1] = 0;
        adds[len - 2] = 1;

        for (let index = len - 2; index > 0; index--) {
            adds[index - 1] = (divs[index] * adds[index]) + adds[index + 1];
        }

        if ((adds[0] * m) > (adds[1] * n)) {
            result = adds[0];
        } else {
            result = n - adds[0];
        }
    }

    return result;
}

function inverseMatrix(matrix) {
    let minorMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            minorMatrix[i][j] = (matrix[(i + 1) % 3][(j + 1) % 3] * matrix[(i + 2) % 3][(j + 2) % 3]) - (matrix[(i + 1) % 3][(j + 2) % 3] * matrix[(i + 2) % 3][(j + 1) % 3]);
        }
    }

    let adjointMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (let i = 0; i < minorMatrix.length; i++) {
        for (let j = 0; j < minorMatrix[i].length; j++) {
            adjointMatrix[j][i] = minorMatrix[i][j];
        }
    }
    return adjointMatrix;
}

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
        console.log(txt1.value);
        txt2.value = decrypt(txt1.value.toLowerCase());
    }
});

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
        let res = multiplyMatrix(key, [x, y, z]);
        console.log(res);

        for (let i = 0; i < res.length; i++) {

            if (res[i] < 0) {
                res[i] = getRidOfNeg(res[i], n);
            }
            let j = res[i] % n;
            cipher += alphaTxt[j];
        }
    }
    return cipher;
}

function decrypt(cipher) {
    let plain = "";
    let m = det;

    if (det < 0) {
        m = getRidOfNeg(det, n);
    }
    m = m % n;

    console.log("n: " + n);
    console.log("m:  " + m);

    let modularInv = modularInverse(m, n);
    let matrixInv = inverseMatrix(key);
    console.log(modularInv);

    for (let index = 0; index < cipher.length; index += 3) {
        let x = alphaTxt.indexOf(cipher[index]);
        let y = alphaTxt.indexOf(cipher[index + 1]);
        let z = alphaTxt.indexOf(cipher[index + 2]);

        console.log("dec: " + [x, y, z]);
        let res = multiplyMatrix(matrixInv, [x, y, z]);
        console.log("matinv: " + res);

        for (let i = 0; i < res.length; i++) {
            res[i] *= modularInv;
            console.log("res[" + i + "]:  " + res[i]);

            if (res[i] < 0) {
                res[i] = getRidOfNeg(res[i], n);
            }

            let j = res[i] % n;
            plain += alphaTxt[j];
        }
    }
    return plain;
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

// ALERT
let alertContainer = document.getElementById("alertContainer");
let alertIcon = document.getElementById("alertIcon");
let alertMessage = document.getElementById("alertMessage");
let alert = document.getElementById('alert');

function alertFunc(type, message) {

    if (type === 0) {
        alertIcon.classList.add('fa-times');
        alertIcon.classList.add('text-danger');
        alert.style.borderTop = "50px solid orange";
    } else if (type === 1) {
        alertIcon.classList.add('fa-check');
        alertIcon.classList.add('text-success');
        alert.style.borderTop = "50px solid lightgreen";
    }
    alertMessage.innerHTML = message;
    alertContainer.classList.remove('hide');
    alert.classList.add("show-animation");

    setTimeout(() => {
        alertContainer.classList.add('hide-animation');
    }, 2000);

    setTimeout(() => {
        alertContainer.classList.add('hide');
        alert.classList.remove("show-animation");
        alertContainer.classList.remove('hide-animation');
        alertContainer.style.opacity = '1';
        alertIcon.className = '';
    }, 3000);
}