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
YAHOO.util.Event.onDOMReady(initBio);

function initBio()
{
	// Register hover event for soprano sax
	YAHOO.util.Event.on('hitarea_sop', 'mouseenter', sop_over);
	// Register unhover event for soprano sax
	YAHOO.util.Event.on('hitarea_sop', 'mouseleave', sop_out);
	// Register click event for soprano sax
	YAHOO.util.Event.on('hitarea_sop', 'click', sop_click);
	
	// Register hover event for alto sax
	YAHOO.util.Event.on('hitarea_alto', 'mouseenter', alto_over);
	// Register unhover event for alto sax
	YAHOO.util.Event.on('hitarea_alto', 'mouseleave', alto_out);
	// Register click event for alto sax
	YAHOO.util.Event.on('hitarea_alto', 'click', alto_click);
	
	// Register hover event for tenor sax
	YAHOO.util.Event.on('hitarea_tenor', 'mouseenter', tenor_over);
	// Register unhover event for tenor sax
	YAHOO.util.Event.on('hitarea_tenor', 'mouseleave', tenor_out);
	// Register click event for tenor sax
	YAHOO.util.Event.on('hitarea_tenor', 'click', tenor_click);
	
	// Register hover event for bari sax
	YAHOO.util.Event.on('hitarea_bari', 'mouseenter', bari_over);
	// Register unhover event for bari sax
	YAHOO.util.Event.on('hitarea_bari', 'mouseleave', bari_out);
	// Register click event for bari sax
	YAHOO.util.Event.on('hitarea_bari', 'click', bari_click);
}

function sop_over(e)
{
	YAHOO.util.Dom.setStyle('saxes_sop', 'background-position', '0 -82px');
	YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '-255px');
}

function sop_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_sop', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('saxes_sop', 'background-position', '0 0');
		YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '0');
	}
}

function sop_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_sop', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('saxes_sop', 'selected');
		// Blankify the other saxes
	 	YAHOO.util.Dom.removeClass('saxes_alto', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_tenor', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_bari', 'selected');
		alto_out();
		tenor_out();
		bari_out();
		
		// Fade out the default content
		var fadeOutDefault = new YAHOO.util.Anim('bioIntro', {opacity:{to:0}}, 0.5);
		fadeOutDefault.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bioIntro', 'display', 'none');
		});
		fadeOutDefault.animate();
		
		// Fade out alto content
		var fadeOutAlto = new YAHOO.util.Anim('bio-alto', {opacity:{to:0}}, 0.5);
		fadeOutAlto.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-alto', 'display', 'none');
		});
		fadeOutAlto.animate();
		
		// Fade out tenor content
		var fadeOutTenor = new YAHOO.util.Anim('bio-tenor', {opacity:{to:0}}, 0.5);
		fadeOutTenor.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-tenor', 'display', 'none');
		});
		fadeOutTenor.animate();
		
		// Fade out bari content
		var fadeOutBari = new YAHOO.util.Anim('bio-bari', {opacity:{to:0}}, 0.5);
		fadeOutBari.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-bari', 'display', 'none');
			
			// Fade in the sop content
			YAHOO.util.Dom.setStyle('bio-sop', 'display', 'block');
			YAHOO.util.Dom.setStyle('bio-sop', 'opacity', '0');
			var fadeInSop = new YAHOO.util.Anim('bio-sop', {opacity:{to:1}}, 0.5);
			fadeInSop.animate();
		});
		fadeOutBari.animate();
		
		// Fade out the current images
		var fadeOutGroupImg = new YAHOO.util.Anim('imgBioGroup', {opacity:{to:0}}, 0.5);
		fadeOutGroupImg.onComplete.subscribe(function()
		{
		 	YAHOO.util.Dom.setStyle('imgBioGroup', 'display', 'none');
		 	
		 	// Fade in the next image
		 	YAHOO.util.Dom.setStyle('imgBioJenny', 'display', 'block');
		 	YAHOO.util.Dom.setStyle('imgBioJenny', 'opacity', '0');
			var fadeInSopImg = new YAHOO.util.Anim('imgBioJenny', {opacity:{to:1}}, 0.5);
			fadeInSopImg.animate();
		});
		fadeOutGroupImg.animate();
		
		var fadeOutAltoImg = new YAHOO.util.Anim('imgBioChez', {opacity:{to:0}}, 0.5);
		fadeOutAltoImg.animate();
		var fadeOutTenorImg = new YAHOO.util.Anim('imgBioGeorge', {opacity:{to:0}}, 0.5);
		fadeOutTenorImg.animate();
		var fadeOutBariImg = new YAHOO.util.Anim('imgBioRoger', {opacity:{to:0}}, 0.5);
		fadeOutBariImg.animate();
	}
}

function alto_over(e)
{
	YAHOO.util.Dom.setStyle('saxes_alto', 'background-position', '0 -106px');
	YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '-510px');
}

