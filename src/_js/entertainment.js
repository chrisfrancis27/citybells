var YUI_config = 
{
	modules:
	{
		audioTrack:
		{
			fullpath: '_js/audioTrack.js'
		},
		mediaLibrary:
		{
			fullpath: '_js/medialibrary.js',
			requires: ['audioTrack']
		},
		mediaPlayer:
		{
			fullpath: '_js/mediaPlayer.js',
			requires: ['audioTrack', 'anim', 'widget']
		},
		twitter:
		{
			fullpath: '_js/twitter.js',
			requires: ['io', 'json']
		}
	}
};

YUI(YUI_config).use('mediaLibrary', 'mediaPlayer', 'twitter', function(Y)
{
	// SoundManager
	soundManager.debugMode = false;

	// Make a new MediaPlayer and pass it a MediaLibrary collection
	var player = new Y.TwoAndaHalfPeople.MediaPlayer({
		contentBox: '#mediaPlayerContainer',
		mediaLibrary: Y.TwoAndaHalfPeople.MediaLibrary()
	});
	player.render();
		
	// Twitter feed
	Y.TwoAndaHalfPeople.Twitter();
	
	// Show/hide wedding review
	var review = Y.one('#weddingReview');
	var reviewLink = Y.one('#weddingReviewLink');
	Y.on('click', onWeddingReviewClick, reviewLink);

	function onWeddingReviewClick(e) {
		e.preventDefault();
		
		if (review.getStyle('display') === 'none') {
			review.setStyle('display', 'block');
			reviewLink.set('innerHTML', 'Hide recent review');
		}
		else {
			review.setStyle('display', 'none');
			reviewLink.set('innerHTML', 'Show recent review');
		}
	}
	
	// Show/hide horn section review
	var hornsReview = Y.one('#hornsReview');
	var hornsReviewLink = Y.one('#hornsReviewLink');
	Y.on('click', onHornsReviewClick, hornsReviewLink);

	function onHornsReviewClick(e) {
		e.preventDefault();
		
		if (hornsReview.getStyle('display') === 'none') {
			hornsReview.setStyle('display', 'block');
			hornsReviewLink.set('innerHTML', 'Hide recent review');
		}
		else {
			hornsReview.setStyle('display', 'none');
			hornsReviewLink.set('innerHTML', 'Show recent review');
		}
	}
	
	// Show/hide events review
	var eventsReview = Y.one('#eventsReview');
	var eventsReviewLink = Y.one('#eventsReviewLink');
	Y.on('click', onEventsReviewClick, eventsReviewLink);

	function onEventsReviewClick(e) {
		e.preventDefault();
		
		if (eventsReview.getStyle('display') === 'none') {
			eventsReview.setStyle('display', 'block');
			eventsReviewLink.set('innerHTML', 'Hide recent review');
		}
		else {
			eventsReview.setStyle('display', 'none');
			eventsReviewLink.set('innerHTML', 'Show recent review');
		}
	}
	
	// Show/hide workshop review
	var workshopReview = Y.one('#workshopReview');
	var workshopReviewLink = Y.one('#workshopReviewLink');
	Y.on('click', onWorkshopReviewClick, workshopReviewLink);

	function onWorkshopReviewClick(e) {
		e.preventDefault();
		
		if (workshopReview.getStyle('display') === 'none') {
			workshopReview.setStyle('display', 'block');
			workshopReviewLink.set('innerHTML', 'Hide recent review');
		}
		else {
			workshopReview.setStyle('display', 'none');
			workshopReviewLink.set('innerHTML', 'Show recent review');
		}
	}
});

// On DOM ready
YAHOO.util.Event.onDOMReady(initEnt);

