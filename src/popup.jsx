import React from 'react';

function openOptions() {
  if (chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open('index.html');
  }
}

export default function Popup() {
  return (
    <div
      style={{
        minWidth: 180,
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <button
        style={{
          padding: '0.5em 1em',
          background: '#646cff',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
        onClick={openOptions}
      >
        Open Jira Helper
      </button>
    </div>
  );
}
