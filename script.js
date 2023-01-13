// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.',
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

let rangeValueHTML = document.getElementById('rangeValue');
let lengthInput = document.getElementById('lengthOption');
let passwordLength = lengthInput.value;
rangeValueHTML.innerHTML = passwordLength;
lengthInput.oninput = function () {
  passwordLength = lengthInput.value;
  rangeValueHTML.innerHTML = passwordLength;
};
let lowercaseOption = document.getElementById('lowercaseOption');
let uppercaseOption = document.getElementById('uppercaseOption');
let numericOption = document.getElementById('numericOption');
let specialOption = document.getElementById('specialOption');

// create array to store user input
// throws error./
let userChoiceArray = [];
// Function to get user's password options from input
function getPasswordOptions() {
  // create array to loop from
  let options = [
    lowercaseOption,
    uppercaseOption,
    numericOption,
    specialOption,
  ];
  options.forEach(function (option) {
    option.addEventListener('change', function () {
      // dynamically adjust user input array values
      if (option.checked) {
        userChoiceArray.push(option.value);
      } else {
        userChoiceArray.splice(userChoiceArray.indexOf(option.value), 1);
      }
    });
  });
}
getPasswordOptions();
let passwordStr = '';
// Function for getting a random element from an array
function getRandom(userChoiceArray, passwordLength) {
  // Note: Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  // if (!userChoiceArray.length) {
  //   return 'Select at least one option';
  // }

  passwordStr = '';
  for (let i = 0; i < passwordLength; i++) {
    let characterIndex = Math.floor(Math.random() * userChoiceArray.length);
    let character = userChoiceArray[characterIndex];
    passwordStr += character;
  }
  return passwordStr;
}

// Function to generate password with user input
function generatePassword() {
  userChoiceArray = getPasswordOptions();
  passwordLength = document.getElementById('lengthOption').value;
  getRandom(userChoiceArray, passwordLength);
  return passwordStr;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  var password = generatePassword();
  var passwordHTML = document.querySelector('#password');

  passwordHTML.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// copy password
// https://www.30secondsofcode.org/articles/s/copy-text-to-clipboard-with-javascript
if (navigator && navigator.clipboard) {
  let copyButton = document.getElementById('copyButton');
  let password = document.querySelector('#password');

  copyButton.addEventListener(
    'click',
    (copyToClipboard = () => {
      navigator.clipboard.writeText(password.value);
    })
  );
} else {
  alert('Your browser does not support the Clipboard API');
}
