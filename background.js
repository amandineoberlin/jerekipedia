//chrome://extensions
var isActive = true;

function getCurrentTabUrl(tabId, changeInfo, tabInfo) {
  if (!isActive) return;
  if (tabInfo.url === undefined || changeInfo.status !== 'complete') return;
  chrome.tabs.query({
    active: true,
    windowType: "normal",
    currentWindow: true
  }, function(d) {
    chrome.pageCapture.saveAsMHTML({
        tabId: d[0].id
    }, function(blob) {
        var re = d[0].url;
        if (/wikipedia/.test(d[0].url)) {
          var url = URL.createObjectURL(blob);
          var name = re.substr(re.lastIndexOf('/') + 1);
          var cleanedName = name.replace(/[^\w\s]/gi, '');

          chrome.downloads.download({
              url: url,
              filename: 'Jeremedia/' + cleanedName + '.mhtml'
          });
        }
    });
  });
}

chrome.tabs.onUpdated.addListener(getCurrentTabUrl);
chrome.tabs.onCreated.addListener(getCurrentTabUrl);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  isActive = message.active;
  sendResponse({ active: message.active });
});
