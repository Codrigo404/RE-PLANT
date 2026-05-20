
        // Lógica de Carregamento
        window.addEventListener('load', () => {
            const fill = document.getElementById('progress-fill');
            const statusText = document.getElementById('status-text');
            const seedlings = document.querySelectorAll('.seedling');
            const loader = document.getElementById('loading-screen');
            const selectScreen = document.getElementById('select-screen');

            let progress = 0;
            
            // Simulação de carregamento técnico
            const interval = setInterval(() => {
                progress += 1; // Velocidade do carregamento
                fill.style.width = progress + '%';

                // Lógica para "plantar" as mudinhas conforme o progresso
                // 100% dividido por 5 mudinhas = uma a cada 20%
                let seedlingIndex = Math.floor(progress / 20);
                if(seedlingIndex < seedlings.length) {
                    seedlings[seedlingIndex].classList.add('planted');
                }

                if(progress <= 30) statusText.innerText = "SYNCHRONIZING_SOIL...";
                if(progress > 30 && progress <= 70) statusText.innerText = "PLANTING_RESOURCES...";
                if(progress > 70) statusText.innerText = "ESTABLISHING_CONNECTION...";

                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // Saída da tela de loading
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                            selectScreen.style.display = 'flex'; // Mostra a tela de escolha
                        }, 800);
                    }, 500);
                }
            }, 50); // Ajuste aqui para ser mais rápido ou lento
        });
  
        // Função para abrir a janela de triagem
function abrirTriagem() {
    document.getElementById('modal-triagem').style.display = 'flex';
}

// Função para fechar a janela se a pessoa clicar no "X"
function fecharTriagem() {
    document.getElementById('modal-triagem').style.display = 'none';
}

// Função que manda para a página de cadastro certa com base no perfil escolhido
function selecionarPerfil(perfil) {
    fecharTriagem();
    if (perfil === 'produtor') {
        window.location.href = './semeador.html'; // Vai para a página do produtor/sítio
    } else if (perfil === 'apoiador') {
        window.location.href = './invest-verde.html'; // Vai para a página de cotas/apoiador
    } else if (perfil === 'empresa') {
        window.location.href = './corporativo.html'; // Vai para a página de soluções ESG
    }
}