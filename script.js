const cells =
    document.querySelectorAll(".cell");

const statusText =
    document.getElementById("statusText");

const statusDot =
    document.getElementById("statusDot");

const playerXCard =
    document.getElementById("playerXCard");

const playerOCard =
    document.getElementById("playerOCard");

const scoreXElement =
    document.getElementById("scoreX");

const scoreOElement =
    document.getElementById("scoreO");

const drawScoreElement =
    document.getElementById("drawScore");

const newRoundButton =
    document.getElementById("newRound");

const resetButton =
    document.getElementById("resetIcon");

const resultOverlay =
    document.getElementById("resultOverlay");

const resultSymbol =
    document.getElementById("resultSymbol");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const playAgainButton =
    document.getElementById("playAgain");

const winLine =
    document.getElementById("winLine");


let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];


let currentPlayer = "X";

let gameActive = true;

let scoreX = 0;

let scoreO = 0;

let draws = 0;


const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


cells.forEach((cell) => {

    cell.addEventListener(
        "click",
        () => {

            const index =
                Number(
                    cell.dataset.index
                );


            if (
                board[index] !== "" ||
                !gameActive
            ) {
                return;
            }


            board[index] =
                currentPlayer;


            cell.textContent =
                currentPlayer;


            cell.classList.add(
                currentPlayer
                    .toLowerCase()
            );


            checkGame();

        }
    );

});


function checkGame() {

    let winningCombination =
        null;


    for (
        const combination
        of winningCombinations
    ) {

        const [a, b, c] =
            combination;


        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            winningCombination =
                combination;

            break;

        }

    }


    if (winningCombination) {

        gameActive = false;


        winningCombination
            .forEach((index) => {

                cells[index]
                    .classList
                    .add("winner");

            });


        if (
            currentPlayer === "X"
        ) {

            scoreX++;

            scoreXElement
                .textContent =
                scoreX;

        } else {

            scoreO++;

            scoreOElement
                .textContent =
                scoreO;

        }


        statusText.textContent =
            `Player ${currentPlayer} wins`;


        drawWinningLine(
            winningCombination,
            currentPlayer
        );


        setTimeout(() => {

            showWinner(
                currentPlayer
            );

            createConfetti();

        }, 650);


        return;

    }


    if (
        !board.includes("")
    ) {

        gameActive = false;

        draws++;

        drawScoreElement
            .textContent =
            draws;


        statusText.textContent =
            "It's a draw";


        setTimeout(() => {

            showDraw();

        }, 350);


        return;

    }


    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";


    updateTurn();

}


function updateTurn() {

    statusText.textContent =
        `Player ${currentPlayer}, your turn`;


    if (
        currentPlayer === "X"
    ) {

        playerXCard
            .classList
            .add(
                "active-player"
            );

        playerOCard
            .classList
            .remove(
                "active-player"
            );

        statusDot.style.background =
            "#b98ca2";

    } else {

        playerOCard
            .classList
            .add(
                "active-player"
            );

        playerXCard
            .classList
            .remove(
                "active-player"
            );

        statusDot.style.background =
            "#8795ae";

    }

}


function drawWinningLine(
    combination,
    player
) {

    const firstCell =
        cells[
            combination[0]
        ].getBoundingClientRect();


    const lastCell =
        cells[
            combination[2]
        ].getBoundingClientRect();


    const boardRect =
        document
            .querySelector(
                ".board-wrapper"
            )
            .getBoundingClientRect();


    const startX =
        firstCell.left +
        firstCell.width / 2 -
        boardRect.left;


    const startY =
        firstCell.top +
        firstCell.height / 2 -
        boardRect.top;


    const endX =
        lastCell.left +
        lastCell.width / 2 -
        boardRect.left;


    const endY =
        lastCell.top +
        lastCell.height / 2 -
        boardRect.top;


    const distance =
        Math.hypot(
            endX - startX,
            endY - startY
        );


    const angle =
        Math.atan2(
            endY - startY,
            endX - startX
        ) *
        180 /
        Math.PI;


    winLine.style.left =
        `${startX}px`;


    winLine.style.top =
        `${startY}px`;


    winLine.style.background =
        player === "X"
            ? "#b98ca2"
            : "#8795ae";


    winLine.style.transform =
        `rotate(${angle}deg)`;


    winLine.style.opacity =
        "1";


    requestAnimationFrame(
        () => {

            winLine.style.width =
                `${distance}px`;

        }
    );

}


function showWinner(player) {

    resultSymbol.textContent =
        player;


    resultTitle.textContent =
        `Player ${player} wins!`;


    resultMessage.textContent =
        "A perfect little three in a row.";


    if (player === "X") {

        resultSymbol
            .style
            .background =
            "#f1e4ea";


        resultSymbol
            .style
            .color =
            "#b98ca2";

    } else {

        resultSymbol
            .style
            .background =
            "#e5e9f0";


        resultSymbol
            .style
            .color =
            "#8795ae";

    }


    resultOverlay
        .classList
        .add("show");

}


function showDraw() {

    resultSymbol.textContent =
        "♡";


    resultSymbol
        .style
        .background =
        "#eeeae5";


    resultSymbol
        .style
        .color =
        "#817a74";


    resultTitle.textContent =
        "It's a draw";


    resultMessage.textContent =
        "No winner this time. Rematch?";


    resultOverlay
        .classList
        .add("show");

}


function createConfetti() {

    const colors = [

        "#b98ca2",
        "#8795ae",
        "#d9b8c7",
        "#b8c1d1",
        "#e8d9c9"

    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const piece =
            document
                .createElement(
                    "div"
                );


        piece.classList
            .add("confetti");


        piece.style.left =
            `${Math.random() * 100}vw`;


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.animationDelay =
            `${Math.random() * 0.4}s`;


        document.body
            .appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 2200);

    }

}


function newRound() {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    currentPlayer = "X";

    gameActive = true;


    cells.forEach(
        (cell) => {

            cell.textContent =
                "";


            cell.classList
                .remove(
                    "x",
                    "o",
                    "winner"
                );

        }
    );


    winLine.style.width =
        "0";


    winLine.style.opacity =
        "0";


    resultOverlay
        .classList
        .remove("show");


    updateTurn();

}


function resetGame() {

    scoreX = 0;

    scoreO = 0;

    draws = 0;


    scoreXElement
        .textContent =
        0;


    scoreOElement
        .textContent =
        0;


    drawScoreElement
        .textContent =
        0;


    newRound();

}


newRoundButton
    .addEventListener(
        "click",
        newRound
    );


resetButton
    .addEventListener(
        "click",
        resetGame
    );


playAgainButton
    .addEventListener(
        "click",
        newRound
    );