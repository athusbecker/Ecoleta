function populateUfs () {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        
        for ( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    console.log(event.target.value) //testando o valor passado

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    console.log(stateInput.value) //testando o valor passado

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true    


    fetch(url)
    .then( res => res.json() )
    .then( cities => {
                
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false    

    })


}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []
// console.log(selectedItems)

const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {

    const itemLi = event.target
    // console.log(event.target)

    //adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    // console.log(itemLi.dataset.id)

    //verificar se existem items selecionados
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    } )
    // console.log(alreadySelected >= 0)
    // const alreadySelected = selectedItems.findIndex( item => item == itemId )
    // poderia ser escrito assim
    
    //se já estiver selecionado,
    if (alreadySelected >= 0) {
    // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId//item diferente do itemId
            return itemIsDifferent
        })

        // console.log(filteredItems)
        selectedItems = filteredItems
        
    } else {
    //se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    console.log(selectedItems)
  
    //atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems

}
