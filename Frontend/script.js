const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

// Fiz um RESUMO no final desse código para estudar mais depois

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }
    
    requestApi(searchTerm);
})

// RESUMO 
/*

--->>>> este código JavaScript permite que os usuários busquem artistas 
em uma API local e exibe os resultados dinamicamente na página HTML à medida que 
o usuário digita no campo de pesquisa.

const searchInput = document.getElementById('search-input');: Obtém uma referência ao elemento HTML com o ID "search-input", que provavelmente é um campo de entrada (input) onde o usuário pode digitar o termo de busca.

const resultArtist = document.getElementById("result-artist");: Obtém uma referência ao elemento HTML com o ID "result-artist", que provavelmente é o local onde os resultados dos artistas serão exibidos.

const resultPlaylist = document.getElementById('result-playlists');: Obtém uma referência ao elemento HTML com o ID "result-playlists", que provavelmente é o local onde as listas de reprodução serão exibidas.

function requestApi(searchTerm) { ... }: Define uma função chamada requestApi que recebe um termo de pesquisa como argumento. Essa função constrói uma URL para a API local usando o termo de pesquisa, faz uma solicitação fetch para essa URL e, em seguida, chama a função displayResults para exibir os resultados.

function displayResults(result) { ... }: Define uma função chamada displayResults que recebe os resultados da pesquisa como argumento. Esta função exibe os resultados na página HTML, mostrando o nome do artista e uma imagem associada a ele.

document.addEventListener('input', function () { ... }: Adiciona um ouvinte de evento ao documento que escuta por mudanças de entrada (input) no campo de pesquisa. Quando o usuário digita algo, esta função é acionada. Ela obtém o termo de pesquisa do campo de entrada, verifica se está vazio e, em seguida, chama a função requestApi para realizar a busca quando houver um termo de pesquisa.



*/