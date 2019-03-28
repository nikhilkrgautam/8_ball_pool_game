const DELTA = 1/185;

function GameWorld() //it will contain all physical objects and will update them from time to time
{
    this.balls = [
        [ new Vector2(1022, 413), COLOR.YELLOW],
        [ new Vector2(1056, 393), COLOR.YELLOW],
        [ new Vector2(1056, 433), COLOR.RED],
        [ new Vector2(1090, 374), COLOR.RED],
        [ new Vector2(1090, 413), COLOR.BLACK],
        [ new Vector2(1090, 452), COLOR.YELLOW],
        [ new Vector2(1126, 354), COLOR.YELLOW],
        [ new Vector2(1126, 393), COLOR.RED],
        [ new Vector2(1126, 433), COLOR.YELLOW],
        [ new Vector2(1126, 472), COLOR.RED],
        [ new Vector2(1162, 335), COLOR.RED],
        [ new Vector2(1162, 374), COLOR.RED],
        [ new Vector2(1162, 413), COLOR.YELLOW],
        [ new Vector2(1162, 452), COLOR.RED],
        [ new Vector2(1162, 491), COLOR.YELLOW],
        [ new Vector2(413, 413), COLOR.WHITE]
    ].map(params => new Ball(params[0], params[1]))

    this.whiteBall = this.balls[this.balls.length - 1];

    this.stick = new Stick(new Vector2(413,413), this.whiteBall.shoot.bind(this.whiteBall));

    this.table = {
        TopY : 57,
        RightX : 1443,
        BottomY : 768,
        LeftX : 57
    }
}

GameWorld.prototype.handleCollisions = function()
{
    for(let i = 0; i < this.balls.length; i++)
    {
        this.balls[i].collideWithTable(this.table);

        for(let j = i + 1; j < this.balls.length; j++)
        {
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWithBall(secondBall);
        }
    }
}

GameWorld.prototype.update = function() //to update the objects in each animation frame 
{
    this.handleCollisions();
    
    this.stick.update(); //for updating position of stick
    for(let i = 0; i < this.balls.length; i++)
    {
        this.balls[i].update(DELTA); 
    }

    if(!this.ballsMoving() && this.stick.shot)
    {
         this.stick.reposition(this.whiteBall.position);
    }
}

GameWorld.prototype.draw = function() //to draw updated objects on canvas
{
    Canvas.drawImage(sprites.background, {x:0, y:0}); //drawing pool table

    for(let i = 0; i < this.balls.length; i++)
    {
        this.balls[i].draw(); 
    }    

    this.stick.draw();  //drawing stick
}

GameWorld.prototype.ballsMoving = function()
{
     let ballsMoving = false;

     for( let i =0; i < this.balls.length; i++)
     {
         if(this.balls[i].moving)
         {
             ballsMoving = true;
             break;
         }
     }
     return ballsMoving;
}