/*! (c) 2016 Paul Oliver 
 * 
 * Core app for displaying 5 day weather forecast
 */


// class definition (global)
function Weather(){};


// core initialisation
Weather.prototype.initialise = function(){
	
	// initialise settings
	this.settings_initialise();
	
	// initialise persistence
	this.persistence_initialise();
	
	// initialise dom elements
	this.display_initialise();
	
	// load initial and previous settings
	this.settings_load();
	
	// load forecast (and update page)
	this.forecast_update();
};



// settings and data objs
Weather.prototype.settings_initialise = function(){
	
	// record version from file name
	this.version = 0;
	this.setScriptVersion();
	
	// forecast info
	this.forecast = {};
	this.forecast.results = {};
	this.forecast.service = 'fiveDayForecast'; // default service
	this.forecast.serviceProvider = 'openWeatherMap'; // use this service provider as default
	
	// 3rd-party services
	this.services = {}; // all services
	this.services.openWeatherMap = {}; // OpenWeatherMap
	this.services.openWeatherMap.accessKey = 'f413bd1ede89e3fa17b155e41b100d14';
	this.services.openWeatherMap.fiveDayForecast = {};
	this.services.openWeatherMap.fiveDayForecast.url = 'http://api.openweathermap.org/data/2.5/forecast';
	this.services.openWeatherMap.iconInfo = {};
	this.services.openWeatherMap.iconInfo.url = 'http://openweathermap.org/img/w/';
	this.services.openWeatherMap.iconInfo.fileExt = '.png';
	
		
	// user settings
	this.settings = {};
	this.settings.haveLocal = false; // true if have ability to save user settings to local cookie.
		
	// ajax call
	this.ajax = {};
	
	// classes
	this.classList = {};
	
	// main
	this.classList.main = {};
	this.classList.main.location = 'po-location';
	this.classList.main.description = 'po-description';
	this.classList.main.tempNow = 'po-tempNow';
	
	// today
	this.classList.today = {};
	this.classList.today.dayName = 'po-todayDayName';
	this.classList.today.tempMax = 'po-todayMax';
	this.classList.today.tempMin = 'po-todayMin';
	this.classList.today.allHoursWrapper = 'po-today_allHours_wrapper';
	
	// days
	this.classList.days = {};
	this.classList.days.dayWrapper = 'po-days_all_wrapper';
	
	// general
	this.classList.weatherIcon = 'weatherIcon';
	this.classList.timeNow = 'timeNowClass';
	this.classList.time = 'time';
	this.classList.temp = 'temperature';
	this.classList.day = 'day';
	this.classList.dayName = 'dayName';
	this.classList.tempMax = 'tempMax';
	this.classList.tempMin = 'tempMin';
	this.classList.tempInnerWrapper = 'temperature_innerWrapper';
	
	
	
	// static data
	this.data = {};
	this.data.keywords = {};
	
	// days of the week. version 1: English only
	this.data.keywords.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
	// other key words
	this.data.keywords.nowUC = 'Now';
	
};



// identifies the app version from the script file name
Weather.prototype.setScriptVersion = function(){
	
	// script of this file
	var scriptInfo = document.getElementById('weatherApp');
	if(typeof(scriptInfo) == 'object' && scriptInfo != null){
		
		// path
		var path = scriptInfo.src;
		if(typeof(path) == 'string'){
						
			// split path to get filename
			var pathInfo = path.split('/');
			if(pathInfo.length > 0){
				
				// script file name
				var fileName = pathInfo[pathInfo.length -1];
				
				// get version: assumes format of <name of app> . <version> .js, where name of app does not contain a point
				var fileNameInfo = fileName.split('.');
				
				// remove the 'js'
				fileNameInfo.pop();
				// remove the app name
				fileNameInfo.shift();
				
				// version is the remainer
				this.version = parseFloat(fileNameInfo.join('.'));
			};			
		};
	};	
};



// sets the ability to save to cookie on local machine
Weather.prototype.persistence_initialise = function(){
	
	/* Implements in Version 2:
	 * Use jStorage. 
	 * 
	 * 
	 * set flag on completion:
	 * this.settings.haveLocal = true;
	 */ 	
};


