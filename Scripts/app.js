/**
 * FileName: app.js
 * 
 * @author Samuel Jimoh
 * @date April 01, 2017
 *
 * 
 * @description This file is the main javascript file for the web site
 */

// IIFE - Immediately Invoked Function Expression
(function () {
    "use strict";

    /**
     * This function uses the document.title to switch javascript function
     * when the page switches  
     * 
     * @function PageSwitcher
     * @return {void}
     */
    function PageSwitcher() {

        switch (document.title) {
            case "Home":
                Home();
                break;
            case "About Us":
                About();
                break;
            case "Contact Us":
                Contact();
                break;
            case "Top Deals":
                TopDeals();
                break;
            case "Flight Search":
                Flightsearch();
                break;
        }
    }


    /**
     * This function provides JavaScript code for the Home page
     * 
     * @function Home
     * @returns {void}
     */
    function Home() {

        //readWeatherLocal();

        //Actual API call
        readOpenWeather("florence");
        readOpenWeather("london");
        readOpenWeather("washington");
        readOpenWeather("nassau");
        readOpenWeather("sydney");
        readOpenWeather("dubai");
    }

    /**
     * This function provides JavaScript code for the About page
     * 
     * @function About
     * @returns {void}
     */
    function About() {
        myMap();
    }

    var formValidity = true;
    /**
     * This function provides JavaScript code for the Contact page
     * 
     * @function Contact
     * @returns {void}
     */
    function Contact() {
        
        createEventListeners();

        function validateForm(evt) {
            evt.preventDefault();  // prevent form from submitting

            formValidity = true; // reset value for revalidation

            validateContact("firstName");
            validateContact("lastName");
            validateContact("email");
            validateContact("contactNumber");

            if (formValidity == true)
            {
                document.getElementById("errorText").innerHTML = "";
                document.getElementById("errorText").style.display = "none";
                document.getElementsByTagName("form")[0].submit();
            }
            else
            {
                document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your form.";
                document.getElementById("errorText").className = "text-danger";
                document.getElementById("errorText").style.display = "block";
                scroll(0,0);
            }
        }

        function createEventListeners() {
            
            // addEventListener to the form element
            var form = document.getElementById("contactForm");
            form.addEventListener("submit",validateForm, false);
        }
    }

    /**
     * This function provides JavaScript code for the Top Deals page
     * 
     * @function TopDeals
     * @returns {void}
     */
    function TopDeals() {

    }

    /**
     * This function provides JavaScript code for the Contact page
     * 
     * @function Flightsearch
     * @returns {void}
     */
    function Flightsearch() {
    }


    /**
     * This function uses the google api to display map
     * based on longitude and latitude
     */
    function myMap() {  
            var myCenter = new google.maps.LatLng(43.785572, -79.226502);
            var mapProp = {
                    center: myCenter,
                        zoom: 15,
                        scrollwheel: true,
                        draggable: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var marker = new google.maps.Marker({
                    position: myCenter
                    });
            marker.setMap(map);
        }



    /**
     * This function displays weather information to the homepage
     * 
     * @function readData
     * @param {json} weatherData
     */
    function readData(weatherData) {
        var weather = weatherData;
        var cityName = weather.name;
        var cityNameLower = cityName.toLowerCase();
        var currentTemp = weather.main.temp;

        $("#" + cityNameLower).text(cityName + " Temp: " + currentTemp + "°C");
    }

    /**
     * This function reads weather information from the "openweathermap" API
     * 
     * @function readOpenWeather
     * @param {string} cityPara
     */
    function readOpenWeather(cityPara) {
        var city = cityPara;
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=c4e258a70b2d1e802ec9a337c96a5588',
            dataType: 'jsonp',
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                readData(data);
            }
        });
    }

    // app entry function
    function init() {
        PageSwitcher();
    }

    /**
     * Validate the html fields in the contact form
     * @param {string} inputType 
     */
    function validateContact(inputType) {
        //Initialize the variable and element to validate
        var validateField = document.getElementById(inputType).value;
        var validateFieldError = document.getElementById(inputType + "Error");
        
        // Construct a new validation object
        var myStuff  = new Validate();
        try {
            // Assign properties to the object 
            if(inputType == "firstName" || inputType == "lastName") {
                myStuff.SetName(validateField);
                myStuff.ValidateName();
                validateFieldError.style.display = "none";
            }
            else if(inputType == "email") {
                myStuff.SetEmail(validateField);
                myStuff.ValidateEmail();
                validateFieldError.style.display = "none";
            }
            else {
                myStuff.SetPhoneNumber(validateField);
                myStuff.ValidateContact();
                validateFieldError.style.display = "none";
            }

        }
        catch(e)
        {
            validateFieldError.className = "text-danger";
            validateFieldError.innerText = e;
            formValidity = false;
        }
    }

    // call init funciton when window finishes loading
    window.addEventListener("load", init);

})();
