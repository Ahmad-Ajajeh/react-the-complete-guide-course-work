// primitives: number, string, boolean
// more complex: arrays, objects
// functino types, parameters.

// Primitives :

let age: number = 25;

age = 12;

let userName: string | string[];

userName = "Max";

let isInstructor: boolean;

isInstructor = true;

let hobbeis: null;

// number => number primitive type
// Number => Number Object.

// More complex types :
let hobbies: string[];

hobbies = ["sport", "cooking"];

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: "Max",
  age: 32,
};

let people: Person[];

let course: string | number = "React - The Complete Guide";

course = 1;

// Function

function add(a: number, b: number) {
  return a + b;
}

function printOutput(value: any) {
  console.log(value);
}

// Generics

function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1);
