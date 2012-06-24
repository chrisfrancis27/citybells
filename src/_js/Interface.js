/*global YUI, setInterval, console*/

YUI.add('interface', function(Y)
{
	// Namespace
	Y.namespace('twoandahalfpeople');
	
	// Class
	Y.twoandahalfpeople.Interface = function(name, methods)
	{
		try
		{
			if (arguments.length != 2)
			{
				throw(new Error("Interface constructor called with " + arguments.length + " arguments, but expected exactly 2."));
			}
			
			this.name = name;
			this.methods = [];
			for (var i = 0, len = methods.length; i < len; i++)
			{
				if (typeof methods[i] !== 'string')
				{
					throw(new Error("Interface constructor expects method names to be passed in as a string."));
				}
				this.methods.push(methods[i]);
			}
		}
		catch(err)
		{
			console.log("Alert: " + err.message);
		}
	};
		
	// Static class method
	Y.twoandahalfpeople.Interface.ensureImplements = function(object)
	{
		try 
		{
			if (arguments.length < 2)
			{
				throw(new Error("Function Interface.ensureImplements called with " + arguments.length + " arguments, but expected at least 2."));
			}
			
			for (var i = 1, len = arguments.length; i < len; i++)
			{
				var the_interface = arguments[i];
				if (the_interface.constructor !== Y.twoandahalfpeople.Interface)
				{
					throw(new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface class."));
				}
				
				for (var j = 0, methodsLen = the_interface.methods.length; j < methodsLen; j++)
				{
					var method = the_interface.methods[j];
					if (!object[method] || typeof object[method] !== 'function')
					{
						throw(new Error("Function Interface.ensureImplements: object does not implement the " + the_interface.name + " interface. Method " + method + " was not found."));
					}
				}
			}
		}
		catch(err)
		{
			console.log("Error: " + err.message);
		}
	};
}, '1.0.0');