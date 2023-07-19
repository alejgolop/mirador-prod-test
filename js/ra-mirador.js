const mockPosition=true;

var data;
var swiper = undefined;

window.onload = () => {

  //Internalization

  changeLang(language.code);
  if(availableLanguages.length<2)
  {
    
    loadData();
  }else{
    $("#chooseLang-btn").removeClass("invisible");
    openChooseLangModal();
  }

  //No Internalization
  //loadData();
  
};

function loadData()
{
  checkGeo().then((success) => {
    if (success) {
      data = [];
      ARdata.pois.forEach((poi,index) => {
        var processedPoi = structuredClone(poi);
        if(mockPosition)
        {
          processedPoi.coordinates=ARdata.mockPoints[index];
        }

        
        var procMedia = [];
        processedPoi.media.forEach((mediaItem) => {
          procMedia.push(ARdata.mediaOrigin + mediaItem);
        });

        if (processedPoi.iconSpot.length > 1) {
          processedPoi.iconSpot = ARdata.mediaOrigin + processedPoi.iconSpot;
        }

        processedPoi.media = procMedia;
        data.push(processedPoi);
      });
      //data = structuredClone(ARdata.features);
      renderData();

      //window.addEventListener( 'mouseup', onMouseClick, false );
      howTo();
    }
  });
  $('.arjs-loader').addClass('invisible');
}

function howTo() {
  Swal.fire({
    icon: "info",
    title: langStrings[language.code]["ar-advise-title"],
    text: langStrings[language.code]["ar-advise-msg"],
    showDenyButton: false,
    confirmButtonText:langStrings[language.code]["acknowledge"],
  });
}

function renderData() {
  let scene = document.querySelector("a-scene");
  data.forEach((arPoint, index) => {
    let latitude = arPoint.coordinates[1];
    let longitude = arPoint.coordinates[0];

    let element = document.createElement("a-image");
    element.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    element.setAttribute("clickhandler", "");

    element.setAttribute(
      "src",
      arPoint.iconSpot.length > 1 ? arPoint.iconSpot : "#info-icon"
    );
    element.setAttribute("look-at", "[gps-camera]");
    element.setAttribute("height", "15");
    element.setAttribute("width", "15");
    element.setAttribute("ardataid", "" + index);
    /*element.addEventListener('click', (event) => {
            alert("Click");
            var elem=findNameByPosition(event.target.getAttribute("ardataid"));
            alert("You Clicked on "+elem.name+" !");
          })*/

    let marginElement = document.createElement("a-plane");
    marginElement.setAttribute("clickhandler", "");
    marginElement.setAttribute("visible", "false");
    marginElement.setAttribute("height", "90");
    marginElement.setAttribute("width", "90");
    marginElement.setAttribute("ardataid", "" + index);

    element.appendChild(marginElement);

    scene.appendChild(element);
  });
}

function findNameByPosition(id) {
  return data[id];
}

function showPOI(poi) {
  $(".swiper-wrapper").empty();
  swiper?.destroy();

  if (poi.media && poi.media.length > 0) {
    poi.media.forEach((media, index) => {
      const mediaTitle = "Multimedia " + poi.name + " " + (index + 1);

      var extension = media.substring(media.lastIndexOf("."));
      var newElem;
      if ([".mp4", ".webm", ".avi"].includes(extension)) {
        // Is a Video
        newElem = `<div class="swiper-slide"><video controls><source src="${media}" type="video/mp4"></video></div>`;
      } else {
        // Is an Image
        newElem = `<div class="swiper-slide"><img src="${media}?rnd=${Math.random()}" title="${mediaTitle}" alt="${mediaTitle}"></div>`;
      }
      $(".swiper-wrapper").append(newElem);
    });

    swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  $("#poi-title").text(poi.name);
  $("#poi-body").empty();
  poi.brief[language.code].forEach((paragraph) => {
    $("#poi-body").append(`<p>${paragraph}</p>`);
  });
  $("#modal-poi").modal("show");

  $(".swiper-button-prev").attr("title",langStrings[language.code]["previous"]);
  $(".swiper-button-next").attr("title",langStrings[language.code]["next"]);
  $(".btn-close").attr("title",langStrings[language.code]["close"]);

}

function stopVideos() {
  var videos = document.getElementsByTagName("video");
  for (let video of videos) {
    video.pause();
    video.currentTime = 0;
  }
}
