/* Jasmine test
 * 
 * Tests the dom manipulation of the weather App.
 * Loads, runs and display the entire weather app first.
 * 
 */

describe("Weather", function() {
  
	// ref class declared in global
	var weather;
	var $body;
	
	// test on new instantiation
	beforeAll(function() {		
		
		// wait for the dom to build
		setTimeout(function(){
	
		}, 2000);
		
		// ref class
		weather = Weather;
		
		// ref the body
		$body = $('body');
	});

	// check the location, temp and description
	it("has displayed the 'now' information", function() {		
	  
		// location
		expect(weather.allItems.main.$location.text().trim()).not.toEqual('');
		
		// description
		expect(weather.allItems.main.$description.text().trim()).not.toEqual('');
		
		// temperature
		expect(weather.allItems.main.$tempNow.text().trim()).not.toEqual('');
		
	});
	
	
	// check the today information
	it("has displayed the 'today' information", function() {		
		
		// max temperature
		expect(weather.allItems.today.$tempMax.text().trim()).not.toEqual('');
		
		// min temperature
		expect(weather.allItems.today.$tempMin.text().trim()).not.toEqual('');
		
		// time sections have been inserted into the parent wrapper
		expect(weather.allItems.today.$allHoursWrapper.children().length).toBeGreaterThan(0);
		
	});
	
	
	// check the daye information
	it("has displayed the 'day' information", function() {		

		// day sections have been inserted into the parent wrapper
		expect(weather.allItems.days.$dayWrapper.children().length).toBeGreaterThan(0);
		
	});
	
	
  
});
