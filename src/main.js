let hill = document.getElementById('hill');
let rechill = document.getElementById('rechill');
const panel = document.getElementsByClassName('panel')[0].childNodes;
let btnNextRec = document.getElementById("btnNextRec");
let info = document.getElementById('info');
const alphaTxt = "abcdefghijklmnopqrstuvwxyz .,";
let det, detRec;

hill.addEventListener("click", () => {
    containers[2].classList.add("hide");
    panel[1].classList.add('target');
    panel[3].classList.remove('target');
    btnNextRec.classList.add('hide');
    btnNext.classList.remove('hide');
    info.classList.remove('hide');
});

rechill.addEventListener("click", () => {
    containers[2].classList.remove("hide");
    panel[1].classList.remove('target');
    panel[3].classList.add('target');
    btnNextRec.classList.remove('hide')
    btnNext.classList.add('hide');
    info.classList.add('hide');
});

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

function getDeterminant(matrix) {
    let x = matrix[0][0] * ((matrix[1][1] * matrix[2][2]) - (matrix[2][1] * matrix[1][2]));
    let y = matrix[0][1] * ((matrix[1][0] * matrix[2][2]) - (matrix[2][0] * matrix[1][2]));
    let z = matrix[0][2] * ((matrix[1][0] * matrix[2][1]) - (matrix[2][0] * matrix[1][1]));
    return (x - y + z);
}

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