/*global YUI*/

YUI.add('twitter', function(Y)
{
	// Namespace
	Y.namespace('TwoAndaHalfPeople');
	
	// Class
	Y.TwoAndaHalfPeople.Twitter = function()
	{		
		// Make AJAX request to Twitter API
		function ajaxComplete(id, o, args)
		{
			var response = Y.JSON.parse(o.responseText);
			
			if (response !== null && response.length > 0)
			{
				// Do some maths to see how long ago tweet was made
				var twitWhen,
					unixNow = Math.round(new Date().getTime()),
					unixTwit = Math.round(new Date(response[0].created_at).getTime()),
					diff = unixNow - unixTwit;
				
				if (diff <= 3600000)
				{
					twitWhen = " - less than an hour ago";
				}
				else if (diff <= 86400000)
				{
					twitWhen = " - earlier today";
				}
				else if (diff <= 604800000)
				{
					twitWhen = " - earlier this week";
				}
				else if (diff <= 1209600000)
				{
					twitWhen = " - 2 weeks ago";
				}
				else if (diff <= 2419200000)
				{
					twitWhen = " - more than 2 weeks ago";
				}
				else
				{
					twitWhen = " - more than a month ago";
				}
				
				// Turn any links into real clickable links
				var twitText = response[0].text.replace(/(ftp|http|https|file):\/\/[\S]+(\b|$)/gim, '<a href="$&" target="_blank">$&</a>');
				
				// Create twitter elements and popup-widgetise
				Y.one("#twitter > div").addClass("popupContainer");
				var twitWrapper = Y.one('#twitter .popup-inner');
				twitWrapper.append(twitText + '<span class="twitWhen">' + twitWhen + '</span>');
			}
		}
		var cfg =
		{
			method: 'GET',
			on: 
			{
				success: ajaxComplete
			}
		};
		Y.io('_includes/twitterproxy.php', cfg);
	};
}, '1.0.0', { requires: ['io', 'json'] });