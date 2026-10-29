let totalCadastros = 0;
let totalEstoqueBaixo = 0;
let vinhoMaisAntigoNome = "";
let vinhoMaisAntigoSafra = 9999;

function validarTexto(mensagem) {
    let texto = prompt(mensagem);
    while (!texto || texto.trim() === "") {
        alert("Erro: O campo não pode estar vazio.");
        texto = prompt(mensagem);
    }
    return texto;
}

function validarNumero(mensagem) {
    let numero = parseInt(prompt(mensagem));
    while (isNaN(numero) || numero < 0) {
        alert("Erro: Insira um número válido e positivo.");
        numero = parseInt(prompt(mensagem));
    }
    return numero;
}

function verificarEstoqueBaixo(quantidade) {
    return quantidade < 5;
}

function classificarVinho(safra) {
    const anoAtual = 2026;
    const idade = anoAtual - safra;

    if (idade <= 3) {
        return "Jovem";
    } else if (idade <= 10) {
        return "Amadurecido";
    } else {
        return "Antigo";
    }
}

function exibirDados(nome, safra, quantidade, classificacao, estoqueBaixo) {
    const statusEstoque = estoqueBaixo ? "Sim (Alerta!)" : "Não";
    const mensagem = `--- Vinho Cadastrado ---\n` +
        `Nome: ${nome}\n` +
        `Safra: ${safra}\n` +
        `Classificação: ${classificacao}\n` +
        `Quantidade: ${quantidade}\n` +
        `Estoque Baixo: ${statusEstoque}`;

    console.log(mensagem);
    alert(mensagem);
}

function iniciarSistema() {
    let continuar = true;

    while (continuar) {
        let nomeAtual = validarTexto("Qual é o nome do vinho?");
        let safraAtual = validarNumero(`Qual a safra do vinho ${nomeAtual}?`);
        let quantidadeAtual = validarNumero(`Quantidade em estoque de ${nomeAtual}?`);

        totalCadastros++;

        let temEstoqueBaixo = verificarEstoqueBaixo(quantidadeAtual);
        if (temEstoqueBaixo) {
            totalEstoqueBaixo++;
        }

        let classificacaoAtual = classificarVinho(safraAtual);

        if (safraAtual < vinhoMaisAntigoSafra) {
            vinhoMaisAntigoSafra = safraAtual;
            vinhoMaisAntigoNome = nomeAtual;
        }

        exibirDados(nomeAtual, safraAtual, quantidadeAtual, classificacaoAtual, temEstoqueBaixo);

        let resposta = prompt("Deseja cadastrar outro vinho? (S/N)").toUpperCase();
        if (resposta !== 'S') {
            continuar = false;
        }
    }

    const resumoFinal = `=== RESUMO DE CADASTROS ===\n` +
        `Total de vinhos cadastrados: ${totalCadastros}\n` +
        `Vinhos com estoque baixo: ${totalEstoqueBaixo}\n` +
        `Vinho com safra mais antiga: ${vinhoMaisAntigoNome} (Safra: ${vinhoMaisAntigoSafra})`;

    console.log(resumoFinal);
    alert(resumoFinal);
}

iniciarSistema();