function initEnt()
{
	// Register hover event for 'events'
	YAHOO.util.Event.on('entLink_events', 'mouseenter', events_over);
	// Register unhover event for 'events'
	YAHOO.util.Event.on('entLink_events', 'mouseleave', events_out);
	// Register click event for 'events'
	YAHOO.util.Event.on('entLink_events', 'click', events_click);
	
	// Register hover event for 'concerts'
	YAHOO.util.Event.on('entLink_concerts', 'mouseenter', concerts_over);
	// Register unhover event for 'concerts'
	YAHOO.util.Event.on('entLink_concerts', 'mouseleave', concerts_out);
	// Register click event for 'concerts'
	YAHOO.util.Event.on('entLink_concerts', 'click', concerts_click);
	
	// Register hover event for 'weddings'
	YAHOO.util.Event.on('entLink_weddings', 'mouseenter', weddings_over);
	// Register unhover event for 'weddings'
	YAHOO.util.Event.on('entLink_weddings', 'mouseleave', weddings_out);
	// Register click event for 'weddings'
	YAHOO.util.Event.on('entLink_weddings', 'click', weddings_click);
	
	// Register hover event for 'hornsections'
	YAHOO.util.Event.on('entLink_hornsections', 'mouseenter', hornsections_over);
	// Register unhover event for 'hornsections'
	YAHOO.util.Event.on('entLink_hornsections', 'mouseleave', hornsections_out);
	// Register click event for 'hornsections'
	YAHOO.util.Event.on('entLink_hornsections', 'click', hornsections_click);
	
	// Register hover event for 'hornsections'
	YAHOO.util.Event.on('entLink_workshops', 'mouseenter', workshops_over);
	// Register unhover event for 'hornsections'
	YAHOO.util.Event.on('entLink_workshops', 'mouseleave', workshops_out);
	// Register click event for 'hornsections'
	YAHOO.util.Event.on('entLink_workshops', 'click', workshops_click);
	
	// Set 'events' content as default
	events_click();
}

function events_over(e)
{
	YAHOO.util.Dom.setStyle('entLink_events', 'background-position', '0 -37px');
	YAHOO.util.Dom.setStyle('entLink_events', 'cursor', 'pointer');
}

function events_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_events', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('entLink_events', 'background-position', '0 0');
	}
}

function events_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_events', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('entLink_events', 'selected');
		// Blankify the other ent types
	 	YAHOO.util.Dom.removeClass('entLink_concerts', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_weddings', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_hornsections', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_workshops', 'selected');
	 	concerts_out();
	 	weddings_out();
	 	hornsections_out();
	 	workshops_out();
		
		// Fade out 'concerts' content
		var fadeOutConcerts = new YAHOO.util.Anim('ent-concerts', {opacity:{to:0}}, 0.2);
		fadeOutConcerts.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-concerts', 'display', 'none');
		});
		fadeOutConcerts.animate();
		
		// Fade out 'weddings' content
		var fadeOutWeddings = new YAHOO.util.Anim('ent-weddings', {opacity:{to:0}}, 0.2);
		fadeOutWeddings.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-weddings', 'display', 'none');
		});
		fadeOutWeddings.animate();
		
		// Fade out 'hornsections' content
		var fadeOutHornsections = new YAHOO.util.Anim('ent-hornsections', {opacity:{to:0}}, 0.2);
		fadeOutHornsections.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-hornsections', 'display', 'none');
		});
		fadeOutHornsections.animate();
		
		// Fade out 'workshops' content
		var fadeOutWorkshops = new YAHOO.util.Anim('ent-workshops', {opacity:{to:0}}, 0.2);
		fadeOutWorkshops.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-workshops', 'display', 'none');
			
			// Fade in the 'events' content
			YAHOO.util.Dom.setStyle('ent-events', 'display', 'block');
			YAHOO.util.Dom.setStyle('ent-events', 'opacity', '0');
			var fadeInEvents = new YAHOO.util.Anim('ent-events', {opacity:{to:1}}, 0.2);
			fadeInEvents.animate();
		});
		fadeOutWorkshops.animate();
	}
}

function concerts_over(e)
{
	YAHOO.util.Dom.setStyle('entLink_concerts', 'background-position', '0 -30px');
	YAHOO.util.Dom.setStyle('entLink_concerts', 'cursor', 'pointer');
}

function concerts_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_concerts', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('entLink_concerts', 'background-position', '0 0');
	}
}

