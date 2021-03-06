class Game {
  constructor(options, player, canvasWidth, canvasHeight) {
    this.ctx = options.ctx;
    this.player = player;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.laser = [];
    this.enemies = [];
    this.enemiesLaser = [];
    this.extraPoints = [];
    this.interval = undefined;
    this.intervalEnemiesLaser = undefined;
    this.intervalEnemiesMoveDown = undefined;
    this.intervalExtraPoints = undefined;
    this.points = 0;
    // this.lives = 0;
    this.enemiesKilledSound = new Audio();
    this.enemiesKilledSound.src = "sound/killkill.wav";
    this.laserGun = new Audio();
    this.laserGun.src = "sound/laser-gun.mp3";
    this.youWinSound = new Audio();
    this.youWinSound.src = "sound/wubawuba.wav";
    this.gameOverSound = new Audio();
    this.gameOverSound.src = "sound/gameover.mp3";
  }

  // Points

  numberOfPoints() {
    let points = document.getElementById("number");
    points.innerHTML = this.points;
  }

  gameOver() {
    this.gameOverSound.play();
    const gameOver = document.getElementById("gameOver");
    gameOver.style = "display:block";
    const gameOverTitle = document.getElementById("gameOverTitle");
    gameOverTitle.style = "display:block";
    canvas.style = "display:none";
    points.style = "display:none";
    const containerPoints = document.getElementById("container-points");
    containerPoints.style = "display: none";
  }

  gameWon() {
    this.youWinSound.play();
    const youWin = document.getElementById("youWin");
    youWin.style = "display:block";
    canvas.style = "display:none";
    points.style = "display:none";
    const containerPoints = document.getElementById("container-points");
    containerPoints.style = "display: none";
    let pointsTotal = document.getElementById("total");
    pointsTotal.innerHTML = this.points;
  }

  // Player Elements

  drawPlayer() {
    this.ctx.drawImage(
      this.player.image,
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
  }

  assignControlsToKeys() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 37: // ArrowLeft
          this.player.moveLeft();
          if (this.player.x < 0) {
            this.player.x = 0;
          }
          break;
        case 39: // ArrowRight
          this.player.moveRight();
          if (this.player.x > this.canvasWidth + 50) {
            this.player.x = this.canvasWidth + 50;
          }
          break;
        case 32: // SpaceBar
          this.laserGun.play();
          this.createLaser();
          break;
      }
    });
  }

  // Laser Player

  drawLaser() {
    this.laser.forEach((element) => {
      this.laser.image = new Image();
      this.laser.image.src = "img/bullet.png";
      this.ctx.drawImage(
        this.laser.image,
        element.x,
        element.y,
        element.width,
        element.height
      );
    });
  }

  createLaser() {
    this.laser.push(new Laser(20, 20, this.player.x + 10, this.player.y));
  }

  moveLaser() {
    for (let i = 0; i < this.laser.length; i++) {
      this.laser[i].y -= 10;
      this.collidesLaser();
      this.deleteLaser();
    }
  }

  collidesLaser() {
    this.enemies.forEach((enemies, position) => {
      this.laser.forEach((laser) => {
        if (
          laser.x >= enemies.x - enemies.width / 2 &&
          laser.x <= enemies.x + enemies.width / 2 &&
          laser.y >= enemies.y - enemies.height / 2 &&
          laser.y <= enemies.y + enemies.height / 2
        ) {
          if (enemies.type === "virus-1") {
            this.points += 50;
            this.enemiesKilledSound.play();
            this.laser.shift();
            this.enemies.splice(position, 1);
          } else if (enemies.type === "virus-2") {
            this.points += 10;
            this.enemiesKilledSound.play();
            this.laser.shift();
            this.enemies.splice(position, 1);
          }
        }
      });
    });
  }

  deleteLaser() {
    this.laser.forEach((element) => {
      if (element.y === 0) {
        this.laser.shift();
      }
    });
  }

  // Enemies

  createEnemies() {
    for (let i = 0; i < 15; i++) {
      this.enemies.push(new Enemy(40, 40, 80 + i * 50, 80, "virus-1"));
      this.enemies.push(new Enemy(40, 40, 80 + i * 50, 130, "virus-1"));
      this.enemies.push(new Enemy(40, 40, 80 + i * 50, 180, "virus-1"));
      this.enemies.push(new Enemy(45, 45, 80 + i * 50, 230, "virus-2"));
      this.enemies.push(new Enemy(45, 45, 80 + i * 50, 280, "virus-2"));
      this.enemies.push(new Enemy(45, 45, 80 + i * 50, 330, "virus-2"));
    }
  }

  moveEnemiesDown() {
    this.intervalEnemiesMoveDown = setInterval(() => {
      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].y += 5;
        this.collidesEnemies();
      }
    }, 600);
  }

  collidesEnemies() {
    this.enemies.forEach((enemies) => {
      if (
        enemies.x + enemies.width / 2 > this.player.x - this.player.width / 2 &&
        enemies.x - enemies.width / 2 < this.player.x + this.player.width / 2 &&
        enemies.y + enemies.height / 2 >
          this.player.y - this.player.height / 2 &&
        enemies.y - enemies.height / 2 < this.player.y + this.player.height / 2
      ) {
        this.stop();
        this.gameOver();
      }
    });
  }

  drawEnemies() {
    this.enemies.forEach((element) => {
      if (element.type === "virus-1") {
        this.enemies.image = new Image();
        this.enemies.image.src = "img/virus-1.png";
        this.ctx.drawImage(
          this.enemies.image,
          element.x,
          element.y,
          element.width,
          element.height
        );
      } else if (element.type === "virus-2") {
        this.enemies.image = new Image();
        this.enemies.image.src = "img/virus-2.png";
        this.ctx.drawImage(
          this.enemies.image,
          element.x,
          element.y,
          element.width,
          element.height
        );
      }
    });
  }

  numberEnemies() {
    if (this.enemies.length === 0) {
      this.stop();
      this.gameWon();
    }
  }

  // Enemies laser

  drawEnemiesLaser() {
    this.enemiesLaser.forEach((element) => {
      this.enemiesLaser.image = new Image();
      this.enemiesLaser.image.src = "img/enemy-laser.png";
      this.ctx.drawImage(
        this.enemiesLaser.image,
        element.x,
        element.y,
        element.width,
        element.height
      );
    });
  }

  createEnemiesLaser() {
    this.intervalEnemiesLaser = setInterval(() => {
      this.enemiesLaser.push(
        new EnemiesLaser(
          10,
          10,
          this.enemies[this.getRandomIntInclusive(0, 50)].x,
          this.enemies[this.getRandomIntInclusive(0, 10)].y
        )
      );
    }, 700);
  }

  moveEnemiesLaserDown() {
    for (let i = 0; i < this.enemiesLaser.length; i++) {
      this.enemiesLaser[i].y += 1;
      this.deleteEnemiesLaser();
      this.collidesWithLaserEnemies();
    }
  }

  collidesWithLaserEnemies() {
    this.enemiesLaser.forEach((enemiesLaser) => {
      if (
        enemiesLaser.x >= this.player.x - this.player.width / 2 &&
        enemiesLaser.x <= this.player.x + this.player.width / 2 &&
        enemiesLaser.y >= this.player.y - this.player.height / 2 &&
        enemiesLaser.y <= this.player.y + this.player.height / 2
      ) {
        this.stop();
        this.gameOver();
      }
    });
  }

  deleteEnemiesLaser() {
    this.enemiesLaser.forEach((element) => {
      if (element.y + element.height === this.canvasHeight) {
        this.enemiesLaser.shift();
      }
    });
  }

  // Extra Points

  drawExtraPoints() {
    this.extraPoints.forEach((element) => {
      this.extraPoints.image = new Image();
      this.extraPoints.image.src = "img/potatoe-head.png";
      this.ctx.drawImage(
        this.extraPoints.image,
        element.x,
        element.y,
        element.width,
        element.height
      );
    });
  }

  createExtraPoints() {
    this.intervalExtraPoints = setInterval(() => {
      this.extraPoints.push(new ExtraPoints(40, 40, this.canvasWidth - 40, 40));
    }, 5000);
  }

  moveExtraPoints() {
    for (let i = 0; i < this.extraPoints.length; i++) {
      this.extraPoints[i].x -= 5;
      this.collidesExtraPoint();
      this.deleteExtraPoints();
    }
  }

  deleteExtraPoints() {
    this.extraPoints.forEach((element) => {
      if (element.x + element.width === 0) {
        this.extraPoints.shift();
      }
    });
  }

  collidesExtraPoint() {
    this.extraPoints.forEach((extraPoints, position) => {
      this.laser.forEach((laser) => {
        if (
          laser.x >= extraPoints.x - extraPoints.width / 2 &&
          laser.x <= extraPoints.x + extraPoints.width / 2 &&
          laser.y >= extraPoints.y - extraPoints.height / 2 &&
          laser.y <= extraPoints.y + extraPoints.height / 2
        ) {
          this.points += 200;
          this.laser.shift();
          this.extraPoints.splice(position, 1);
        }
      });
    });
  }

  // Get a random function

  getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Loops

  start() {
    this.assignControlsToKeys();
    this.createEnemies();
    this.createEnemiesLaser();
    this.createExtraPoints();
    this.moveEnemiesDown();
    this.interval = window.requestAnimationFrame(this.update.bind(this));
  }

  // Clear

  clear() {
    this.ctx.clearRect(0, 0, 900, 600);
  }

  // Stop All

  stop() {
    this.intervalLaser = clearInterval(this.intervalLaser);
    this.intervalEnemiesLaser = clearInterval(this.intervalEnemiesLaser);
    this.intervalEnemiesMoveDown = clearInterval(this.intervalEnemiesMoveDown);
    this.intervalExtraPoints = clearInterval(this.intervalExtraPoints);
    this.interval = clearInterval(this.interval);
    console.log("stop");
  }

  // Update function

  update() {
    this.clear();
    this.drawPlayer();
    this.drawLaser();
    this.drawExtraPoints();
    this.moveExtraPoints();
    this.moveLaser();
    this.drawEnemies();
    this.drawEnemiesLaser();
    this.moveEnemiesLaserDown();
    this.numberOfPoints();
    this.numberEnemies();

    if (!!this.interval) {
      this.interval = window.requestAnimationFrame(this.update.bind(this));
    }
  }
}
