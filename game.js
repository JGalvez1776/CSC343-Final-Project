var WIDTH = 7;
var HEIGHT = 6;
var player = 0;
var board = Array.from(Array(HEIGHT), () => new Array(WIDTH));
var count = 0;
var colors = ["#FF0000", "#0000FF"];
var black = "#121213";
var canClick = false;
var moves = [];

// TODO: 
// - Save the moves log to replay games/leaderboards
//      Look into localStorage
// - Check diagonals to see if the game is over
// - Add button to play again
// - Maybe add an animation to the home screen
// - Fix bug where game ends after a column is full then clicked
//           FIXED
// - Add outline to board 
// - Add draw support


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
        setPlayerColor(colors[player]);
        
    }
    canClick = true;
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

function setPlayerColor(color) {
    var hovers = document.querySelectorAll(".hoverspot");
    
    for (var i = 0; i < WIDTH; i++) {
        hovers[i].style.backgroundColor = color;
    }
    
}

function getXIndex(gameButton) {
    row = gameButton.parentNode.parentNode;
    children = row.children;
    i = 0;
    while (i < 7 && children[i] != gameButton.parentNode) {
        i++;
    }
    return i;
}

function setColumnOpacity(index, value) {
    row = document.querySelectorAll(".hoverspot");
    row[index].style.opacity=value;
}

function onLoad() {
    console.log("Initalized");
    setPlayerColor(colors[0]);
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            board[y][x] = -1;
        }
    }

    squares = document.querySelectorAll(".gameButton");
    for (var i = 0; i < WIDTH * HEIGHT; i++) {
        square = squares[i];
        square.addEventListener("mouseover", function() {
            var x = getXIndex(this);
            setColumnOpacity(x, "1");
        });
        square.addEventListener("mouseout", function() {
            var x = getXIndex(this);
            setColumnOpacity(x, "0"); 
        });
    }

    canClick = true;
}



onLoad();
