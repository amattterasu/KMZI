function getDeterminant(matrix) {
    let x = matrix[0][0] * ((matrix[1][1] * matrix[2][2]) - (matrix[2][1] * matrix[1][2]));
    let y = matrix[0][1] * ((matrix[1][0] * matrix[2][2]) - (matrix[2][0] * matrix[1][2]));
    let z = matrix[0][2] * ((matrix[1][0] * matrix[2][1]) - (matrix[2][0] * matrix[1][1]));
    return (x - y + z);
}

function checkRelativelyPrime() {
    let n = 29;

    let det = parseInt(getDeterminant(key));
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

let inputMatrix = document.getElementsByClassName("inputMatrix")[0].childNodes;
let btnNext = document.getElementById("btnNext");
const containers = document.getElementsByClassName('container');
const alphaTxt = "abcdefghijklmnopqrstuvwxyz .,";
let key = [
    [],
    [],
    []
];

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

        console.log("relatively prime");

        containers[0].classList.add("hide");
        containers[1].classList.remove("hide");
    } else {
        console.log("not relatively prime");
    }
});

//start is here
actionBtn.addEventListener("click", () => {
    if (actionBtn.innerHTML === "encrypt") {
        txt2.value = encrypt(txt1.value);
    } else {
        console.log(txt1.value);

        //txt2.value = decrypt(txt1.value);
    }
});

function encrypt(plain) {
    let cipher = "";
    let n = 29
    if (alphaTxt.indexOf(" ") == -1) {
        plain = plain.split(" ").join("");
    }

    for (let index = 0; index < plain.length; index += 3) {
        let x = alphaTxt.indexOf(plain[index]);
        let y, z;

        if (index + 1 == plain.length) {
            y = 0;
            z = 1;
        } else {
            y = alphaTxt.indexOf(plain[index + 1]);
            if (index + 2 == plain.length) {
                z = 0;
            } else {
                z = alphaTxt.indexOf(plain[index + 2]);
            }
        }

        let res = multiplyMatrix(key, [x, y, z]);

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