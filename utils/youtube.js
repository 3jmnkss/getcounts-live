'use client'

// Chave da API do YouTube (substitua pela sua chave)
const apiKey = atob('QUl6YVN5Q3JPQk1hVHFqY3NYZmZaSjNLdE5HOC1DZDdIeFpqNzRV');

export function getVideo(videoId) {
    try {
        // Verifica se o vídeoIdentifier é um ID ou um link
        videoId = extractVideoId(videoId);
        puxarDetalhesVideo(videoId);
    }
    catch (error) {
        console.log(error)
        throw Error(error.message || 'Falha ao selecionar vídeo!');
    }
}

function extractVideoId(videoId) {
    // Verifica se o vídeoIdentifier é um link do YouTube
    if (
        videoId.includes('youtube.com') ||
        videoId.includes('youtu.be')
    ) {
        // Extrai o ID do vídeo a partir do link
        const urlParams = new URLSearchParams(new URL(videoId).search);
        videoId = urlParams.get('v');
        if (!videoId)
            videoId = videoId.split('/').pop(); // Tenta obter o ID a partir do final da URL
    }
    return videoId;
}

// Função para carregar as informações do vídeo do YouTube
function puxarDetalhesVideo(videoId) {
    if (!videoId) throw Error ('videoId nulo ou indefinido.');

    const apiUrl =
        'https://www.googleapis.com/youtube/v3/videos?id=' +
        videoId +
        '&key=' +
        apiKey +
        '&part=snippet,statistics';

    // Fazendo uma requisição AJAX para obter os detalhes do vídeo
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        try {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                // Exibindo a contagem de views
                const views = response.items[0].statistics.viewCount;
                updateClock();
                updateNumber(
                    document.getElementById('contador'),
                    numberWithCommas(views),
                    'changed-big'
                );
                document.getElementById('contador').style.fontSize = `${26-views.length}vi`

                var videoInfo = response.items[0].snippet;
                // Exibindo o nome do vídeo
                var videoTitle = document.getElementById('titulo');
                videoTitle.textContent = videoInfo.title;

                // Exibindo a thumbnail do vídeo
                var thumbnailUrl = videoInfo.thumbnails.medium.url;
                //videoThumbnail.alt = videoInfo.title;
                document.getElementById('main').style.backgroundImage =
                    "url('" + thumbnailUrl + "')";

                document.getElementById('main').style.display = 'flex';
            } else {
                document.getElementById('alerta').style.display = 'block';
                document.getElementById('main').style.display = 'none';
                console.error(
                    'Erro ao carregar informações do vídeo. Status da requisição: ' +
                    xhr.status
                );
            }
        } catch (e) {
            document.getElementById('alerta').style.display = 'block';
            document.getElementById('main').style.display = 'none';
            console.error(e);
        }
    };
    xhr.send();
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