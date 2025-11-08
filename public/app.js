function carregaReceitas() {
  let container = document.querySelector(".receitas");
  let strTextoHTML = "";

  for (let i = 0; i < receitas.length; i++) {
    let item = receitas[i];

     strTextoHTML += `
      <article class="d-flex mb-3">
        <a href="detalhes.html?id=${item.id}" style="text-decoration: none; color: inherit;">
        <img src="assets/img/${item.imagem}" alt="${item.titulo}" 
             class="me-3 rounded" style="width: 120px; height: auto;">
      </a>
        <div>
          <h4 class="fw-bold text-success mb-1">${item.titulo}</h4>
          <p style="color: #f4b400;">${item.descricao}</p>
          <a href="detalhes.html?id=${item.id}" class="btn btn-sm btn-outline-success">Ver Receita Completa</a>
        </div>
      </article>
    `;
  }
  container.innerHTML = strTextoHTML;
}

window.onload = carregaReceitas;


function carregaDetalhes() {
    let parametros = new URLSearchParams(window.location.search);
    let id = parametros.get("id");

    let receita = receitas.find(item => item.id === parseInt(id));

      let container = document.querySelector(".detalhes");

    container.innerHTML = `
    <h2 class="fw-bold text-success mb-3">${receita.titulo}</h2>
    <img src="${receita.imagem}" alt="${receita.titulo}" class="img-fluid rounded mb-3" style="max-width: 500px;">
    <p class="text-muted">${receita.data} • Categoria: ${receita.categoria}</p>
    <p class="lead">${receita.descricao}</p>
    <hr>
    <p>${receita.conteudo}</p>
    <a href="index.html" class="btn btn-success mt-4">Voltar para a Home</a>
  `;
}
window.onload = function () {
  if (document.querySelector(".receitas")) {
    carregaReceitas();
  } else if (document.querySelector(".detalhes")) {
    carregaDetalhes();
  }
};