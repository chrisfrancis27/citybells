/*global YUI, console, soundManager */
/*jslint undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */

YUI.add('mediaPlayer', function(Y) {
	"use strict";
	
	function MediaPlayer(config) {
        MediaPlayer.superclass.constructor.apply(this, arguments);
    }

    MediaPlayer.NAME = 'mediaPlayer';

	// Configuration attributes
    MediaPlayer.ATTRS = {
		mediaLibrary: {
			value: [],
			validator: Y.Lang.isArray()
		}
	};
	
    Y.namespace('TwoAndaHalfPeople').MediaPlayer = MediaPlayer;

    Y.extend(MediaPlayer, Y.Widget, {
		
		initializer: function() {
			// Set initial constructor properties
			this.contentBox = this.get('contentBox');
			this.audioTracks = this.get('mediaLibrary');
			this.list = this.contentBox.one('#mediaList');
			this.footer = this.contentBox.one('#mediaPlayerFooter');
			this.listType = null;
			this.curSound = null;
			this.curSoundElement = null;
			this.isLoading = false;
			this.isPlaying = false;
		},
	
		renderUI: function() {
			this.sortTracks();
		},
		
		bindUI: function() {
			// Attach click handlers to iPod list sort buttons
			this.footer.delegate('click', this.onListSort, 'a', this);
			
			// Attach hover/unhover handlers to iPod control
			this.contentBox.on('mouseover', this.onIPodHover, this);
			this.contentBox.on('mouseout', this.onIPodUnhover, this);
			
			// Attach hover/unhover handlers to each track
			this.list.delegate('mouseover', function()
			{
				this.addClass('hover');
			}, 'li');
			this.list.delegate('mouseout', function()
			{
				this.removeClass('hover');
			}, 'li');
			
			// Attach click handler to each track
			this.list.delegate('click', this.onTrackClick, 'li', this);
		},
		
		syncUI: function() {
			// Remove all 'playing' classes from list items
			this.list.all('li').each(function(node) {
				node.removeClass('playing');
			}, this);
			// Remove iPod glow
			Y.one('#ipodGlow').removeClass('show');
		
			// If iPod is loading
			if (this.curSound && !this.curSound.loaded) {
				// Change iPod header text and icon
				Y.one('#mediaPlayerHeader h2').set('innerHTML', 'loading').removeClass('paused').removeClass('ready').removeClass('playing').addClass('loading');
				// If it's a listed track (not an excerpt)
				if (this.curSoundElement) {
					// Add 'playing' class to list item
					this.curSoundElement.addClass('playing');
					// Glow iPod
					Y.one('#ipodGlow').addClass('show');
				}
			}
			// If iPod is currently playing
			else if (this.curSound && this.isPlaying) {
				// Change iPod header text and icon
				Y.one('#mediaPlayerHeader h2').set('innerHTML', 'playing').removeClass('loading').removeClass('paused').removeClass('ready').addClass('playing');
				// Glow iPod
				Y.one('#ipodGlow').addClass('show');
				// If it's a listed track (not an excerpt)
				if (this.curSoundElement) {
					// Add 'playing' class to list item
					this.curSoundElement.addClass('playing');
				}
			}
			else {
				// If iPod is paused
				if (this.curSound) {
					// Change iPod header text and icon
					Y.one('#mediaPlayerHeader h2').set('innerHTML', 'paused').removeClass('loading').removeClass('ready').removeClass('playing').addClass('paused');
				}
				// Else if iPod is stopped entirely
				else {
					// Change iPod header text and icon
					Y.one('#mediaPlayerHeader h2').set('innerHTML', 'ready').removeClass('loading').removeClass('paused').removeClass('playing').addClass('ready');
				}
				// Stop glowing
				Y.one('#ipodGlow').removeClass('show');
			}
		},
		
		onIPodHover: function(e) {
			var anim = new Y.Anim({ 
				node: this.contentBox, 
				to: { 
					width: 340, 
					height: 400
				},
				duration: 0.1 
			}); 
			anim.run();
			Y.one('#ipodGlow').addClass('show');
		},
		onIPodUnhover: function(e) {
			var anim = new Y.Anim({ 
				node: this.contentBox, 
				to: { 
					width: 70, 
					height: 170
				},
				duration: 0.1 
			}); 
			anim.run();
			if (!this.isPlaying)
			{
				Y.one('#ipodGlow').removeClass('show');
			}
		},
		
		onListSort: function(e) {
			e.preventDefault();
			this.listType = e.currentTarget.getAttribute('rel');
			this.sortTracks();
		},
		
		onTrackClick: function(e) {
			e.preventDefault();
			var target = e.currentTarget;
			
			// If a track is playing
			if (this.isPlaying) {
				// If that track is the one that was clicked
				if (this.curSoundElement === target) {
					// Pause it
					this.pauseTrack(target);
				}
				else {
					// Stop the playing track
					this.stopTrack();
					// Play the clicked track
					this.playTrack(target);
				}
			}
			else {
				// If a track is paused
				if (this.curSound) {
					// If that track is the one that was clicked
					if (this.curSoundElement === target) {
						// Resume playback
						this.resumeTrack(target);
					}
					else {
						// Stop the paused track
						this.stopTrack();
						// Play the clicked track
						this.playTrack(target);
					}
				}
				else {
					// Play the clicked track
					this.playTrack(target);
				}
			}
		},
		
		sortTracks: function() {
			// Sort audioTracks list and generate markup
			this.list.get('childNodes').remove();
			var i = 0;
			if (this.listType === 'composer')
			{
				this.audioTracks.sort(this.sortByComposer);
				this.footer.all('a').removeClass('selected');
				this.footer.one('#mediaPlayer_composers').addClass('selected');
				for (i = 0; i < this.audioTracks.length; i += 1)
				{
					this.list.append('<li><span class="title">'
								+ this.audioTracks[i].getComposer()
								+ '</span><span class="subtitle">'
								+ this.audioTracks[i].getTitle()
								+ '</span><span class="genre genre-' + this.audioTracks[i].getGenre() + '">'
								+ this.audioTracks[i].getGenre()
								+ '</span><span class="hidden">'
								+ this.audioTracks[i].getMediaURL()
								+ '</span><span class="clearFloat"></span></li>');
				}
			}
			else if (this.listType === 'styles')
			{
				// First sort by priority
				this.audioTracks.sort(this.sortByPriority);
				// Then group by genre
				this.audioTracks.sort(this.sortByGenre);
				this.footer.all('a').removeClass('selected');
				this.footer.one('#mediaPlayer_styles').addClass('selected');
				for (i = 0; i < this.audioTracks.length; i += 1)
				{
					this.list.append('<li><span class="title">'
								+ this.audioTracks[i].getTitle()
								+ '</span><span class="subtitle">'
								+ this.audioTracks[i].getComposer()
								+ '</span><span class="genre genre-' + this.audioTracks[i].getGenre(true) + '">'
								+ this.audioTracks[i].getGenre()
								+ '</span><span class="hidden">'
								+ this.audioTracks[i].getMediaURL()
								+ '</span><span class="clearFloat"></span></li>');
				}
			}
			else if (this.listType === 'smallband')
			{
				var newList = [];
				//First remove all non "small band" style items
				for (i = 0; i < this.audioTracks.length; i += 1) {
					if (this.audioTracks[i].getGenre() === "Small Band") {
						newList.push(this.audioTracks[i]);
					}
				}
				//Then sort by priority
				newList.sort(this.sortByPriority);
				this.footer.all('a').removeClass('selected');
				this.footer.one('#mediaPlayer_smallband').addClass('selected');
				for (i = 0; i < newList.length; i += 1)
				{
					this.list.append('<li><span class="title">'
								+ newList[i].getTitle()
								+ '</span><span class="subtitle">'
								+ newList[i].getComposer()
								+ '</span><span class="genre genre-' + newList[i].getGenre(true) + '">'
								+ newList[i].getGenre()
								+ '</span><span class="hidden">'
								+ newList[i].getMediaURL()
								+ '</span><span class="clearFloat"></span></li>');
				}
			}
			else
			{
				this.audioTracks.sort(this.sortByPriority);
				this.footer.all('a').removeClass('selected');
				this.footer.one('#mediaPlayer_songs').addClass('selected');
				for (i = 0; i < this.audioTracks.length; i += 1)
				{
					this.list.append('<li><span class="title">'
								+ this.audioTracks[i].getTitle()
								+ '</span><span class="subtitle">'
								+ this.audioTracks[i].getComposer()
								+ '</span><span class="genre genre-' + this.audioTracks[i].getGenre() + '">'
								+ this.audioTracks[i].getGenre()
								+ '</span><span class="hidden">'
								+ this.audioTracks[i].getMediaURL()
								+ '</span><span class="clearFloat"></span></li>');
				}
			}
		},
		sortByComposer: function(a, b) {
			var x = a.getComposer().toLowerCase();
			var y = b.getComposer().toLowerCase();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
		sortByGenre: function(a, b) {
			var x = a.getGenre().toLowerCase();
			var y = b.getGenre().toLowerCase();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
		sortByPriority: function(a, b) {
			var x = a.getPriority();
			var y = b.getPriority();
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
		randomize: function() {
			return 0.5 - Math.random();
		},
		
		playTrack: function(listItem) {
			// Get song URL
			var targetURL = listItem.one('.hidden').get('innerHTML');
			var baseURL = '_audio/';
			
			// Reference context for callback handlers
			var that = this;
			
			// Create Sound object
			var soundObject = soundManager.createSound({
				id: listItem.get('id'),
				url: baseURL + targetURL,
				onload: function()
				{
					// Update widget state
					that.isPlaying = true;
					
					// Re-sync UI
					that.syncUI();
				},
				onfinish: function()
				{
					// Update widget state
					that.isPlaying = false;
					that.curSound = null;
					that.curSoundElement = null;
					
					// Re-sync UI
					that.syncUI();
				}
			});
			
			// Update widget state
			this.isPlaying = false;
			this.curSound = soundObject;
			this.curSoundElement = listItem;
			
			// Re-sync UI
			this.syncUI();
			
			// Play Sound object
			soundObject.play();
		},
		pauseTrack: function(listItem) {
			// Pause Sound object playback
			this.curSound.pause();
			
			// Update widget state
			this.isPlaying = false;
			
			// Re-sync UI
			this.syncUI();
		},
		resumeTrack: function(listItem) {
			// Resume Sound object playback
			this.curSound.resume();
			
			// Update widget state
			this.isPlaying = true;
			
			// Re-sync UI
			this.syncUI();
		},
		stopTrack: function() {
			// Destroy Sound object
			this.curSound.destruct();

			// Update widget state
			this.isPlaying = false;
			this.curSound = null;
			this.curSoundElement = null;
			
			// Re-sync UI
			this.syncUI();
		},
		playExcerpt: function(excerptURL) {
			var baseURL = '_audio/';
			
			// Reference context for callback handlers
			var that = this;
			
			// Create Sound object
			var soundObject = soundManager.createSound({
				id: 'excerpt',
				url: baseURL + excerptURL,
				onload: function()
				{
					// Update widget state
					that.isPlaying = true;
					that.curSound = this;
					
					// Re-sync UI
					that.syncUI();
				},
				onfinish: function()
				{
					// Update widget state
					that.isPlaying = false;
					that.curSound = null;
					that.curSoundElement = null;
					
					// Re-sync UI
					that.syncUI();
				}
			});
			
			// Update widget state
			this.isPlaying = true;
			this.curSound = soundObject;
			this.curSoundElement = null;
					
			// Re-sync UI
			this.syncUI();
			
			// Play Sound object
			soundObject.play();
		}
	});
	
}, { requires: ['audioTrack', 'anim', 'widget']});