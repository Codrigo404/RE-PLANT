// --- MÁSCARAS ---
const mascaraCEP = (value) => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
};

const mascaraCPF = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const mascaraTelefone = (value) => {
    return value.replace(/\D/g, "").replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

// --- FUNÇÃO DE VALIDAÇÃO DE CPF ---
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove pontos e traços
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Bloqueia sequências repetidas (ex: 111.111...)
    
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

// --- APLICAÇÃO DAS MÁSCARAS ---
document.getElementById('cep').addEventListener('input', (e) => {
    e.target.value = mascaraCEP(e.target.value);
    if (e.target.value.length === 9) buscaCEP(e.target.value);
});

// CPF com Máscara e Validação ao sair do campo (blur)
const cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', (e) => e.target.value = mascaraCPF(e.target.value));

cpfInput.addEventListener('blur', (e) => {
    const valor = e.target.value;
    if (valor.length > 0) { // Só valida se não estiver vazio
        if (!validarCPF(valor)) {
            // ERRO DE CPF
            e.target.style.borderColor = "#ff3131"; // Borda vermelha
            e.target.style.boxShadow = "0 0 10px #ff3131";
            alert("PROTOCOLO INVÁLIDO: O CPF DIGITADO É INEXISTENTE OU INCORRETO.");
            e.target.value = ""; // Limpa o campo
        } else {
            // CPF CORRETO
            e.target.style.borderColor = "var(--neon-green)";
            e.target.style.boxShadow = "0 0 10px var(--neon-green)";
        }
    }
});

document.getElementById('telefone').addEventListener('input', (e) => e.target.value = mascaraTelefone(e.target.value));

// --- BUSCA CEP AUTOMÁTICA ---
async function buscaCEP(cep) {
    const valorCEP = cep.replace(/\D/g, ''); 
    const statusText = document.getElementById('logradouro');
    
    statusText.value = "BUSCANDO_LOCALIZAÇÃO...";
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${valorCEP}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            alert("CEP não encontrado no protocolo!");
            statusText.value = "";
            return;
        }

        document.getElementById('logradouro').value = data.logradouro.toUpperCase();
        document.getElementById('bairro').value = data.bairro.toUpperCase();
        document.getElementById('cidade').value = `${data.localidade}/${data.uf}`.toUpperCase();
        
    } catch (error) {
        console.error("Erro na rede agritech:", error);
        statusText.value = "ERRO_NA_CONEXÃO";
    }
}