// references dom elements etc
Weather.prototype.display_initialise = function(){
	
	// info
	this.allItems = {}; // all divs
	this.allItems.main = {}; // the main divs
	this.allItems.today = {}; // the divs used for today's info
	this.allItems.days = {}; // the divs used for all the day info
	
	// body
	var $body = $('body');

	// main location
	var targetClass = this.classList.main.location;
	this.allItems.main.$location = $body.find('div.' +targetClass);
	
	// main description
	targetClass = this.classList.main.description;
	this.allItems.main.$description = $body.find('div.' +targetClass);
	
	// current temperature
	targetClass = this.classList.main.tempNow;
	this.allItems.main.$tempNow = $body.find('span.' +targetClass);
	
	// today day name
	targetClass = this.classList.today.dayName;
	this.allItems.today.$dayName = $body.find('div.' +targetClass);
	
	// today temp max
	targetClass = this.classList.today.tempMax;
	this.allItems.today.$tempMax = $body.find('div.' +targetClass);
	
	// today temp min
	targetClass = this.classList.today.tempMin;
	this.allItems.today.$tempMin = $body.find('div.' +targetClass);
	
	// today all hours
	targetClass = this.classList.today.allHoursWrapper;
	this.allItems.today.$allHoursWrapper = $body.find('div.' +targetClass);
	
	// days all wrapper
	targetClass = this.classList.days.dayWrapper;
	this.allItems.days.$dayWrapper = $body.find('div.' +targetClass);
	
};




//  initial and previous settings
Weather.prototype.settings_load = function(){
	
	// default settings:
	this.settings.current = {}; // current settings
	this.settings.current.location = {}; // location info
	
	// this is the OpenWeatherMap coding. Stored by service provider to enable easy change of providers.
	this.settings.current.location.openWeatherMap = {"_id":2643743, name:"London", country:"GB", coord :{lon:-0.12574, lat:51.50853}}; 
	
	
	/* Implements in Version 2:
	 * load previous user selection from local storage
	 */ 

};




//updates the dom with the given location
Weather.prototype.display_updateLocation = function(infoObj){
	
	// location
	var location = "";
	if(typeof(infoObj.location) == 'string'){
		location = infoObj.location;
	};
	
	// item
	var $location = this.allItems.main.$location;
	
	// set
	if($location.length > 0){
		$location.text(location);
	};
	
};



//updates the dom with 'now' temp and description
Weather.prototype.display_updateNowInfo = function(infoObj){
	
	// temp
	var temp = "";
	if(typeof(infoObj.temp) == 'number'){
		temp = infoObj.temp;
	};
	
	// set
	var $tempNow = this.allItems.main.$tempNow;
	if($tempNow.length > 0){
		$tempNow.text(temp);
	};
	
	
	// description
	var description = "";
	if(typeof(infoObj.description) == 'string'){
		description = infoObj.description;
	};
	
	// set
	var $description = this.allItems.main.$description;
	if($description.length > 0){
		$description.text(description);
	};
	
	// day name
	var dayName = "";
	if(typeof(infoObj.date) == 'string'){
		var date = infoObj.date;
		var d = new Date(date);
		dayName = this.data.keywords.dayNames[d.getDay()];
	};
	
	// set
	var $dayName = this.allItems.today.$dayName;
	if($dayName.length > 0){
		$dayName.text(dayName);
	};
	
};



// updates the dom with '5 day' info
Weather.prototype.display_updateDayInfo = function(dayInfo){
	
	// required
	if(typeof(dayInfo) != 'object' || dayInfo == null){
		return false;
	};

	var allHTML = "";
	
	
	var weatherIconClass = this.classList.weatherIcon;
	var dayClass = this.classList.day;
	var dayNameClass = this.classList.dayName;
	var tempMaxClass = this.classList.tempMax;
	var tempMinClass = this.classList.tempMin;
	var tempClass = this.classList.temp;
	var tempInnerClass = this.classList.tempInnerWrapper;
	
	
	// process each time interval
	var temp_max, temp_min;
	var dateStr, dateNum, dayName_c, dateObj;
	var icon_url_weather;
	var dayNameHTML, imageHTML, tempMaxHTML, tempMinHTML, dayHTML, tempAllHTML;
	
	
	var dayNames = this.data.keywords.dayNames;
	var numDayNames = dayNames.length;
	
	var itemNum = 0;
	$.each(dayInfo, function(index, day_now){
		
		if(typeof(day_now) == 'object' && day_now != null){
		
			// count			
			itemNum++;
		
			// info
			temp_max = day_now.temp_max;
			temp_min = day_now.temp_min;
			dateStr = day_now.date;
			icon_url_weather = day_now.icon_url_weather;
			
			// name of day
			dayName_c = "";
			dateObj = new Date(dateStr);
			dateNum = dateObj.getDay();
			if(dateNum < numDayNames){
				dayName_c = dayNames[dateNum];
			};
			dayNameHTML = '<div class="' +dayNameClass +'">' +dayName_c +'</div>';
			
			// weather icon div
			imageHTML = '<div class="' +weatherIconClass +'"></div>';
			if(icon_url_weather){
				imageHTML = '<div class="' +weatherIconClass +'"><img src="' +icon_url_weather +'"></div>';
			};
			
			// temperature divs
			tempMaxHTML = '<div class="' +tempMaxClass +'">' +temp_max +'</div>';
			tempMinHTML = '<div class="' +tempMinClass +'">' +temp_min +'</div>';
			tempAllHTML = '<div class="' +tempClass +'"><div class="' +tempInnerClass +'">' +tempMaxHTML + tempMinHTML +'</div></div>';
			
			// complete div
			dayHTML = '<div class="' +dayClass + '">' +dayNameHTML +imageHTML +tempAllHTML +'</div>';
			
			// add to all
			allHTML += dayHTML;
		};
	}); // end for each day
	
	
	// set the all days div
	var $dayWrapper = this.allItems.days.$dayWrapper;
	if($dayWrapper.length > 0){
		$dayWrapper.html(allHTML);
	};
	
};




