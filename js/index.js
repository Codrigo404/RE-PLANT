
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
  