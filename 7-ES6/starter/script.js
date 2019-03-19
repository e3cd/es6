//variables declared in es5 are function scoped, variables declared in es6 are block scoped; block scoped is all the code wrapped between the curly braces

function driversLicence6(passedTest) {
  if (passedTest) {
    let firstName = "John";
    const yearOfBirth = 1999;

    /*var firstName = 'John';
        var yearOfBirth = 1999;
        */
  }

  console.log(firstName + ", born in ");
}

///////////////////////BLOCKS AND IIFES///////////////////

//BLOCK
// {
//   const a = 1;
//   let b = 2;
// }

// console.log(a + b);

///////////////////////Arrow functions///////////////////

/*
const years = [190, 1954, 10293, 0923, 123];

const ages6 = years.map(el => {
  2016 - el;
});

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
*/

//es5

// var box5 = {
//   color: "green",
//   position: 3,
//   clickMe: function() {
//     var self = this;
//     document.querySelector(
//       ".green".addEventListener("click", function() {
//         var str =
//           "This is box number " + self.position + " and it is " + self.color;
//         alert(str);
//       })
//     );
//   }
// };

//es6

/*
const box5 = {
  color: "green",
  position: 3,
  clickMe: function() {
    document.querySelector(".green").addEventListener("click", () => {
      //this function shares the this with the clickMe function and points to the object, therefore we can use this in this context using es6
      var str =
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  }
};

box5.clickMe();
*/

function Person(name) {
  this.name = name;
}

Person.prototype.myfriends5 = function(friends) {
  var arr = friends.map(
    function(el) {
      return this.name + " is friends with " + el;
    }.bind(this)
  );
  console.log(arr);
};

var friends = ["bob", "jane", "mark"];
new Person("John").myfriends5(friends);

//es6

Person.prototype.myfriends6 = friends => {
  var arr = friends.map(el => {
    `${this.name} is friends with ${el}`;
  });
  console.log(arr);
};

var friends = ["bob", "jane", "mark"];
new Person("John").myfriends5(friends);

///////////////////////DESTRUCTURING///////////////////

/*
const [name, year] = ["John", 26];
console.log(name);
console.log(age);

const obj = {
  firstName: "John",
  lastName: "Smith"
};

const { firstName, lastName } = obj;

function calcAgeRetirement(year) {
  const age = new Date().getFullYear - year;
  return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1990);
*/
///////////////////////ARRAYS///////////////////

const boxes = document.querySelectorAll(".box"); //returns a nodelist

//es5 hack to convert nodelist to array and convert background color to blue
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(curr) {
  curr.style.backgroundColor = "blue";
});

//es6 -- use Array.from to convert boxes nodelist into boxesarr6 array
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(curr => {
  curr.getElementsByClassName.backgroundColor = "blue";
});

//ES5
/*
for (var i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === "box blue") {
    continue; //skip this iteration of the loop and continue
  }

  boxesArr5[i].textContent = "I changed to blue!";
}
*/

//ES6
//for of loop
for (const el of boxesArr6) {
  if (el.className.includes("blue")) {
    continue;
  }
  el.textContent = "I changed to blue!";
}

//findindex array method
let ages = [12, 123, 124, 424, 234, 234, 123];

console.log(ages.findIndex(el => el >= 18));
console.log(ages.find(el => el >= 18));

///////////////////////SPREAD OPERATOR///////////////////

function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addFourAges(12, 123, 123, 123);
console.log(sum1);

//es5

// var ages = [12, 3, 4, 44, 24];
// var sum2 = addFourAges.apply(null, ages); //using apply to apply the function

//es6 using spread operator

const sum3 = addFourAges(...ages);

const familySmith = ["John", "Jane", "Mark"];
const familyMiller = ["mary", "bob", "ann"];
const bigFamily = [...familyMiller, ...familySmith];

//change all h1s into purple using spread operator

const h = document.querySelector("h1");
// const boxes = document.querySelectorAll(".box");
const all = [h, ...boxes]; //nodelist

//convert to array
Array.from(all).forEach(el => (el.style.color = "purple"));

///////////////////////REST PARAMETERS///////////////////

//es6

