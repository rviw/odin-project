const Gameboard = (() => {
    const SIZE = 3;

    let board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

    const getBoard = () => board.map((row) => [...row]);

    const isValidPosition = (row, col) => {
        return (
            Number.isInteger(row) &&
            Number.isInteger(col) &&
            row >= 0 &&
            row < SIZE &&
            col >= 0 &&
            col < SIZE
        );
    };

    const getCell = (row, col) => {
        if (!isValidPosition(row, col)) return null;
        return board[row][col];
    };

    const placeMark = (row, col, mark) => {
        if (!isValidPosition(row, col)) return false;
        if (board[row][col] != null) return false;

        board[row][col] = mark;
        return true;
    };

    const reset = () => {
        board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    };

    return {
        SIZE,
        getBoard,
        getCell,
        placeMark,
        reset,
    };
})();

const Player = (name, mark) => {
    let playerName = name;

    const getName = () => playerName;
    const setName = (newName) => {
        playerName = newName;
    };

    return {
        mark,
        getName,
        setName,
    };
};

const GameController = (() => {
    const player1 = Player("Player 1", "O");
    const player2 = Player("Player 2", "X");

    const setPlayerNames = (name1, name2) => {
        player1.setName(name1);
        player2.setName(name2);
    };

    let currentPlayer = player1;
    let isGameOver = false;

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const checkWinner = (mark) => {
        const b = Gameboard.getBoard();

        for (let r = 0; r < Gameboard.SIZE; r += 1) {
            if (
                b[r][0] === mark &&
                b[r][1] === mark &&
                b[r][2] === mark
            ) return true;
        }

        for (let c = 0; c < Gameboard.SIZE; c += 1) {
            if (b[0][c] === mark &&
                b[1][c] === mark &&
                b[2][c] === mark
            ) return true;
        }

        if (b[0][0] === mark &&
            b[1][1] === mark &&
            b[2][2] === mark
        ) return true;

        if (b[0][2] === mark &&
            b[1][1] === mark &&
            b[2][0] === mark
        ) return true;

        return false;
    };

    const checkTie = () => {
        const b = Gameboard.getBoard();
        return b.flat().every((cell) => cell !== null);
    };

    const playRound = (row, col) => {
        if (isGameOver) {
            return { ok: false, reason: "Game is over." };
        }

        const mark = currentPlayer.mark;
        const placed = Gameboard.placeMark(row, col, mark);

        if (!placed) {
            return { ok: false, reason: "Invalid move." };
        }

        if (checkWinner(mark)) {
            isGameOver = true;
            return { ok: true, status: "win", winner: currentPlayer };
        }

        if (checkTie()) {
            isGameOver = true;
            return { ok: true, status: "tie" };
        }

        switchTurn();
        return { ok: true, status: "continue", nextPlayer: currentPlayer };
    };

    const reset = () => {
        Gameboard.reset();
        currentPlayer = player1;
        isGameOver = false;
    };

    return {
        setPlayerNames,
        playRound,
        reset,
        getCurrentPlayer,
    };
})();

const displayController = (() => {
    const boardElement = document.getElementById("board");
    const statusElement = document.getElementById("status");

    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const startBtn = document.getElementById("startBtn");

    const setStatus = (text) => {
        statusElement.textContent = text;
    }

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        boardElement.innerHTML = "";

        for (let row = 0; row < Gameboard.SIZE; row += 1) {
            for (let col = 0; col < Gameboard.SIZE; col += 1) {
                const cell = document.createElement("button");
                cell.type = "button";
                cell.classList.add("cell");
                cell.dataset.row = String(row);
                cell.dataset.col = String(col);
                cell.textContent = board[row][col] ?? "";
                boardElement.appendChild(cell);
            }
        }
    };

    const updateTurnStatus = () => {
        const current = GameController.getCurrentPlayer();
        setStatus(`${current.getName()}'s turn (${current.mark}).`);
    };

    const handleBoardClick = (event) => {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) return;
        if (!target.classList.contains("cell")) return;

        const row = Number(target.dataset.row);
        const col = Number(target.dataset.col);

        const result = GameController.playRound(row, col);

        if (!result.ok) {
            setStatus(result.reason);
            return;
        }

        renderBoard();

        if (result.status === "win") {
            setStatus(`${result.winner.getName()} wins.`);
            return;
        }

        if (result.status === "tie") {
            setStatus("It's a tie.");
            return;
        }

        setStatus(`${result.nextPlayer.getName()}'s turn (${result.nextPlayer.mark}).`);
    };

    const handleStart = () => {
        const name1 = player1Input.value.trim() || "Player 1";
        const name2 = player2Input.value.trim() || "Player 2";

        GameController.setPlayerNames(name1, name2);
        GameController.reset()
        renderBoard();
        updateTurnStatus();
    }

    const init = () => {
        boardElement.addEventListener("click", handleBoardClick);
        startBtn.addEventListener("click", handleStart);
        
        handleStart();
    };

    return {
        init
    };
})();

displayController.init();