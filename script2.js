const button = document.querySelector('.convertButton')
const selectDe = document.getElementById('selectToConvert')
const selectPara = document.getElementById('toConverted')

const moedas = [
    { nome: 'Real', local: 'pt-BR', moeda: 'BRL', img: './img/brasil.png' },
    { nome: 'Dolar', local: 'en-US', moeda: 'USD', img: './img/eua.png' },
    { nome: 'Euro', local: 'de-DE', moeda: 'EUR', img: './img/euro.png' },
    { nome: 'Libra', local: 'GBP', moeda: 'GBP', img: './img/libra.png' },
]


const converter = async () => {
    const deConvert = document.getElementById('selectToConvert').value
    const paraConvert = document.getElementById('toConverted').value

    const inputValor = document.querySelector('.input').value

    if (!inputValor || isNaN(inputValor) || Number(inputValor) <= 0) {
        alert('Digite um valor válido maior que 0.')
        return
    }

    const valorDe = document.querySelector('.valor-da-moeda')
    const valorPara = document.querySelector('.valor-da-moeda2')
    const moedaOrigem = moedas.find(item => item.nome === deConvert)
    const moedaDestino = moedas.find(item => item.nome === paraConvert)

    if (moedaOrigem.moeda === moedaDestino.moeda) {
        valorDe.innerHTML = new Intl.NumberFormat(moedaOrigem.local, {
            style: 'currency',
            currency: moedaOrigem.moeda
        }).format(inputValor)

        valorPara.innerHTML = valorDe.innerHTML

        document.getElementById('currencyName2').innerText = moedaOrigem.nome
        document.querySelector('.currency-img2').src = moedaOrigem.img

        document.getElementById('currencyName').innerText = moedaDestino.nome
        document.querySelector('.currency-img').src = moedaDestino.img
        return
    }

    const codigoMoeda = `${moedaOrigem.moeda}-${moedaDestino.moeda}`

    const resposta = await fetch(`https://economia.awesomeapi.com.br/json/last/${codigoMoeda}`)
    const dados = await resposta.json()
    const chave = `${moedaOrigem.moeda}${moedaDestino.moeda}`
    const taxa = parseFloat(dados[chave].bid)
    console.log(dados)
    console.log(dados[chave])

    const valorConvertido = inputValor * taxa

    valorDe.innerHTML = new Intl.NumberFormat(`${moedaOrigem.local}`, {
        style: 'currency',
        currency: `${moedaOrigem.moeda}`
    }).format(inputValor)

    valorPara.innerHTML = new Intl.NumberFormat(`${moedaDestino.local}`, {
        style: 'currency',
        currency: `${moedaDestino.moeda}`
    }).format(valorConvertido)

    document.getElementById('currencyName2').innerText = moedaOrigem.nome
    document.querySelector('.currency-img2').src = moedaOrigem.img

    document.getElementById('currencyName').innerText = moedaDestino.nome
    document.querySelector('.currency-img').src = moedaDestino.img
}


button.addEventListener('click', converter)
selectDe.addEventListener('change', converter)
selectPara.addEventListener('change', converter)
