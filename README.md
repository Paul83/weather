# Weather app
Tech test for BuildIt - 5 day weather forecast

Current version: 1.0.

View live demo at: www.hamel.com/weather.

## About
This application displays the current and 5 day weather forecast for London, United Kingdom.

The application sits in a single HTML5 page and uses custom Javascript and CSS, and also Bootstrap for the screen resizing.

Weather data is obtained from the OpenWeatherMap project (http://openweathermap.org/forecast5).

##Installation
Download or clone all the files and folders in this repository.

Add the files to the top of your web directory from which you wish to serve the applicastion.

This repository also contains Jasmine test files, in the folder 'jasmine' at the top of the directory. The jasmine folder, and its contents, are not required to run the application.

## Version notes
Due to the time constriants, this (first) version has restricted functionality:

* Fetch 5 day/ 3 hour weather forecast for fixed location (London, UK), from OpenWeatherMap.
* Use single language for UI (UK English) and Celsius for units.
* Refresh every 3 hrs.
* Limited displayed data (e.g. temp + description).
* Highlight of next 5 days. 

In addition, the graphic used are those of the service provider, OpenWeatherMap.

Given more development time, later versions could include:

* Language support – user can change language. To simplify development, only use languages available from the OpenWeatherMap API.
* Location support – user can change location of forecast (free text typing + auto recognition of city by parsing restricted list of available cities).
* Current location – identify current location using browser-based JavaScript* or call to third-party API. Set current location as default.
* Additional data – ability to show additional information, such as humidity and hourly temperatures.
* More detailed forecasts for days 2 – 5.
* Previous state
* Ability to change location displayed.
* User error messages.


## Testing
The core of this app is the custom javascript engine, 'weather.1.0.js', in the top-level js folder.   Testing, with Jasmine, has focused on this engine.

###API call
To test the API request to the OpenWeatherMap service, and processing of results, direct your browser to /jasmine/SpecRunner.html .

### DOM rendering
To test the DOM rendering of the weather forecast, direct your browser to /jasmine/SpecRunnerDisplay.html. (The test results will appear at the bottom of the page).

This test relies on the browser having completed loading, making the API call, and rendering the results. The time to do this will vary, so the test might fail because it runs too soon before the broweser has finished.

To delay the test until your browser has finished rendering, edit the file /jasmine/spec/weather_display_spec.js: increase the timeout delay in the 'beforeAll' call, on line 20.




