/*global YUI*/

YUI.add('audioTrack', function(Y)
{
	"use strict";
	
	// Namespace
	Y.namespace('TwoAndaHalfPeople');
	
	// Class
	Y.TwoAndaHalfPeople.AudioTrack = function(title, composer, genre, mediaURL, priority)
	{
		// Private members
		var p_title, p_composer, p_genre, p_mediaURL, p_priority;
	
		// Privileged methods
		this.getTitle = function()
		{
			return p_title;
		};
		this.setTitle = function(newTitle)
		{
			p_title = newTitle;
		};
		this.getComposer = function()
		{
			return p_composer;
		};
		this.setComposer = function(newComposer)
		{
			p_composer = newComposer ? newComposer : 'Anon.';
		};
		this.getGenre = function(urlSafe)
		{
			return urlSafe ? p_genre.replace(/['";:,.\/?\\_ ]/g, '-').toLowerCase() : p_genre;
		};
		this.setGenre = function(newGenre)
		{
			p_genre = newGenre;
		};
		this.getMediaURL = function()
		{
			return p_mediaURL;
		};
		this.setMediaURL = function(newMediaURL)
		{
			p_mediaURL = newMediaURL;
		};
		this.hasComposer = function()
		{
			return (p_composer !== null && p_composer !== 'Anon.');
		};
		this.isInGenre = function(genre)
		{
			return (p_genre === genre);
		};
		this.getPriority = function()
		{
			return p_priority;
		};
		this.setPriority = function(newPriority)
		{
			p_priority = newPriority ? newPriority : 0;
		};
		
		// Constructor
		this.setTitle(title);
		this.setComposer(composer);
		this.setGenre(genre);
		this.setMediaURL(mediaURL);
		this.setPriority(priority);
	};
}, '1.0.0');