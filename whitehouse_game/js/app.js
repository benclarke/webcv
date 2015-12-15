//

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // what our Player looks like
    this.sprite = 'images/char-boy.png';

    // initial player status
    this.win = false;

    //initial position of player
    var initialX = 202;
    var initialY = 4 * 83 + 60;

    this.x = initialX;
    this.y = initialY;


    this.update = function(dt) {

        //if location = enemy location, start over
        for (var enemy in allEnemies) {
            // if enemy x is between the square occuppied by player
            if ( ( allEnemies[enemy].y === this.y ) && ( allEnemies[enemy].x < this.x + 101 ) && ( allEnemies[enemy].x + 50 >= this.x )) {
                // console.log(allEnemies[enemy].x)
                this.x = initialX;
                this.y = initialY;
            }
        }

        // if player wins, restart game
        if ( this.win === true ) {
            createCharacters();
        }
    };

    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // this.handleInput = function(key) {
    //     switch(key) {
    //         case 'left':
    //             this.x = this.x === 0 ? this.x : this.x - 101;
    //             break;
    //         case 'right':
    //             this.x = this.x === 404 ? this.x : this.x + 101;
    //             break;
    //         case 'up':
    //             if ( this.y === 60 ) {
    //                 this.y = initialY;
    //                 this.win = true;
    //             } else {
    //                 this.y = this.y - 83;
    //             }
    //             break;
    //         case 'down':
    //             this.y = this.y === initialY ? this.y : this.y + 83;
    //             break;
    //     }
    // }


};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
// Placed in function so that each win rebuilds the bad guys
function createCharacters() {
    allEnemies = [];
    allEnemies[0] = new Enemy();
    allEnemies[1] = new Enemy();
    allEnemies[2] = new Enemy();
    player = new Player();
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
