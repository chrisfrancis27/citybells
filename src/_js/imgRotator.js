/*jslint white: true, nomen: true, maxerr: 50, indent: 4 */
/*global YUI, setInterval*/

YUI.add('imgRotator', function(Y)
{
	"use strict";
	Y.namespace('TwoAndaHalfPeople');
	
	Y.TwoAndaHalfPeople.ImgRotator = function(imgArray, pauseTime, transitionTime, skipFirst)
	{
		// Private
		var _images,
			_pauseTime,
			_transitionTime,
			_skipFirst,
			_curImg,
			_prevImg;
			
		// Public
		this.doFade = function()
		{
			var fadeIn, fadeOut;
			
			if (typeof(_curImg) === 'undefined')
			{
				_curImg = 0;
			}
			
			fadeIn = new Y.Anim(
			{
				node: _images.item(_curImg),
				to: { opacity: 1 },
				duration: _transitionTime
			});
			fadeIn.on('end', function()
			{
				_prevImg = _curImg;
				_curImg = (_curImg === _images.size() - 1) ? 0 : _curImg + 1;
			});
			fadeIn.run();
			
			if (typeof(_prevImg) !== 'undefined')
			{
				fadeOut = new Y.Anim(
				{
					node: _images.item(_prevImg),
					to: { opacity: 0 },
					duration: _transitionTime
				});
				fadeOut.run();
			}
		};
		
		// Constructor
		_images = imgArray;
		_pauseTime = pauseTime;
		_transitionTime = transitionTime;
		_skipFirst = skipFirst;
		
		_images.each(function()
		{
			if (_skipFirst && _images.indexOf(this) === 0) {
				this.setStyles(
				{
					opacity: 1,
					visibility: 'visible'
				});
			}
			else {
				this.setStyles(
				{
					opacity: 0,
					visibility: 'visible'
				});
			}
		});
		
		if (_skipFirst) {
			_curImg = 1;
		}
		else {
			this.doFade();
		}
		setInterval(this.doFade, ((_pauseTime + _transitionTime) * 1000));
	};
}, '1.0.0', { requires: ['node','anim'] });