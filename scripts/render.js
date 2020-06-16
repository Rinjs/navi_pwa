let hasOnScreen = false;
let deferredPrompt;

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};
// Detects if device is in standalone mode
const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;

// Checks if should display install popup notification:
if (isInStandaloneMode()) {
  hasOnScreen = true;
}

$(document).ready(() => {
  if (hasOnScreen) {
    $("#addToHomeScreen").css("display", "none");
  }
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen

    $("#addToHomeScreen").click(function (e) {
      // hide our user interface that shows our A2HS button
      $(this).css("display", "none");
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });
});
