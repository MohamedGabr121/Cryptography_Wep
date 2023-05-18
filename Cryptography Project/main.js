var input = document.getElementById("txtInput").value;
var key = document.getElementById("txtKey").value;
function encrypt() {
  var ving =document.getElementById("vcg").value;
  var input = document.getElementById("txtInput").value;
  var key = document.getElementById("txtKey").value;

    if(ving == "Vigenere")
    {
        var output = vigenereCipher(input, key);
    }
    else if(ving == "Playfair"){
        var output = playfairEncrypt(input, key);
    }
    else if(ving == "Caesar"){
      var output = c_ciph();
      
      }
     

    document.getElementById("txtOutput").value = output;
}
function Decrypt() {
  var input = document.getElementById("txtInput").value;
  var key = document.getElementById("txtKey").value;
  var ving =document.getElementById("vcg").value;

    if(ving == "Vigenere")
    {
        var output = vigenereDecrypt(input, key);
    }
    else if(ving == "Playfair"){
        var output = playfairDecrypt(input, key);
    }
    else if(ving == "Caesar"){
      var output = CaesarDecrypt(input,key);
      }
     
    document.getElementById("txtOutput").value = output;
}
function Clear(){
 input = document.getElementById("txtInput").value="";
  key = document.getElementById("txtKey").value="";
}
function vigenereCipher(plaintext, key) {
 var ciphertext ="";
plaintext=plaintext.toUpperCase();
key=key.toUpperCase();
for(var i=0,j=0 ;i<plaintext.length;i++){
    var c=plaintext.charCodeAt(i);
    if(c<65 || c>90) continue;
        ciphertext+=String.fromCharCode((c+key.charCodeAt(j%key.length)-130)%26+65);
        j++;
}

    return ciphertext;
}
function vigenereDecrypt(ciphertext, key) {
    var plaintext = "";
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();
    for (var i = 0, j = 0; i < ciphertext.length; i++) {
      var c = ciphertext.charCodeAt(i);
      if (c < 65 || c > 90) continue;
      plaintext += String.fromCharCode((c - key.charCodeAt(j % key.length) + 26) % 26 + 65);
      j++;
    }
    return plaintext;
  }

  function playfairEncrypt(text, key) {
    // Removing all the spaces from the text
    text = text.replace(/ /g, '');
    // Converting the text to uppercase
    text = text.toUpperCase();
    // Converting the key to uppercas
    // Creating a 5x5 matrix to hold the key
    let matrix = [];
    // Adding the key to the matrix
    for(let i=0; i<key.length; i++) {
      let char = key.charAt(i);
      if(matrix.indexOf(char) == -1 && char != 'J') {
        matrix.push(char);
      }
    }
    // Adding the remaining characters to the matrix
    for(let i=65; i<=90; i++) {
      let char = String.fromCharCode(i);
      if(matrix.indexOf(char) == -1 && char != 'J') {
        matrix.push(char);
      }
    }
    // Dividing the text into pairs of two characters
    let pairs = [];
    for(let i=0; i<text.length; i+=2) {
      if(i == text.length - 1) {
        pairs.push(text.charAt(i) + 'X');
      }
      else if(text.charAt(i) == text.charAt(i+1)) {
        pairs.push(text.charAt(i) + 'X');
        i--;
      }
      else {
        pairs.push(text.charAt(i) + text.charAt(i+1));
      }
    }
    // Encrypting the text
    let cipher = '';
    for(let i=0; i<pairs.length; i++) {
      let pair = pairs[i];
      let char1 = pair.charAt(0);
      let char2 = pair.charAt(1);
      
      let index1 = matrix.indexOf(char1);
      let row1 = Math.floor(index1/5);
      let col1 = index1 % 5;
      
      let index2 = matrix.indexOf(char2);
      let row2 = Math.floor(index2/5);
      let col2 = index2 % 5;
      
      if(row1 == row2) {
        cipher += matrix[row1*5 + (col1+1)%5];
        cipher += matrix[row2*5 + (col2+1)%5];
      }
      else if(col1 == col2) {
        cipher += matrix[((row1+1)%5)*5 + col1];
        cipher += matrix[((row2+1)%5)*5 + col2];
      }
      else {
        cipher += matrix[row1*5 + col2];
        cipher += matrix[row2*5 + col1];
      }
    }
    
    return cipher;
  }
function playfairDecrypt(cipher, key) {
    // Removing all the spaces from the text
    cipher = cipher.replace(/ /g, '');
    // Converting the key to uppercase
    key = key.toUpperCase();
    // Creating a 5x5 matrix to hold the key
    let matrix = [];
    // Adding the key to the matrix
    for(let i=0; i<key.length; i++) {
      let char = key.charAt(i);
      if(matrix.indexOf(char) == -1 && char != 'J') {
        matrix.push(char);
      }
    }
    // Adding the remaining characters to the matrix
    for(let i=65; i<=90; i++) {
      let char = String.fromCharCode(i);
      if(matrix.indexOf(char) == -1 && char != 'J') {
        matrix.push(char);
      }
    }
    // Dividing the cipher into pairs of two characters
    let pairs = [];
    for(let i=0; i<cipher.length; i+=2) {
      pairs.push(cipher.charAt(i) + cipher.charAt(i+1));
    }
    // Decrypting the cipher
    let text = '';
    for(let i=0; i<pairs.length; i++) {
      let pair = pairs[i];
      let char1 = pair.charAt(0);
      let char2 = pair.charAt(1);
      let index1 = matrix.indexOf(char1);
      let row1 = Math.floor(index1/5);
      let col1 = index1 % 5;
      let index2 = matrix.indexOf(char2);
      let row2 = Math.floor(index2/5);
      let col2 = index2 % 5;
      if(row1 == row2) {
        text += matrix[row1*5 + (col1+4)%5];
        text += matrix[row2*5 + (col2+4)%5];
      }
      else if(col1 == col2) {
        text += matrix[((row1+4)%5)*5 + col1];
        text += matrix[((row2+4)%5)*5 + col2];
      }
      else {
        text += matrix[row1*5 + col2];
        text += matrix[row2*5 + col1];
      }
    }
    // Removing any trailing 'X' characters that were added during encryption
    if(text.charAt(text.length-1) == 'X') {
      text = text.substring(0, text.length-1);
    }
    return text;
}
function c_ciph(){
  var f = document.getElementById("txtKey").value;
  var x = document.getElementById("txtInput").value;
  var key1 = Number(f)
  // console.log(key1);
  var result='';
  for (var i = 0, len = x.length; i < len; i++) {
    if (x[i] == x[i].toUpperCase()){
      var a = x[i].charCodeAt(0);
      var e = (((a - 65 + key1) % 26) + 97);
      result = result + String.fromCharCode(e).toUpperCase();
    }
    else if (x[i] == x[i].toLowerCase()){
      var a = x[i].charCodeAt(0);
      var e = (((a - 97 + key1) % 26) + 97);
      result = result + String.fromCharCode(e);
    }
    else {
      result = result + x[i];
    }
  }
  return result ;
}
function CaesarDecrypt(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    if (char.match(/[a-z]/i)) {
      let code = text.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 - key + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 - key + 26) % 26) + 97);
      }
    }
    result += char;
  }
  return result;
}



