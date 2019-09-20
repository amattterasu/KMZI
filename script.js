onload = () => {
    let cipher = new aCipher('src1', 'dist1');

    document.getElementById('encrypt1').onclick = () => {
        cipher.encrypt();
    }
    document.getElementById('decrypt1').onclick = () => {
        cipher.decrypt();
    }
};

function aCipher(src, dist) {
    this.src = document.getElementById(src);
    this.dst = document.getElementById(dist);
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';

    this.aInput = document.getElementById('A1');
    this.bInput = document.getElementById('B1');
    this.symbols = [];

    for (let i = 0; i < this.alphabet.length; i++) {
        this.symbols.push(this.alphabet.charAt(i));
    }

    this.encrypt = () => {
        let errorDiv = document.getElementById('error');
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
        let errorDiv = document.getElementById('error');
        let a = parseInt(this.aInput.value);
        let b = parseInt(this.bInput.value);

        if (!this.defence(b, a)) {
            return;
        } else errorDiv.style.display = 'none';

        let n = this.alphabet.length;
        let alfaInvers = this.calcInverse(a, n);
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

    this.calcInverse = (a, n) => {

        for (let i = 1; i < n; i++) {

            if ((i * a) % n == 1)
                return i;
        }
        return 1;
    };

    this.defence = function (b, a) {

        let errorDiv = document.getElementById('error');

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

function isCoprime (a, b) {
    return b ? isCoprime(b, a % b) : a;
}

setInterval(() => {
    let errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
}, 5000);