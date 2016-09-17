# Weather app
Tech test for BuildIt - 5 day weather forecast

Current version: 1.0.

View live demo at: www.hamel.com/weather .

## About
This application displays the current and 5 day weather forecast for London, United Kingdom.

The application sits in a single HTML5 page and uses custom Javascript and CSS, and also Bootstrap for the screen resizing.

Weather data is obtained from the OpenWeatherMap project (http://openweathermap.org/forecast5).

##Installation
Download or clone all the files and folders in this repository.

Add the files to the top of your web directory from which you wish to serve the applicastion.

This repository also contains the Jasmine test files, in the folder 'jasmine' at the top of the directory. The jasmine foler, and its contents, are not required to run the application.

## Version notes
This first version has limited functionality: it displays the current and 5 day forecast for London, only.

## Testing
The core of this app is the custom javascript engine, 'weather.1.o.js', in the top-level js folder.  The testing use Jasmine and focuses on this custom engine.

To test the API request, and processing of results, to the OpenWeatherMap service, direct your browser to <your wwww home directoy>/jasmine/SpecRunner.html .

To test the DOM rendering of the weather forecast, direct your browser to <your wwww home directoy>/jasmine/SpecRunner.html . The test results will appear at the bottom of the page.

This test relies on the browser having completed loading, making the AOPI call, and rendering the resylts. The time to do this will vary, so the test might fail because it runs too soon. To delay the test until your browser has finished rendering, edit the file /jasmine/spec/weather_display_spec.js: increase the timeout delay in the 'beforeAll' call, on line 20.




