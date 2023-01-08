let currentPlayer = 'x';
let currentTurn = {
    x: [],
    o: []
}
let turnNum = 0;
const winning = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
let gameOver = false;

/*I found this .ready function online and thought it would work for this,
the function works but the ready strikes itself out. The research I did lead me to
believe this format isn't really used anymore, but I haven't been able to make the
code work without it*/
$(document).ready(function() {
    $('.square').on('click', function() {
        if (!gameOver){
        turnNum++;
        $(this).text(currentPlayer);
        currentTurn[currentPlayer].push(parseInt($(this).attr('id')));
        if(currentPlayer === 'o'){
            $('#turn').text("x's turn!");
        }else {
            $('#turn').text("o's turn!");   
        }
        if(isWinner()){
            gameOutcome('win');
        }
        if(!gameOver && isTie()){
            gameOutcome('tie');
        }
        currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
    };
    });

    });

function isWinner(){
    if (turnNum < 5){
        return;
    }
    for (let i = 0; i < winning.length; i++){
        let isWinner = true;
        for (let j = 0; j < winning[i].length; j++){
            if ($.inArray(winning[i][j], currentTurn[currentPlayer]) < 0){
                isWinner = false;
                break;
            }
        }
        if (isWinner){
            return true;
        }
    }
    return false;
}

function isTie(){
    return turnNum === 9;
}
/* I tried to write a funtion that would call when a button directly on the HTML file
was clicked but I couldn't figure out how to get the .onclick to work with this.
So instead I continued below with just creating an outcome function that can then reset
the game board by adding the button to the HTML file and calling a clearBoard function.
Then I changed my .ready function above to call the gameOutcome funtion 
at the end of a game.
function clearBoard(){
    currentPlayer = 'x';
    currentTurn = {
        x: [],
        o: []
    }
    turnNum = 0;
    gameOver = false;
}

document.getElementsByClassName('restart').onclick = function() {clearBoard()};*/

function gameOutcome(kind) {
    gameOver = true;
    if(kind === 'win') {
        $('#outcome').text(currentPlayer + ' wins!');
    }else {
        $('#outcome').text('Tie Game!');
    }
    $('#outcome').append('<div id="clearBoard" onclick="clearBoard()">Play again</div')
}

function clearBoard(){
    currentPlayer = 'x';
    currentTurn = {
        x: [],
        o: []
    }
    turnNum = 0;
    gameOver = false;
    $('.square, #outcome').text('');
    $('#turn').text('x starts')
}