//  const API="3d1b83a8ae5b7326f321b71dd18f646c";
// fetch
const searchWeather =document.querySelector(".searchWeather");
const yourWeather =document.querySelector(".yourWeather");
const grantLocation =document.querySelector(".grantLocation");
const accessButton =document.querySelector(".accessButton");
const showData =document.querySelector(".showData");
const search =document.querySelector(".search");
const fetchTemp =document.querySelector(".fetchTemp");

const windData =document.querySelector(".windData");
const humidityData =document.querySelector(".humidityData");
const cloudData =document.querySelector(".Data");

const searchCity =document.querySelector(".searchCity");
const hand =document.querySelector(".hand");
const loading =document.querySelector(".loading");

// default show
let currentTab=yourWeather;
currentTab.classList.add("Tab");
showData.classList.remove("active")
getFromSessionStorage();


yourWeather.addEventListener('click',()=>{
 switchTab(yourWeather);

 grantLocation.classList.remove("active");
 search.classList.remove("active");
 showData.classList.remove("active");
 loading.classList.remove("active");
 getFromSessionStorage();
});
searchWeather.addEventListener('click',()=>{
  switchTab(searchWeather);
  grantLocation.classList.remove("active");
  loading.classList.remove("active");
 });
// hide and display result during clicked button

function switchTab (clickedTab){

  if (clickedTab != currentTab){
      currentTab.classList.remove("Tab");
      currentTab=clickedTab;
      currentTab.classList.add("Tab");
  }
if(!search.classList.contains("active")){
  showData.classList.remove("active");
  grantLocation.classList.remove("active");
  search.classList.add("active");
  
}
else{
  search.classList.remove("active");
  showData.classList.add("active");
   getFromSessionStorage();
}
}
// check if already coordinates are already present session storeage
function getFromSessionStorage(){
   const localCoordinates =sessionStorage.getItem("user-coordinates");
   if(!localCoordinates){
    grantLocation.classList.add("active");
   }
   else {
      const coordinates= JSON.parse(localCoordinates);
      fetchShowData(coordinates);
   }
}
 async function  fetchShowData(coordinates){
  const{lat,lon}=coordinates;
  // make grantLocation invisible
 
  grantLocation.classList.remove("active");
  // make loader visible
  loading.classList.add("active");
  // api call
 try{
  
  const apiKey = '3d1b83a8ae5b7326f321b71dd18f646c';

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        


  const data= await response.json();
  
  loading.classList.remove("active");
  showData.classList.add("active");

  renderWeather(data);

 }
 catch(err){
  loading.classList.remove("active");
  console.log("error thik karo bhai");

 }
}
 function renderWeather(weatherinfo){
  // firstly, we have to fetch the element
  const city=document.querySelector(".city");
  const desc=document.querySelector(".desc");
  const fetchTemp=document.querySelector(".fetchTemp");

  const windData=document.querySelector(".windData");
  const cloudData=document.querySelector(".cloudData");
  const humidityData=document.querySelector(".humidityData");

      // Convert Kelvin to Celsius
     function kelvinToCelsius(kelvin) {
      return (kelvin - 273.15).toFixed(2); // Convert and format to 2 decimal places
  }
  //  fetch values from weather to element
    city.innerText=weatherinfo?.name;
    desc.innerText = weatherinfo?.[0]?.description;
    fetchTemp.innerText=`${kelvinToCelsius(weatherinfo?.main?.temp)} °C`;
    windData.innerText=`${kelvinToCelsius(weatherinfo?.wind?.speed)}m/s`;
   cloudData.innerText =`${weatherinfo?.clouds.all}%`;
   humidityData.innerText =`${weatherinfo?.main?.humidity}%`;
 }

 

accessButton.addEventListener('click',getLocation);
// get current lati and longi by this method
    function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          console.error('Geolocation is not supported by this browser.');
      }
    }
    function showPosition(position) {
      const userCoordinates={
       lat : position.coords.latitude,
       lon : position.coords.longitude,
      
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchShowData(userCoordinates);
  }
 
    // Call the function to get location
      getLocation();



  hand.addEventListener('click',(e)=>{
    e.preventDefault();
    let cityname=searchCity.value;
    if(cityname===""){
      return;
    }
    else{
      handClicked(cityname);
          
    }
    console.log ("dekho click huwa");
     
  })
 async function  handClicked(city){
    loading.classList.add("active");
    search.classList.remove("active");
    showData.classList.remove("active");
    grantLocation.classList.remove("active");
  try{
    const APIkey = '3d1b83a8ae5b7326f321b71dd18f646c';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`); 
      
   const data= await response.json();
   loading.classList.remove("active");
   search.classList.remove("active");
   showData.classList.add("active");
   renderWeather(data);
  }
  catch(e){
     console.log("city api request thik karo")
  }

  }    
  console.log("sab ok hai");