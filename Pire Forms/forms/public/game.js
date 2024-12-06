const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bodyWidth = 100;
let bodyHeight = 150;
let bodyX = canvas.width / 2 - bodyWidth / 2;

let personIndex = 0;
const personImages = [];
let lixosConsumidos = 0;
let tempoInicio = Date.now();
let vidas = 3;
let trashArray = [];
let trashSpeed = 3;
let quizAtivo = false;
let perguntaAtual = null;

const perguntas = [
    {
        pergunta: "Combien de tortues meurent chaque année à cause du plastique ?",
        opcoes: ["1 000", "10 000", "1 000 000", "100"],
        resposta: "1 000 000"
    },
    {
        pergunta: "Quelle est la durée de vie moyenne d'une bouteille plastique dans l'océan ?",
        opcoes: ["100 ans", "250 ans", "450 ans", "1 000 ans"],
        resposta: "450 ans"
    },
    {
        pergunta: "Quel pourcentage des océans est couvert de plastique ?",
        opcoes: ["10%", "20%", "30%", "40%"],
        resposta: "40%"
    },
    {
        pergunta: "Combien de litres d'eau contient un océan ?",
        opcoes: ["1 million", "1 milliard", "1 trillion", "1 quadrillion"],
        resposta: "1 quadrillion"
    },
    {
        pergunta: "Quel est le poids moyen d'une baleine bleue adulte ?",
        opcoes: ["10 tonnes", "50 tonnes", "150 tonnes", "200 tonnes"],
        resposta: "150 tonnes"
    },
    {
        pergunta: "En quelle année a été inventée la paille en plastique ?",
        opcoes: ["1928", "1938", "1948", "1958"],
        resposta: "1938"
    },
    {
        pergunta: "Quel est l'élément chimique principal du plastique ?",
        opcoes: ["Hydrogène", "Carbone", "Azote", "Silicium"],
        resposta: "Carbone"
    },
    {
        pergunta: "Combien de temps un chewing-gum met-il pour se décomposer ?",
        opcoes: ["5 ans", "10 ans", "20 ans", "50 ans"],
        resposta: "50 ans"
    },
    {
        pergunta: "Combien de litres de pétrole sont nécessaires pour fabriquer un kilo de plastique ?",
        opcoes: ["1 litre", "2 litres", "5 litres", "10 litres"],
        resposta: "2 litres"
    },
    {
        pergunta: "Quel est le pays qui produit le plus de déchets plastiques au monde ?",
        opcoes: ["États-Unis", "Chine", "Inde", "Brésil"],
        resposta: "Chine"
    }
];

const totalDeLixo = 150000000000;

function calcularTempoEstimado() {
    const segundosPassados = (Date.now() - tempoInicio) / 1000;

    if (segundosPassados <= 0 || lixosConsumidos <= 0) {
        return "Nettoyage des océans en cours...";
    }

    const taxaPorSegundo = lixosConsumidos / segundosPassados;
    const tempoEstimadoSegundos = totalDeLixo / taxaPorSegundo;
    const anos = Math.floor(tempoEstimadoSegundos / (60 * 60 * 24 * 365));

    return `À cette vitesse, il faudrait environ ${anos} ans pour nettoyer les océans.`;
}