// updates the dom with 'today' info
Weather.prototype.display_updateTodayInfo = function(todayInfo){
	
	// required
	if(typeof(todayInfo) != 'object' || todayInfo == null){
		return false;
	};
	
	// clear existing dom
	
	// core vals
	var temp_max = "";
	var temp_min = "";
	var allHTML = "";
	
		
	var weatherIconClass = this.classList.weatherIcon;
	var timeNowClass = this.classList.timeNow;
	var timeClass = this.classList.time;
	var tempClass = this.classList.temp;
	var dayClass = this.classList.day;
	var nowStr = this.data.keywords.nowUC;
	
	// process each time interval
	var temp;
	var time, timeStr;
	var icon_url_weather;
	var timeHTML, imageHTML, tempHTML, dayHTML;
	
	
	var itemNum = 0;
	$.each(todayInfo, function(index, time_now){
		
		if(typeof(time_now) == 'object' && time_now != null){
		
			// count			
			itemNum++;
		
			// info
			temp = time_now.temp;
			time = time_now.time;
			icon_url_weather = time_now.icon_url_weather;
			
			// time div
			if(itemNum == 1){
				// temp min max of first time entry of today
				temp_min = time_now.temp_min;
				temp_max = time_now.temp_max;
				
				// set time to 'now'
				timeStr = nowStr;
				timeHTML = '<div class="' +timeNowClass +'">' +timeStr +'</div>';
			} else {
				// take the hour par of the time string
				timeStr = time.split(':')[0]; // (guaranteed to be a string, so guaranteed to return array of at least 1 value)
				timeHTML = '<div class="' +timeClass +'">' +timeStr +'</div>';
			};
			
			// weather icon div
			imageHTML = '<div class="' +weatherIconClass +'"></div>';
			if(icon_url_weather){
				imageHTML = '<div class="' +weatherIconClass +'"><img src="' +icon_url_weather +'"></div>';
			};
			
			// temperature div
			tempHTML = '<div class="' +tempClass +'">' +temp +'&#176;</div>';
			
			// complete div
			dayHTML = '<div class="' +dayClass + '">' +timeHTML +imageHTML +tempHTML +'</div>';
			
			// add to all
			allHTML += dayHTML;
		};
		
	}); // end for each time interval	
	
	
	// set high
	var $tempMax = this.allItems.today.$tempMax;
	if($tempMax.length > 0){
		$tempMax.text(temp_max);
	};
	
	// set low
	var $tempMin = this.allItems.today.$tempMin;
	if($tempMin.length > 0){
		$tempMin.text(temp_min);
	};
	
	// set the all hours div
	var $allHoursWrapper = this.allItems.today.$allHoursWrapper;
	if($allHoursWrapper.length > 0){
		$allHoursWrapper.html(allHTML);
	};
	
};




