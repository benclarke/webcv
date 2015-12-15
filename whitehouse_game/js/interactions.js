// Interactions

function collision() {
	if (this.pieceType == 'moving') {
		if ((player.y == this.y) || (player.y == this.y - player.iconSize * boardPieceHeight)) {
			var give = player.iconSize == 1 ? 150 : 50;
			if ((player.x < this.x + give) && ( player.x > this.x - give ))
				{
					this.hit = true;
				}
		}
	}

	if (this.pieceType == 'randomMoving') {
		this.centerX = this.x - boardPieceWidth/2;
		this.centerY = this.y - boardPieceHeight/2;
		var playerCenterX = player.iconSize == 1 ? player.x - boardPieceWidth : player.x - boardPieceWidth/2;
		var playerCenterY = player.iconSize == 1 ? player.y - boardPieceHeight : player.y - boardPieceHeight/2;
		var give = player.iconSize == 1 ? 150 : 60;
		// if player position is witin an area radiating from this position
		if (((this.centerX >= playerCenterX - give) && (this.centerX <= playerCenterX + give)) && ((this.centerY >= playerCenterY - give) && (this.centerY <= playerCenterY + give))) {
			this.hit = true;
			console.log('hit Mitt or Reagan');
		}
	}

	if (this.pieceType == 'stationary') {
		if ((player.y == this.y) || (player.y == this.y - player.iconSize * boardPieceHeight)) {
			if ((player.x == this.x) || (player.x == this.x - player.iconSize * boardPieceWidth)) {
				this.hit = true;
			}
		}
	}

  //if we have a collision and player hasn't won or run out of lives, then...
  if (this.hit === true && player.win === false && player.lives > 0 ) {

  	var piece = this;
  	window.setTimeout(fadeOut, 2500);
  	function fadeOut() {
  	    piece.sprite = 'images/blank-piece.png';
  	}

  	// play sound effect
  	if (document.getElementById(this.name)) {
  		audio = document.getElementById(this.name);
  		audio.play();
  	}

		// if enemy is fatal, start over
		if (this.damageType == 'fatal') {
			player.startOver();
		}
		//if enemy takes $$, subtract from cash
		else if (this.damageType === 'cash') {
			player.cash = player.cash - 100 * this.damage + 100; // add $100 to compensate for move
		}
		else if (this.goodieType === 'enemySpeed') {
			player.enemySpeed = 0.1;
			window.setTimeout(clearReagan, 7000);
			function clearReagan() {
				player.enemySpeed = 1;
			}
		}
		// if goodie gives $$, add to cash
		else if (this.goodieType === 'cash') {
			player.cash = player.cash + 100 * this.goodie + 100; // add $100 to compensate for move
		}
		// move back player as many spaces as possible within damage, and not off bottom of board
		else if (this.damageType === 'position') {
			for (var i = this.damage; i > 0; i--) {
				if (player.y < player.playerStartY) {
					player.y = player.y + boardPieceHeight;
					player.setOffsetY('down');
				}
			}
		} // for goodies that jump you ahead
		else if (this.goodieType === 'position') {
			for (var i = this.goodie; i > 0; i--) {
				if (player.y > 300) {
					player.y = player.y - boardPieceHeight;
					player.setOffsetY('up');
				}
			}
		}
		// no longer update the piece
		this.update = function(){};
		this.hit = false;
		this.sprite = this.hitSprite;

  }
}