function alto_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_alto', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('saxes_alto', 'background-position', '0 0');
		YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '0');
	}
}

function alto_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_alto', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('saxes_alto', 'selected');
		// Blankify the other saxes
	 	YAHOO.util.Dom.removeClass('saxes_sop', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_tenor', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_bari', 'selected');
		sop_out();
		tenor_out();
		bari_out();
		
		// Fade out the default content
		var fadeOutDefault = new YAHOO.util.Anim('bioIntro', {opacity:{to:0}}, 0.5);
		fadeOutDefault.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bioIntro', 'display', 'none');
		});
		fadeOutDefault.animate();
		
		// Fade out sop content
		var fadeOutSop = new YAHOO.util.Anim('bio-sop', {opacity:{to:0}}, 0.5);
		fadeOutSop.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-sop', 'display', 'none');
		});
		fadeOutSop.animate();
		
		// Fade out tenor content
		var fadeOutTenor = new YAHOO.util.Anim('bio-tenor', {opacity:{to:0}}, 0.5);
		fadeOutTenor.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-tenor', 'display', 'none');
		});
		fadeOutTenor.animate();
		
		// Fade out bari content
		var fadeOutBari = new YAHOO.util.Anim('bio-bari', {opacity:{to:0}}, 0.5);
		fadeOutBari.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-bari', 'display', 'none');
			
			// Fade in the alto content
			YAHOO.util.Dom.setStyle('bio-alto', 'display', 'block');
			YAHOO.util.Dom.setStyle('bio-alto', 'opacity', '0');
			var fadeInAlto = new YAHOO.util.Anim('bio-alto', {opacity:{to:1}}, 0.5);
			fadeInAlto.animate();
		});
		fadeOutBari.animate();
		
		// Fade out the current images
		var fadeOutGroupImg = new YAHOO.util.Anim('imgBioGroup', {opacity:{to:0}}, 0.5);
		fadeOutGroupImg.onComplete.subscribe(function()
		{
		 	YAHOO.util.Dom.setStyle('imgBioGroup', 'display', 'none');
		 	
		 	// Fade in the next image
		 	YAHOO.util.Dom.setStyle('imgBioChez', 'display', 'block');
		 	YAHOO.util.Dom.setStyle('imgBioChez', 'opacity', '0');
			var fadeInAltoImg = new YAHOO.util.Anim('imgBioChez', {opacity:{to:1}}, 0.5);
			fadeInAltoImg.animate();
		});
		fadeOutGroupImg.animate();
		
		var fadeOutSopImg = new YAHOO.util.Anim('imgBioJenny', {opacity:{to:0}}, 0.5);
		fadeOutSopImg.animate();
		var fadeOutTenorImg = new YAHOO.util.Anim('imgBioGeorge', {opacity:{to:0}}, 0.5);
		fadeOutTenorImg.animate();
		var fadeOutBariImg = new YAHOO.util.Anim('imgBioRoger', {opacity:{to:0}}, 0.5);
		fadeOutBariImg.animate();
	}
}

function tenor_over(e)
{
	YAHOO.util.Dom.setStyle('saxes_tenor', 'background-position', '0 -110px');
	YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '-765px');
}

function tenor_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_tenor', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('saxes_tenor', 'background-position', '0 0');
		YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '0');
	}
}

function tenor_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_tenor', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('saxes_tenor', 'selected');
		// Blankify the other saxes
	 	YAHOO.util.Dom.removeClass('saxes_sop', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_alto', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_bari', 'selected');
		sop_out();
		alto_out();
		bari_out();
		
		// Fade out the default content
		var fadeOutDefault = new YAHOO.util.Anim('bioIntro', {opacity:{to:0}}, 0.5);
		fadeOutDefault.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bioIntro', 'display', 'none');
		});
		fadeOutDefault.animate();
		
		// Fade out sop content
		var fadeOutSop = new YAHOO.util.Anim('bio-sop', {opacity:{to:0}}, 0.5);
		fadeOutSop.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-sop', 'display', 'none');
		});
		fadeOutSop.animate();
		
		// Fade out alto content
		var fadeOutAlto = new YAHOO.util.Anim('bio-alto', {opacity:{to:0}}, 0.5);
		fadeOutAlto.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-alto', 'display', 'none');
		});
		fadeOutAlto.animate();
		
		// Fade out bari content
		var fadeOutBari = new YAHOO.util.Anim('bio-bari', {opacity:{to:0}}, 0.5);
		fadeOutBari.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-bari', 'display', 'none');
			
			// Fade in the tenor content
			YAHOO.util.Dom.setStyle('bio-tenor', 'display', 'block');
			YAHOO.util.Dom.setStyle('bio-tenor', 'opacity', '0');
			var fadeInTenor = new YAHOO.util.Anim('bio-tenor', {opacity:{to:1}}, 0.5);
			fadeInTenor.animate();
		});
		fadeOutBari.animate();
		
		// Fade out the current images
		var fadeOutGroupImg = new YAHOO.util.Anim('imgBioGroup', {opacity:{to:0}}, 0.5);
		fadeOutGroupImg.onComplete.subscribe(function()
		{
		 	YAHOO.util.Dom.setStyle('imgBioGroup', 'display', 'none');
		 	
		 	// Fade in the next image
		 	YAHOO.util.Dom.setStyle('imgBioGeorge', 'display', 'block');
		 	YAHOO.util.Dom.setStyle('imgBioGeorge', 'opacity', '0');
			var fadeInTenorImg = new YAHOO.util.Anim('imgBioGeorge', {opacity:{to:1}}, 0.5);
			fadeInTenorImg.animate();
		});
		fadeOutGroupImg.animate();
		
		var fadeOutSopImg = new YAHOO.util.Anim('imgBioJenny', {opacity:{to:0}}, 0.5);
		fadeOutSopImg.animate();
		var fadeOutAltoImg = new YAHOO.util.Anim('imgBioChez', {opacity:{to:0}}, 0.5);
		fadeOutAltoImg.animate();
		var fadeOutBariImg = new YAHOO.util.Anim('imgBioRoger', {opacity:{to:0}}, 0.5);
		fadeOutBariImg.animate();
	}
}

