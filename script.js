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

// get user input options
let rangeValueHTML = document.getElementById('rangeValue');
let lengthInput = document.getElementById('lengthOption');
let passwordLength = lengthInput.value;
rangeValueHTML.innerHTML = passwordLength;
// display selected character value
lengthInput.oninput = function () {
  passwordLength = lengthInput.value;
  rangeValueHTML.innerHTML = passwordLength;
  // return updated value
  return passwordLength;
};
let lowercaseOption = document.getElementById('lowercaseOption');
let uppercaseOption = document.getElementById('uppercaseOption');
let numericOption = document.getElementById('numericOption');
let specialOption = document.getElementById('specialOption');

// create array to store user input
let userChoiceArray = [];
// Function to get user's password options from input
function getPasswordOptions() {
  // create array of objects for html option ID and corresponding character array
  let options = [
    { optionId: lowercaseOption, charArray: lowerCasedCharacters },
    { optionId: uppercaseOption, charArray: upperCasedCharacters },
    { optionId: numericOption, charArray: numericCharacters },
    { optionId: specialOption, charArray: specialCharacters },
  ];
  options.forEach(function (option) {
    // update: I was getting 'on' values in the old array (using just options.value)
    // method with object referencing DOM checkbox id and pairing it with the array of characters allows to get the correct userChoiceArray
    let checkbox = option.optionId;
    if (checkbox.checked) {
      userChoiceArray = userChoiceArray.concat(option.charArray);
    }
    // dynamically adjust user input array values
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        userChoiceArray = userChoiceArray.concat(option.charArray);
      } else {
        // filter array to only include checked checkboxes corresponding arrays and remove everything that isn't matching that corresponding array characters

        // classic function declaration
        // userChoiceArray = userChoiceArray.filter(function (char) {
        //   return !option.charArray.includes(char);
        // });

        // arrow function
        userChoiceArray = userChoiceArray.filter(
          (char) => !option.charArray.includes(char)
        );
      }
    });
  });
  // return to update the value
  return userChoiceArray;
}
// - update choice array values - this way it's dynamically updated when user
// makes changes before password is generated again
userChoiceArray = getPasswordOptions();
// Fisher-Yates randomisation algorithm
// https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
function fisherYatesRandomize(arr) {
  // Start from the last element and swap
  // one by one. We don't need to run for
  // the first element that's why i > 0
  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i inclusive
    let j = Math.floor(Math.random() * (i + 1));
    // Swap arr[i] with the element
    // at random index
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
// initialise password variable
let password = '';
// Function for getting a random element from an array
function getRandom() {
  // reset password for each generate round
  password = '';
  fisherYatesRandomize(userChoiceArray);
  for (let i = 0; i < passwordLength; i++) {
    let character = userChoiceArray[i];
    password += character;
  }
}

// initialise passwordHTML variable to write error messsage
let passwordHTML = document.getElementById('password');
// Function to generate password with user input
function generatePassword() {
  getRandom(userChoiceArray, passwordLength);
  return password;
}

// Get references to the #generate element
const generateBtn = document.getElementById('generate');

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  // show error message when no checkboxes selected
  if (userChoiceArray.length === 0) {
    passwordHTML.value =
      'Please, select at least one option to generate a password';
    passwordHTML.classList.add('error-message');
    return;
  } else {
    let password = generatePassword();
    passwordHTML.classList.remove('error-message');
    passwordHTML.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// copy password
if (navigator && navigator.clipboard) {
  let copyButton = document.getElementById('copyButton');
  let password = document.querySelector('#password');

  copyButton.addEventListener(
    'click',
    (copyToClipboard = () => {
      // little animation on icon to give a feedback on a copy
      copyButton.classList.add('copied');
      setTimeout(() => copyButton.classList.remove('copied'), 500);

      navigator.clipboard.writeText(password.value);
    })
  );
} else {
  alert('Your browser does not support the Clipboard API');
}

// NOTES
// Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
// Will not implement it here, as that would not satisfy many challenge criterias - such as using given characters array and user input options.
