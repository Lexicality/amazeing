(function($,_){'use strict';

	function isRotate(name) {
		return name.substr(0,6) === 'rotate';
	}
	function field(g, name, value, callback)
	{
		return $('<li>').append(
			$('<label>', {
				text: name,
				'for': g+name
			}),
			$('<input>', {
				type: 'number',
				value: value,
				name: g+name,
				id: g+name
			}).on('change', function()
			{
				if ( this.value && this.checkValidity() )
					callback( name, parseInt( this.value, 10 ) );
			})
		).data('name', name);
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
		var $el = $( selector );
		function rebuild()
		{
			var res = order.filter(function(name){ return transforms[name]; }).map(function(name){
				return name +'(' + transforms[name] + ( isRotate(name) ? 'deg' : 'px' ) + ')';
			}).join(' ');
			console.log(res);
			$el.css('transform', res);
		}
		function cback( name, value )
		{
			transforms[name] = value;
			console.log(name,value);
			rebuild();
		}
		var shortname = selector.substr(1,3);
		if ( shortname === "geo" ) // start the geo off facing forward
			transforms.rotateX = 90;
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
		_.forEach( transforms, function( value, name ) {
			list.append( field( shortname, name, value, cback ) );
		} );
		list.sortable().on('sortupdate', function()
		{
			order = [];
			list.children().each(function() {
				order.push( $(this).data('name') );
			});
			rebuild();
		});
		rebuild();
	}
	divset('#geometry', "Geometry");
	divset('#camera', "Camera");
})(jQuery,_);