//updates the dom with the current results
//version 1
Weather.prototype.display_updateForecast = function(infoObj){
	
	// requested service
	var service = "";
	if(typeof(infoObj) == 'object' && infoObj != null){
		service = infoObj.service;
	};
	
	// requested results
	var resultsInfo = this.forecast.results[service];
	if(typeof(infoObj) != 'object' || infoObj == null){
		resultsInfo = {};
	};
	
	// set location
	this.display_updateLocation(resultsInfo);
	
	
	switch(service){
		case 'fiveDayForecast':
			
			// update the 'now' info
			this.display_updateNowInfo(resultsInfo.now);
			
			// other info
			var today = {};
			var afterToday = {};
			if(typeof(resultsInfo.forecast) == 'object' && resultsInfo.forecast != null){
				today = resultsInfo.forecast.today;
				afterToday = resultsInfo.forecast.afterToday;
			};
			
			// update today 
			this.display_updateTodayInfo(today);
			
			// update after today 
			this.display_updateDayInfo(afterToday);
			
		break;
	};
	
};





// processes the given API results into a standardised format to be used by the DOM manipulation functions.
// this format can be changed in later versions to allow the display of greater information if required.
Weather.prototype.forecast_processForecastResults = function(infoObj){
	
	// required
	if(typeof(infoObj) != 'object' || infoObj == null){
		return false;
	};
	
	// core info
	var resultInfo = infoObj.resultInfo;
	var service = infoObj.service; 
	var serviceProvider = infoObj.serviceProvider;
	
	// return info
	var resultsInfo_formatted = {};
	resultsInfo_formatted.now = {};
	resultsInfo_formatted.forecast = {};
	resultsInfo_formatted.forecast.today = {};
	resultsInfo_formatted.forecast.afterToday = {};
	
	
	// icon url info
	var icon_url = "";
	var icon_fileExt = "";
	var serviceProviderInfo = this.services[serviceProvider];
	if(typeof(serviceProviderInfo) == 'object' && serviceProviderInfo != null){
		if(typeof(serviceProviderInfo.iconInfo) == 'object' && serviceProviderInfo.iconInfo != null){
			icon_url = serviceProviderInfo.iconInfo.url;
			icon_fileExt = serviceProviderInfo.iconInfo.fileExt;
		};
	};
	
	var isTest = false;
	
	// provider-specific data format
	switch(serviceProvider){
		case 'openWeatherMap':
			
			switch(service){
			
				case 'fiveDayForecast':
			
					if(typeof(resultInfo) == 'object' && resultInfo != null){ // 1	
						
						var resultNum = 0;
						var dateText, description;
						var temp_c, temp, temp_min, temp_max, temp_min_date, temp_max_date;
						var isToday, isNewDay;
						var today_date;
						var date, time, dateInfo;
						var dateProcessedList = [];
						var icon_weather, icon_url_weather;
						
						// for each result - ASSUMES data is in date order ascending
						$.each(resultInfo, function(index, resultInfo_c){ 
							if(typeof(resultInfo_c) == 'object' && resultInfo_c != null){ // 2
								
								// count
								resultNum++;
								
								// date forecast applies to - required
								dateText = resultInfo_c.dt_txt;
								if(typeof(dateText) == 'string'){ // 3
									
									// extract date & time
									dateInfo = dateText.split(' ');
									date = dateInfo[0]; // guaranteed to return an array of atleast 1 value
									
									time = "";
									if(dateInfo.length > 1){
										time = dateInfo[1].trim();
									};
									
									// required
									if(date != "" && time != ""){ // 4
									
										// calc if is today or after today
										if(resultNum == 1){
											today_date = date;
										};
										if(date == today_date){
											isToday = true;
										} else {
											isToday = false;
										};
											
										// calc if in a new day or are processing new data for an existing day
										if(dateProcessedList.indexOf(date) == -1){
											
											// flag
											isNewDay = true;
											// record
											dateProcessedList.push(date);
											
										} else {
											// flag
											isNewDay = false;
										};
										
											
										// description, id
										description = "";
										icon_url_weather = undefined;
										if(typeof(resultInfo_c.weather) == 'object' && resultInfo_c.weather != null){
											if(typeof(resultInfo_c.weather[0]) == 'object' && resultInfo_c.weather[0] != null){
												// description
												if(typeof(resultInfo_c.weather[0].description) == 'string'){
													description = resultInfo_c.weather[0].description;
												};
												// weather icon src
												if(typeof(resultInfo_c.weather[0].icon) == 'string'){
													icon_weather = resultInfo_c.weather[0].icon;
													icon_url_weather = icon_url + icon_weather +icon_fileExt;
												};
											};											
										};
										
										// temperatures: round to ints
										temp = "";
										temp_min = "";
										temp_max = "";
										if(typeof(resultInfo_c.main) == 'object' && resultInfo_c.main != null){
											
											// temp - round to nearest
											temp_c = Math.round(resultInfo_c.main.temp);
											if(!isNaN(temp_c)){
												temp = temp_c;
											};
											
											// max temp - round up 
											temp_c = Math.ceil(resultInfo_c.main.temp_max);
											if(!isNaN(temp_c)){
												temp_max = temp_c;
											};
											// min temp - round down 
											temp_c = Math.floor(resultInfo_c.main.temp_min);
											if(!isNaN(temp_c)){
												temp_min = temp_c;
											};	
										};
										
										
										// if not have processed entry for this date
										if(isNewDay){
											
											// reset the min and max temp for this date
											temp_min_date = temp_min;
											temp_max_date = temp_max;
											
										} else {
											
											// calc the min and max of the day.
											temp_min_date = Math.min(temp_min_date, temp_min);
											temp_max_date = Math.min(temp_max_date, temp_max);
										};
										
										
										// record the 'now' information
										if(resultNum == 1){									
											resultsInfo_formatted.now.temp = temp;
											resultsInfo_formatted.now.description = description;
											resultsInfo_formatted.now.date = today_date;
										};
										
										// record the day's information
										if(isToday){
											// record against time
											resultsInfo_formatted.forecast.today[time] = {
													time: time,
													temp: temp,
													temp_min: temp_min_date,
													temp_max: temp_max_date,
													description: description,													
													icon_url_weather: icon_url_weather,
													};	
											
											// test
											if(isTest){
												resultsInfo_formatted.forecast.today[(time +1)] = {
														time: time,
														temp: temp,
														temp_min: temp_min_date,
														temp_max: temp_max_date,
														description: description,													
														icon_url_weather: icon_url_weather,
														};	
												
												// test
												resultsInfo_formatted.forecast.today[(time +2)] = {
														time: time,
														temp: temp,
														temp_min: temp_min_date,
														temp_max: temp_max_date,
														description: description,													
														icon_url_weather: icon_url_weather,
												};	
												
												// test
												resultsInfo_formatted.forecast.today[(time +3)] = {
														time: time,
														temp: temp,
														temp_min: temp_min_date,
														temp_max: temp_max_date,
														description: description,													
														icon_url_weather: icon_url_weather,
												};	
												
												// test
												resultsInfo_formatted.forecast.today[(time +4)] = {
														time: time,
														temp: temp,
														temp_min: temp_min_date,
														temp_max: temp_max_date,
														description: description,													
														icon_url_weather: icon_url_weather,
												};	
												
												// test
												resultsInfo_formatted.forecast.today[(time +5)] = {
														time: time,
														temp: temp,
														temp_min: temp_min_date,
														temp_max: temp_max_date,
														description: description,													
														icon_url_weather: icon_url_weather,
												};	
											};
											
										} else {
											// add / overwrite previous entry. Description is the same for the entire day.
											resultsInfo_formatted.forecast.afterToday[date] = {
													date: date,
													temp_min: temp_min_date,
													temp_max: temp_max_date,
													description: description,
													icon_url_weather: icon_url_weather,
													};
										};
									
									}; // 4
									
								}; // 3
								
							}; // 2
						}); // end for each result
						
					}; // 1
				break; // end fiveDayForecast
			}; // end switch service for this provider
		
		break; // end openWeatherMap
	};
	
	// return
	return resultsInfo_formatted;
	
};



