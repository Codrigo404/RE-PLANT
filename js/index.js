// ==========================================
// 1. LÓGICA DE CARREGAMENTO (Seu código original)
// ==========================================
window.addEventListener('load', () => {
    const fill = document.getElementById('progress-fill');
    const statusText = document.getElementById('status-text');
    const seedlings = document.querySelectorAll('.seedling');
    const loader = document.getElementById('loading-screen');
    const selectScreen = document.getElementById('select-screen');

    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 1; 
        fill.style.width = progress + '%';

        let seedlingIndex = Math.floor(progress / 20);
        if(seedlingIndex < seedlings.length) {
            seedlings[seedlingIndex].classList.add('planted');
        }

        if(progress <= 30) statusText.innerText = "SYNCHRONIZING_SOIL...";
        if(progress > 30 && progress <= 70) statusText.innerText = "PLANTING_RESOURCES...";
        if(progress > 70) statusText.innerText = "ESTABLISHING_CONNECTION...";

        if (progress >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    selectScreen.style.display = 'flex'; 
                }, 800);
            }, 500);
        }
    }, 50); 
});

// ==========================================
// 2. LÓGICA DE TRIAGEM (Seu código original)
// ==========================================
function abrirTriagem() {
    document.getElementById('modal-triagem').style.display = 'flex';
}

function fecharTriagem() {
    document.getElementById('modal-triagem').style.display = 'none';
}

function selecionarPerfil(perfil) {
    fecharTriagem();
    if (perfil === 'produtor') {
        window.location.href = './semeador.html'; 
    } else if (perfil === 'apoiador') {
        window.location.href = './invest-verde.html'; 
    } else if (perfil === 'empresa') {
        window.location.href = './corporativo.html'; 
    }
}

// ==========================================
// 3. LÓGICA DE LOGIN (As funções que faltavam)
// ==========================================

// Abre a janela de login
function abrirLogin() {
    document.getElementById('modal-login').style.display = 'flex';
}

// Fecha a janela de login
function fecharLogin() {
    document.getElementById('modal-login').style.display = 'none';
}

// Permite pular do Login direto para o Cadastro
function alternarParaCadastro() {
    fecharLogin();
    abrirTriagem();
}

// COLE A SUA URL DO GOOGLE APPS SCRIPT AQUI DENTRO DAS ASPAS:
const URL_SCRIPT_GOOGLE = "https://script.google.com/macros/s/AKfycbyC7nG5j9YqFXQAlPYwuguBi0m_gyzbkpE_F3Ev7e1gqACeUKXWOp1xoi3i6tlfDA_7XA/exec";

// Função que executa a verificação na planilha
function executarLoginPopUp(event) {
    event.preventDefault(); // Evita que a página recarregue
    
    let email = document.getElementById("login-email").value;
    let senha = document.getElementById("login-senha").value;
    
    console.log("Iniciando varredura no banco de dados para:", email);
    
    var dadosLogin = {
        action: "login",
        email: email,
        password: senha
    };
    
    // Faz a comunicação com o Google Sheets
    fetch("https://script.google.com/macros/s/AKfycbyC7nG5j9YqFXQAlPYwuguBi0m_gyzbkpE_F3Ev7e1gqACeUKXWOp1xoi3i6tlfDA_7XA/exec", {
        method: "POST",
        body: JSON.stringify(dadosLogin)
    })
    .then(response => response.json())
    .then(resultado => {
        if (resultado.success) {
            console.log("Acesso autorizado!");
            // Cria o "crachá" de acesso no navegador
            localStorage.setItem("usuarioLogado", email);
            // Redireciona para o painel
            window.location.href = "./dashboard.html";
        } else {
            alert("Falha na autenticação: " + resultado.message);
        }
    })
    .catch(error => {
        console.error("Erro na comunicação com o banco:", error);
        alert("Erro de conexão ao tentar fazer login.");
    });
}