function gerarCertificadoComInventario() {
    // 1. Pegar dados do formulário
    const razao = document.getElementById('razao-social').value;
    const cnpj = document.getElementById('cnpj').value;
    const qtd = parseInt(document.getElementById('gasto-carbono').value) || 10; // Exemplo: usa a média de gasto como qtd

    // 2. Preencher cabeçalho do certificado
    document.getElementById('cert-razao').innerText = razao.toUpperCase();
    document.getElementById('cert-cnpj').innerText = cnpj;
    document.getElementById('cert-qtd').innerText = qtd;
    document.getElementById('cert-co2').innerText = (qtd * 0.025).toFixed(2) + " TON/ANO";

    // 3. Gerar as linhas da tabela de ativos
    const corpoTabela = document.getElementById('lista-plantas-corpo');
    corpoTabela.innerHTML = "";

    const especies = ["Ipê Amarelo", "Jacarandá", "Pau-Brasil", "Cedro"];
    
    for (let i = 0; i < qtd; i++) {
        const idPlanta = `RPL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        const lat = (Math.random() * (-15.75 - -15.80) + -15.80).toFixed(6);
        const lng = (Math.random() * (-47.85 - -47.95) + -47.95).toFixed(6);
        
        const row = `
            <tr>
                <td style="color: var(--neon-green); font-weight: bold;">${idPlanta}</td>
                <td>${especies[Math.floor(Math.random() * especies.length)]}</td>
                <td>0.5 Anos</td>
                <td>25kg/ano</td>
                <td>Semeador_ID_${Math.floor(Math.random() * 999)}</td>
                <td>
                    <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" style="color: var(--cyber-blue);">
                        ${lat}, ${lng}
                    </a>
                </td>
            </tr>
        `;
        corpoTabela.innerHTML += row;
    }

    // 4. Mostrar a tela do certificado
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';
}