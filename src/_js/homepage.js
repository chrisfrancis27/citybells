/*jslint white: true, nomen: true, maxerr: 50, indent: 4 */
/*global YUI, soundManager, setTimeout */

(function()
{
	"use strict";
	YUI({
		modules:
		{
			imgRotator:
			{
				fullpath: '_js/imgRotator.js',
				requires: ['node', 'anim']
			},
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
	}).use('imgRotator', 'mediaLibrary', 'mediaPlayer', 'twitter', 'cookie', function(Y)
	{
		var imgsPortrait,
			imgsLandscape,
			player,
			expiryDate,
			visitCount;
			
		// Get nodeLists of images to be rotated
		imgsPortrait = Y.all('#picturePortrait_inner img');
		imgsLandscape = Y.all('#pictureLandscape_inner img');
		
		// Image rotators
		Y.TwoAndaHalfPeople.ImgRotator(imgsPortrait, 6, 2, true);
		setTimeout(function() {
			Y.TwoAndaHalfPeople.ImgRotator(imgsLandscape, 6, 2, true);
		}, 4000);
		
		// SoundManager
		soundManager.debugMode = false;
		
		// Make a new MediaPlayer and pass it a MediaLibrary collection
		player = new Y.TwoAndaHalfPeople.MediaPlayer({
			contentBox: '#mediaPlayerContainer',
			mediaLibrary: Y.TwoAndaHalfPeople.MediaLibrary()
		});
		player.render();
		
		// Twitter feed
		Y.TwoAndaHalfPeople.Twitter();
		
		// If user hasn't visited this page in this session...
		if (!Y.Cookie.get('singleVisit'))
		{
			// ... and if user hasn't been here in 30 days
			if (!Y.Cookie.get('globalVisit'))
			{
				// ... set the 30-day cookie
				expiryDate = new Date().getTime();
				expiryDate += (86400000 * 30);
				expiryDate = new Date(expiryDate);
				Y.Cookie.set('globalVisit', 1, { expires: expiryDate });
				
				// Play first audio excerpt
				player.playExcerpt('x2_summertime.mp3');
			}
			// ... else if user has been here in last 30 days...
			else
			{
				visitCount = Y.Cookie.get('globalVisit', Number);
				visitCount = (visitCount < 4) ? visitCount + 1 : 1;
				Y.Cookie.set('globalVisit', visitCount);
				
				// Play appropriate audio excerpt
				switch(visitCount)
				{
					case 1:
						player.playExcerpt('x2_summertime.mp3');
						break;
					case 2:
						player.playExcerpt('x3_sir_duke.mp3');
						break;
					case 3:
						player.playExcerpt('x4_small_dream.mp3');
						break;
					case 4:
						player.playExcerpt('x1_tiger_rag.mp3');
						break;
					default:
						break;
				}
			}
			
			// ... create session cookie
			Y.Cookie.set('singleVisit', true);
		}
	});
}());