function concerts_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_concerts', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('entLink_concerts', 'selected');
		// Blankify the other ent types
	 	YAHOO.util.Dom.removeClass('entLink_events', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_weddings', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_hornsections', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_workshops', 'selected');
	 	events_out();
	 	weddings_out();
	 	hornsections_out();
	 	workshops_out();
		
		// Fade out 'events' content
		var fadeOutEvents = new YAHOO.util.Anim('ent-events', {opacity:{to:0}}, 0.2);
		fadeOutEvents.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-events', 'display', 'none');
		});
		fadeOutEvents.animate();
		
		// Fade out 'weddings' content
		var fadeOutWeddings = new YAHOO.util.Anim('ent-weddings', {opacity:{to:0}}, 0.2);
		fadeOutWeddings.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-weddings', 'display', 'none');
		});
		fadeOutWeddings.animate();
		
		// Fade out 'hornsections' content
		var fadeOutHornsections = new YAHOO.util.Anim('ent-hornsections', {opacity:{to:0}}, 0.2);
		fadeOutHornsections.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-hornsections', 'display', 'none');
		});
		fadeOutHornsections.animate();
		
		// Fade out 'workshops' content
		var fadeOutWorkshops = new YAHOO.util.Anim('ent-workshops', {opacity:{to:0}}, 0.2);
		fadeOutWorkshops.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-workshops', 'display', 'none');
			
			// Fade in the 'concerts' content
			YAHOO.util.Dom.setStyle('ent-concerts', 'display', 'block');
			YAHOO.util.Dom.setStyle('ent-concerts', 'opacity', '0');
			var fadeInConcerts = new YAHOO.util.Anim('ent-concerts', {opacity:{to:1}}, 0.2);
			fadeInConcerts.animate();
		});
		fadeOutWorkshops.animate();
	}
}

function weddings_over(e)
{
	YAHOO.util.Dom.setStyle('entLink_weddings', 'background-position', '0 -31px');
	YAHOO.util.Dom.setStyle('entLink_weddings', 'cursor', 'pointer');
}

function weddings_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_weddings', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('entLink_weddings', 'background-position', '0 0');
	}
}

function weddings_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_weddings', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('entLink_weddings', 'selected');
		// Blankify the other ent types
	 	YAHOO.util.Dom.removeClass('entLink_events', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_concerts', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_hornsections', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_workshops', 'selected');
	 	events_out();
	 	concerts_out();
	 	hornsections_out();
	 	workshops_out();
		
		// Fade out 'events' content
		var fadeOutEvents = new YAHOO.util.Anim('ent-events', {opacity:{to:0}}, 0.2);
		fadeOutEvents.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-events', 'display', 'none');
		});
		fadeOutEvents.animate();
		
		// Fade out 'concerts' content
		var fadeOutConcerts = new YAHOO.util.Anim('ent-concerts', {opacity:{to:0}}, 0.2);
		fadeOutConcerts.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-concerts', 'display', 'none');
		});
		fadeOutConcerts.animate();
		
		// Fade out 'hornsections' content
		var fadeOutHornsections = new YAHOO.util.Anim('ent-hornsections', {opacity:{to:0}}, 0.2);
		fadeOutHornsections.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-hornsections', 'display', 'none');
		});
		fadeOutHornsections.animate();
		
		// Fade out 'workshops' content
		var fadeOutWorkshops = new YAHOO.util.Anim('ent-workshops', {opacity:{to:0}}, 0.2);
		fadeOutWorkshops.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-workshops', 'display', 'none');
			
			// Fade in the 'weddings' content
			YAHOO.util.Dom.setStyle('ent-weddings', 'display', 'block');
			YAHOO.util.Dom.setStyle('ent-weddings', 'opacity', '0');
			var fadeInWeddings = new YAHOO.util.Anim('ent-weddings', {opacity:{to:1}}, 0.2);
			fadeInWeddings.animate();
		});
		fadeOutWorkshops.animate();
	}
}

function hornsections_over(e)
{
	YAHOO.util.Dom.setStyle('entLink_hornsections', 'background-position', '0 -25px');
	YAHOO.util.Dom.setStyle('entLink_hornsections', 'cursor', 'pointer');
}

