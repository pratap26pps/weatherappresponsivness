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


  // for back ground effect 







  const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fullscreenBtn = document.getElementById("fullscreenBtn");

// Fullscreen handling
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.textContent = "⤡";
  } else {
    document.exitFullscreen();
    fullscreenBtn.textContent = "⤢";
  }
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenBtn.textContent = "⤢";
  } else {
    fullscreenBtn.textContent = "⤡";
  }
});

// Enable motion blur
ctx.globalCompositeOperation = "lighter";

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Smoke {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 5; // Reduced from 20+10 to 10+5
    this.speed = {
      x: (Math.random() - 0.5) * 1, // Reduced from 2 to 1
      y: -Math.random() * 1 // Reduced from 2 to 1
    };
    this.alpha = 0.25; // Reduced from 0.5 to 0.25
    this.decay = Math.random() * 0.01 + 0.005;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(100, 100, 100, 0.25)"; // Reduced from 0.5 to 0.25
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    this.alpha -= this.decay;
    this.size += 0.2;
  }
}

class Raindrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.speed = Math.random() * 10;
    this.length = Math.random() * 10 + 10;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.strokeStyle = "rgba(174, 194, 224, 0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
    }
  }
}

class Particle {
  constructor(x, y, color, velocity, type) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.type = type;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.015;
    this.hasSmokeEmitted = false;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.velocity.y += 0.05;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= this.decay;

    // Emit smoke when particle starts to fade
    if (!this.hasSmokeEmitted && this.alpha < 0.8) {
      smoke.push(new Smoke(this.x, this.y));
      this.hasSmokeEmitted = true;
    }
  }
}

let particles = [];
let smoke = [];
const raindrops = Array(200)
  .fill()
  .map(() => new Raindrop());

function createParticles(x, y, type) {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
  const particleCount = 100;

  for (let i = 0; i < particleCount; i++) {
    let velocity;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / particleCount;

    switch (type) {
      case 1: // Burst
        velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8
        };
        break;
      case 2: // Spider
        velocity = {
          x: Math.cos(angle) * 5,
          y: Math.sin(angle) * 5
        };
        break;
      case 3: // Circle
        velocity = {
          x: Math.cos(angle) * 3,
          y: Math.sin(angle) * 3
        };
        break;
      case 4: // Heart
        const t = (Math.PI * 2 * i) / particleCount;
        const scale = 16;
        velocity = {
          x: scale * Math.pow(Math.sin(t), 3),
          y:
            (scale *
              (13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t))) /
            16
        };
        break;
      case 5: // Spiral
        const radius = (i / particleCount) * 5;
        velocity = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        };
        break;
      case 6: // Double Ring
        const ringRadius = i % 2 === 0 ? 3 : 6;
        velocity = {
          x: Math.cos(angle) * ringRadius,
          y: Math.sin(angle) * ringRadius
        };
        break;
      case 7: // Cross
        velocity = {
          x: i % 2 === 0 ? Math.cos(angle) * 5 : Math.sin(angle) * 5,
          y: i % 2 === 0 ? Math.sin(angle) * 5 : Math.cos(angle) * 5
        };
        break;
      case 8: // Star
        const starAngle = angle + Math.PI / 2;
        const starRadius = i % 2 === 0 ? 6 : 3;
        velocity = {
          x: Math.cos(starAngle) * starRadius,
          y: Math.sin(starAngle) * starRadius
        };
        break;
      case 9: // Wave
        velocity = {
          x: Math.cos(angle) * 4,
          y: Math.sin(i * 0.1) * 4
        };
        break;
      case 10: // Explosion
        const explosionSpeed = Math.random() * 10 + 5;
        velocity = {
          x: Math.cos(angle) * explosionSpeed,
          y: Math.sin(angle) * explosionSpeed
        };
        break;
    }

    particles.push(new Particle(x, y, color, velocity, type));
  }
}

function launchFirework(type) {
  const x = Math.random() * canvas.width;
  const y = canvas.height;
  const targetY = canvas.height * 0.3;
  const launchParticle = new Particle(x, y, "#ffffff", { x: 0, y: -10 }, 0);

  const animate = () => {
    if (launchParticle.y > targetY) {
      launchParticle.update();
      launchParticle.draw();
      requestAnimationFrame(animate);
    } else {
      createParticles(launchParticle.x, launchParticle.y, type);
    }
  };

  animate();
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 20, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  raindrops.forEach((raindrop) => {
    raindrop.update();
    raindrop.draw();
  });

  particles = particles.filter((particle) => particle.alpha > 0);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  smoke = smoke.filter((smoke) => smoke.alpha > 0);
  smoke.forEach((smoke) => {
    smoke.update();
    smoke.draw();
  });

  requestAnimationFrame(animate);
}

animate();

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  createParticles(x, y, Math.floor(Math.random() * 10) + 1);
});
