const lowerReference = 'abcdefghijklmnopqrstuvwxyz';
const upperReference = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * @method isalpha
 * @param {String} str string to test
 * @return {Boolean} returns true if is a letter
 */
function isalpha(str) {
  return (/^[a-zA-Z]+$/).test(str);
}

/**
 * Applies Vigenere encryption to a phrase given a keyWord and a
 * numeric flag passed as a the third argument, when flag is
 * positive it ciphers, when negative it deciphers
 * @method process
 * @param {String} keyWord string to process
 * @param {String} phrase secret key
 * @param {Number} flag decides action
 * @return {String} result process output
 */

function process(keyWord, phrase, flag = 1) {
  // check if arguments are correct
  if (typeof keyWord !== 'string' || typeof phrase !== 'string') {
    throw new Error('vignere: key word and phrase must be strings');
  }

  // throw error if keyWord is not valid
  if (!isalpha(keyWord)) {
    throw new Error('vignere: key keyWord can only contain letters');
  }

  // pass key keyWord all to lower case
  keyWord = keyWord.toLowerCase();

  const phraselen = phrase.length;
  const wlen = keyWord.length;

  let i = 0,
    wi = 0,
    symbol,
    pos,
    result = '';

  for (; i < phraselen; i++) {
    pos = phrase[i];
    if (isalpha(pos)) {
      if (flag > 0) {
        console.log(`Txt pos ${i}:`, lowerReference.indexOf(pos.toLowerCase()));
        console.log(`   Key pos ${i}:`, lowerReference.indexOf(keyWord[wi]));
        symbol = lowerReference.indexOf(pos.toLowerCase()) + lowerReference.indexOf(keyWord[wi]);
        console.log(`      Res pos ${i}:`, symbol)
      } else {
        symbol = lowerReference.indexOf(pos.toLowerCase()) - lowerReference.indexOf(keyWord[wi]);
        symbol = symbol < 0 ? 26 + symbol : symbol;
      }
      symbol %= 26;
      // take cipher from lower or upper reference
      result = lowerReference.indexOf(pos) === -1 ? result + upperReference[symbol] : result + lowerReference[symbol];
      // reset keyword index when it exceeds keyword phrase length
      wi = wi + 1 === wlen ? 0 : wi + 1;
    } else {
      result += pos;
    }
  }

  return result;
}

function encrypt(keyWord, phrase) {
  return process(keyWord, phrase);
}

function decrypt(keyWord, phrase) {
  return process(keyWord, phrase, -1);
}

actionBtn.addEventListener("click", () => {
  if (actionBtn.innerHTML === "encrypt") {
    txtOut1.value = encrypt(key1.value, txtInput1.value);
    console.log(txtInput1.value);
  } else {
    txtOut1.value = decrypt(key1.value, txtInput1.value);
  }
});

actionBtnRec.addEventListener("click", () => {
  let selfText = txtInput2.value.slice(0, -1);
  let selfKey = key2.value + selfText.split(' ').join('');
  console.log(selfKey);
  
  if (actionBtnRec.innerHTML === "encrypt") {
    txtOut2.value = encrypt(selfKey, txtInput2.value);
    key2.value += selfText.split(' ').join('');
  } else {
    txtOut2.value = decrypt(key2.value, txtInput2.value);
  }
});

