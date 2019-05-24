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

    var id = setInterval(frame, 10);
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

var focusOn = true;

function getRandomBarrage() {
    var testBarrage = {};
    testBarrage.message = "This is just a test, random message " + Math.floor(Math.random() * 10);
    testBarrage.speed = - 0.5 - Math.random();
    testBarrage.topPosition = Math.floor(Math.random() * barrageContainer.offsetHeight);
    return testBarrage;
}

function m_status() {
    var res = true;
    chrome.storage.sync.get('status', function(data) {
        console.log(data.status);
        if (data.status == "on")
            res = true;
        else
            res = false;
    });
    return false;
    return (res && focusOn);
}

var barrageLoop = setInterval(function (){
        // if (!m_status())
        if (!focusOn)
            return;
        offerBarrage(getRandomBarrage());
    }, 5000);

$(window).focus(function() {
    focusOn = true;
});

$(window).blur(function() {
    focusOn = false;
});
