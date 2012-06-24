/*global YUI*/

YUI().use('anim', 'node', function(Y)
{
	Y.on('domready', function()
	{
		Y.one("#socialNetworks").delegate('mouseover', function(e)
		{
		 	e.currentTarget.all('img').setStyle('cursor', 'pointer');
			e.currentTarget.all('.popup').setStyles(
			{
				'opacity': 0.95,
				'display': 'block'
			});
		}, '.popupContainer', this);
		Y.one("#socialNetworks").delegate('mouseout', function(e)
		{
			e.currentTarget.all('.popup').setStyles(
			{
				'display': 'none'
			});
		}, '.popupContainer', this);
	});
});