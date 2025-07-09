/**
 * Função para calcular a soma dos múltiplos de 3 ou 5 menores que n
 * @param {number} n - Número limite para o cálculo
 * @returns {number} - Soma dos múltiplos de 3 ou 5 menores que n
 */
function calculateCode(n) {
  let sum = 0;
  const multiples = [];

  for (let i = 1; i < n; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
      multiples.push(i);
    }
  }

  return { sum, multiples };
}

/**
 * Função para formatar a saída dos múltiplos
 * @param {array} multiples - Array com os múltiplos encontrados
 * @returns {string} - String formatada com os múltiplos
 */
function formatMultiplesOutput(multiples) {
  if (multiples.length === 0) return 'Nenhum múltiplo encontrado.';

  let output = 'Múltiplos encontrados: ';
  const last = multiples.pop(); // Remove o último elemento para formatar com "e"

  if (multiples.length > 0) {
    output += multiples.join(', ') + ' e ' + last;
  } else {
    output += last;
  }

  return output;
}

// Elementos do DOM
const decipherBtn = document.getElementById('decipherBtn');
const returnBtn = document.getElementById('returnBtn');
const numberInput = document.getElementById('numberInput');
const resultOutput = document.getElementById('resultOutput');
const calculationOutput = document.getElementById('calculationOutput');

// Evento para o botão DECIFRAR
decipherBtn.addEventListener('click', () => {
  const inputValue = parseInt(numberInput.value);

  // Validação da entrada
  if (isNaN(inputValue) || inputValue < 1) {
    resultOutput.textContent = 'Por favor, digite um número inteiro positivo válido.';
    calculationOutput.textContent = '';
    return;
  }

  // Cálculo do código
  const { sum, multiples } = calculateCode(inputValue);
  const multiplesOutput = formatMultiplesOutput([...multiples]); // Usamos spread para não modificar o array original

  // Exibição dos resultados
  resultOutput.textContent = `Para n = ${inputValue}, o código é: ${sum}`;
  calculationOutput.innerHTML = `
        ${multiplesOutput}<br>
        Soma: ${multiples.join(' + ')} = <strong>${sum}</strong>
    `;
});

// Evento para o botão RETORNAR
returnBtn.addEventListener('click', () => {
  numberInput.value = '';
  resultOutput.textContent = '';
  calculationOutput.textContent = '';
  numberInput.focus();
});

// Evento para permitir apenas números no input
numberInput.addEventListener('keypress', e => {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  }
});
