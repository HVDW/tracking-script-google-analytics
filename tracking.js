var track = (function () {

	//array of all trackingpoints.
	var trackingPoints = [
		//create account
		{
			'trackingId': 'exampleId',
			'category': '',
			'action': '',
			'label': ''
		}
	];


	//helper functions
	var closure = function(fn, context) { 
		var result;

		return function() { 
			if(fn) {
				result = fn.apply(context || this, arguments);
				fn = null;
			}

			return result;
		};
	};

	var createFunctionWithTimeout = function(callback, opt_timeout) {
		var called = false;

		function fn() {
			if (!called) {
				called = true;
				callback();
			}
		}
		setTimeout(fn, opt_timeout || 1000);
		return fn;
	}

	//Initialize Google Analytics with closure to make sure GA script is loaded once and not more than once.
	closure(function() {

		//ga script
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		//config tracking account ga('create', '<tracking ID>', 'auto');
		ga('create', '', 'auto');
	});

	//The core script
	var googleAnalytics = function(element, callbackFunction) {

		var getTrackingId = function(input) {
			var result = false;

			if(input) {
				if(typeof input === 'object') {
					result = input.getAttribute('trackingid');	
				} else {
					result = input;
				}
			}

			return result;
		};

		var getTrackingPoint = function(trackingId, trackingPoints) {
			var result = false;
			
			if(trackingId) {
				var selected = trackingPoints.find(function(value) {
					return value.trackingId === trackingId;
				});

				if(selected) {
					result = selected;
				}
			}

			return result;
		};

		var sendToGoogleAnalytics = function(trackingPointData, callback) {
			var result = false;

			if(typeof trackingPointData === 'object') {
				result = ga('send', 'event', trackingPointData.category, trackingPointData.action, trackingPointData.label, { hitCallback: (typeof callback !== 'undefined') ? createFunctionWithTimeout(callback) : '' });
			}

			return result;
		};	

		return sendToGoogleAnalytics(getTrackingPoint(getTrackingId(element), trackingPoints), callbackFunction);
	};

	return {
		ga: googleAnalytics
	}
})();