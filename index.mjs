import inquirer from "inquirer";
import fs from "fs/promises";

//array of questions for user
const questions = [
  "What is the project title?",
  "Project description",
  "What is the table of contents?",
  "How to install the app?",
  "How to use the app?",
  "What license are you using?",
  "Who can contribute to this project?",
  "How to test the app?",
  "What is your GitHub url?",
  "What is your e-mail address?",
];

// using inquirer to make a prompt with our questions.
inquirer
  .prompt([
    {
      type: "input",
      message: "What is your project title?",
      name: "title",
    },
    {
      type: "input",
      message: "What is your project description?",
      name: "description",
    },
    {
      type: "input",
      message: "What does your project contain?",
      name: "contents",
    },
    {
      type: "input",
      message: "How to install the app?",
      name: "installation",
    },
    {
      type: "input",
      message: "How to use the app?",
      name: "usage",
    },
    {
      type: "checkbox",
      message: "What license are you using?",
      name: "license",
      choices: ["MIT", "Mozilla", "IBM"],
    },
    {
      type: "input",
      message: "Who can contribute to this project?",
      name: "contributors",
    },
    {
      type: "input",
      message: "How to test the app?",
      name: "testing",
    },
    {
      type: "input",
      message: "What is your GitHub url?",
      name: "github",
    },
    {
      type: "input",
      message: "What is your e-mail address?",
      name: "email",
    },
  ])  // waiting for the response and destructuring the object
  .then((response) => {
    const {
      title,
      description,
      contents,
      installation,
      usage,
      license,
      contributors,
      testing,
      github,
      email,
    } = response;
    // generating license based on user's choice + badge
    const generateLicense = (choices) => {
      for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        if (choice === "MIT") {
          return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        } else if (choice === "Mozilla") {
          return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
        } else if (choice === "IBM") {
          return "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)";
        } else {
          console.log("Must choose a license!");
        }
      }
    };
    const readmeContent = `# Title
${title}

## Description
${description}

## Table of Contents
${contents}
### * [description](#description)
### * [installation](#installation)
### * [usage](#usage)
### * [license](#license)
### * [contributors](#contributors)
### * [testing](#testing)
### * [questions](#questions)

## Installation
${installation}

## Usage
${usage}

## License
${generateLicense(license)}
${license}

## Contributors
${contributors}

## Testing
${testing}

## Questions

### Please check my Github profile!
${github}
### For further questions, please make sure to contact me at my e-mail address:
${email}`;
// writing to file by using the fs.writeFile() API.
    fs.writeFile("README.md", readmeContent, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("README file created successfully!");
      }
    });
});
