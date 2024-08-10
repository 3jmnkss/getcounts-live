require('dotenv').config()
const fs = require('fs')
const axios = require('axios');

const args = process.argv.slice(2);

let MODO_DEBUG = false;
if (args.includes('--debug')) {
    console.log('A opção --debug foi passada.');
    MODO_DEBUG = true;
} else console.log('A opção --debug NÃO foi passada.');
// Verifica se '--clear' está presente nos argumentos
if (args.includes('--clear')) {
    console.log('A opção --clear foi passada.');
    fs.rmSync("locales", { recursive: true, force: true });
} else console.log('A opção --clear NÃO foi passada.');

// URL do endpoint que você deseja consultar
const baseURL = process.env.WEBLATE_API_URL;
// Configuração de autorização
const authConfig = {
    headers: {
        'Authorization': 'Bearer ' + process.env.WEBLATE_API_KEY
    }
};

// Função para fazer a consulta usando axios
const consultarEndpoint = async ({ endpoint = "" } = {}) => {
    try {
        const resposta = await axios.get(baseURL + endpoint + '/', authConfig);
        MODO_DEBUG && console.log('Dados recebidos:', resposta.data);
        return resposta.data;
    } catch (erro) {
        console.error('Erro ao consultar o endpoint:', erro);
        throw Error('Falha ao obter traduções do servidor Weblate.')
    }
};

const setEnvValue = (key, value) => {

    const ENV_VARS = fs.readFileSync("./.env", "utf8").replace(/\r\n/g, "\n").split('\n');

    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));

    if (target >= 0)
        ENV_VARS.splice(target, 1, `${key}=${value}`);
    else
        ENV_VARS.push(`${key}=${value}`)

    MODO_DEBUG && console.log(ENV_VARS)

    fs.writeFileSync("./.env", ENV_VARS.join('\n'));

}

// const getDirectories = source =>
//     fs.readdirSync(source, { withFileTypes: true })
//         .filter(dirent => dirent.isDirectory())
//         .map(dirent => dirent.name)

// console.log(getDirectories("locales"))

const main = async () => {
    console.log("Baixando traduções...")
    // Executar a função
    MODO_DEBUG && console.log(await consultarEndpoint());

    const idiomas = await consultarEndpoint({ endpoint: "/projects/" + process.env.WEBLATE_PROJECT_SLUG + "/languages" });
    const locales = idiomas.map(i => i.code)
    console.log(locales)

    console.log("Processando .env...")
    setEnvValue("NEXT_PUBLIC_LOCALES", locales);
    MODO_DEBUG && console.log("NOVO .env...", fs.readFileSync('./.env', { encoding: 'utf8', flag: 'r' }))
}
main()