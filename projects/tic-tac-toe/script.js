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