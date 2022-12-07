chrome.extension.onRequest.addListener(function(request, sender, sendResponse) { 
  if (request.method == 'getLocalStorage') { 
    var objectString = JSON.stringify(localStorage); 
    sendResponse({data: objectString}); 
  } else { 
    sendResponse({}); // snub them. 
  } 
}); 