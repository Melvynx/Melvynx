const fs = require('fs');

const msInOneDay = 1000 * 60 * 60 * 24;

function readREADME() {
  return new Promise((resolve, reject) => {
    fs.readFile('README.md', 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function replaceREADME(text) {
  fs.writeFile('README.md', text, function (err) {
    if (err) throw new Error(`WriteFile error ${err}`);
    console.log(`Hello World > ${text}`);
  });
}

async function updateDayBeforeNewYears() {
  const data = await readREADME();

  const dataRow = data.split('\n');
  const lastRow = dataRow[dataRow.length - 2];

  const isValidLastRow = checkRow(lastRow);

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

function checkRow(row) {
  const reggex = new RegExp('day before', 'i');
  return Boolean(row.match(reggex));
}

updateDayBeforeNewYears();