/*
function isFullAge6(...years) {
  years.forEach(() => console.log(2016 - el >= 18));
}

isFullAge6(1990, 1999, 1965);
*/

///////////////////////CLASSES///////////////////

//ES5 function declaration

var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear - this.yearOfBirth;
  console.log(age);
};

var john5 = new Person5("John", 1990, "teacher");

//ES6 class declaration -- classes are not hoisted therefore we ened to declare it first before we can use its code

class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  //add method to class
  calculateAge() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
  }

  static greeting() {
    console.log("Hey there!");
  }
}

const john6 = new Person6("John", 1990, "teacher");

///////////////////////CLASSES AND SUBCLASSES///////////////////

//ES5 SUPER CLASS

var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
};

//athlete sub class
var athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
  //call super class -- for the person name, yearOfbIRTH and job to be set onto the new athlete object,  need to call the person constructor function and the this keyword will be set to the new object
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
};

athlete5.prototype = Object.create(Person5.prototype);

athlete5.prototype.wonMedal = function() {
  this.medals++;
  console.log(this.medals);
};

var johnAthlete5 = new athlete5("John", 1990, "swimmer", 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

//////////////////ES6 SUBCLASSES

class Person7 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  //add method to class
  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }
}

class Athlete7 extends Person7 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }

  wonMedal() {
    this.medals++;
    console.log(this.medals);
  }
}

const johnAthlete7 = new Athlete7("John", 1995, "swimmer", 3, 10);

johnAthlete7.wonMedal();
johnAthlete7.calculateAge();

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Parks {
  constructor(name, buildYear, trees, sqrKm) {
    this.name = name;
    this.buildYear = buildYear;
    this.trees = trees;
    this.sqrKm = sqrKm;
  }

  calcAge() {
    const now = new Date().getFullYear();
    const age = now - this.buildYear;
    return age;
  }

  calcTD(trees, sqrKm) {
    const tD = this.trees * this.sqrKm;
    return tD;
  }
}

class Streets extends Parks {
  constructor(name, buildYear, length, size) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }
}

console.log("----PARKS REPORT----");

const green = new Parks("Green Park", 1959, 860, 0.8);
const national = new Parks("National Park", 1929, 1200, 1);
const oak = new Parks("Oak Park", 1955, 949, 0.4);

const allParks = [green, national, oak];

let sum = 0;
for (let el of allParks) {
  var age = el.calcAge();
  sum = sum + age;
  var avAge = Math.floor(sum / 3);
}

console.log(
  `Our ${allParks.length} parks have an average age of ${avAge} years.`
);

allParks.forEach(el =>
  console.log(
    `${el.name} has a tree density of ${Math.floor(
      el.calcTD()
    )} trees per square km.`
  )
);

for (const el of allParks) {
  if (el.trees >= 1000) {
    console.log(`${el.name} has more than 1000 trees.`);
  }
}

console.log("----STREETS REPORT----");

const eG = new Streets("Evergreen street", 2008, 1, "small");
const fStr = new Streets("4th Street", 2015, 4);
const oE = new Streets("Ocean Avenue", 1999, 6, "big");
const sSBlvrd = new Streets("Sunset Boulevard", 1982, 10, "huge");
const allStreets = [eG, fStr, oE, sSBlvrd];

var sum2 = 0;
for (const el of allStreets) {
  sum2 = sum2 + el.length;
  var avLength = sum2 / 4;
}

console.log(
  `Our ${
    allStreets.length
  } streets have a total length of ${sum2} km, with an average of ${avLength} km.`
);

// for (let el of allStreets) {
//   switch (el.size) {
//     case "small":
//       console.log(
//         `${el.name}, built in ${el.buildYear}, is a ${el.size} street.`
//       );
//       break;
//     case "big":
//       console.log(
//         `${el.name}, built in ${el.buildYear}, is a ${el.size} street.`
//       );
//       break;
//     case "huge":
//       console.log(
//         `${el.name}, built in ${el.buildYear}, is a ${el.size} street.`
//       );
//       break;
//     default:
//       console.log(`${el.name}, built in ${el.buildYear}, is a normal street.`);
//   }
// }

for (let el of allStreets) {
  console.log(`${el.name}, built in ${el.buildYear}, is a ${el.size} street.`);
}
