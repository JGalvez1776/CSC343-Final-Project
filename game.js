var WIDTH = 7;
var HEIGHT = 6;
var player = 0;
var board = Array.from(Array(HEIGHT), () => new Array(WIDTH));
var count = 0;
var colors = ["#FF0000", "#0000FF"]
var canClick = false;
var moves = [];

// TODO: 
// - Save the moves log to replay games/leaderboards
//      Look into localStorage
// - Check diagonals to see if the game is over
// - Show the current player's turn
// - Add button to play again
// - Maybe add an animation to the home screen


// 7 wide 
// 6 tall

// -1 = EMPTY
//  0 = Player One
//  1 = Player Two  

function columnClicked(x) { 
    if (!canClick) return;
    canClick = false;
    var y = place(x);
    if (y == -1) {
        // Board full
        // Give error
        console.log("FULL ROW");
    } else {
        count++;
        console.log("X: " + x + " Y: " + y);
        updateBoard(x, y, player);
        moves.push(x);
        var result = determineResult();
        if (result != -1) {
            console.log(moves);
            alert("Player " + String(player + 1) + " Wins!");
            return;
        }
        player = (player + 1) % 2;
        canClick = true;
    }
}

function updateBoard(x, y, player) {
    board[y][x] = player;

    var canvas = document.getElementById(String(y)).children[x].children[0];
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = colors[player];
    ctx.fillRect(0, 0, 500, 500);
}

// -1 = Continue
//  0 = Player one wins
//  1 = Player two wins
function determineResult() {
    // Checks left-right
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH - 3; x++) {
            var result = check(board[y][x], board[y][x + 1],
                board[y][x + 2], board[y][x + 3]);
            if (result != -1) {
                return result;
            }
        }
    }

    // Checks up-down
    for (var y = 0; y < HEIGHT - 3; y++) {
        for (var x = 0; x < WIDTH; x++) {
            var result = check(board[y][x], board[y + 1][x],
                board[y + 2][x], board[y + 3][x]);
            if (result != -1) {
                return result;
            }
        }
    }

    // Checks up-left-to-down-right

    // checks down-left-to-down-right

    return -1;
}

function check(a, b, c, d) {
    return a == b && b == c && c == d ? a : -1;
}

function place(x) {
    insertIndex = -1;
    for (var y = 0; y < HEIGHT; y++) {
        if (board[y][x] == -1 && insertIndex == -1) {
            insertIndex = y;
        }
    }
    return insertIndex;
}

function onLoad() {
    console.log("Initalized");
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            board[y][x] = -1;
        }
    }
    canClick = true;
}



onLoad();
