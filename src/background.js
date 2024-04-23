'use strict';

let google_podcasts = "https://podcasts.google.com/feed/";

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab
}


function updateBadgeStatus(isActive, tabId) {
  chrome.action.setBadgeText({
    tabId: tabId,
    text: isActive ? "ON" : "OFF",
  });
}

function processFeed(tab) {
  var tab = tab || getCurrentTab();
  if (tab.url.startsWith(google_podcasts)) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['insert.js']
    });
    updateBadgeStatus(true, tab.id);
  } else{
    updateBadgeStatus(false, tab.id);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    processFeed(tab)
  }
});


chrome.action.onClicked.addListener(async (tab) => {
  processFeed(tab);
})
