const fs = require('fs');
const path = require('path');

// tell me where the compiled-lang directory is
let compiledDir = path.normalize(__dirname + '/src/compiled-lang')
let defaultLocale = 'en-AU'

let files = fs.readdirSync(compiledDir)

let raw = fs.readFileSync(path.join(compiledDir, defaultLocale+'.json'));
let en_AU = JSON.parse(raw);

files.forEach(file => {
    // get stat from each file in dir
    let stat = fs.statSync(path.join(compiledDir, file))
    if (stat.isFile() && file.match(/(\w*)\.json$/) && file !== defaultLocale+'.json') {
      let targetLocaleRaw =  fs.readFileSync(path.join(compiledDir, file));
      let targetLocale = JSON.parse(targetLocaleRaw);
      for (const [key, value] of Object.entries(en_AU)){
        // I can't tell what is dirty and what is not, so I am only appending new keys here
        if (!(key in targetLocale)){
          targetLocale[key] = value
        }
      }

      fs.writeFile(path.normalize(path.join(compiledDir, file)), JSON.stringify(targetLocale), function (err) {
        if (err) return console.log(err)
        console.log('synched '+file)
      })
    }
})
