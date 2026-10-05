const caixaPrincipal = document.querySelector('.caixa-principal');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');

const perguntas = [
    {
        enunciado: "♻️ Qual é a importância de reciclar o lixo no nosso dia a dia?",
        alternativas: [
            {
                texto: "🌱 Reciclar protege o meio ambiente!",
                correta: true,
                explicacao: "🌱 Você acertou! A reciclagem ajuda a reduzir a quantidade de lixo, diminuir a poluição e proteger o meio ambiente. ♻️🌎"
            },
            {
                texto: "💧 Economiza recursos!",
                correta: false,
                explicacao: "💧 Você errou! Embora a reciclagem também ajude a economizar recursos naturais, a pergunta destaca a importância da reciclagem para proteger o meio ambiente. ♻️🌎"
            }
        ]
    },

    {
        enunciado: "🌎 O que é o efeito estufa e como ele afeta o clima da Terra?",
        alternativas: [
            {
                texto: "☀️ É um fenômeno natural que retém o calor.",
                correta: true,
                explicacao: "☀️ Você acertou! O efeito estufa é um fenômeno natural que retém parte do calor na atmosfera e ajuda a manter a Terra em uma temperatura adequada para a vida. 🌎🌡️"
            },
            {
                texto: "🏭 É a poluição provocada apenas pelas indústrias.",
                correta: false,
                explicacao: "🏭 Você errou! O efeito estufa não é simplesmente uma poluição causada pelas indústrias. Ele é um fenômeno natural, mas as atividades humanas podem aumentar os gases de efeito estufa e intensificar o aquecimento global. 🌡️🌎"
            }
        ]
    },

    {
        enunciado: "🌳 Por que é importante preservar as florestas?",
        alternativas: [
            {
                texto: "🐦 Porque elas abrigam animais e plantas.",
                correta: true,
                explicacao: "🐦 Você acertou! As florestas são importantes porque servem de habitat para muitos animais e plantas, ajudando a preservar a biodiversidade. 🌳🐾🌎"
            },
            {
                texto: "🏭 Porque elas aumentam a poluição.",
                correta: false,
                explicacao: "🏭 Você errou! As florestas não aumentam a poluição. Pelo contrário, elas ajudam a melhorar o ambiente, preservar a biodiversidade e contribuir para o equilíbrio do clima. 🌳🌎"
            }
        ]
    },

    {
        enunciado: "💧 Qual atitude ajuda a economizar água?",
        alternativas: [
            {
                texto: "🚿 Fechar a torneira enquanto escova os dentes.",
                correta: true,
                explicacao: "🚿 Você acertou! Fechar a torneira enquanto escova os dentes evita o desperdício de água. É uma atitude simples, mas importante para preservar esse recurso natural. 💧🌱"
            },
            {
                texto: "💦 Deixar a torneira aberta sem necessidade.",
                correta: false,
                explicacao: "💦 Você errou! Deixar a torneira aberta sem necessidade desperdiça água. O ideal é fechar a torneira sempre que ela não estiver sendo utilizada. 💧🌎"
            }
        ]
    },

    {
        enunciado: "☀️ Qual fonte de energia é considerada renovável?",
        alternativas: [
            {
                texto: "🌞 Energia solar.",
                correta: true,
                explicacao: "🌞 Você acertou! A energia solar é renovável porque utiliza a luz e o calor do Sol, uma fonte natural que está disponível continuamente. ☀️🔋🌎"
            },
            {
                texto: "🛢️ Petróleo.",
                correta: false,
                explicacao: "🛢️ Você errou! O petróleo é um combustível fóssil e não renovável. Ele leva milhões de anos para se formar e pode se esgotar com o uso contínuo. ⛽🌎"
            }
        ]
    }
];

let atual = 0;
let acertos = 0;
let erros = 0;
let historiaFinal = "";
let perguntaAtual;


// =====================================================
// CAPA INICIAL
// =====================================================

function mostraCapaInicial() {

    // Esconde o quiz
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";

    if (caixaResultado) {
        caixaResultado.style.display = "none";
    }

    // Cria a capa
    const capa = document.createElement("div");

    capa.classList.add("capa-inicial");

    capa.innerHTML = `
        <div class="icone-capa">🌎</div>

        <h1>🌱 Jornada Meio Ambiente</h1>

        <p>
            Descubra como pequenas atitudes podem ajudar
            a preservar o nosso planeta! 🌳💧♻️
        </p>

        <p>
            Responda às perguntas, aprenda sobre sustentabilidade
            e teste seus conhecimentos.
        </p>
    `;


    // =================================================
    // BOTÃO INICIAR
    // =================================================

    const botaoIniciar = document.createElement("button");

    botaoIniciar.textContent = "🚀 Iniciar projeto";

    botaoIniciar.classList.add("botao-iniciar");


    botaoIniciar.addEventListener("click", function () {

        // Remove a capa
        capa.remove();

        // Mostra novamente o quiz
        caixaPerguntas.style.display = "block";
        caixaAlternativas.style.display = "block";

        // Reinicia o quiz
        atual = 0;
        acertos = 0;
        erros = 0;
        historiaFinal = "";

        // Começa a primeira pergunta
        mostraPergunta();

    });


    capa.appendChild(botaoIniciar);

    // Coloca a capa antes das perguntas
    caixaPrincipal.insertBefore(capa, caixaPerguntas);
}


