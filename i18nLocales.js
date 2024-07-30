const fs = require('fs')

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

console.log(getDirectories("locales"))

function setEnvValue(key, value) {

    const ENV_VARS = fs.readFileSync("./.env", "utf8").replace(/\r\n/g, "\n").split('\n');
    console.log(ENV_VARS)

    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));

    if (target >= 0)
        ENV_VARS.splice(target, 1, `${key}=${value}`);
    else
        ENV_VARS.push(`${key}=${value}`)

    console.log(ENV_VARS)

    fs.writeFileSync("./.env", ENV_VARS.join('\n'));

}

setEnvValue("LOCALES", getDirectories("locales"));

console.log(fs.readFileSync('./.env', { encoding: 'utf8', flag: 'r' }))