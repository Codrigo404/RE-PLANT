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

  fetch("https://script.google.com/macros/s/AKfycbyC7nG5j9YqFXQAlPYwuguBi0m_gyzbkpE_F3Ev7e1gqACeUKXWOp1xoi3i6tlfDA_7XA/exec", {
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