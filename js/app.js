/**
 * Modal elements
 */
const modal = document.querySelector('.my-modal'),
  modalClose = document.querySelector('.modal-close'),
  modalText = document.querySelector('.modal-text');

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Define Entity Object
 */
class Entity {
  constructor() {
      this.x = 2;
      this.y = 5;
  }

  update(dt) {
    this.movedOffBoardX = this.x > 5;
    this.movedOffBoardY = this.y < 1;
  }

  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
        return true;
      }
    } else {
      return false;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 85);
  }
}

/**
 * Define Player Object based on Entity
 */
class Player extends Entity {
  constructor() {
    super();
    this.sprite = 'images/char-boy.png';
  }

  update() {
    /*  not used at this time */
  }

  render() {
    super.render();
    /* check to see if player has moved to top row - if so, player won game! */
    if (this.y === 0) {
      displayGameOver('Winner');
    }
  }

  handleInput(input) {
    if (!stopKeyBoard) {
      switch (input) {
        case 'left':
          this.x = this.x > 0 ? this.x - 1 : this.x;
          break;
        case 'up':
          this.y = this.y > 0 ? this.y - 1 : this.y;
          break;
        case 'right':
          this.x = this.x < 4 ? this.x + 1 : this.x;
          break;
        case 'down':
          this.y = this.y < 5 ? this.y + 1 : this.y;
          break;
        default:
          break;
      }
    }
  }
}

/**
 * Define Enemy Object based on Entity
 */
class Enemy extends Entity {
  constructor(x,y) {
    super();
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  update(dt) {
    super.update(this.x, this.y);
    let ranNumX = getRandomInt(-4,-1);
    this.movedOffBoardX ? this.x = ranNumX : this.x += dt;
  }
}

// Now instantiate your objects.
const player = new Player();

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
for (let i = 0; i < 8; i++) {
  let ranNumX = getRandomInt(-5,-1)
  let ranNumY = getRandomInt(1,4)
  allEnemies.push(new Enemy(ranNumX,ranNumY));
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


// Modal processes
//
// Open the modal
openModal = function(text) {
  modalText.textContent = text;
  modal.style.display = 'block';
  document.querySelector('#btnReset').style.display = 'inline-flex';
};

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function() {
  if (event.target == modal) {
      modal.style.display = 'none';
  }
};

//
// reset the board to start a new game
//

btnReset.addEventListener('click', function () {
  location.reload(true);
});

//
//  Function to set up modal for winning or losing game
//
function displayGameOver(winOrLose) {
  gameOver = true;
  let textWinner = document.querySelector('.modal-winner');
  textWinner.textContent = " -- Click Reset Button to play again!";

  openModal('CONGRATULATIONS - We Have a WINNER!');

}
