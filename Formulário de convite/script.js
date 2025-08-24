document.getElementById("conviteForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const presenca = document.querySelector("input[name='presenca']:checked").value;

  const conviteSection = document.getElementById("conviteGerado");
  conviteSection.innerHTML = `
    <h2>🎉 Convite Personalizado 🎉</h2>
    <p><strong>Convidado:</strong> ${nome}</p>
    <p><strong>Data do evento:</strong> ${new Date(data).toLocaleDateString("pt-BR")}</p>
    <p><strong>Presença confirmada:</strong> ${presenca}</p>
    <p>Esperamos você para um dia inesquecível! 💜</p>
  `;
  conviteSection.classList.remove("hidden");
});
