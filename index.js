const { promises: fs, read } = require('fs');
const readme = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;

function generateNewREADME() {
  const readmeRow = readme.split('\n');

  // * DBNW = Day Before New Year
  const DBNWIndex = findIdentifierIndex(readmeRow, 'day_before_new_years');
  readmeRow[DBNWIndex] = getDBNWSentence();

  //* AB = Age and birthday
  const ABIndex = findIdentifierIndex(readmeRow, 'age_and_birthday');
  readmeRow[ABIndex] = getAgeAndBirthdaySentence();

  const MySelfIndex = findIdentifierIndex(readmeRow, 'myself');
  readmeRow[MySelfIndex] = readmeRow[MySelfIndex].replace('<#myself>', getMySelf());

  return readmeRow.join('\n');
}

function getMySelf() {
  const today = new Date();

  // test if we are in a PAIR DAY
  if (today.getDate() % 2 === 0) {
    if (Math.floor(Math.random() * 2)) return 'penguin 🐧';
    else return 'bear 🐻';
  } else return 'penguin bear 🐧🐻';
}

function getAgeAndBirthdaySentence() {
  const birthday = new Date('2002-05-06T00:00:00.000Z');
  const today = new Date();

  const diffBirthdayToToday = today - birthday;

  // to get my current ages
  const age = new Date(diffBirthdayToToday).getFullYear() - 1970;

  if (
    birthday.getDate() === today.getDate() &&
    birthday.getMonth() === today.getMonth()
  )
    return `Today is my birthday🎉! I am ${age} years old.`;

  const birthdatetoday = new Date(birthday.setYear(today.getFullYear()));
  const isBirthdayRaised = today - birthdatetoday > 0;

  const nextBirthdayYear = birthday.getFullYear() + (isBirthdayRaised ? 1 : 0);
  const nextBirthdayDate = new Date(birthday.getTime());
  nextBirthdayDate.setYear(nextBirthdayYear);

  const timeUntilBirthday = nextBirthdayDate - today;
  const dayUntilBirthday = Math.round(timeUntilBirthday / msInOneDay);

  return `I am ${age} years old... But I will be ${
    age + 1
  } in ${dayUntilBirthday} days 🎉`;
}

function getDBNWSentence() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const nextYearDate = new Date(String(nextYear));

  const timeUntilNewYear = nextYearDate - now;
  const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);

  return `**${dayUntilNewYear} day before ${nextYear} ⏱**`;
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, 'i'))));

const updateREADMEFile = (text) =>
  fs.writeFile('./README.md', text, (e) => console.log(text));

function main() {
  const newREADME = generateNewREADME();
  console.log(newREADME);
  updateREADMEFile(newREADME);
}
main();
