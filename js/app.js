/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Entity {
  constructor() {
      this.x = 2;
      this.y = 5;
  }

  update(dt) {
    this.movedOffBoardX = this.x > 5;
    this.movedOffBoardY = this.y < 1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 85);
  }
}

class Player extends Entity {
  constructor() {
    super();
    this.sprite = 'images/char-boy.png';
  }

  update() {
    // TODO:  write update
  }

  handleInput() {
    // TODO:  write handleInput
  }
}

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

//    player.handleInput(allowedKeys[e.keyCode]);
});
