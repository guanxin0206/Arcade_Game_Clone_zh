const CELL_WIDTH = 102;
const CELL_HEIGHT = 83;

const DOLL_WIDTH = 66;
const DOLL_HEIGHT = 81;
const winDisplay = document.getElementById('win')
const lossDisplay = document.getElementById('loss')

var win = 0;
var loss = 0;


// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + this.speed * dt;
    if(this.x > CELL_WIDTH * 5 + DOLL_WIDTH){
      this.x = 0;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function(player){
  //碰撞半径 50
  if(Math.abs(this.y - player.y) <= 50 && Math.abs(this.x - player.x) <= 50){
    return true;
  }else{
    return false;
  }
}



// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x = CELL_WIDTH * 2, y = DOLL_HEIGHT * 5) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.reset = function(){
  this.x = CELL_WIDTH * 2;
  this.y = DOLL_HEIGHT * 5;
}

Player.prototype.update = function(){
  //player resets after winning is confirmed
    if(this.checkWin()){
      //if setTimeout function is used, it would mess up with my win counts
      player.reset()
    }
}

Player.prototype.checkWin = function(){

  if(this.y < DOLL_HEIGHT-10){
    win += 1;
    winDisplay.innerText = win;
    return true;
  }
  else{
    return false;
  }

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 奇怪的数字待看
Player.prototype.handleInput = function(movement){
  switch (movement) {
       case 'left':
          if (this.x >= 0 + DOLL_WIDTH) {
             this.x -= 102;
          } break;
       case 'right':
          if (this.x <= 405 - DOLL_WIDTH) {
             this.x += 102;
          } break;
       case 'up':
          if (this.y >= 0) {
             this.y -= 83;
          } break;
       case 'down':
         if (this.y <= 405 - DOLL_HEIGHT) {
             this.y += 83;
          } break;
    }
    console.log(this.x + ", " + this.y)
}
/*
现在实例化你的所有对象
把所有敌人的对象都放进一个叫 allEnemies 的数组里面
把玩家对象放进一个叫 player 的变量里面
*/
player = new Player();
enemy1 = new Enemy(1,55,500);
enemy2 = new Enemy(1,145,420);
enemy3 = new Enemy(1,225,450);

allEnemies = [enemy1, enemy2, enemy3]


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
