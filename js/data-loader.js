var ARdata=undefined;

async function loadARData(){
    ARdata=await fetch("data/ar-data.json").then((response) => response.json());
    document.title=ARdata.name;
}