// call to update forecast
Weather.prototype.forecast_update = function(){
	
	// get forecast, then update UI after response
	this.forecast_getForecast();
	
};





// processes the response from a request to get a forecast
Weather.prototype.forecast_processGetForecastResponse = function(infoObj){
	
	// required
	if(typeof(infoObj) != 'object' || infoObj == null){
		return false;
	};
	
	// core info
	var success = infoObj.success;
	var error = infoObj.error;
	var response = infoObj.response; // response from service
	var service = infoObj.service; 
	var serviceProvider = infoObj.serviceProvider;
	
	// required
	if(typeof(response) != 'object' || response == null){
		return false;
	};
	
	/* Implements in Version 2:
	 * check match of location in response and location in request 
	 */ 
	
	// flag
	var haveResults = false;
	
	// new results info
	var resultsInfo = {};
	
	if(success){
		// provider-specific data formatting
		switch(serviceProvider){
			case 'openWeatherMap':
				
				// weather info
				var list = response.list;
				
				// process results
				resultsInfo = this.forecast_processForecastResults({resultInfo: list, service: service, serviceProvider: serviceProvider});
				
				// city info
				var cityInfo = response.city;
				if(typeof(cityInfo) == 'object' && cityInfo != null){				
					
					// record location
					// NOTE: this is a risk because the value returned from the API has not been checked for unacceptable words/ symbols (e.g. swear words, politically sensitive name versions).
					resultsInfo.location = cityInfo.name;				
				};
				
				
				// flag
				haveResults = true;
			break;
		};
	}; // end if success 
	
	
	// if have results
	if(haveResults){
		
		// record and over write previous
		this.forecast.results[service] = resultsInfo;
		
		// update display
		this.display_updateForecast({service: service});
		
	} else {
		// version 1: leave display as is.
		
		/* Implements in Version 2:
		 * post error message to user
		 */
		
	};
	
	
};




