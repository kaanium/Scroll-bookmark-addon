chrome.windows.getAll({ populate: true }, function(windows) {
    for (var w = 0; w < windows.length; w++) {
      var tabs = windows[w].tabs;
      for (var t = 0; t < tabs.length; t++) {
        var tab = tabs[t];
        chrome.tabs.executeScript(tab.id, { file: 'page.js' });
      }
    }
});

  var on_off;
chrome.tabs.onActivated.addListener(function(activeInfo) {
    var tab = chrome.tabs.get(activeInfo.tabId, function(tab) {chrome.tabs.sendRequest(tab.id, {method: "getLocalStorage"}, function(response) {
    var myObjectRetrieved = JSON.parse(response.data);
    on_off = myObjectRetrieved.exclude_link;
	if (on_off == 0)
			chrome.browserAction.setIcon({path: "icon_50.png", tabId:tab.id});
	else if (on_off == 1)
			chrome.browserAction.setIcon({path: "icon-2_50.png", tabId:tab.id});
  });
});
});

chrome.tabs.onUpdated.addListener(function(tab){
     chrome.tabs.executeScript({code: 'if ((localStorage.exclude_link == 0 || localStorage.exclude_link === undefined) && localStorage.list !== undefined) {var d = JSON.parse(localStorage.list); \
															for (var i = 0; i < d.length; i++) { \
															if (d[i].link == window.location.href) window.scrollTo(0,d[i].scroll);}}'});
});

chrome.browserAction.onClicked.addListener(function(tab) {
chrome.tabs.sendRequest(tab.id, {method: "getLocalStorage"}, function(response) {
    var myObjectRetrieved = JSON.parse(response.data);
    on_off = myObjectRetrieved.exclude_link;
	if (on_off == 0)
			chrome.browserAction.setIcon({path: "icon-2_50.png", tabId:tab.id});
	else if (on_off == 1)
			chrome.browserAction.setIcon({path: "icon_50.png", tabId:tab.id});
  });
  chrome.tabs.executeScript({code: 'if (localStorage.exclude_link == 1) localStorage.exclude_link = 0; else localStorage.exclude_link = 1;'});
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

    chrome.tabs.sendRequest(tab.id, {method: "getLocalStorage"}, function(response) {
    var myObjectRetrieved = JSON.parse(response.data);
    on_off = myObjectRetrieved.exclude_link;
	if (on_off == 0)
			chrome.browserAction.setIcon({path: "icon_50.png", tabId:tab.id});
	else if (on_off == 1)
			chrome.browserAction.setIcon({path: "icon-2_50.png", tabId:tab.id});
  });

})


