const fs = require('fs').promises;

async function readFile(filename) {
  try {
    const data = await fs.readFile(filename, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn(`Error reading file: ${error}`);
    throw error;
  }
}

async function writeFile(filename, data) {
  try {
    const json = JSON.stringify(data);
    await fs.writeFile(filename, json, 'utf-8');
    console.log('File updated successfully.');
  } catch (error) {
    console.warn(`Error writing file: ${error}`);
    throw error;
  }
}

async function updateFile(filename, value) {
  try {
    const jsonData = await readFile(filename);
    const arrOfObjects = Array.isArray(jsonData) ? jsonData : [];
    arrOfObjects.push({ nickname: value });
    await writeFile(filename, arrOfObjects);
  } catch (error) {
    console.warn(`Error updating file: ${error}`);
  }
}

module.exports = { readFile, writeFile, updateFile };