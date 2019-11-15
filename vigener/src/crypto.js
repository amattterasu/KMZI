// Криптоанализ шифра Виженера 

// Получить какой-то символ с какого-то символа
function getEveryChar(txt, k) {
  let plain = '';

  for (let i = k - 1; i < txt.length; i += k) {

    if (isalpha(txt[i])) {
      plain += txt[i];
    }
  }

  return plain;
}

// Сдвиг текста слево на размер возможного ключа
function getShift(textClean, keyLen) {

  let result = '';
  let temp = '';

  for (let i = 0; i < textClean.length; i++) {

    if (i < keyLen) {
      temp += textClean[i];
      continue;
    }
    else {
      result += textClean[i];
    }
  }

  return result + temp;
}

// Подсчет индекса совпадений
function getIndexMatch(textClean, txtShift) {
  let count = 0;

  for (let i = 0; i <= txtShift.length; i++) {

    if (txtShift[i] == textClean[i]) {
      count++;
    }
  }
  return count / txtShift.length;
}

// Получить длину ключа
function getKeyLen() {

  // Удалить лишние знаки и пробелы в шифротексте
  let textClean = getEveryChar(txtInput1.value.toLowerCase().split(' ').join(''), 1);
  let temp, arr = [], j = 0;

  //Получаю индексы, передавая возможные ключи для сдвига, max length of key = 100
  for (let i = 1; i < 100; i++) {
    temp = getIndexMatch(textClean, getShift(textClean, i));

    if (temp > 0.0667) {
      arr[j] = i;
      j++;
    }

  }
  return arr[1] - arr[0];
}

// Разбиваем шифротекст на на группы
// групп столько, сколько размер ключа 
function getGroupOfCipher() {
  let textClean = getEveryChar(txtInput1.value.toLowerCase().split(' ').join(''), 1);
  let kLen = getKeyLen();
  let sub = '';
  let arrText = [];

  for (let i = 0; i < kLen; i++) {
    sub = '';

    for (let j = i; j < textClean.length; j += kLen) {
      sub += textClean[j];
    }

    arrText[i] = sub;
  }

  return arrText;
}

// Подсчет количества букв в группе
function getCountNumOfLetters() {
  let group = getGroupOfCipher();
  let storeGlobal = [];
  let storeSub = [];
  let count = 0;

  for(let i = 0; i < group.length; i++) {
    let temp = group[i];

    for (let j = 0; j < lowerReference.length; j++) {
      count = 0;

      for (let k = 0; k < temp.length; k++) {
        
        if (temp[k] == lowerReference[j]) {
          count++;
        }
      }
      storeSub[j] = count;
      
    }
    storeGlobal[i] = storeSub.slice();
  }

  return storeGlobal;
}

//Поиск максимального элемента в массиве
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// Получаю ключ шифрования
function getKey() {
  let storeGlobal = getCountNumOfLetters();
  let tmp = [];
  let key = '';
  //Поиск индексов, которым присвоен максимальный элемент
  for(let i = 0; i < storeGlobal.length; i++) {
    tmp[i] = storeGlobal[i].indexOf(getMaxOfArray(storeGlobal[i]));
  }

  let k = tmp.map((item) => {
   let t = item - 4;

   return (item - 4) > 0 ? (item - 4) : (item + 22);
  });
  console.log(k);
  k.forEach((item) => {

    if(item == 26){
      key += 'a';
    }
    else {
      key += lowerReference[item]
    }

  });
  return key;
}
