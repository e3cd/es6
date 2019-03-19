class Park {
  constructor(name, buildYear, trees, sqKm) {
    this.name = name;
    this.buildYear = buildYear;
    this.trees = trees;
    this.sqKm = sqKm;
  }

  calcAge() {
    const now = new Date().getFullYear();
    const age = now - this.buildYear;
    return age;
  }

  calcTotalDensity() {
    const tD = this.trees / this.sqKm;
    return tD;
  }
}

class Street extends Park {
  constructor(name, buildYear, length, size) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }
}

console.log(`-------PARKS REPORT-----------`);

const green = new Park("Green", 1990, 1030, 50);
const blue = new Park("Blue", 1989, 877, 50);
const red = new Park("Red", 1987, 844, 40);

const allParks = [green, blue, red];

let sum = 0;
//use for of loop to loop over allParks
for (let el of allParks) {
  let age = el.calcAge();
  sum = sum + age;
  var avgAge = Math.floor(sum / allParks.length);
}

console.log(
  `Our ${allParks.length} parks have an average age of ${avgAge} years`
);

//log every national park tree density

allParks.map(el => {
  console.log(
    `${el.name} park has a tree density of ${Math.floor(
      el.calcTotalDensity()
    )} per square km`
  );
});

//log if a park has more than 1000 trees

for (let el of allParks) {
  if (el.trees >= 1000) {
    console.log(`${el.name} park has more than 1000 trees`);
  }
}

console.log(`-------STREETS REPORT-----------`);

const highbury = new Street("Highbury", 1956, 6, "small");
const lynwood = new Street("Lynwood", 1978, 5, "normal");
const wall = new Street("Wall", 1988, 3, "huge");
const drury = new Street("Drury", 1990, 5, "big");
const hume = new Street("Hume", 1988, 90);

const allStreets = [highbury, lynwood, wall, drury];

let sum1 = 0;
for (let el of allStreets) {
  sum1 = sum1 + el.length;
  var avgLength = Math.floor(sum1 / allStreets.length);
}

console.log(
  `Our ${
    allStreets.length
  } streets have a total ${sum1} km, with an average of ${avgLength} km`
);

for (let el of allStreets) {
  console.log(
    `${el.name} street, built in ${el.buildYear}, is a ${el.size} street.`
  );
}
