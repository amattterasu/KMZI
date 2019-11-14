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
  let textClean = getEveryChar(txtOut1.value.toLowerCase().split(' ').join(''), 1);
  let temp, arr = [], j = 0;

  //Получаю индексы, передавая возможные ключи для сдвига
  for(let i = 1; i < 102; i++) {
   temp = getIndexMatch(textClean, getShift(textClean, i));
    
   if (temp > 0.0667) {
    arr[j] = i;
    j++;
   }

  }
  return arr[1] - arr[0];
}

