const API_URL = "http://localhost:3000/receitas";

function carregaReceitas() {
  fetch(API_URL)
    .then(res => res.json())
    .then(receitas => {
      let container = document.querySelector(".receitas");
      let strHTML = "";

      receitas.forEach(item => {
        strHTML += `
          <article class="d-flex mb-3 align-items-start border rounded p-2 shadow-sm bg-white">
            <a href="detalhes.html?id=${item.id}" style="text-decoration: none; color: inherit;">
              <img src="${item.imagem}" alt="${item.titulo}" 
                   class="me-3 rounded" style="width: 120px; height: auto;">
            </a>
            <div>
              <h4 class="fw-bold text-success mb-1">${item.titulo}</h4>
              <p style="color: #f4b400;">${item.descricao}</p>
              
              <div class="mt-2 d-flex gap-2">
                <a href="detalhes.html?id=${item.id}" class="btn btn-sm btn-outline-success">Ver Receita Completa</a>
                <a href="cadastro_receita.html?id=${item.id}" class="btn btn-sm btn-outline-primary">Editar</a>
                <button class="btn btn-sm btn-outline-danger" onclick="excluirReceita(${item.id})">Excluir</button>
              </div>
            </div>
          </article>
        `;
      });

      container.innerHTML = strHTML;
    })
    .catch(err => {
      console.error("Erro ao carregar receitas:", err);
      document.querySelector(".receitas").innerHTML = `<p class="text-danger">Erro ao carregar receitas.</p>`;
    });
}

function salvarReceita() {
  const id = new URLSearchParams(window.location.search).get("id");
  const dados = {
    titulo: document.getElementById("titulo").value,
    descricao: document.getElementById("descricao").value,
    categoria: document.getElementById("categoria").value,
    imagem: document.getElementById("imagem").value
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(() => {
      alert("Receita salva com sucesso!");
      window.location.href = "index.html";
    })
    .catch(() => alert("Erro ao salvar a receita!"));
}

function excluirReceita(id) {
  if (confirm("Tem certeza que deseja excluir esta receita?")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => carregaReceitas())
      .catch(() => alert("Erro ao excluir a receita!"));
  }
}

function carregarForm() {
  const form = document.getElementById("form-receita");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    salvarReceita();
  });
}

window.onload = function () {
  if (document.querySelector(".receitas")) carregaReceitas();
  else if (document.getElementById("form-receita")) carregarForm();
};