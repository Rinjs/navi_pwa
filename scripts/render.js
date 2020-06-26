let loginPage = $("#loginPage");
let AllDistance = 0.0;
const userData = JSON.parse(localStorage.getItem("userData"))
  ? JSON.parse(localStorage.getItem("userData"))
  : {
      userName: "user",
      authorized: false,
    };
let authorized = userData.authorized;
let userLogin = userData.userName;

const generateActionList = (time, typeOfAction, actionData) => {
  $("#actionList").append(
    `<li class="tracking-history__action-item" id=${typeOfAction}><p class="tracking-history__action-time">${time}</p><div class="tracking-history__action-container"><i class="tracking-history__data-icon action-icon"></i></div>${
      typeOfAction === "parkingTime"
        ? `<p class="parking-address">${actionData}</p>`
        : `<div class='tracking-history__action-delivery'><p>${actionData.time}<sub>мин.</sub></p><p>${actionData.distance}<sub>км.</sub></p></div>`
    }</li>`
  );
};
const generateAutoList = (name, address, id) => {
  $("#autoList").append(
    `<li class="auto-list__item" id=${id}><div class="auto-list__item-container"><h1 class="auto-name">${name}</h1><p class="auto-address">${address}</p></div><i id="carStatistics"></i></li>`
  );
};
const generateReportList = (date, distance = 0.01) => {
  AllDistance += distance;
  $("#reportList .report-list__container").append(
    `<li class='report-list__item'><p class="report-list__item-date">${date}</p><p class='report-list__item-text'>Пробег</p><p class='report-list__item-distance'>${distance} км</p></li>`
  );
};
const generateTrackingPage = (name, address, id) => {
  $("#homePage").detach();

  $("main").append(
    "<div class='tracking-page' id='trackingPage'>" +
      "<div class='nav-menu' id='navMenu'>" +
      "<div class='nav-menu__toggle'>" +
      "<i id='backArrow'></i>" +
      "</div>" +
      "<p class='nav-menu__text' >Слежение</p>" +
      "</div>" +
      "<div class='tracking-map' id='trackingMap'></div>" +
      "<div class='tracking-menu'>" +
      "<div class='tracking-menu__item active' id='trackingInfo'><div class='tracking-menu__item-container'><i class='tracking-menu__icon'></i><p class='tracking-menu__text'>Инфо</p></div></div>" +
      "<div class='tracking-menu__item' id='trackingHistory'><div class='tracking-menu__item-container'><i class='tracking-menu__icon'></i><p class='tracking-menu__text'>История</p></div></div>" +
      "<div class='tracking-menu__item' id='trackingTasks'><div class='tracking-menu__item-container'><i class='tracking-menu__icon'></i><p class='tracking-menu__text'>Задачи</p></div></div>" +
      "</div>" +
      "<div class='tracking-sections'>" +
      "<div class='tracking-info active-section tracking-section trackingInfo'>" +
      `<div class='tracking-info_auto'><h1 class='auto-name'>${name}</h1><p class='auto-address'>${address}</p></div>` +
      "<ul class='tracking-info_list'>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Скорость</p><p id='trackingSpeed'>0 км/ч</p></li>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Пробег</p><p id='trackingMileage'>0.00 км</p></li>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Напряжение аккумулятора</p><p id='trackingBatteryVoltage'>0.00 В</p></li>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Широта</p><p id='trackingLatitude'>0 °</p></li>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Долгота</p><p id='trackingLongitude'>0 °</p></li>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Направление движения</p><p id='trackingTravelDirection'>0 °</p></li>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Высота над уровнем моря</p><p id='trackingHeightAboveSeaLevel'>0 м</p></li>" +
      "<li class='tracking-info_list-item'><p class='tracking-item__value'>Время обновления</p><p id='trackingUpdateTime'>00:00:00</p></li>" +
      "</ul>" +
      "</div>" +
      "<div class='tracking-history tracking-section trackingHistory'>" +
      "<form class='tracking-date__form'>" +
      "<div class='tracking-date__form-input__container'>" +
      "<input type='button' class='tracking-date__form-input' id='trackingHistoryDateInput'>" +
      "<label for='trackingHistoryDateInput' class='tracking-date__form-icon'></label>" +
      "</div>" +
      "</form>" +
      "<div class='tracking-history__data-list'>" +
      "<div class='tracking-history__data-item' id='moveTime'><i class='tracking-history__data-icon'></i><p class='tracking-history__data-text'>0ч. 0мин.</p></div>" +
      "<div class='tracking-history__data-item' id='traveledDistance'><i class='tracking-history__data-icon'></i><p class='tracking-history__data-text'>0км.</p></div>" +
      "<div class='tracking-history__data-item' id='parkingTime'><i class='tracking-history__data-icon'></i><p class='tracking-history__data-text'>0ч. 0мин.</p></div>" +
      "</div>" +
      "<ul class='tracking-history__action-list' id='actionList'></ul>" +
      "</div>" +
      "<div class='tracking-tasks tracking-section trackingTasks'>" +
      "<form class='tracking-date__form'>" +
      "<div class='tracking-date__form-input__container'>" +
      "<input type='button' class='tracking-date__form-input' id='trackingTaskDateInput'>" +
      "<label for='trackingTaskDateInput' class='tracking-date__form-icon'></label>" +
      "</div>" +
      "</form>" +
      "</div>" +
      "</div>" +
      "</div>"
  );

  function initialize() {
    var initPoint = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: initPoint,
      mapTypeControl: true,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    };

    map = new google.maps.Map(
      document.getElementById("trackingMap"),
      mapOptions
    );
  }

  initialize();

  $("#backArrow").click(function () {
    $("#trackingPage").detach();
    generateHomePage(autoList);
  });

  $(".tracking-menu__item").click(function () {
    $(".tracking-menu__item").removeClass("active");
    $(`#${$(this).attr("id")}`).addClass("active");
    $(".tracking-section").removeClass("active-section");
    $(`.${$(this).attr("id")}`).addClass("active-section");
  });

  const updateDataList = (actionList) => {
    let allTravelDistance = 0.0;
    let allParkingTime = { hours: 0, minute: 0 };
    let allDeliveryTime = { hours: 0, minute: 0 };

    actionList.forEach((action) => {
      if (action.action === "moveTime") {
        allTravelDistance += action.data.distance;
        allDeliveryTime.minute += action.data.time;
      }

      generateActionList(action.time, action.action, action.data);
    });

    allDeliveryTime.hours = Math.trunc(allDeliveryTime.minute / 60);
    allParkingTime.minute =
      new Date().getMinutes() +
      new Date().getHours() * 60 -
      allDeliveryTime.minute;
    allDeliveryTime.minute -= allDeliveryTime.hours * 60;
    allParkingTime.hours = Math.trunc(allParkingTime.minute / 60);
    allParkingTime.minute -= Math.trunc(allParkingTime.minute / 60) * 60;

    $("#traveledDistance .tracking-history__data-text").text(
      `${allTravelDistance.toFixed(2)} км.`
    );
    $("#moveTime .tracking-history__data-text").text(
      `${allDeliveryTime.hours}ч. ${allDeliveryTime.minute}мин.`
    );
    $("#parkingTime .tracking-history__data-text").text(
      `${allParkingTime.hours}ч. ${allParkingTime.minute}мин.`
    );
  };

  updateDataList(actionList);

  $("#trackingHistoryDateInput, #trackingTaskDateInput")
    .datepicker({ dateFormat: "d M. yy г." })
    .datepicker("setDate", new Date())
    .change(function () {
      $("#actionList").empty();

      updateDataList(actionListChanged);
    });
};
const generateReportPage = (autoName) => {
  let dateFormat = "d M. yy";
  let dateList = [];

  $("#homePage").detach();

  $("main").append(
    "<div class='report-page' id='reportPage'>" +
      "<div class='nav-menu' id='navMenu'>" +
      "<div class='nav-menu__toggle'>" +
      "<i id='backArrow'></i>" +
      "</div>" +
      `<p class='nav-menu__text' >Отчет ${autoName}</p>` +
      "</div>" +
      "<form class='report-date__form'>" +
      "<div class='report-list__container'>" +
      "<div class='report-date__form-input__container'>" +
      "<input type='button' class='report-date__form-input' id='fromFormInput'>" +
      "<label for='fromFormInput' class='report-date__form-label'>C</label>" +
      "</div>" +
      "<div class='report-date__form-input__container'>" +
      "<input type='button' class='report-date__form-input' id='toFormInput'>" +
      "<label for='toFormInput' class='report-date__form-label'>По</label>" +
      "</div>" +
      "</div>" +
      "<button type='button' class='report-date__form-button' id='generateReport'>СФОРМИРОВАТЬ</button>" +
      "</form>" +
      "<ul class='report-list' id='reportList'>" +
      "<div class='report-list__container'>" +
      "</div>" +
      "</ul>" +
      "</div>"
  );

  $("#backArrow").click(function () {
    $("#reportPage").detach();
    generateHomePage(autoList);
  });

  let fromDate = $("#fromFormInput")
    .datepicker({ dateFormat: "d M. yy г.", maxDate: new Date() })
    .datepicker("setDate", -7)
    .change(function () {
      $("#toFormInput").datepicker("option", "minDate", getDate(this));
    })
    .datepicker("getDate");
  let toDate = $("#toFormInput")
    .datepicker({
      dateFormat: "d M. yy г.",
      minDate: new Date().getDay() - 7,
    })
    .datepicker("setDate", new Date())
    .change(function () {
      $("#fromFormInput").datepicker("option", "maxDate", getDate(this));
    })
    .datepicker("getDate");

  function getDate(element) {
    let date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }

    return date;
  }

  for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
    dateList.push($.datepicker.formatDate("d M. yy г.", d));
  }
  $("#reportList .report-list__container")
    .empty()
    .append(
      "<li class='report-list__item' id='firstReportItem'><p class='report-list__item-text'>Общий пробег</p><p class='report-list__item-distance'>0.00 км</p></li>"
    );

  dateList.forEach((date) => generateReportList(date));

  $("#firstReportItem .report-list__item-distance").text(
    `${AllDistance.toFixed(2)} км`
  );

  $("#generateReport").click(function () {
    let fromDate = $("#fromFormInput").datepicker("getDate");
    let toDate = $("#toFormInput").datepicker("getDate");
    dateList = [];
    AllDistance = 0.0;

    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      dateList.push($.datepicker.formatDate("d M. yy", d));
    }
    AllDistance = 0.0;

    $("#reportList .report-list__container")
      .empty()
      .append(
        "<li class='report-list__item' id='firstReportItem'><p class='report-list__item-text'>Общий пробег</p><p class='report-list__item-distance'>0.00 км</p></li>"
      );

    dateList.forEach((date) => generateReportList(date));

    $("#firstReportItem .report-list__item-distance").text(
      `${AllDistance.toFixed(2)} км`
    );
  });
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
        generateAutoList(auto.name, auto.address, auto.id);
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
          generateAutoList(auto.name, auto.address, auto.id);
        }
      });
    });

  autoList.forEach((auto) => {
    generateAutoList(auto.name, auto.address, auto.id);
  });

  $(".auto-list__item #carStatistics").click(function () {
    generateReportPage($(this).parent().find($(".auto-name")).text());
  });

  $(".auto-list__item-container").click(function () {
    generateTrackingPage(
      $(this).parent().find($(".auto-name")).text(),
      $(this).parent().find($(".auto-address")).text(),
      $(this).parent().attr("id")
    );
  });
};
if (authorized) {
  loginPage.detach();
  generateHomePage(autoList);
}
