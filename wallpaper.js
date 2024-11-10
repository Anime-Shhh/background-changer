const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherInfoCard = document.querySelector(".weatherInfoCard");
const bodyElement = document.querySelector("body");
const apiKey = "88f3393974379e7982953a53c485e990";

//fetches info from textbox once submit button is active
weatherForm.addEventListener("submit", async event => {
    //ensures the page doesn't refresh 
    event.preventDefault();
    //gets value from textbox
    const city = cityInput.value;

    //checks if the textbox is not empty
    if(city){
        //runs our code below if theres no error but if theres a problem
        //at any moment, it will go to catch (this was happening when the "temp"
        //variable was being accessed by the api when u put a fake city)
        try {
            const weatherData = await getWeather(city);
            displayWeather(weatherData);

        //checks for any erros while executing the "try" code above
        } catch (error) {
            console.error(error);
            displayError("This is not a real place or we couldn't fetch some info about it");
        }
    }else{
        displayError("Please enter a location");
    }
});

async function getWeather(city){

    const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    //console.log(response);
    if(!response.ok){
        displayError("Please enter a valid city");
    }

    return await response.json();
}

function displayWeather(data){
    console.log(data);

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;


    weatherInfoCard.textContent = "";
    weatherInfoCard.display = "flex";

    let tempC = Math.round(temp - 273.15);

    
    if(tempC > 30){
        bodyElement.style.backgroundImage = 'url(images/Daytime.webp)'
        bodyElement.style.backgroundSize = "cover"
    }


}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    bodyElement.style.backgroundImage = 'none';
    weatherInfoCard.textContent = "";
    weatherInfoCard.style.display = "flex"
    weatherInfoCard.appendChild(errorDisplay);
}

//text spacing conditional
cityInput.addEventListener('input', function(){

    if(cityInput.value == cityInput.value.toUpperCase() && cityInput.value != ""){
        cityInput.style.letterSpacing = '-10px';
    }else{
        cityInput.style.letterSpacing = 'normal';
    }
});

function displayTime()