onload = () => {
    let cipher1 = new aCipher('src1', 'dist1');
    let cipher2 = new aRCipher('src2', 'dist2');

    document.getElementById('encrypt1').onclick = () => {
        cipher1.encrypt();
    }
    document.getElementById('decrypt1').onclick = () => {
        cipher1.decrypt();
    }

    document.getElementById('encrypt2').onclick = () => {
        cipher2.encrypt();
    }
    document.getElementById('decrypt2').onclick = () => {
        cipher2.decrypt();
    }
};

function aCipher(src, dist) {
    this.src = document.getElementById(src);
    this.dst = document.getElementById(dist);
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz ';

    this.aInput = document.getElementById('A');
    this.bInput = document.getElementById('B');
    this.symbols = [];

    for (let i = 0; i < this.alphabet.length; i++) {
        this.symbols.push(this.alphabet.charAt(i));
    }

    this.encrypt = () => {
        let errorDiv = document.getElementById('error1');
        let a = parseInt(this.aInput.value);
        let b = parseInt(this.bInput.value);

        if (!this.defence(b, a)) {
            return;
        } else errorDiv.style.display = 'none';

        let n = this.alphabet.length;
        let text = this.src.value.toLowerCase();
        let encryptedText = '';

        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i);
            let position = this.alphabet.indexOf(c);


            if (position < 0) {
                encryptedText += c;
                continue;
            }

            let newPosition = (a * parseInt(position) + b) % n;
            let newSymbol = this.alphabet.charAt(newPosition);

            encryptedText += newSymbol;
        }

        this.dst.value = encryptedText;
    };

    this.decrypt = () => {
        let errorDiv = document.getElementById('error1');
        let a = parseInt(this.aInput.value);
        let b = parseInt(this.bInput.value);

        if (!this.defence(b, a)) {
            return;
        } else errorDiv.style.display = 'none';

        let n = this.alphabet.length;
        let alfaInvers = calcInverse(a, n);
        let text = this.dst.value.toLowerCase();
        let decryptedText = '';
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i);
            let position = this.alphabet.indexOf(c);

            if (position < 0) {
                decryptedText += c;
                continue;
            }

            let newPosition = (alfaInvers * (parseInt(position) + n - b)) % n;
            let newSymbol = this.alphabet.charAt(newPosition);
            decryptedText += newSymbol;
        }

        this.src.value = decryptedText;
    };

    this.defence = function (b, a) {

        let errorDiv = document.getElementById('error1');

        if (b != parseInt(b) || a != parseInt(a)) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'A и K должны быть целыми числами!';
            return false;
        }

        if (a <= 0 || b < 0) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'A и B не могут быть отрицательными! <br> A не может быть равен нулю!';
            return false;
        }

        if (isCoprime(a, b) == 1)
            return true;
        else {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'Числа не взаимно простые!';
            return false;
        }
    };
}

function aRCipher(src, dist) {
    this.src = document.getElementById(src);
    this.dst = document.getElementById(dist);
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';

    this.a1Input = document.getElementById('A1');
    this.b1Input = document.getElementById('B1');
    this.a2Input = document.getElementById('A2');
    this.b2Input = document.getElementById('B2');
    this.symbols = [];

    for (let i = 0; i < this.alphabet.length; i++) {
        this.symbols.push(this.alphabet.charAt(i));
    }

    this.encrypt = () => {
        let errorDiv = document.getElementById('error2');

        let a1 = parseInt(this.a1Input.value);
        let b1 = parseInt(this.b1Input.value);
        let a2 = parseInt(this.a2Input.value);
        let b2 = parseInt(this.b2Input.value);
        
        if (!this.defence(b1, a1) || !this.defence(b2, a2)) {
            return;
        } else errorDiv.style.display = 'none';

        let n = this.alphabet.length;
        let text = this.src.value.toLowerCase();
        let encryptedText = '';
        let count = 0;
        let a, b;

        for (let i = 0; i < text.length; i++) {

            if (count === 0) {
                a = a1;
                b = b1;
            }

            if (count === 1) {
                a = a2;
                b = b2;
            }

            if (count > 1) {
                a = (a1 * a2) % n;
                b = (b1 + b2) % n;
                b1 = b2;
                a1 = a2;
                b2 = b;
                a2 = a;
            }

            let c = text.charAt(i);
            let position = this.alphabet.indexOf(c);

            if (position < 0) {
                encryptedText += c;
                continue;
            }

            let newPosition = (a * parseInt(position) + b) % n;
            let newSymbol = this.alphabet.charAt(newPosition);

            encryptedText += newSymbol;
            count++;
        }

        this.dst.value = encryptedText;
    };

    this.decrypt = () => {
        let errorDiv = document.getElementById('error2');

        let a1 = parseInt(this.a1Input.value);
        let b1 = parseInt(this.b1Input.value);
        let a2 = parseInt(this.a2Input.value);
        let b2 = parseInt(this.b2Input.value);

        if (!this.defence(b1, a1) || !this.defence(b2, a2)) {
            return;
        } else errorDiv.style.display = 'none';

        let n = this.alphabet.length;
        let text = this.dst.value.toLowerCase();
        let decryptedText = '';
        let count = 0;

        for (let i = 0; i < text.length; i++) {

            if (count === 0) {
                a = a1;
                b = b1;
            }

            if (count === 1) {
                a = a2;
                b = b2;
            }

            if (count > 1) {
                a = (a1 * a2) % n;
                b = (b1 + b2) % n;
                b1 = b2;
                a1 = a2;
                b2 = b;
                a2 = a;
            }

            let alfaInvers = calcInverse(a, n);
            let c = text.charAt(i);
            let position = this.alphabet.indexOf(c);


            if (position < 0) {
                decryptedText += c;
                continue;
            }

            let newPosition = (alfaInvers * (parseInt(position) - b)) % n;

            if (newPosition < 0) {
                newPosition += 26;
            }

            let newSymbol = this.alphabet.charAt(newPosition);

            decryptedText += newSymbol;
            count++;
        }

        this.dst.value = decryptedText;
    };

    this.defence = function (b, a) {

        let errorDiv = document.getElementById('error2');

        if (b != parseInt(b) || a != parseInt(a)) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'A и K должны быть целыми числами!';
            return false;
        }

        if (a <= 0 || b < 0) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'A и B не могут быть отрицательными! <br> A не может быть равен нулю!';
            return false;
        }

        if (isCoprime(a, b) == 1)
            return true;
        else {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'Числа не взаимно простые!';
            return false;
        }
    }
}

function calcInverse(a, n) {

    for (let i = 1; i < n; i++) {

        if ((i * a) % n == 1)
            return i;
    }
    return 1;
}

function isCoprime(a, b) {
    return b ? isCoprime(b, a % b) : a;
}

setInterval(() => {
    let errorDiv = document.getElementById('error1');
    errorDiv.style.display = 'none';
}, 5000);

setInterval(() => {
    let errorDiv = document.getElementById('error2');
    errorDiv.style.display = 'none';
}, 5000);


// for (let i = 0; i < alphabet.length; i++) {

//     console.log(alphabet[i] + ' === ' + i)
// }
