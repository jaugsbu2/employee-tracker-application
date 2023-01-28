![license badge](/images/license-MIT-License-yellow.svg)

  # Note Taker Application

  ## Description

  This is a business employee tracker. It uses a relational mysql database to store information about business departments, roles, and employees. It uses inquirer to see and enter information. 

  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  
  npm i
  
  ## Usage
  
  To use this application for the first time the database must be created, open the command line and type mysql -u root -p, enter your mysql password, then type in source db/schema.sql to create the employees_db and then, if desired, seed it by typing in source db/seeds.sql. 

  In the command line then, type in npm i to download the dependencies then npm start. The user can then cycle through the prompts to view department, role, and employee information, or input new departments, roles, employees, and update employee roles. To exit the application after making a change, type n into the prompt when it asks if the user wants to do something else. The information stored for each department, role, and employee is shown in this schema:
  ![schema](/images/schema.png)

  ## License

  This software is covered by the MIT License. Please refer to this link for further details: 
  [MIT License](https://opensource.org/licenses/MIT)
  
  ## Contributing

  NA
  
  ## Tests

  NA
  
  ## Questions

  Github: https://github.com/jaugsbu2

  Please email any questions to: joshua.augsburger08@gmail.com

