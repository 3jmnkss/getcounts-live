require('dotenv').config()
const fs = require('fs')
const axios = require('axios');
const decompress = require("decompress");

const args = process.argv.slice(2);

const localesFolder = "locales"
let MODO_DEBUG = false;
if (args.includes('--debug')) {
    console.log('A opção --debug foi passada.');
    MODO_DEBUG = true;
} else console.log('A opção --debug NÃO foi passada.');
// Verifica se '--clear' está presente nos argumentos
if (args.includes('--clear')) {
    console.log('A opção --clear foi passada.');
    fs.rmSync(localesFolder, { recursive: true, force: true });
} else console.log('A opção --clear NÃO foi passada.');

// URL do endpoint que você deseja consultar
const baseURL = process.env.WEBLATE_API_URL + "/projects/" + process.env.NEXT_PUBLIC_WEBLATE_PROJECT_SLUG;
// Configuração de autorização
const authConfig = {
    headers: {
        'Authorization': 'Bearer ' + process.env.WEBLATE_API_KEY
    }
};

// Função para fazer a consulta usando axios
const consultarEndpoint = async ({ endpoint = "" } = {}) => {
    const resposta = await axios.get(baseURL + endpoint + '/', authConfig);
    MODO_DEBUG && console.log('Dados recebidos:', resposta.data);
    return resposta.data;
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

const downloadFile = async (url, filePath) => {
    // Faz a solicitação HTTP para o URL fornecido
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream', // Importante para baixar arquivos
        ...authConfig
    });

    // Cria um fluxo de escrita no caminho do arquivo local
    const writer = fs.createWriteStream(filePath);

    // Pipe o fluxo de resposta para o fluxo de escrita
    response.data.pipe(writer);

    // Retorna uma Promise que será resolvida quando o download for concluído
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// const getDirectories = source =>
//     fs.readdirSync(source, { withFileTypes: true })
//         .filter(dirent => dirent.isDirectory())
//         .map(dirent => dirent.name)

// console.log(getDirectories("locales"))

const main = async () => {
    try {
        // Executar a função
        MODO_DEBUG && console.log(await consultarEndpoint());

        console.log("Atualizando lista de idiomas...")
        const idiomas = await consultarEndpoint({ endpoint: "/languages" });
        const locales = idiomas.map(i => i.code)
        console.log(locales)

        console.log("Processando .env...")
        setEnvValue("NEXT_PUBLIC_LOCALES", locales);
        MODO_DEBUG && console.log("NOVO .env...", fs.readFileSync('./.env', { encoding: 'utf8', flag: 'r' }))

        const zipName = "traducoes.zip"
        process.stdout.write("Baixando traduções...")
        await downloadFile(baseURL + "/file/?format=zip", zipName)
        process.stdout.write(" Sucesso!\n")

        process.stdout.write("Descomprimindo traduções...")
        const arquivos = await decompress("traducoes.zip", localesFolder)
        process.stdout.write(" Sucesso!\n")
        MODO_DEBUG && console.log(arquivos)
    }
    catch (err) {
        console.error(err)
        throw Error("Falha ao atualizar traduções: " + err.message)
    }
}
main()