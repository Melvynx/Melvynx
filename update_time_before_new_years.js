const { promises: fs, read } = require('fs');
const readme = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;

function replaceREADME(text) {
  fs.writeFile('./README.md', text, function (err) {
    if (err) throw new Error(`WriteFile error ${err}`);
    console.log(text);
  });
}

async function updateDayBeforeNewYears() {
  const data = readme;

  const dataRow = data.split('\n');
  const rowIndex = findRowIndex(dataRow);

  dataRow[rowIndex] = getDayBeforeNewYearsSentence();

  replaceREADME(dataRow.join('\n'));
}

function getDayBeforeNewYearsSentence() {
  const nowDate = new Date();
  const nextYears = nowDate.getFullYear() + 1;

  const nextYearsDate = new Date(String(nextYears));
  const diff = nextYearsDate - nowDate;
  const dayCount = Math.round(diff / msInOneDay);

  return `**${dayCount} day before ${nextYears}**`;
}

const findRowIndex = (rows) =>
  rows.findIndex((r) => Boolean(r.match(/<#day_before_new_years>/i)));

const isAnDayBeforeNewYearsRow = (row = '') => Boolean(row.match(/day before/i));

updateDayBeforeNewYears();
