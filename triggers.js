$('a[trackingId]').on('click', function(event) {
	event.preventDefault();
	var self = $(this);
	track.ga($(this), function(){ window.location = self.attr('href')});

});

$('form[trackingId]:not(form)').on('submit', function(event){
	event.preventDefault();
	var self = $(this);
	track.ga($(this), self.submit());

});

$('[trackingId]:not(input[type=submit], a)').on('click', function(event) {
	track.ga($(this));
});