# Google Analytics tracking script for custom tracking points
Custom tracking of events, actions and labels to track your customer journey.

This script calls the function: ga('send', 'event', 'category', 'action', 'label', { hitCallback });

##How to use

###Tracking via triggers on elements

1. 	add the attribute named "trackingId" to the element you want to track. e.g. 
```
<a href="url" class="button" trackingId="exampleId"/>Example button</a> 
```
2.	add the data you want to record in Google Analytics in the variable "trackingPoints" in tracking.js 	
	Make sure the first entry named "trackingId" corresponds with the attribute named "trackingId" in the element

3.	add a jQuery trigger to call the function. For example:
```
$('a[trackingId]').on('click', function(event) {
	event.preventDefault();
	var self = $(this);
	track.ga($(this), function(){ window.location = self.attr('href')});

});
```
More examples can be found in triggers.js

###Tracking in script

You can also call the tracking function directly by providing the tracking id as a string:
```
track.ga('exampleId');
```

Next update: 

I want to add an option to be able to fill the label value from outside of the script. This will enable tracking errors, succes, and other flags in forms for example.