// requests data then call request to process response and update ui
Weather.prototype.forecast_getForecast = function(){
	
	
	// if currently making a call, or have expired call
	if(typeof(this.ajax.getForecast) == 'object'){
		// abort
		this.ajax.getForecast.abort();
	} else {
		this.ajax.getForecast = {};
	};
	
	// service to be used
	var service = this.forecast.service;
	var serviceProvider = this.forecast.serviceProvider;
	
	// get API url
	var url = this.forecast_getServiceURL({service: service, serviceProvider: serviceProvider});
	
	
	// make ajax call to server
	this.ajax.getForecast = $.ajax({
		type: "get",
		url: url,
		dataType: "jsonp",
		crossDomain: true,
		cache: false,
		Weather: this,
		service: service,
		serviceProvider: serviceProvider,	
	});
	
	
	// process result on successful call
	this.ajax.getForecast.done(function(returnObj){
		
		var Weather = this.Weather;
		
		// core return info
		var updateInfo = {};
		updateInfo.service = this.service;
		updateInfo.serviceProvider = this.serviceProvider;
		
		if(typeof(returnObj)=='object' && returnObj != null){
			// response
			updateInfo.success = true;
			updateInfo.error = 0;
			updateInfo.response = returnObj;
			
			// process response
			Weather.forecast_processGetForecastResponse(updateInfo);
			
		} else {
			
			// process failed response
			updateInfo.success = false;
			updateInfo.error = 1;
			updateInfo.response = {}; // for completeness
			Weather.forecast_processGetForecastResponse(updateInfo);
		};
	});
	
	// ajax call failed
	this.ajax.getForecast.fail(function(jqXHR, textStatus, errorThrown){
	
		var Weather = this.Weather;
		
		// core return info
		var updateInfo = {};
		updateInfo.service = this.service;
		updateInfo.serviceProvider = this.serviceProvider;
		updateInfo.success = false;
		updateInfo.error = 2;
		updateInfo.response = {}; // for completeness
		Weather.forecast_processGetForecastResponse(updateInfo);
	});
	
};



// returns the url to request the weather data
Weather.prototype.forecast_getServiceURL = function(infoObj){
	
	// return 
	var url = "";
	
	if(typeof(infoObj) != 'object' || infoObj == null){
		// return empty url
		return url;
	};
	
	// request service & provider
	var service = infoObj.service;
	var serviceProvider = infoObj.serviceProvider;
	
	
	// provider and location info
	var providerInfo = this.services[serviceProvider];
	var locationInfo = this.settings.current.location[serviceProvider];
	if(typeof(providerInfo) == 'object' && providerInfo != null && typeof(locationInfo) == 'object' && locationInfo != null){
		
		// service info
		var serviceInfo = providerInfo[service];
		if(typeof(serviceInfo) == 'object' && serviceInfo != null){
			
			// core url
			var url_core = serviceInfo.url;
			
			// current location
			var location = "";
			
			// provider-specific data formatting
			switch(serviceProvider){
				case 'openWeatherMap':
					// provider-specific location info
					location = locationInfo['_id']; // use the id method on the API call because it is faster
						
					// custom params
					var auth = '&appid=' +this.services.openWeatherMap.accessKey;
					var units = '&units=metric';
					
					// build url (provider-specific syntax). Default response is in json format.
					url = url_core +'?id=' +location +auth + units; // use Celsius
				break;
			};
			
			
		}; // end if have serviceInfo		
	}; // end if have provider info
	
	// return
	return url;
	
};






// initialise class and run app on document ready
$(document).ready(function(){
	
	// create  class instance
	Weather = new Weather();
	
	// initialise
	Weather.initialise();
	
	

});