// =====================================================
// MOSTRA A PERGUNTA
// =====================================================

function mostraPergunta() {

    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent =
        perguntaAtual.enunciado;

    caixaAlternativas.textContent = "";

    mostraAlternativas();
}


// =====================================================
// MOSTRA AS ALTERNATIVAS
// =====================================================

function mostraAlternativas() {

    for (const alternativa of perguntaAtual.alternativas) {

        const botaoAlternativa =
            document.createElement("button");

        botaoAlternativa.textContent =
            alternativa.texto;

        botaoAlternativa.classList.add(
            "botao-alternativa"
        );

        botaoAlternativa.addEventListener(
            "click",
            function () {

                respostaSelecionada(alternativa);

            }
        );

        caixaAlternativas.appendChild(
            botaoAlternativa
        );
    }
}


// =====================================================
// VERIFICA A RESPOSTA
// =====================================================

function respostaSelecionada(alternativa) {

    const botoes =
        caixaAlternativas.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });


    if (alternativa.correta) {

        acertos++;

        caixaPerguntas.textContent =
            "✅ Parabéns! Você acertou!";

    } else {

        erros++;

        caixaPerguntas.textContent =
            "❌ Ops! Você errou!";

    }


    historiaFinal +=
        "\n\n" +
        perguntaAtual.enunciado +
        "\n" +
        alternativa.explicacao;


    caixaAlternativas.textContent = "";


    // =================================================
    // EXPLICAÇÃO
    // =================================================

    const caixaExplicacao =
        document.createElement("div");

    caixaExplicacao.classList.add(
        "explicacao"
    );

    caixaExplicacao.textContent =
        alternativa.explicacao;

    caixaAlternativas.appendChild(
        caixaExplicacao
    );


    // =================================================
    // BOTÃO PRÓXIMA PERGUNTA
    // =================================================

    const botaoContinuar =
        document.createElement("button");


    if (atual === perguntas.length - 1) {

        botaoContinuar.textContent =
            "🏆 Ver resultado";

    } else {

        botaoContinuar.textContent =
            "➡️ Próxima pergunta";

    }


    botaoContinuar.classList.add(
        "botao-continuar"
    );


    botaoContinuar.addEventListener(
        "click",
        function () {

            atual++;

            mostraPergunta();

        }
    );


    caixaAlternativas.appendChild(
        botaoContinuar
    );
}


// =====================================================
// RESULTADO FINAL
// =====================================================

function mostraResultado() {

    caixaPerguntas.textContent =
        "🌎✨ Sua jornada pelo meio ambiente terminou! ✨🌎";


    textoResultado.textContent =

        "🎉 Parabéns por completar o quiz!\n\n" +

        "✅ Acertos: " + acertos + "\n" +

        "❌ Erros: " + erros + "\n" +

        "📚 Total de perguntas: " +
        perguntas.length +

        "\n\n" +

        "📖 RESUMO DAS SUAS RESPOSTAS:" +

        historiaFinal +

        "\n\n" +

        "🌱 Cada pequena atitude faz diferença!\n\n" +

        "♻️ Reciclar ajuda a diminuir a poluição.\n" +
        "💧 Economizar água ajuda a preservar esse recurso.\n" +
        "🌳 Preservar as florestas protege a biodiversidade.\n" +
        "☀️ Utilizar energias renováveis contribui para um futuro mais sustentável.\n" +
        "🌎 Conhecer o efeito estufa ajuda a entender as mudanças no clima.\n\n" +

        "💚 O planeta precisa da participação de todos nós! 🌎🌱";


    caixaAlternativas.textContent = "";


    if (caixaResultado) {
        caixaResultado.style.display = "block";
    }


    // =================================================
    // BOTÃO JOGAR NOVAMENTE
    // =================================================

    const botaoJogarNovamente =
        document.createElement("button");

    botaoJogarNovamente.textContent =
        "🔄 Jogar novamente";

    botaoJogarNovamente.classList.add(
        "botao-jogar-novamente"
    );


    botaoJogarNovamente.addEventListener(
        "click",
        function () {

            atual = 0;
            acertos = 0;
            erros = 0;
            historiaFinal = "";


            if (caixaResultado) {
                caixaResultado.style.display =
                    "none";
            }


            mostraCapaInicial();

        }
    );


    caixaAlternativas.appendChild(
        botaoJogarNovamente
    );
}


// =====================================================
// COMEÇA PELA CAPA
// =====================================================

mostraCapaInicial();

