img ="";
status = "";
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if (status!="")
    {
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Object detected";
            fill('#000000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " +percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i]. width, objects[i].height);
        }
    }
    
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    object_detector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

