let loginPage = $("#loginPage");
let authorized = false;

const generateHomePage = () => {
  $("main").append(
    "<div class='home-page' id='homePage'>" +
      "<div class='nav-menu' id='navMenu'>" +
      "<div class='nav-menu__toggle'><span></span><span></span><span></span></div>" +
      "<p class='nav-menu__text' >Объекты</p>" +
      "</div>" +
      "<div class='auto-list__container'>" +
      "<form class='auto-list__search-form' id='searchForm'>" +
      "<div class='auto-list__form-input__container'>" +
      "<input type='text' class='auto-list__form-input' id='searchFormInput'>" +
      "<label for='searchFormInput' class='auto-list__form-label'>Поиск</label>" +
      "<i id='clearSearchFormInput'></i>" +
      "<i class='auto-list__search-icon'></i>" +
      "</div>" +
      "</form>" +
      "<ul class='auto-list'>" +
      "</ul></div>" +
      "</div>"
  );

  $("#clearSearchFormInput")
    .addClass("hidden")
    .click(function () {
      $("#searchFormInput").val("").focus();
      $("#clearSearchFormInput").addClass("hidden");
      $(".auto-list__form-label").removeClass("hidden");
    });

  $("#searchFormInput").keyup(function () {
    if ($(this).val()) {
      $("#clearSearchFormInput").removeClass("hidden");
      $(".auto-list__form-label").addClass("hidden");
    } else {
      $("#clearSearchFormInput").addClass("hidden");
      $(".auto-list__form-label").removeClass("hidden");
    }
  });
};
if (authorized) {
  loginPage.detach();
  generateHomePage();
}

$("#submitFormButton").click(function () {
  if ($("#loginInput").val() !== "" && $("#passwordInput").val() !== "") {
    loginPage.detach();
    generateHomePage();
  }
});
