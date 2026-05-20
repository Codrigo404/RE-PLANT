function cadastrarPlanta() {
  const dados = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    telefone: document.getElementById("telefone").value,
    cep: document.getElementById("cep").value,
    logradouro: document.getElementById("logradouro").value,
    referencia: document.getElementById("referencia").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    login: document.getElementById("login").value,
    senha: document.getElementById("senha").value,
    email: document.getElementById("email").value
  };

  // validação básica (MVP)
  if (!dados.nome || !dados.cpf || !dados.telefone) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  fetch("COLE_SUA_URL_DO_GOOGLE_AQUI", {
    method: "POST",
    body: JSON.stringify(dados)
  })
  .then(res => res.json())
  .then(data => {
    alert("Cadastro realizado! ID: " + data.id);
    
    // opcional: limpar formulário
    document.querySelectorAll("input").forEach(input => input.value = "");
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao cadastrar!");
  });
}