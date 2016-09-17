/* Jasmine test
 * 
 * Intitialisation of app.
 * Initial settings.
 * 
 */

describe("Weather", function() {
  
	// class
	var weather;
 
	// test on new instantiation
	beforeEach(function() {
		weather = new Weather();
		
		// initialise
		weather.initialise();
	});

	it("is able to initialise", function() {		
	  
		// check initial objects for presence and states
		expect(weather.forecast).toEqual(jasmine.any(Object));
		expect(weather.services).toEqual(jasmine.any(Object));
		expect(weather.settings).toEqual(jasmine.any(Object));
	});
	
	// check for the version - to be version 1.x
	it("is running version 1", function() {
		expect(weather.version).not.toBeLessThan(1);
		expect(weather.version).toBeLessThan(2);
	});
	
	
	// check for the 3rd part service settings
	it("is set to use OpenWeatherMap 5 day forecast", function() {
		expect(weather.services.openWeatherMap.fiveDayForecast.url).toEqual('http://api.openweathermap.org/data/2.5/forecast');
	});
	
	
	// check for settings after initialisation
	describe("has initialsed and", function() {
 			
		// check for values of initial settings
		it("the local persistence functionality should not be available (in version 1)", function() {
			 expect(weather.settings.haveLocal).toBeFalsy();
		});
	
		// inital city
		it("the initial city is set to London", function() {
			expect(weather.settings.current.location.openWeatherMap.name).toEqual('London');
		});
    
	});

  
});
