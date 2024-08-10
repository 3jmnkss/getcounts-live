const axios = require('axios');

// Configuração de autorização
const authConfig = {
  headers: {
    'Authorization': 'Bearer SEU_TOKEN_AQUI'
  }
};

// URL do endpoint que você deseja consultar
const endpointUrl = 'https://api.exemplo.com/dados';

// Função para fazer a consulta usando axios
const consultarEndpoint = async () => {
  try {
    const resposta = await axios.get(endpointUrl, authConfig);
    console.log('Dados recebidos:', resposta.data);
  } catch (erro) {
    console.error('Erro ao consultar o endpoint:', erro);
  }
};

// Executar a função
consultarEndpoint();