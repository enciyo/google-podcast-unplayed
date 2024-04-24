"use strict";

export async function extensionIsEnabled() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["enabled"], (result) => {
      resolve(result.enabled);
    });
  });
}

export async function setExtensionEnabled(enabled) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ enabled: enabled }, () => {
      resolve();
    });
  });
}

export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export async function updateBadgeStatus(isActive) {
  var tab = await getCurrentTab();
  chrome.action.setBadgeText({
    tabId: tab.id,
    text: isActive ? "ON" : "OFF",
  });
}


async function processFeed() {
  let tab = await getCurrentTab();
  if (tab.url.startsWith("https://podcasts.google.com/feed") === true){
    let enabled = await extensionIsEnabled();
    let inject = enabled ? "insert_hide.js" : "insert_show.js";
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: [inject],
    });
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    processFeed();
  }
});
chrome.action.onClicked.addListener(async (tab) => {
  await setExtensionEnabled(!(await extensionIsEnabled()));
  processFeed();
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  updateBadgeStatus(changes.enabled.newValue);
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  processFeed();
});
