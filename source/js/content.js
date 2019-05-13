var barrageContainer = document.createElement( 'div' );

var barrageBackgroundZIndex = 16777270;
var barrageZIndex = 16777271; // largest

//append all elements
document.body.appendChild( barrageContainer );
barrageContainer.id = 'myDivId';
barrageContainer.style.position = 'fixed';
barrageContainer.style.top = 0;
barrageContainer.style.left = 0;
barrageContainer.style.width = '100%';   
barrageContainer.style.height = '100%';
barrageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
barrageContainer.style.pointerEvents = 'none';
barrageContainer.style.zIndex = barrageBackgroundZIndex;

function offerBarrage(barrage) {
    var barrageDiv = document.createElement('div');
    var speed = barrage.speed;
    var topPosition = barrage.topPosition;
    console.log(topPosition);
    barrageDiv.innerHTML = barrage.message;

    var containerWidth = barrageContainer.offsetWidth;
    var containerHeight = barrageContainer.offsetHeight;
    var curLeftPos = containerWidth;

    barrageDiv.style.position = 'fixed';
    barrageDiv.style.top = topPosition +'px';
    barrageDiv.style.left = curLeftPos + 'px';
    barrageDiv.style.whiteSpace = 'nowrap';
    barrageDiv.style.fontSize = 'xx-large';

    barrageContainer.appendChild(barrageDiv);

    var id = setInterval(frame, 1);
    function frame() {
        if (curLeftPos < -barrageDiv.offsetWidth) {
            clearInterval(id);
            barrageContainer.removeChild(barrageDiv);
        } else {
            curLeftPos += speed;
            barrageDiv.style.left = curLeftPos + 'px';
        }
    }

}

function getRandomBarrage() {
    var testBarrage = {};
    testBarrage.message = "This is just a test, random message" + Math.floor(Math.random() * 10);
    testBarrage.speed = Math.random() - 1.5;
    testBarrage.topPosition = Math.floor(Math.random() * barrageContainer.offsetHeight);
    return testBarrage;
}

var barrageLoop = setInterval(function (){offerBarrage(getRandomBarrage())}, 1000);