function bari_over(e)
{
	YAHOO.util.Dom.setStyle('saxes_bari', 'background-position', '0 -120px');
	YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '-1020px');
}

function bari_out(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_bari', 'selected'))
 	{
		YAHOO.util.Dom.setStyle('saxes_bari', 'background-position', '0 0');
		YAHOO.util.Dom.setStyle('imgBioGroup', 'top', '0');
	}
}

function bari_click(e)
{
 	if (!YAHOO.util.Dom.hasClass('saxes_bari', 'selected'))
 	{
	 	// Add 'selected' class
	 	YAHOO.util.Dom.addClass('saxes_bari', 'selected');
		// Blankify the other saxes
	 	YAHOO.util.Dom.removeClass('saxes_sop', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_alto', 'selected');
	 	YAHOO.util.Dom.removeClass('saxes_tenor', 'selected');
		sop_out();
		alto_out();
		tenor_out();
		
		// Fade out the default content
		var fadeOutDefault = new YAHOO.util.Anim('bioIntro', {opacity:{to:0}}, 0.5);
		fadeOutDefault.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bioIntro', 'display', 'none');
		});
		fadeOutDefault.animate();
		
		// Fade out sop content
		var fadeOutSop = new YAHOO.util.Anim('bio-sop', {opacity:{to:0}}, 0.5);
		fadeOutSop.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-sop', 'display', 'none');
		});
		fadeOutSop.animate();
		
		// Fade out alto content
		var fadeOutAlto = new YAHOO.util.Anim('bio-alto', {opacity:{to:0}}, 0.5);
		fadeOutAlto.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-alto', 'display', 'none');
		});
		fadeOutAlto.animate();
		
		// Fade out tenor content
		var fadeOutTenor = new YAHOO.util.Anim('bio-tenor', {opacity:{to:0}}, 0.5);
		fadeOutTenor.onComplete.subscribe(function()
		{
			YAHOO.util.Dom.setStyle('bio-tenor', 'display', 'none');
			
			// Fade in the bari content
			YAHOO.util.Dom.setStyle('bio-bari', 'display', 'block');
			YAHOO.util.Dom.setStyle('bio-bari', 'opacity', '0');
			var fadeInBari = new YAHOO.util.Anim('bio-bari', {opacity:{to:1}}, 0.5);
			fadeInBari.animate();
		});
		fadeOutTenor.animate();
		
		// Fade out the current images
		var fadeOutGroupImg = new YAHOO.util.Anim('imgBioGroup', {opacity:{to:0}}, 0.5);
		fadeOutGroupImg.onComplete.subscribe(function()
		{
		 	YAHOO.util.Dom.setStyle('imgBioGroup', 'display', 'none');
		 	
		 	// Fade in the next image
		 	YAHOO.util.Dom.setStyle('imgBioRoger', 'display', 'block');
		 	YAHOO.util.Dom.setStyle('imgBioRoger', 'opacity', '0');
			var fadeInBariImg = new YAHOO.util.Anim('imgBioRoger', {opacity:{to:1}}, 0.5);
			fadeInBariImg.animate();
		});
		fadeOutGroupImg.animate();
		
		var fadeOutSopImg = new YAHOO.util.Anim('imgBioJenny', {opacity:{to:0}}, 0.5);
		fadeOutSopImg.animate();
		var fadeOutAltoImg = new YAHOO.util.Anim('imgBioChez', {opacity:{to:0}}, 0.5);
		fadeOutAltoImg.animate();
		var fadeOutTenorImg = new YAHOO.util.Anim('imgBioGeorge', {opacity:{to:0}}, 0.5);
		fadeOutTenorImg.animate();
	}
}