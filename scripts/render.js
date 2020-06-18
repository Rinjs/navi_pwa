let loginPage = $("#loginPage");
let homePage = $("#homePage");
let authorized = true;
let userLogin = "user";

const generateHomePage = () => {
  const autoList = [
    {
      name: "Polo 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Polo 2",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Polo 3",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "SKODA",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "SKODA 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "SKODA 2",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "SKODA 3",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Polo 10",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Auto 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Auto 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Auto 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Auto 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Auto 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Auto 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Polo 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Polo 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
    {
      name: "Polo 1",
      address:
        "address, address, address, address, address, address, address, address,",
    },
  ];

  $("main").append(
    "<div class='home-page' id='homePage'>" +
      "<div class='nav-menu' id='navMenu'>" +
      "<div class='nav-menu__toggle'><span></span><span></span><span></span></div>" +
      "<p class='nav-menu__text' >Объекты</p>" +
      "<div class='nav-menu__list-container' id='navMenuList'>" +
      `<p class='nav-menu__list-text'>${userLogin}</p>` +
      "<ul class='nav-menu__list'>" +
      "<li class='nav-menu__item'>" +
      "<p class='nav-menu__item-text' id='homeAutoList'>Автомобили</p>" +
      "</li>" +
      "<li class='nav-menu__item'>" +
      "<p class='nav-menu__item-text' id='backToLoginPage'>Выход</p>" +
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

  $(".nav-menu__toggle").click(function () {
    $("#navMenuList").addClass("show");
    $("#homePage").addClass("tinting")
  });
  $("#homeAutoList").click(function () {
    $("#navMenuList").removeClass("show");
  });

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

  autoList.forEach((auto) => {
    $("#autoList").prepend(
      `<li class="auto-list__item"><h1 class="auto-name">${auto.name}</h1><p class="auto-address">${auto.address}</p><i id="carStatistics"></i></li>`
    );
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
