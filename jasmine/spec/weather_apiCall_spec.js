/* Jasmine test
 * 
 * API call to OpenWeatherMap
 * 
 */

describe("Weather", function() {
  
	var weather;
	
	// test on new instantiation
	beforeEach(function() {
		weather = new Weather();
	});

	
	// checks if call was made to API
	it("should make a real AJAX request to OpenWeatherMap and process results", function (done) {
		
		// spy
		spyOn(weather, 'forecast_getForecast').and.callThrough();
		
		// spy
		spyOn(weather, 'forecast_processGetForecastResponse').and.callThrough();
		
		// initialise
		weather.initialise();
		
		setTimeout(function(){
			// check on ajax request call
			expect(weather.forecast_getForecast).toHaveBeenCalled();
			
			// check on processing of response
			expect(weather.forecast_processGetForecastResponse).toHaveBeenCalled();
			
			// check that a result set has actually been returned by the API
			var service = 'fiveDayForecast';
			expect(weather.forecast.results[service]).toEqual(jasmine.any(Object));
			
			done();
		}, 2000); // allow time for the asynch ajax call to be made
		
	});
  
});
