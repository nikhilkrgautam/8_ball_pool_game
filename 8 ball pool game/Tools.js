let sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback) //when tools stop loading then callback the function
{
    if(assetsStillLoading)
    {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback)); //call this method whenever you're ready to 
    }                                                                  //update your animation onscreen
    else
    {
     callback();   
    }
}

function loadAssets(callback)
{
    function loadSprite(fileName)
    {
        assetsStillLoading++;  //increasing the quan tity of loading tools

        let spriteImage = new Image();
        spriteImage.src = "./Tools/" + fileName; //file source

        spriteImage.onload = function()
        {
            assetsStillLoading--; //when all tools stops loading then start decreasing it
        }
        return spriteImage;
    }
    sprites.background = loadSprite('table.png'); //for loading pool table
    sprites.stick = loadSprite('stick.png'); //for loading cue stick
    sprites.whiteBall = loadSprite('white_ball.png'); //for loading cue ball
    sprites.yellowBall = loadSprite('yellow_ball.png');

    assetsLoadingLoop(callback); //it shows image only when all images get loaded
}