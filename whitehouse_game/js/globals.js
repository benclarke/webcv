//global variables and functions for game board, etc.

// size of the game board
var boardWidth = 1300;
var boardHeight = 2300;

// size of viewport
var viewportWidth = 1300;
var viewportHeight = 600;

// size of each square on the board
var boardPieceWidth = 100;
var boardPieceHeight = 100;

//offsets
var initialOffsetY = -boardHeight + viewportHeight;
var offsetY = initialOffsetY;

// width of the White House entrance
var goalWidth = 3 * boardPieceWidth;

// for adding new enemies at different frequencies
var count = 0;

// all enemies and goodies that are added once at the beginning of game play
var allPieces = [];

// all enemies generated after start of game play
var addedEnemies = [];

// for sound effects
var audio;


// for enemies and goodies added at start of game play
function createCharacters() {

    //add Mitt and Hil
    var mitt = new MittGhost();

    var hillary = new Hillary();

    var reagan = new Reagan();

    allPieces = [mitt, hillary, reagan];

    // add all randomly placed pieces, goodies and enemies
    piecesArray(1, SkeletonClosetBlack);
    piecesArray(1, Koch);
    piecesArray(player.skeletons,SkeletonClosetRed);
    piecesArray(player.gaffes,Gaffe);
    piecesArray(player.inflame,Inflame);
    piecesArray(player.uschamber,Uscc);

    //add a few generated enemies to start the game
    addedEnemies[0] = new Trump();
    addedEnemies[1] = new RightWingNut();
    addedEnemies[2] = new Trump();
    addedEnemies[3] = new RightWingNut();

}

function piecesArray(pieceQty, constructorType){
    var pieces = [];
    for (var i = 0; i < pieceQty; i++) {
        var piece = new constructorType();
        var position = randomPosition(piece.boundaryWidth, piece.boundaryHeight, piece.boundaryX, piece.boundaryY);
        piece.x = position[0];
        piece.y = position[1];
        piece.index = allPieces.push(piece);
      }
    return pieces;
}

// for enemies that are added during game play
function addEnemies(dt) {
    count++;

    var rightwardness = player.x / boardPieceWidth + 1;

    var primaries = player.y >= 10 * boardPieceHeight ? true : false;
    var trumpTime = Math.floor(Math.random() * 500  + 1);

    var generalElection = player.y < 9 * boardPieceHeight ? true : false;
    var billTime = Math.floor(Math.random() * 200 + 1);

    var trump, rightWingNut, bill;

    if (primaries === true && count % trumpTime === 0 ) {
        trump = new Trump();
        addedEnemies.push(trump);
        if (addedEnemies.length > 30) {addedEnemies.shift();}
    }
    if (count % (rightwardness * 10) === 0 ) {
        rightWingNut = new RightWingNut();
        rightWingNut.speed = (2000 / rightwardness) * player.enemySpeed;
        addedEnemies.push(rightWingNut);
        if (addedEnemies.length > 30) {addedEnemies.shift();}
    }
    if (generalElection === true && count % billTime === 0) {
        bill = new Bill();
        addedEnemies.push(bill);
        if (addedEnemies.length > 30) {addedEnemies.shift();}
    }

}

// generate a random position, based on boundary width, height and x and y offset
function randomPosition (boundaryWidth, boundaryHeight, boundaryX, boundaryY) {
    var x = (Math.floor(Math.random() * boundaryWidth) + boundaryX) * boardPieceWidth;
    var y = (Math.floor(Math.random() * boundaryHeight) + boundaryY) * boardPieceHeight;
    return [x,y];
}

