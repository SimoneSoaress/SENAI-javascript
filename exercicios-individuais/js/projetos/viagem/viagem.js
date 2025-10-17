// Função para calcular o custo total de combustível
function calcularCustoTotal(distancia, consumo, precoCombustivel) {
    const litrosNecessarios = distancia / consumo;
    const custoTotalCombustivel = litrosNecessarios * precoCombustivel;
    return custoTotalCombustivel;
}

// Função para calcular o custo por pessoa
function calcularCustoPorPessoa(custoTotal, numViajantes) {
    return custoTotal / numViajantes;
}

// Função principal que vai ser chamada ao clicar no botão
function calcularCustos() {
    // Obtendo os valores dos campos
    const distancia = parseFloat(document.getElementById('distancia').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
    const numViajantes = parseInt(document.getElementById('numViajantes').value);

    // Verificando se todos os campos estão preenchidos
    if (isNaN(distancia) || isNaN(consumo) || isNaN(precoCombustivel) || isNaN(numViajantes) || numViajantes <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Calculando o custo total e o custo por pessoa
    const custoTotal = calcularCustoTotal(distancia, consumo, precoCombustivel);
    const custoPessoa = calcularCustoPorPessoa(custoTotal, numViajantes);

    // Atualizando a interface com os resultados
    document.getElementById('resultadoTotal').innerHTML = `Custo Total com Combustível: <span class="value">R$ ${custoTotal.toFixed(2)}</span>`;
    document.getElementById('resultadoPessoa').innerHTML = `Custo por Pessoa: <span class="value">R$ ${custoPessoa.toFixed(2)}</span>`;
}

// Adicionando o evento de clique no botão
document.getElementById('btnCalcular').addEventListener('click', calcularCustos);
