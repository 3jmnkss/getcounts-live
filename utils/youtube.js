'use client'

const isProd = process.env.NODE_ENV === 'production'
// Chave da API do YouTube (substitua pela sua chave)
const apiKeyDev = atob('QUl6YVN5Q3JPQk1hVHFqY3NYZmZaSjNLdE5HOC1DZDdIeFpqNzRV');
const apiKeyProd = atob('QUl6YVN5Q1J2QU5YMHpDQUFrQlA1VnJTb2htc3pUcnhINF8yYXAw');

// const apiKey = isProd?apiKeyProd:apiKeyDev;
const apiKey = apiKeyProd;

export function extractVideoId(videoId) {
    // Expressão regular para cobrir ambas as versões de URLs
    const regex = /^.*(youtu.be\/|v\/|u\/\w\/embed\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = videoId.match(regex);
    console.log("testando vide", videoId)

    if (match && match[2])
        return match[2];
    return videoId;
}

export async function extractChannelId(channelId) {
    // Expressão regular para cobrir ambas as versões de URLs
    let regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/channel\/)([^#\/\?]+)/i;
    let match = channelId.match(regex);

    if (match && match[4])
        return [match[4], false]; // O ID do canal está na quarta posição do array de matches

    // Expressão regular para cobrir ambas as versões de URLs com @
    regex = /^(https?:\/\/)?(www\.)?youtube\.com\/(@|channel\/@)([^#\/\?]+)/i;
    match = channelId.match(regex);

    if (match && match[4])
        return [match[4], true]; // O ID do canal está na quarta posição do array de matches

    //verifica se foi passado um id de vídeo e processa
    try {
        const videoId = extractVideoId(channelId);
        const detalhesVideo = await puxarDetalhesVideo(videoId);
        if (detalhesVideo.items && detalhesVideo.items.length > 0)
            return [detalhesVideo.items[0].snippet.channelId, false];
    }
    catch (error) { }

    return [channelId, true] //segundo elemento -> forHandle
}

// Função para carregar as informações do vídeo do YouTube
export async function puxarDetalhesVideo(videoId) {
    if (!videoId) throw Error('videoId is null or undefined.');

    const apiUrl = 'https://www.googleapis.com/youtube/v3/videos?' +
        `id=${videoId}&` +
        `key=${apiKey}&` +
        'part=snippet,statistics';

    // Fazendo uma requisição AJAX para obter os detalhes do vídeo
    const response = await fetch(apiUrl)
    if (!response.ok) {
        throw new Error('Erro ao carregar informações do vídeo. Status da requisição: ' + response.status);
    }
    var data = await response.json();

    if (!(data.items && data.items.length > 0))
        throw new Error('Erro ao carregar informações do vídeo. Status da requisição: ' + response.status);

    return data;
}

export function populaViewsVideo(data) {
    // Exibindo a contagem de views
    const views = data.items[0].statistics.viewCount;
    updateClock();
    updateNumber(
        document.getElementById('contador'),
        numberWithCommas(views),
        'changed-big'
    );
    document.getElementById('contador').style.fontSize = `${26 - views.length}vi`

    var videoInfo = data.items[0].snippet;
    // Exibindo o nome do vídeo
    var videoTitle = document.getElementById('titulo');
    videoTitle.textContent = videoInfo.title;

    // Exibindo a thumbnail do vídeo
    var thumbnailUrl = videoInfo.thumbnails.medium.url;
    //videoThumbnail.alt = videoInfo.title;
    document.getElementById('main').style.backgroundImage =
        "url('" + thumbnailUrl + "')";
}

export async function puxarDetalhesCanal(channelId, forHandle) {
    if (!channelId) throw Error('channelId is null or undefined.');
    console.log("FOR AHNDLE", forHandle)
    const apiUrl = 'https://www.googleapis.com/youtube/v3/channels?' +
        `${forHandle ? `forHandle=${channelId}&` : `id=${channelId}&`}` +
        `key=${apiKey}&` +
        'part=snippet,statistics';

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Erro ao carregar informações do canal. Status da requisição: ' + response.status);
    }
    const data = await response.json();

    if (!(data.items && data.items.length > 0))
        throw new Error('Erro ao carregar informações do canal. Status da requisição: ' + response.status);

    return data;
}


export function populaInscritosCanal(data) {
    // Exibindo a contagem de views
    const views = data.items[0].statistics.subscriberCount;
    updateClock();
    updateNumber(
        document.getElementById('contador'),
        numberWithCommas(views),
        'changed-big'
    );
    document.getElementById('contador').style.fontSize = `${26 - views.length}vi`

    var channelInfo = data.items[0].snippet;
    // Exibindo o nome do vídeo
    var channelTitle = document.getElementById('titulo');
    channelTitle.textContent = channelInfo.title;

    // Exibindo a thumbnail do vídeo
    var thumbnailUrl = channelInfo.thumbnails.default.url;
    document.getElementById('main').style.backgroundImage =
        "url('" + thumbnailUrl + "')";

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Seleciona os elementos de hora, minutos e segundos
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Atualiza os valores com efeito visual se houver mudança
    updateNumber(hoursElement, hours);
    updateNumber(minutesElement, minutes);
    updateNumber(secondsElement, seconds);
}

function updateNumber(element, newValue, cclass) {
    cclass = cclass || 'changed';
    const currentValue = element.textContent;
    if (currentValue !== newValue) {
        element.textContent = newValue;
        if (!element?.classList) element.class = cclass;
        else element?.classList?.add(cclass);
        setTimeout(() => {
            element?.classList?.remove(cclass);
        }, 300); // Remove a classe 'changed' após 300ms
    }
}

// Atualiza as visualizações a cada 10 segundos
// setInterval(puxarDetalhesVideo, 10000);