function hornsections_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_hornsections', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('entLink_hornsections', 'background-position', '0 0');
	}
}

function hornsections_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_hornsections', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('entLink_hornsections', 'selected');
		// Blankify the other ent types
	 	YAHOO.util.Dom.removeClass('entLink_events', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_concerts', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_weddings', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_workshops', 'selected');
	 	events_out();
	 	concerts_out();
	 	weddings_out();
	 	workshops_out();
		
		// Fade out 'events' content
		var fadeOutEvents = new YAHOO.util.Anim('ent-events', {opacity:{to:0}}, 0.2);
		fadeOutEvents.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-events', 'display', 'none');
		});
		fadeOutEvents.animate();
		
		// Fade out 'concerts' content
		var fadeOutConcerts = new YAHOO.util.Anim('ent-concerts', {opacity:{to:0}}, 0.2);
		fadeOutConcerts.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-concerts', 'display', 'none');
		});
		fadeOutConcerts.animate();
		
		// Fade out 'weddings' content
		var fadeOutWeddings = new YAHOO.util.Anim('ent-weddings', {opacity:{to:0}}, 0.2);
		fadeOutWeddings.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-weddings', 'display', 'none');
		});
		fadeOutWeddings.animate();
		
		// Fade out 'workshops' content
		var fadeOutWorkshops = new YAHOO.util.Anim('ent-workshops', {opacity:{to:0}}, 0.2);
		fadeOutWorkshops.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-workshops', 'display', 'none');
			
			// Fade in the 'hornsections' content
			YAHOO.util.Dom.setStyle('ent-hornsections', 'display', 'block');
			YAHOO.util.Dom.setStyle('ent-hornsections', 'opacity', '0');
			var fadeInHornsections = new YAHOO.util.Anim('ent-hornsections', {opacity:{to:1}}, 0.2);
			fadeInHornsections.animate();
		});
		fadeOutWorkshops.animate();
	}
}

function workshops_over(e)
{
	YAHOO.util.Dom.setStyle('entLink_workshops', 'background-position', '0 -31px');
	YAHOO.util.Dom.setStyle('entLink_workshops', 'cursor', 'pointer');
}

function workshops_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_workshops', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('entLink_workshops', 'background-position', '0 0');
	}
}

function workshops_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('entLink_workshops', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('entLink_workshops', 'selected');
		// Blankify the other ent types
	 	YAHOO.util.Dom.removeClass('entLink_events', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_concerts', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_weddings', 'selected');
	 	YAHOO.util.Dom.removeClass('entLink_hornsections', 'selected');
	 	events_out();
	 	concerts_out();
	 	weddings_out();
	 	hornsections_out();
		
		// Fade out 'events' content
		var fadeOutEvents = new YAHOO.util.Anim('ent-events', {opacity:{to:0}}, 0.2);
		fadeOutEvents.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-events', 'display', 'none');
		});
		fadeOutEvents.animate();
		
		// Fade out 'concerts' content
		var fadeOutConcerts = new YAHOO.util.Anim('ent-concerts', {opacity:{to:0}}, 0.2);
		fadeOutConcerts.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-concerts', 'display', 'none');
		});
		fadeOutConcerts.animate();
		
		// Fade out 'weddings' content
		var fadeOutWeddings = new YAHOO.util.Anim('ent-weddings', {opacity:{to:0}}, 0.2);
		fadeOutWeddings.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-weddings', 'display', 'none');
		});
		fadeOutWeddings.animate();
		
		// Fade out 'hornsections' content
		var fadeOutHornSections = new YAHOO.util.Anim('ent-hornsections', {opacity:{to:0}}, 0.2);
		fadeOutHornSections.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('ent-hornsections', 'display', 'none');
			
			// Fade in the 'workshops' content
			YAHOO.util.Dom.setStyle('ent-workshops', 'display', 'block');
			YAHOO.util.Dom.setStyle('ent-workshops', 'opacity', '0');
			var fadeInWorkshops = new YAHOO.util.Anim('ent-workshops', {opacity:{to:1}}, 0.2);
			fadeInWorkshops.animate();
		});
		fadeOutHornSections.animate();
	}
}

