let deferredPrompt;
const addBtn = document.getElementById("addToHomeScreen");
if (addBtn) {
  addBtn.style.display = "none";

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";

    addBtn.addEventListener("click", (e) => {
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted prompt");
          // hide our user interface that shows our A2HS button
          addBtn.style.display = "none";
        } else {
          console.log("User dismissed prompt");
        }
        deferredPrompt = null;
      });
    });
  });
}

$("#passwordControl").click(function () {
  if ($("#passwordInput").attr("type") === "password") {
    $(this).addClass("view");
    $("#passwordInput").attr("type", "text");
  } else {
    $(this).removeClass("view");
    $("#passwordInput").attr("type", "password");
  }
  return false;
});

$("#submitFormButton").click(function () {
  let login = $("#loginInput").val();
  let password = $("#passwordInput").val();
  if (login !== "" && password !== "") {
    userLogin = login;
    localStorage.setItem(
      "userData",
      JSON.stringify({ userName: login, authorized: true })
    );
    loginPage.detach();
    generateHomePage();
  }
});
