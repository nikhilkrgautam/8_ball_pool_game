function GameWorld() //it will contain all physical objects and will update them from time to time
{
    this.whiteBall = new Ball(new Vector2(413, 413));
    this.stick = new Stick(new Vector2(413,413));
    this.yellowBall = new Ball(new Vector2(800,500));
}

GameWorld.prototype.update = function() //to update the objects in each animation frame 
{
    this.stick.update(); //for updating position of stick
    this.whiteBall.update();
    this.yellowBall.update();
}

GameWorld.prototype.draw = function() //to draw updated objects on canvas
{
    Canvas.drawImage(sprites.background, {x:0, y:0}); //drawing pool table

    this.stick.draw();  //drawing stick
    this.whiteBall.draw(); //drawing white ball
    this.yellowBall.draw();
}