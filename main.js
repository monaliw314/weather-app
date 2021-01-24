let loc = document.getElementById("location");
let tempicon= document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let con=document.getElementById("country");

let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-btn");

searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';

});

const getWeather=async(city)=>{
    try{
        const url=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd04696044343a824b0363657e587c46`,
        {mode:'cors'});
        const weatherdata=await url.json();
        console.log(weatherdata);
            const{name}=weatherdata;
            const{feels_like}=weatherdata.main;
            const{id,main}=weatherdata.weather[0];
            const{country}=weatherdata.sys;
            loc.textContent=name;
            climate.textContent=main;
            tempvalue.textContent=Math.round(feels_like-273);
            con.textContent=country;
            if(id<300 && id>200){
                tempicon.src="./icons/storm.svg";
            }else if(id<400 && id>300){
                tempicon.src="./icons/drizzle.svg";
            }else if(id<600 && id>500){
                tempicon.src="./icons/rainy.svg";
            }else if(id<700 && id>600){
                tempicon.src="./icons/cloudy.svg";
            }else if(id<800 && id>700){
                tempicon.src="./icons/atmosphere.svg";
            }else if(id==800){
                tempicon.src="./icons/clear.svg";
            }else if(id>800){
                tempicon.src="./icons/clouds.svg";
            }
    }
    catch(error){
        alert("city not found");
    }
}

//when we load the page user allow the permission to access your current location thats why we add event listener
window.addEventListener('load',()=>{
    //console.log("window loaded");
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            console.log(long);
            console.log(lat);

            const proxy="https://cors-anywhere.herokuapp.com/";
            const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fd04696044343a824b0363657e587c46`;
            fetch(api).then((response) =>{
                return response.json();
            })
            .then(result=>{
                console.log(result);
                const{name}=result;
                const{feels_like}=result.main;
                const{id,main}=result.weather[0];
                const{country}=result.sys;
                loc.textContent=name;
                climate.textContent=main;
                tempvalue.textContent=Math.round(feels_like-273);
                con.textContent=country;
                if(id<300 && id>200){
                    tempicon.src="./icons/storm.svg";
                }else if(id<400 && id>300){
                    tempicon.src="./icons/drizzle.svg";
                }else if(id<600 && id>500){
                    tempicon.src="./icons/rainy.svg";
                }else if(id<700 && id>600){
                    tempicon.src="./icons/cloudy.svg";
                }else if(id<800 && id>700){
                    tempicon.src="./icons/atmosphere.svg";
                }else if(id==800){
                    tempicon.src="./icons/clear.svg";
                }else if(id>800){
                    tempicon.src="./icons/clouds.svg";
                }
                
            })
            .catch(error => console.log('error', error));
            

        });
    }else{
        console.log("location not found");
    }

});