async function loadPersonImages() {
    const personPaths = [
        'images/boy-posing-relaxed.png',
        'images/concentrated-young-man-chatting-by-mobile-phone.png',
        'images/full-body-portrait-young-casual-man-smiling-isolated-white-wall.png',
        'images/full-shot-woman-with-swimming-equipment.png',
        'images/happy-teenager-boy-casual-standing.png',
        'images/happy-young-man-standing-isolated-laptop-computer.png',
        'images/portrait-casual-young-young-woman-standing-with-hands-folded.png'
    ];

    for (const src of personPaths) {
        const img = await loadImage(src);
        personImages.push(img);
    }
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function drawPerson() {
    if (personImages.length > 0) {
        const person = personImages[personIndex];
        ctx.drawImage(person, bodyX, canvas.height - bodyHeight, bodyWidth, bodyHeight);
    }
}

function drawTrash() {
    trashArray.forEach((trash) => {
        ctx.drawImage(trash.image, trash.x, trash.y, trash.width, trash.height);
    });
}

function updateTrash() {
    if (quizAtivo) return;

    trashArray.forEach((trash) => {
        trash.y += trashSpeed;

        if (trash.y > canvas.height) {
            vidas--;
            trash.y = -50;
            trash.x = Math.random() * (canvas.width - trash.width);

            if (vidas <= 0 && !quizAtivo) {
                exibirQuiz();
            }
        }

        if (
            trash.y + trash.height >= canvas.height - bodyHeight &&
            trash.x + trash.width > bodyX &&
            trash.x < bodyX + bodyWidth
        ) {
            lixosConsumidos++;
            trash.y = -50;
            trash.x = Math.random() * (canvas.width - trash.width);
        }
    });
}

function exibirQuiz() {
    quizAtivo = true;
    perguntaAtual = perguntas[Math.floor(Math.random() * perguntas.length)];

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(50, 100, canvas.width - 100, canvas.height - 200);

    ctx.fillStyle = "white";
    ctx.font = "24px 'Comic Sans MS'";
    ctx.fillText("C'est l'heure du quiz: retrouvez une vie !", canvas.width / 2 - 150, 150);

    ctx.font = "20px 'Comic Sans MS'";
    ctx.fillText(perguntaAtual.pergunta, 70, 200);

    perguntaAtual.opcoes.forEach((opcao, index) => {
        ctx.fillStyle = "white";
        ctx.fillRect(70, 250 + index * 50, canvas.width - 140, 40);

        ctx.fillStyle = "black";
        ctx.font = "20px 'Tapirus Cursive'";
        ctx.fillText(opcao, 80, 280 + index * 50);
    });

    ctx.fillStyle = "red";
    ctx.font = "18px 'Comic Sans MS'";
    ctx.fillText("Cliquez sur la bonne réponse pour continuer!", 70, canvas.height - 50);
}

canvas.addEventListener("click", (e) => {
    if (!quizAtivo) return;

    const clickX = e.offsetX;
    const clickY = e.offsetY;

    perguntaAtual.opcoes.forEach((opcao, index) => {
        const opcaoX = 70;
        const opcaoY = 250 + index * 50;
        const opcaoLargura = canvas.width - 140;
        const opcaoAltura = 40;

        if (
            clickX >= opcaoX &&
            clickX <= opcaoX + opcaoLargura &&
            clickY >= opcaoY &&
            clickY <= opcaoY + opcaoAltura
        ) {
            if (opcao === perguntaAtual.resposta) {
                vidas = 3;
                quizAtivo = false;
                update();
            } else {
                ctx.fillStyle = "red";
                ctx.fillText("Mauvaise réponse! Essayer à nouveau!", 70, canvas.height - 20);
            }
        }
    });
});

function update() {
    if (quizAtivo) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPerson();
    drawTrash();
    updateTrash();

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Déchets collectés : ${lixosConsumidos} kg`, 10, 30);
    ctx.fillText(`Vies restantes : ${vidas}`, 10, 60);

    const mensagemCritica = calcularTempoEstimado();
    ctx.fillText(mensagemCritica, 10, 90);

    requestAnimationFrame(update);
}

async function gameLoop() {
    await loadPersonImages();

    const trashImages = [
        'images/beer.png',
        'images/brahma.jpg',
        'images/pneu.png',
        'images/oleo.png',
        'images/lixotoxico.png',
        'images/bubbaloo.png',
        'images/cigarrete.png',
        'images/iphone.png',
        'images/fone.png',
        'images/solvente.png',
        'images/ruffles.png',
        'images/10027455.png',
        'images/canudinho.png',
        'images/trash.png',
        'images/latinhaguarana.png',
        'images/sacoplastico.png',
        'images/rede.png',
        'images/papelhigienico.png'
    ];

    for (let i = 0; i < 10; i++) {
        const img = await loadImage(trashImages[Math.floor(Math.random() * trashImages.length)]);
        trashArray.push({
            x: Math.random() * (canvas.width - 50),
            y: Math.random() * -500,
            width: 50,
            height: 50,
            image: img
        });
    }

    update();

    document.addEventListener("mousemove", (e) => {
        const canvasCenter = canvas.width / 2;
        const mouseDistanceFromCenter = e.clientX - canvas.offsetLeft - canvasCenter;

        bodyX = canvasCenter - mouseDistanceFromCenter - bodyWidth / 2;
        if (bodyX < 0) bodyX = 0;
        if (bodyX + bodyWidth > canvas.width) bodyX = canvas.width - bodyWidth;
    });
}

gameLoop();


