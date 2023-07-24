var geoPermissionStatus;
var geoUserLoc=undefined;
var hasGeoLoc=false;


function success(pos) {
  const crd = pos.coords;

  geoUserLoc={
    latitude:crd.latitude,
    longitude:crd.longitude
  }
  hasGeoLoc=true;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}



function noGeolocationModal() {
  Swal.fire({
    icon: "error",
    title: langStrings[language.code]["geo-advise-title"],
    text: langStrings[language.code]["geo-advise-msg"],
    showDenyButton: false,
    confirmButtonText: langStrings[language.code]["geo-advise-check"],
  }).then((result) => {
    window.location = "";
  });
}

async function checkGeo()
{ 
  await loadARData();  
  geoPermissionStatus= await navigator.permissions.query({ name: "geolocation" });
    return new Promise((resolve, reject) => {
        
        //console.log(geoPermissionStatus);
        geoPermissionStatus.onchange = function () {
          console.log(
            "geolocation permission state has changed to ",
            geoPermissionStatus.state
          );
          if (geoPermissionStatus.state === "granted") {
            window.location = "";
          } else {
            noGeolocationModal();
          }
        };
      
        if (geoPermissionStatus.state !== "granted") {
          noGeolocationModal();
          resolve(false);
        }else{

          navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
          
            resolve(true);
        }
    

    });

}


