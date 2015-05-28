    // Enemies our player must avoid

    var Enemy = function(x,y) {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = this.getRandomSpeed(); //give each bug its own speed!
    };


    //Calculates a random speed for the bug's movement
    Enemy.prototype.getRandomSpeed = function (){
        return Math.random() * (500 - 50) + 50; //returns a random number ranging from (including)50 to 500
    };

    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < 510){
            this.x = this.x + this.speed * dt; //if the bug is not past the screen we move it right
        } else {
            this.x = -50; //if the bug is past the right edge, we reset its position to the left
            this.y = stoneRowYCordinate[Math.floor(Math.random()*stoneRowYCordinate.length)]; //randomly change the row that the bug is on
        }
        if (player.y === this.y && (player.x < this.x +60) && (player.x + 60 > this.x)){
            player.reset();
            if (score > 0){
                score = score - 1;      //penalize player 1 point if they have any
                scoreUpdater();
                alert('You just got BUGINATED!! The bug ate one of your points! :(');
            } else {
                alert('You just got BUGINATED!!');
            }
        }

    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    //store the Y cordinates of the stone row centers for chaning the bug's row position on update
    var stoneRowYCordinate = [52, 134, 216];

    //let's make some new bugs!
    var allEnemies = [];
    allEnemies[0]= new Enemy(40,52);
    allEnemies[1]= new Enemy(-40,52);
    allEnemies[2]= new Enemy(40,134);
    allEnemies[3]= new Enemy(120,216);

    var Player = function() {
        var thePagesScore = document.getElementById("scoreboard");
        this.sprite = 'images/char-horn-girl.png'; //set the players sprite image
        this.x = 205; // x axis starting position
        this.y = 380;// y axist starting position..each row is 82px apart

    };

    //this function resets player position to start in the event of a collision or a score
    Player.prototype.reset = function(){
        this.y = 380;
        this.x = 205;
    };

    Player.prototype.update = function () {
        //Suggestions noted, thank you! :)
    };

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };


    var score = 0;

    //sets the scoreboard element to a variable so we do not use getElementById each time to update the score
    //the only way I could get this to work was to move my h1 element above my <script> tags..is there another way?
    //I could not figure out how to get an onload to work...
    var thePagesScore = document.getElementById("scoreboard");

    var scoreUpdater = function (){
        thePagesScore.innerHTML ="Score:" + " " + score;
    };


    //this block of code moves the player based upon key input received from handleInput
    Player.prototype.handleInput = function (key) {
          switch(key){
            case 'left' :
                if (this.x > 37){  //checks to make sure player is not moving past left edge
                    this.x = this.x - 100;
                }
                break;
                case 'right' :
                if (this.x < 373){ //checkes to make sure player is not moving past right edge
                    this.x = this.x + 100;
                }
                break;
                case 'down' :
                if (this.y < 380){ //checks to make sure player is not moving past bottom edge
                    this.y = this.y + 82;
                }
                break;
                case 'up' :
                if (this.y > 52){ //checks to make sure player has not reached "water" before moving
                    this.y = this.y - 82;
                }else if (this.y = 52){ //checks to see if next move would put player in water
                    player.reset();
                    score = score + 1;      //increment the score and update the score displayed
                    scoreUpdater();
                }
                break;
            }
    };

    //make a new player object
    var player = new Player();


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
