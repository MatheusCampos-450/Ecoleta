
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") // Selecionando o elemento select name uf do HTML

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") // Chamando a função fetch
    .then( res => res.json() ) // Executando uma função com base na resposta da função fetch
    .then( states => { // Executando um laço de repetição com base na resposta que teremos do then

        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        } // Populando a constante que representa o elemento select name uf com os estados que obtemos da API

    } )
} // Retornando a constante ufSelect. Consequentemente no HTML, o campo será populado com todos os estados brasileiros
populateUFs() // Executando a função populateUFs




function getCities(event) {
    const citySelect = document.querySelector("[name=city]") // Selecionando o elemento select name city do HTML
    const stateInput = document.querySelector("[name=state]") // Input do estado selecionado pelo usuário


    const ufValue = event.target.value // event ele diz se ouve ou não uma mudança.  .target diz onde ouve a mudança.  .value retorna o valor da mundança


    const indexOfSelectedState = event.target.selectedIndex // Retornando o index de onde ocorreu a mudança
    stateInput.value = event.target.options[indexOfSelectedState].text // Retornando o valor de onde ocorreu a mudança com base no index. O .options me retornara um array com todos os elementos, usando o index (indexOfSelectedState) para acessar o valor em específico 


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // Declarando uma cosntante para armazenar a url que corresponde com o estado escolhido


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // Limpando o campo antes preenchido com cidades. Isso foi feito para não ocorrer bugs, no caso de o usuário selecionar outro estado e esse campo apenas armazenar novos valores e não limpar os valores já contido.
    citySelect.disabled = true // Desabilitando o campo


    fetch(url)
    .then( res => res.json() ) // Retornando as cidades com base no estado escolhido pelo usuário
    .then( cities => {

        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } // Armazenando dentro do elemento, todas as cidades

        citySelect.disabled = false // Habilitando o campo onde o usuário escolhe a cidade

    } )
}

document
    .querySelector("select[name=uf]") // Selecionando o elemento select name uf no HTML
    .addEventListener("change", getCities) // Quando ouver uma mudança no elemento selecionado acima, ele executará função getCities. Quando você for executar uma função apartir do addEventListener, passar a função em específico sem abrir e fechar parênteses. Pois, se você os fizer a função será executada no momento de compilar o código, e o intuíto é você executar a função somente se o addEventListener indentificar um evento de mudança.




      

// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li") // Selecionando todos os elementos que possuem a classe .items-grid li

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) // Identificando quando alguma opção for selecionada, e assim que for selecionada, será chamada a função handleSelectedItem
}

const collectedItems = document.querySelector("input[name=items]") // Selecionando o elemento input que receberá o valor de todos os ítens selecionados

let selectedItems = [] // Lista de ítens selecionados


function handleSelectedItem(event) { // Função será chamada sempre que                                                                                                                                                                                                                                   
    const itemLi = event.target // Diz onde ocorreu a mudança

    // adicionar ou remover uma classe em JavaScript
    itemLi.classList.toggle("selected") // Esse método irá adicionar ou remover a classe definida do elemento HTML


    const itemId = itemLi.dataset.id // Retorna o id declarado no elemento no método data

    // Verificar se existem itens selecionados, se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
    // const alreadySelected = selectedItems.findIndex( item => item == itemId)


    // Se já estiver selecionado, tirar da seleção
    if( alreadySelected >= 0 ){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else {

        // Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }


    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems 
}




// Formas de escrever uma função anonima:

// 1º Forma - Complexa
// function(){} 

// 2º Forma - Mais ou menos simples  (Arrow Function)
// () => {}

// 3º Forma - Simples (Arrow Function Simples)
// variavel => retorno da função



// fetch - função que busca as informações na internet a partir de um requerimento (promessa).

// .then - É uma condição. Caso a função consiga trazer as informações então a programação irá seguir os comando dentro desta condição.

// .catch - Condição contraria a .then. Caso a função não consiga trazer o que foi pedido, ele a programação seguirá os comandos dentro desta condição

// .querySelector - é uma funcionalidade que pesquisa. Ele especifica um grupo especifico de informações a serem buscadas noo HTML.

// .innerHTML - Funcionalidade que permite escrever um HTML dentro do arquivo JavaScript.

// .addEventListener - Função que fica "ouve"/"observa" se aconteceu algum evento. (Esse evento pode ser qualquer coisa, como por exemplo uma mudança)