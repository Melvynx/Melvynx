const { promises: fs } = require('fs');

const msInOneDay = 1000 * 60 * 60 * 24;

function replaceREADME(text) {
  fs.writeFile('./README.md', text, function (err) {
    if (err) throw new Error(`WriteFile error ${err}`);
    console.log(text);
  });
}

async function updateDayBeforeNewYears() {
  const data = await fs.readFile('./README.md', 'utf8');

  console.error('Current data :', data);

  const dataRow = data.split('\n');
  const lastRow = dataRow[dataRow.length - 2];

  const isValidLastRow = isAnDayBeforeNewYearsRow(lastRow);
  console.log('IS VALID ROW :', isValidLastRow);

  if (isValidLastRow) {
    dataRow[dataRow.length - 2] = getDayBeforeNewYearsSentence();
  } else {
    dataRow.push(getDayBeforeNewYearsSentence() + '\n');
  }

  replaceREADME(dataRow.join('\n'));
}

function getDayBeforeNewYearsSentence() {
  const nowDate = new Date();
  const nextYears = nowDate.getFullYear() + 1;

  const nextYearsDate = new Date(String(nextYears));

  const diff = nextYearsDate - nowDate;

  const dayCount = Math.round(diff / msInOneDay);

  return `${dayCount} day before ${nextYears}`;
}

const isAnDayBeforeNewYearsRow = (row = '') => Boolean(row.match(/day before/i));

updateDayBeforeNewYears();
