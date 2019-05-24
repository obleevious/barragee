chrome.storage.sync.set({ status: 'off' }, function () {
    console.log("extension is off");
});

$("#status_switch").click(function(){
    chrome.storage.sync.set({ status: 'on' }, function () {
        console.log("extension is on");
    });
});
