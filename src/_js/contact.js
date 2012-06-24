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
});

// On DOM ready
YAHOO.util.Event.onDOMReady(initContact);

function initContact()
{
	// Register hover event for ellie email
	YAHOO.util.Event.on('email_ellie', 'mouseenter', email_ellie_over);
	// Register unhover event for ellie email
	YAHOO.util.Event.on('email_ellie', 'mouseleave', email_out);
	
	// Register hover event for chez email
	YAHOO.util.Event.on('email_chez', 'mouseenter', email_chez_over);
	// Register unhover event for chez email
	YAHOO.util.Event.on('email_chez', 'mouseleave', email_out);
	
	// Register hover event for simon email
	YAHOO.util.Event.on('email_simon', 'mouseenter', email_simon_over);
	// Register unhover event for simon email
	YAHOO.util.Event.on('email_simon', 'mouseleave', email_out);
	
	// Register hover event for rob email
	YAHOO.util.Event.on('email_rob', 'mouseenter', email_rob_over);
	// Register unhover event for rob email
	YAHOO.util.Event.on('email_rob', 'mouseleave', email_out);
}

function email_ellie_over(e)
{
	YAHOO.util.Dom.setStyle('bradybunch', 'top', '-255px');
}

function email_chez_over(e)
{
	YAHOO.util.Dom.setStyle('bradybunch', 'top', '-510px');
}

function email_simon_over(e)
{
	YAHOO.util.Dom.setStyle('bradybunch', 'top', '-765px');
}

function email_rob_over(e)
{
	YAHOO.util.Dom.setStyle('bradybunch', 'top', '-1020px');
}

function email_out(e)
{
	YAHOO.util.Dom.setStyle('bradybunch', 'top', '0');
}

