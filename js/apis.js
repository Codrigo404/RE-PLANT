/**
 * DREAMTECH - API SERVICE (PROJETO REPLANT)
 */

const REPLANT_BACKEND_URL = 'https://script.google.com/macros/s/AKfycbyC7nG5j9YqFXQAlPYwuguBi0m_gyzbkpE_F3Ev7e1gqACeUKXWOp1xoi3i6tlfDA_7XA/exec';
const ReplantAPI = {
    async cadastrarPlanta(dados) {
        const payload = { tipo: 'CPF', ...dados };
        return await this._enviar(payload);
    },

    async cadastrarEmpresa(dados) {
        const payload = { tipo: 'CNPJ', ...dados };
        return await this._enviar(payload);
    },

    async _enviar(corpo) {
        try {
            await fetch(REPLANT_BACKEND_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(corpo)
            });
            return { sucesso: true };
        } catch (erro) {
            console.error("Erro na API Replant:", erro);
            return { sucesso: false };
        }
    }
};

// --- ESTA É A FUNÇÃO QUE O SEU BOTÃO <button onclick="cadastrarPlanta()"> CHAMA ---
async function cadastrarPlanta() {
    console.log("Iniciando cadastro...");

    try {
        // Captura os dados do formulário alinhados com o novo HTML e planilha
        const dadosParaEnviar = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            telefone: document.getElementById('telefone').value,
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            referencia: document.getElementById('referencia').value,
            bairro: document.getElementById('bairro').value,
            cidadeUf: document.getElementById('cidade').value, // Mapeia o id="cidade" para o campo cidadeUf da planilha
            
            // Novos dados de segurança com os IDs exclusivos corrigidos
            login: document.getElementById('login_user').value,
            senha: document.getElementById('senha_user').value,
            email: document.getElementById('email_user').value
        };

        console.log("Dados capturados com sucesso. Enviando payload...", dadosParaEnviar);
        
        const resultado = await ReplantAPI.cadastrarPlanta(dadosParaEnviar);

        if (resultado.sucesso) {
            alert("PROTOCOLO VINCULADO COM SUCESSO! Cadastro enviado para a planilha.");
            
            // TRANSIÇÃO DE TELA DO PROTOCOLO (Avança para o Passo 2 do ID Único)
            if(document.getElementById('step-1') && document.getElementById('step-2')) {
                document.getElementById('step-1').classList.remove('active');
                document.getElementById('step-2').classList.add('active');
                
                // Gera o ID Único na tela para o Passo 2
                const randomID = "RPL-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000);
                document.getElementById('unique-id').innerText = randomID;
            }
        } else {
            alert("Erro ao enviar. Verifique sua conexão ou chaves do nó.");
        }

    } catch (error) {
        console.error("Erro ao ler campos do formulário. Verifique se os IDs no HTML estão corretos:", error);
        alert("Erro no mapeamento de dados. Verifique o painel do console.");
    }
}

// Garante o escopo global da função para o clique do botão no HTML
window.cadastrarPlanta = cadastrarPlanta;