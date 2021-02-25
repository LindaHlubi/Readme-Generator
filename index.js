const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require('axios');
var repo = "readme";

inquirer.prompt([{
  type: "input",
  name: "name",
  message: "What is your name:",
},
  {

        type: "input",
        name: "gitname",
        message: "What is your GitHub user name?",
       
   },
  {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
   },
   {
    name: "description",
    type: "input",
    message: "Describe your project:",
  },
  {
    name: "installation",
    type: "input",
    message: "If applicable, describe the steps required to install your project for the Installation section.",
    default: "To install necessary dependencies, run the following command: npm install"
    
},
  {
    name: "usage",
    type: "input",
    message: "Provide examples of the  project:",
  },
  {
    name: "links",
    type: "input",
    message: "Paste link to your deployed project here",
  },
  {
    name: "contributer",
    type: "input",
    message:"Include and collaboraters/ contributers to the project:"
  },
  {
    name: "license",
    type: "list",
    message: "Choose a license for your project.",
    choices: ["GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "MIT License", "Boost Software License 1.0", "The Unlicense"],
   
},

  
  
]).then(function(answer) {
    let {name,gitname,title,description,installation,usage,contributer,license,} = answer;
    let avatarUrl;
    let email;
    let queryUrl = `https://api.github.com/users/${gitname}`;
    axios.get(queryUrl).then(
        (answer) => {
            //console.log(answer);
            avatarUrl = answer.data.avatar_url;
            
            if(email==null) {
                email = ".";
            } else {
                email = ", or email me at " + answer.data.email + ".";
            };

            let filename = repo.toLowerCase().split(' ').join('_') + ".md";
            
let data = `# ${title}
<img src="${avatarUrl}" alt="avatar" style="border-radius: 36px" width="60" />
## Description
${description}
## Table of Contents 
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Tests](#tests)
* [Questions](#questions)
## Installation
${installation}
## Usage
${usage}
## License
${license}

## Tests
To run tests, run the following command:
npm test
## Questions
[![GitHub license](https://img.shields.io/badge/GitHubUser-${gitname}-orange)](${queryUrl})
If you have any questions please contact me directly here: (${queryUrl})${email}`;

    fs.writeFile(filename, data, function(error) {
        if(error) {
            return console.log(error);
        } 
        console.log("README file generated.");
    })
        }
    );
    
  });
