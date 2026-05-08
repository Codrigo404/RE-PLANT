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

    // Captura os dados do seu formulário (verifique se os IDs no HTML são esses mesmos)
    const dadosParaEnviar = {
    nome: document.getElementById('nome').value,
    endereco: document.getElementById('logradouro').value + ", " + document.getElementById('referencia').value,
    
    // Captura pelo ID novo e envia para a coluna "especie"
    especie: document.getElementById('especie_planta').value, 

    idPlanta: "RP-" + Math.floor(Math.random() * 1000), 
    inicioOperacao: new Date().toLocaleDateString('pt-BR'),
    urlImagem: "" 
};
    const resultado = await ReplantAPI.cadastrarPlanta(dadosParaEnviar);

    if (resultado.sucesso) {
        alert("Cadastro enviado com sucesso para a planilha!");
    } else {
        alert("Erro ao enviar. Verifique sua conexão.");
    }
}

window.cadastrarPlanta = cadastrarPlanta;