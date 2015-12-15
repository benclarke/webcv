// Enemies our player must avoid
var MovingEnemy = function() {

		this.pieceType = 'moving';

		this.name = 'movingEnemy';

    // this enemy's speed
    this.speed = 250 * player.enemySpeed;

    // comes at the player somewhere in front of them 1 - 3 squares, unless near endzone
    this.startY = function () {
    	if (player.y < 600) {
    		return Math.floor(Math.random() * 4 + 3) * boardPieceHeight;
    	} else {
    		return player.y - Math.floor(Math.random() * 4) * boardPieceHeight;
    	}
    };
    this.y = this.startY();

    this.update = function(dt) {
    	if (this.x < boardWidth && this.direction == 'left') {
    		this.x = this.x + dt * this.speed;
    	}
    	else if (this.x > -boardPieceWidth && this.direction == 'right') {
				this.x = this.x - dt * this.speed;
			}

    	collision.call(this);
    };

	  // Draw the enemy on the screen, required method for game
		this.render = function() {
			this.vy = this.y + offsetY;
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.vy);
		};

		this.hitSprite = 'images/blank-piece.png';

		this.hit = false;

};

// Trump
var Trump = function() {
	MovingEnemy.call(this);

	this.name = 'trump';

	this.sprite = 'images/enemy-trump.png';

	this.damage = 4;

	this.damageType = 'cash';

	this.x = -boardPieceWidth;

	this.direction = 'left';

};

// Right Wing Nut
var RightWingNut = function() {
	MovingEnemy.call(this);

	this.name = 'nut';

	this.sprite = 'images/enemy-nut.png';

	this.damage = 2;

	this.damageType = 'position';

	this.x = boardWidth;

	this.direction = 'right';

  this.update = function(dt) {
  	if (this.x < boardWidth && this.direction == 'left') {
  		this.x = this.x + dt * this.speed;
  	}
  	else if (this.x > -boardPieceWidth && this.direction == 'right') {
			this.x = this.x - dt * this.speed;
		}

		if (count % 5 ===  0) {
			this.sprite = this.sprite == 'images/enemy-nut.png' ? 'images/enemy-nut-b.png' : 'images/enemy-nut.png';
		}
  	collision.call(this);
  };

};

// Bill Clinton
var Bill = function() {
	MovingEnemy.call(this);
	this.name = 'bill';
	this.sprite = 'images/enemy-bill.png';
	this.damage = 2;
	this.damageType = 'position';
	this.x = 0;
	this.direction = 'left';

};

var Hillary = function() {
	MovingEnemy.call(this);
	this.name = 'hillary';
	this.sprite = 'images/enemy-hillary-right.png';

	this.x = 0;
	this.y = 300;

	this.speed = 400 * player.enemySpeed;

	this.damageType = 'fatal';

	var turn = false;

	this.update = function(dt) {
		if ((turn === false) &&  (this.x < goalWidth)) {
			this.x = this.x + dt * this.speed;
		} else if ( this.x > 0 ) {
			this.x = this.x - dt * this.speed;
			this.sprite = 'images/enemy-hillary-left.png';
			turn = true;
		} else {
			turn = false;
			this.x = this.x + dt * this.speed;
			this.sprite = 'images/enemy-hillary-right.png';
		}

		collision.call(this);
	};

}; // end Hillary

var MittGhost = function() {
	MovingEnemy.call(this);
	this.name = 'mitt';
	this.pieceType = 'randomMoving';

	this.sprite = 'images/enemy-romney.png';

	this.damageType = 'fatal';

	this.x = 0;
	this.y = 0;

	var boundaryX = 0;
	var boundaryY = 4;
	var boundaryWidth = 10;
	var boundaryHeight = 12;

	var position = [this.x, this.y];
	var oldPosition = [this.x,this.y];

	var speed = { 'x': 1 , 'y': 1};

	// for getting a new random position for Mitt to float to
	this.getNewPosition = function() {

		oldPosition = [this.x, this.y];
		position = randomPosition(boundaryWidth, boundaryHeight, boundaryY, boundaryY);

    var x = Math.abs(oldPosition[0] - position[0]);
    var y = Math.abs(oldPosition[1] - position[1]);
    var speedVariable = Math.floor(Math.random() * 100 + 1) / player.enemySpeed;

    speed.x = x / speedVariable;
    speed.y = y / speedVariable;

	};

	this.update = function(dt) {
		collision.call(this);

		// get random new point
		// need to find a match within 1 px, since final position may not === what is calculated with speed variable
		if ((Math.abs(position[0] - this.x) < 1) && (Math.abs(position[1] - this.y) < 1)) {
			this.getNewPosition();
		}

		// find velocity of movement between random points
		if (position[0] > this.x) {
			this.x += speed.x;
		} else if (position[0] < this.x) {
			this.x -= speed.x;
		}

		if (position[1] > this.y) {
			this.y += speed.y;
		} else if (position[1] < this.y) {
			this.y -= speed.y;
		}
	}; // end update function for Mitt
}; // end Mitt


// stationary enemies, constructor is StationaryPiece

// gaffe
var Gaffe = function() {
	StationaryPiece.call(this);

	this.name = 'gaffe';

	this.damage = 3;

	this.damageType = 'position';

	this.sprite = 'images/enemy-gaffe.png';
	this.hitSprite = 'images/enemy-gaffe-hit.png';

};

var SkeletonClosetBlack = function() {
	StationaryPiece.call(this);

	this.name = 'skeletonBlack';

	this.damageType = 'position';
	this.damage = 3;

	this.sprite = 'images/enemy-gaffe.png';
	this.hitSprite = 'images/enemy-skeleton-black-hit.png';

};

var SkeletonClosetRed = function() {
	StationaryPiece.call(this);

	this.name = 'skeletonRed';

	this.damage = 2;

	this.damageType = 'cash';

	this.sprite = 'images/enemy-gaffe.png';
	this.hitSprite = 'images/enemy-skeleton-red-hit.png';

};
