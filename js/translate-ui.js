const availableLanguages = [
  //{ code: "en", name: "English" },
  { code: "es", name: "Español" },
];

const langStrings = {
  es: {
    "lang-title": "Elegir Indioma",
    "ar-advise-title": "Realidad Aumentada",
    "ar-advise-msg":
      "Por favor, por su seguridad y un correcto funcionamiento, mantén activada la localización del dispositivo móvil y permanece en zonas al aire libre.",
    info: "Información",
    poiList: "Puntos de Interés",
    confirmation: "Hecho",
    acknowledge: "Entendido",
    "geo-advise-title": "Activa la Geolocalización",
    "geo-advise-msg":
      "Por favor, para un correcto funcionamiento mantén activada la localización del dispositivo móvil.",
    "geo-advise-check": "Ya la he activado",
    next: "Siguiente",
    previous: "Anterior",
    close: "Cerrar",
    goToDipu: "Ir al Sitio Diputación de Jaén",
    goToParaiso: "Ir al Sitio Jaén Paraíso Interior",
    attrib: "Actividad subvencionada por la Diputación Provincial de Jaén",
  },
  en: {
    "lang-title": "Select Language",
    "ar-advise-title": "Augmented Reality",
    "ar-advise-msg":
      "Please, for your security and a correct operation, keep the device geolocation ON and stay at outdoor areas.",
    info: "Info",
    poiList: "Points of Interest",
    confirmation: "Done",
    acknowledge: "OK",
    "geo-advise-title": "Switch On your Device Geolocation ",
    "geo-advise-msg":
      "Please, for a correct operation keep the device geolocation ON.",
    "geo-advise-check": "Already Activated",
    next: "Next",
    previous: "Previous",
    close: "Close",
    attrib: "Activity subsidized by the Jaén Provincial Council",
    goToDipu: "Go to Jaén Provincial Council Website",
    goToParaiso: "Go to 'Jaén Paraíso Interior' Website",
  },
};

var language = availableLanguages[0];
var firstSelection = true;
function changeLang(code) {
  var newLang = availableLanguages.find((lang) => lang.code == code);

  if (newLang) {
    language = newLang;
  }

  $("#lang-img").attr(
    "src",
    `https://unpkg.com/language-icons/icons/${code}.svg`
  );
  $("#lang-img").attr("title", language.name);
  $("#lang-img").attr("alt", language.name);
  $(".swal2-confirm").text(langStrings[language.code]["confirmation"]);
  $(".swal2-title").text(langStrings[language.code]["lang-title"]);

  $("#chooseLang-btn").attr("title", langStrings[language.code]["lang-title"]);

  $("#info-btn").attr("title", langStrings[language.code]["info"]);
  $("#poiList-btn").attr("title", langStrings[language.code]["poiList"]);


}

function openChooseLangModal() {
  var langModalBody = `<div class="row lang-selector"><img id="lang-img" class="col" width="64px" alt="${language.name}" title="${language.name}" src="https://unpkg.com/language-icons/icons/${language.code}.svg">
  <div class="col"><select class="form-select" aria-label="Default select example" onchange="changeLang(this.value);">`;
  availableLanguages.forEach((lang) => {
    langModalBody += `<option ${
      lang.code == language.code ? "selected" : ""
    } value="${lang.code}">
        ${lang.name}
        </option>`;
  });

  langModalBody += `</select></div></div>`;

  Swal.fire({
    title: langStrings[language.code]["lang-title"],
    html: langModalBody,
    showDenyButton: false,
    confirmButtonText: langStrings[language.code]["confirmation"],
  }).then(function () {
    if (firstSelection) {
      firstSelection = false;
      loadData();
    }
  });
}

function openChooseLangModalV2() {
  var langModalBody = `<div class="row lang-selector"><img id="lang-img" class="col" width="64px" alt="${language.name}" title="${language.name}" src="https://unpkg.com/language-icons/icons/${language.code}.svg">
  <div class="col"><select class="form-select" aria-label="Default select example" onchange="changeLang(this.value);">`;
  availableLanguages.forEach((lang) => {
    langModalBody += `<option ${
      lang.code == language.code ? "selected" : ""
    } value="${lang.code}">
        ${lang.name}
        </option>`;
  });

  langModalBody += `</select></div></div>`;

  Swal.fire({
    title: langStrings[language.code]["lang-title"],
    html: langModalBody,
    showDenyButton: false,
    confirmButtonText: langStrings[language.code]["confirmation"],
  }).then(function () {
    if (firstSelection) {
      firstSelection = false;
      loadData();
    }
  });
}
