music = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload(){
music = loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(400 , 400);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on("pose" , gotPoses);
}

function gotPoses(results){
    if (results.length>0) {
        console.log(results)
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Left Wrist X and Left Wrist Y");
        console.log(leftWristx + "," + leftWristy);
        console.log("Right Wrist X and Right Wrist Y");
        console.log(rightWristx + "," + rightWristy);

scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("Score Of Left Wrist and Score Of Right Wrist");
console.log(scoreLeftWrist + "," + scoreRightWrist)
    }

}

function play_music(){
music.play();
music.setVolume(0.5);
music.rate(1);
}

function stop_music(){
    music.stop();   
}

function modelLoaded(){
    console.log("Model Loaded!")

}
function draw(){
image(video , 0 , 0 , 400 , 400);
    fill("red");
    stroke("black")

    if (scoreLeftWrist>0.2) {
        circle(leftWristx , leftWristy , 30);
        numberLeftWristY = Number(leftWristy);
        removeDecimal = floor(numberLeftWristY);
        volume = removeDecimal/400;
music.setVolume(volume);

document.getElementById("volume_label").innerHTML= "Volume = " + volume;

    }

    if (scoreRightWrist>0.2) {
        circle(rightWristx , rightWristy , 30);

        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed_label").innerHTML="Speed = 0.5x";
            music.rate(0.5);
        } else if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("speed_label").innerHTML="Speed = 1x"
            music.rate(1);
        } else if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("speed_label").innerHTML="Speed = 1.5x"
            music.rate(1.5);
        } else if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("speed_label").innerHTML="Speed = 2x"
            music.rate(2);
        }
    }
}
