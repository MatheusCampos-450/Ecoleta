
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) // Função Curta (Abreviada)
    .then( states => {

        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()



function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() ) // Função Curta anonima(Abreviada)
    .then( cities => {

        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []


function handleSelectedItem(even) {
    const itemLi = event.target

    // adicionar e remover uma classe em JavaScript
    itemLi.classList.toggle("selected") 


    const itemId = itemLi.dataset.id

    // Verificar se existem itens selecionados, se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

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
// .querySelector - é uma funcionalidade que pesquisa. Ele especifica um grupo especifico de informações a serem buscadas.
// .innerHTML - Funcionalidade que permite escrever um HTML dentro do arquivo JavaScript.
// .addEventListener - Função que fica "ouve"/"observa" se aconteceu algum evento. (Esse evento pode ser qualquer coisa, como por exemplo uma mudança)