
const mockPosition=window.location.search.includes('mockoffice');



var data;
var swiper = undefined;

window.onload = () => {

  //Internalization
  $('.arjs-loader').addClass('invisible');
/*   changeLang(language.code);
  if(availableLanguages.length<2)
  {
    loadData();
  }else{
    $("#chooseLang-btn").removeClass("invisible");
    openChooseLangModal();
  }
 */
  //No Internalization
  changeLang(language.code);
  loadData();
  
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
          processedPoi.coordinates=ARdata.mockPointsOFFICE[index];
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
     
      //checkGeoLocInterval=setInterval(checkGeoLoc,200)

      //window.addEventListener( 'mouseup', onMouseClick, false );
      howTo();
      renderData();
    }
  });
  $('.arjs-loader').addClass('invisible');
}



var checkGeoLocInterval;
function checkGeoLoc()
{
  if(hasGeoLoc)
  {
    clearInterval(checkGeoLocInterval);
    renderData();
  }
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

var elementSize=60;
var imageSize=50;

function renderData() {
  console.log("rendering")
  let scene = document.querySelector("a-scene");
  data.forEach((arPoint, index) => {
    let latitude = arPoint.coordinates[1];
    let longitude = arPoint.coordinates[0];
    


      let element = document.createElement("a-plane");


      element.setAttribute("height", arPoint.size*elementSize);
      element.setAttribute("width", arPoint.size*elementSize);

      

      element.setAttribute(
        "gps-new-entity-place",
        `latitude: ${latitude}; longitude: ${longitude};`
      );
      //element.setAttribute("clickhandler", "");
      //element.setAttribute("ardataid", "" + index);
      element.setAttribute("visible", "true");  
      element.setAttribute("look-at", "[gps-new-camera]");
      element.setAttribute("color","#FF0000");
      element.setAttribute("material","opacity: 0.0 transparent: true");

     
      element.setAttribute("position", `0 ${arPoint.altitude} 0`);      
      
     

    
      let imageElement = document.createElement("a-image");
      imageElement.setAttribute("ardataid", "" + index);
      imageElement.setAttribute("clickhandler", "");

      imageElement.setAttribute(
        "src",
        arPoint.iconSpot.length > 1 ? arPoint.iconSpot : "#info-icon"
      );

     /*  if(arPoint.elevated>0)
        {
          imageElement.setAttribute("position", `0 ${arPoint.elevated*45} 0`);      
        } */


     
        imageElement.setAttribute("height", arPoint.size*imageSize);
        imageElement.setAttribute("width", arPoint.size*imageSize);

    
  
   
      let marginElement = document.createElement("a-plane");
      marginElement.setAttribute("clickhandler", "");
      marginElement.setAttribute("visible", "false");
      marginElement.setAttribute("height",  arPoint.size*imageSize);
      marginElement.setAttribute("width",  arPoint.size*imageSize);
      marginElement.setAttribute("ardataid", "" + index);
  
      imageElement.appendChild(marginElement);


    element.appendChild(imageElement);
    scene.appendChild(element);
  });
}

function findNameByPosition(id) {
  return data[id];
}

function showPOIByIndex(index)
{
  //$(".modal-body").animate({ scrollTop: 0 }, "fast");
  showPOI(findNameByPosition(index));

  //showPOI(findNameByPosition(index));
}

function checkLandscape(){
  if(landscape){
    $(".modal-dialog").addClass("modal-fullscreen");
    $(".modal-dialog").removeClass("modal-xl");
  }else{
    $(".modal-dialog").removeClass("modal-fullscreen");
    $(".modal-dialog").addClass("modal-xl");
  }
}

function showPOI(poi) {
  
  checkLandscape();

  $(".swiper-wrapper").empty();
  swiper?.destroy();

  if (poi.media && poi.media.length > 0) {
    poi.media.forEach((media, index) => {
      const mediaTitle = "Multimedia " + poi.name + " " + (index + 1);

      var extension = media.substring(media.lastIndexOf("."));
      var newElem;
      if ([".mp4", ".webm", ".avi"].includes(extension)) {
        // Is a Video
        newElem = `<div class="swiper-slide"><video class="video-info" controls><source src="${media}" type="video/mp4"></video></div>`;
      } else {
        // Is an Image
        newElem = `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="${media}" title="${mediaTitle}" alt="${mediaTitle}"></div></div>`;
      }
      $(".swiper-wrapper").append(newElem);
    });

    swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      zoom: true,

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

  $("#poi-title-img").attr("src", "");
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
  var videos = document.getElementsByClassName("video-info");
  for (let video of videos) {
    video.pause();
    video.currentTime = 0;
  }
}

function openInfoModal() {

  checkLandscape();

  console.log("Opening Info Modal");

  $(".swiper-wrapper").empty();
  swiper?.destroy();

  $("#poi-title-img").attr("src", "img/info-btn.svg");
  $("#poi-title").text(langStrings[language.code]["info"]);

  $("#poi-body").empty();
  $("#poi-body").append(`<h3 class="text-center slogan">${langStrings[language.code]["attrib"]}</h3>`);
  $("#poi-body").append(`<div class="row text-center">
  <div class="col"><a title="${langStrings[language.code]["goToDipu"]}" target="_blank" href="https://www.dipujaen.es/"><img class="attrib-img" src="data/media/dipu-jaen.jpg" /></a></div>
  <div class="col"><a title="${langStrings[language.code]["goToParaiso"]}" target="_blank" href="https://www.jaenparaisointerior.es/"><img class="attrib-img" src="data/media/paraiso-jaen.jpg" /></a></div>
  </div>`);

  $("#modal-poi").modal("show");
}

function openPoiList()
{

  checkLandscape();

  $(".swiper-wrapper").empty();
  swiper?.destroy();

  $("#poi-title-img").attr("src", "img/list-btn.svg");
  $("#poi-title").text(langStrings[language.code]["poiList"]);
  $("#poi-body").empty();


  poiList=`<ul class="list-group">`;
 
  data.forEach((arPoint, index) => {
    poiList+=`<li class="list-group-item" onclick="showPOIByIndex(${index})">${arPoint.name}</li>`;
    
  });
  poiList+=`</ul>`;
  $("#poi-body").append(poiList);

  $("#modal-poi").modal("show");

}