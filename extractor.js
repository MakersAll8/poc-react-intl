/**
 * this file is written to extract internationalization messages from the staff-app and coax them into formatjs
 * compliant data structure. The output can then be fed to formatjs to compile into AST format json for localization
 * purposes.
 *
 * extracted messages are output to lang/en-AU.json; tweak by changing outputFile variable below
 * compiled messages goes into compiled-lang/en-AU.json; tweak in cli command
 *
 * extract by running the next line in command line
 * node extractor.js
 * compile in command line with the next line, remember to add "compile": "formatjs compile" to your scripts in
 * package.json
 * npm run compile -- src/lang/en-AU.json --ast --out-file src/compiled-lang/en-AU.json
 * */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const log = console.log;

// tell me where you want to start traversing to find .json files
let projectDir = path.normalize(__dirname + '/src')

let filesToExtract = []

// explore all folders to add json to filesToExtract
const exploreDirectory = (dir) => {
    // get the list of files in the projectDir
    let files = fs.readdirSync(dir)
    files.forEach(file => {
        // get stat from each file in dir
        let stat = fs.statSync(path.join(dir, file))
        if (stat.isFile() && file.match(/(\w*)\.locale\.json$/)) {
            // a file is found and name ends in .json, add to filesToExtract
            filesToExtract.push(path.join(dir, file))
        } else if (stat.isDirectory()) {
            // a directory is found, go into directory and explore
            // Note: I assume loops due to use of symbolic links do not exist
            // if loops exist, modify exploreDirectory to keep track of visited nodes
            exploreDirectory(path.join(dir, file))
        }
    })
}

// start exploring from projectDir
exploreDirectory(projectDir)
log('Files to extract: ', filesToExtract)

let messages = []

// read each file and spread it into messages
filesToExtract.forEach(file => {
    let raw = fs.readFileSync(file);
    let parsed = JSON.parse(raw);
    for(const [key, value] of Object.entries(parsed)){
      messages.push(value)
    }
})

let knownIds = []
let knownValues = {}
let duplicateIds = []
// format messages into format.js compliant structure for npm run compile to work properly
let extracted = {}
for (let i=0,l=messages.length; i< l; i++) {
  let id = messages[i].id
  // if id is already seen, we have duplicate ids
  if (knownIds.includes(id)) duplicateIds.push(id)

  let defaultMessage = messages[i].defaultMessage

  // if value is previously seen, we have duplicate values
  if (defaultMessage in knownValues) {
    knownValues[defaultMessage]++
  } else {
    knownValues[defaultMessage] = 1
  }
  let description = messages[i].description
  extracted[id] = {defaultMessage}
  description && (extracted[id].description = description)
  knownIds.push(messages[i].id)
}

// warn duplicate ids
if (duplicateIds.length > 0) {
  log(chalk.bgRed.bold('duplicate ids: '), duplicateIds)
} else {
  log(chalk.green.bold('No duplicate id found'))
}

// warn duplicate values
let foundDuplicateValues = false;
for(const [key, value] of Object.entries(knownValues)){
  if (value > 1) {
    log(chalk.bgRed.bold('duplicate value: '), chalk.bgRed.bold(key), chalk.bgRed.bold(' count: '), chalk.bgRed.bold(value))
    foundDuplicateValues = true;
  }
}
if(!foundDuplicateValues){
  log(chalk.green.bold('No duplicate value found'))
}

// write out extracted messages
let outputFile = '/src/lang/en-AU.json'
fs.writeFile(path.normalize(__dirname + outputFile), JSON.stringify(extracted), function (err) {
    if (err) return log(err)
    console.log('extracted messages')
})
