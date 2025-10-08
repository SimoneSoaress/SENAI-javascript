/*
Regras de Negócio (RN)
Preço por Página: R$ 500,00
Custo Adicional de Design: R$ 1.000,00
Taxa de Urgência: 
   - Se o prazo for menor que 5 dias: 10% sobre o valor base (páginas + design).
   - Se o prazo for menor que 15 dias: 5% sobre o valor base (páginas + design). 
   - Se for 15 dias ou mais, a taxa é zero.
Desconto: O desconto percentual é aplicado sobre a soma de todos os custos únicos (páginas + design + taxa de urgência).
*/

const rnPrecoPorPagina = 500;
const rnPrecoAdicionalDesign = 1000;

document.querySelector(".seu-nome").textContent = "Simone Mayara"

/*pegando os elementos do html e armazenando em variaveis*/
const inputQtdPagina = document.querySelector("#qtd-paginas");
const inputPrazoEntrega = document.querySelector("#prazo-entrega");
const inputDesconto = document.querySelector("#desconto");
const checkboxDesign = document.querySelector("#inclui-design")

const resumoSubtotal = document.querySelector('#resumo-subtotal');
const resumoAdicional = document.querySelector('#resumo-adicional');
const resumoUrgencia = document.querySelector('#resumo-urgencia');
const resumoDesconto = document.querySelector('#resumo-desconto');
const resumoTotal = document.querySelector('#resumo-total');

/* função p/ o calculo do orçamento */ 
function calcularOrcamento(){
   const qtdPaginas = parseInt(inputQtdPagina.value) || 1;
   const praEntrega = parseInt(inputPrazoEntrega.value) || 30;
   const desconto = parseFloat(inputDesconto.value) || 0;
   const incluiDesign = checkboxDesign.checked;

   /* cálculo do subtotal */
   let subtotal = qtdPaginas * rnPrecoPorPagina;

   /* custo adicional do design */
   let custoDesign = 0;
   if(incluiDesign){
      custoDesign = rnPrecoAdicionalDesign;
   }

   /* valor base taxa de urgência */
   const valorBaseUrgencia = subtotal + custoDesign;

   /* taxa de urgência */
   let taxaUrgencia = 0;

   if (praEntrega < 5){
      taxaUrgencia = valorBaseUrgencia * 0.10; 

   }else if (praEntrega < 15){
      taxaUrgencia = valorBaseUrgencia * 0.05;
   }

   const totalParcial = valorBaseUrgencia + taxaUrgencia;

   let valorDesconto = 0; /*calculo do desconto */
   if (desconto > 0){
      valorDesconto = totalParcial * (desconto / 100);
   }

   /* cálculo final pós desconto */
   const total = totalParcial - valorDesconto;

   atualizarResumo(subtotal, custoDesign, taxaUrgencia, valorDesconto, total);  

}

/* atualizar resumo da tela */
function atualizarResumo(subtotal, custoDesign, taxaUrgencia, valorDesconto, total){
   const formatarMoeda = (valor) => {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
   }

   /* valores atualizados na tela */
   resumoSubtotal.textContent = formatarMoeda(subtotal);
   resumoAdicional.textContent = formatarMoeda(custoDesign);
   resumoUrgencia.textContent = `+ ${formatarMoeda(taxaUrgencia)}`;
   resumoDesconto.textContent = `- ${formatarMoeda(valorDesconto)}`;
   resumoTotal.textContent = formatarMoeda(total);
}

/* atualizando os inputs em tempo real */
inputQtdPagina.addEventListener('input', calcularOrcamento);
inputPrazoEntrega.addEventListener('input', calcularOrcamento);
inputDesconto.addEventListener('input', calcularOrcamento);
checkboxDesign.addEventListener('input', calcularOrcamento);


calcularOrcamento();