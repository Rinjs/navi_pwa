let loginPage = $("#loginPage");
const userData = JSON.parse(localStorage.getItem("userData"))
  ? JSON.parse(localStorage.getItem("userData"))
  : {
      userName: "user",
      authorized: false,
    };
let authorized = userData.authorized;
let userLogin = userData.userName;

const generateAutoList = (name, address) => {
  $("#autoList").append(
    `<li class="auto-list__item"><h1 class="auto-name">${name}</h1><p class="auto-address">${address}</p><i id="carStatistics"></i></li>`
  );
};

const generateHomePage = (autoList) => {
  $("main").append(
    "<div class='home-page' id='homePage'>" +
      "<div class='tinting'></div>" +
      "<div class='nav-menu' id='navMenu'>" +
      "<div class='nav-menu__toggle'><span></span><span></span><span></span></div>" +
      "<p class='nav-menu__text' >Объекты</p>" +
      "<div class='nav-menu__list-container' id='navMenuList'>" +
      `<p class='nav-menu__list-text'>${userLogin}</p>` +
      "<ul class='nav-menu__list'>" +
      "<li class='nav-menu__item' id='homeAutoList'>" +
      "<h1 class='nav-menu__item-text' >Автомобили</h1>" +
      "<i class='nav-menu__item-icon'></i>" +
      "</li>" +
      "<li class='nav-menu__item' id='logoutButton'>" +
      "<h1 class='nav-menu__item-text' >Выход</h1>" +
      "<i class='nav-menu__item-icon'></i>" +
      "</li>" +
      "</ul>" +
      "</div>" +
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
      "<ul class='auto-list' id='autoList'>" +
      "</ul></div>" +
      "</div>"
  );

  $(".tinting")
    .addClass("hidden")
    .click(function () {
      $("#navMenuList").removeClass("show");
      $(".tinting").addClass("hidden");
    });

  $(".nav-menu__toggle").click(function () {
    $("#navMenuList").addClass("show");
    $(".tinting").removeClass("hidden");
  });
  $("#homeAutoList").click(function () {
    $("#navMenuList").removeClass("show");
    $(".tinting").addClass("hidden");
  });
  $("#logoutButton").click(function () {
    localStorage.setItem(
      "userData",
      JSON.stringify({ userName: userLogin, authorized: false })
    );
    $("#homePage").detach();
    loginPage.appendTo("main");
  });

  $("#clearSearchFormInput")
    .addClass("hidden")
    .click(function () {
      $("#searchFormInput").val("").focus();
      $("#clearSearchFormInput").addClass("hidden");
      $(".auto-list__form-label").removeClass("hidden");
      $("#autoList").empty();
      autoList.forEach((auto) => {
        generateAutoList(auto.name, auto.address);
      });
    });

  $("#searchFormInput")
    .keyup(function () {
      if ($(this).val()) {
        $("#clearSearchFormInput").removeClass("hidden");
        $(".auto-list__form-label").addClass("hidden");
      } else {
        $("#clearSearchFormInput").addClass("hidden");
        $(".auto-list__form-label").removeClass("hidden");
      }
    })
    .change(function () {
      $("#autoList").empty();
      autoList.forEach((auto) => {
        if (
          auto.name.toLowerCase().indexOf($(this).val().toLowerCase()) !== -1
        ) {
          generateAutoList(auto.name, auto.address);
        }
      });
    });

  autoList.forEach((auto) => {
    generateAutoList(auto.name, auto.address);
  });
};
if (authorized) {
  loginPage.detach();
  generateHomePage(autoList);
}
