var geoPermissionStatus;

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
            resolve(true);
        }
    

    });

}


