const { promises: fs, read } = require('fs');
const readme = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;

function generateNewREADME() {
  const readmeRow = readme.split('\n');

  // * DBNW = Day Before New Year
  const DBNWIndex = findDBNWIndex(readmeRow);
  readmeRow[DBNWIndex] = getDBNWSentence();

  return readmeRow.join('\n');
}

function getDBNWSentence() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const nextYearDate = new Date(String(nextYear));

  const timeUntilNewYear = nextYearDate - now;
  const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);

  return `**${dayUntilNewYear} day before ${nextYear} ⏱**`;
}

const findDBNWIndex = (rows) =>
  rows.findIndex((r) => Boolean(r.match(/<#day_before_new_years>/i)));

const updateREADMEFile = (text) =>
  fs.writeFile('./README.md', text, (e) => console.log(text));

function main() {
  const newREADME = generateNewREADME();
  console.log(newREADME);
  updateREADMEFile(newREADME);
}
main();
