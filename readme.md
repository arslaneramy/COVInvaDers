# COVInvaDers

## Description

This is a fun 2021 adaptation of the known game "Space Invaders", created by Tomohiro Nishikado and released in 1978.

You play the role of Rick Sanchez and you have to shoot at the COVID viruses coming at you with the vaccine you created (Rick is the best scientist on earth remember?).

## MVP (DOM - CANVAS)

The main player can move left and right and has to shoot at the COVID viruses with his syringe.
The objective is to kill all the viruses.
You get extra points if you kill potatoe face.

If a virus touches you, or if you can't stop it before he goes past you... YOU LOSE !

## Data structure

1. index.html
2. main.js
3. game.js
4. player.js
5. enemy.js
6. laser.js
7. enemiesLaser
8. extraPoints

### 1. Index.html file

### 2. Main file

### 3. Game Constructor

**Properties**

- ctx
- player
- canvasWidth
- canvasHeight
- laser
- enemies
- enemiesLaser
- extraPoints
- interval
- intervalEnemiesLaser
- intervalEnemiesMoveDown
- intervalExtraPoints
- points

**Methods**

- numberOfPoints
- gameWon / gameOver
- drawPlayer
- assignControlsToKeys
- drawLaser
- createLaser
- moveLaser
- createLaser
- collidesLaser
- deleteLaser
- createEnemies
- moveEnemiesDown
- collidesEnemies
- drawEnemies
- numberEnemies
- drawEnemiesLaser
- createEnemiesLaser
- moveEnemiesLaserDown
- collidesWithLaserEnemies
- deleteEnemiesLaser
- drawExtraPoints
- createExtraPoints
- moveExtraPoints
- deleteExtraPoints
- collidesExtraPoints
- start
- clear
- stop
- update

### 4. Player Constructor

**Properties**

- width
- height
- x position
- y position
- image

**Methods**

- moveRight
- moveLeft

### 5. Enemy Constructor

**Properties**

- width
- height
- x position
- y position
- image
- type

### 6. Laser Constructor

**Properties**

- width
- height
- x position
- y position

### 7. extraPoints Constructor

**Properties**

- width
- height
- x position
- y position

### 7. enemiesLaser Constructor

**Properties**

- width
- height
- x position
- y position

## States and States Transitions

- startScreen
  - Start the game
  - Goes to gameScreen when Start button is clicked
- gameScreen
  - Game running while enemies didn't collide with player or didn't move past the player
  - Goes to gameoverScreen if enemies touch the player or if enemies goes. past the player
  - Goes to winScreen if all enemies are dead
- gameoverScreen
  - Shows Game Over message and Restart button
  - Goes back to Game Screen when Restart button is clicked
- winScreen
  - Shows Win message, time score and Restart button
  - Goes back to Game Screen when Restart button is clicked

## Additional Tasks To Do

- Add lives
- Add time and print it in game.js
- Create scoreboard in main.js
- Add audios, img and fonts

## Backlog

- Username registration and scoreboard (to compete again other players)
- Pause game
- Sounds and visual effects (when shoots, collides or Game Over/Game won) -> Done

### Link to my Trello board (not updated) :

- Here it is : https://trello.com/invite/b/2djrGygR/2238498ad1de063474b3773114e3a0f7/covid-vs-vaccine-game