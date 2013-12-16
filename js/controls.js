(function($,_){'use strict';

	function isRotate(name) {
		return name.substr(0,6) === 'rotate';
	}
	function field(g, name, value, callback)
	{
		var min, max;
		if ( isRotate(name) ) {
			min = -180;
			max = 180;
		}
		return $('<li>').append(
			$('<label>', {
				text: name,
				'for': g+name
			}),
			$('<input>', {
				type: 'number',
				min: min,
				max: max,
				value: value,
				name: g+name,
				id: g+name
			}).on('change', function()
			{
				if ( this.value && this.checkValidity() )
					callback( name, parseInt( this.value, 10 ) );
			})
		);
	}
	var def = [
		'translateX',
		'translateY',
		'translateZ',
		'rotateX',
		'rotateY',
		'rotateZ'
	];
	function divset( selector, name )
	{
		var transforms = {};
		def.forEach(function(a){
			transforms[a] = 0;
		});
		var order = def.concat();
		function rebuild()
		{
			var res = order.filter(function(name){ return transforms[name]; }).map(function(name){
				return name +'(' + transforms[name] + ( isRotate(name) ? 'deg' : 'px' ) + ')';
			}).join(' ');
			console.log(res);
		}
		function cback( name, value )
		{
			transforms[name] = value;
			console.log(name,value);
			rebuild();
		}
		var shortname = selector.substr(1,3);
		// var $el = $( selector );
		var list;
		$('#controls').append(
			$('<fieldset>', {
				name: shortname
			}).append(
				$('<legend>',{
					text: name
				}),
				( list = $('<ol>') )
			)
		);
		def.forEach( function( name ) {
			list.append( field( shortname, name, 0, cback ) );
		} );
	}
	divset('#geometry', "Geometry");
	divset('#camera', "Camera");
	// var f = new Field("translateX", -1000, 1000, 0, function(name, value) { console.log(name,value); });

	// f.$el.appendTo('#geo');

})(jQuery,_);