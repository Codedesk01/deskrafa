// Seleciona os elementos
const input = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const lista = document.getElementById("lista");

// Função para adicionar item
function adicionarItem() {
  const itemTexto = input.value.trim();

  if (itemTexto === "") {
    alert("Digite um item para adicionar!");
    return;
  }

  // Criar o elemento <li>
  const li = document.createElement("li");
  li.textContent = itemTexto;

  // Botão de remover
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "X";
  btnRemover.onclick = () => li.remove();

  // Adiciona botão ao li
  li.appendChild(btnRemover);

  // Adiciona o li na lista
  lista.appendChild(li);

  // Limpa input
  input.value = "";
}

// Evento no botão
addBtn.addEventListener("click", adicionarItem);

// Evento de "Enter" no input
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    adicionarItem();
  }
});
