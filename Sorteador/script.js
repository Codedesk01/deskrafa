document.getElementById("sortear").addEventListener("click", () => {
  const qtd = parseInt(document.getElementById("qtd").value);
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = ""; // limpar resultados anteriores

  if (isNaN(qtd) || qtd <= 0) {
    alert("Digite uma quantidade válida!");
    return;
  }
  if (min >= max) {
    alert("O valor mínimo deve ser menor que o máximo!");
    return;
  }

  let numeros = [];
  while (numeros.length < qtd) {
    let n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numeros.includes(n)) { // evita números repetidos
      numeros.push(n);
    }
  }

  numeros.forEach((num, i) => {
    setTimeout(() => {
      const span = document.createElement("span");
      span.textContent = num;
      resultadoDiv.appendChild(span);
    }, i * 400); // efeito animado aparecendo um a um
  });
});
