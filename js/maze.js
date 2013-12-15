(function($, _){'use strict';
	var i = 0;
	var tilesize = 200;
	function Wall( x, y, r ){
		i++;
		var e = $('<div>',{
			'class':'wall',
			'text': "wat" + i
		});
		console.log('e', e);
		this.$el = e;
		this.el = e[0];
		$('#geometry').append(e);
		this._translateX = 0;
		this._translateY = 0;
		this._rotate = false;
		if ( x )
			this.translateX( x );
		if ( y )
			this.translateY( y );
		if ( r )
			this.rotate( true );
		this.rebuildCSS();
	}
	_.extend( Wall.prototype, {
		_stepAdjust: function(steps, isY)
		{
			// return steps;
			var amt = 0;
			if ( isY )
				amt += 0.5
			if (this._rotate)
				amt += 0.5;
			if ( steps > 0 )
				steps -= amt;
			else
				steps += amt;
			return steps;
		},
		translateX: function(steps) {
			this._translateX = steps;
			this.rebuildCSS();
		},
		translateY: function(steps) {
			this._translateY = steps;
			this.rebuildCSS();
		},
		rotate: function(yes) {
			this._rotate = yes;
			this.rebuildCSS();
		},
		rebuildCSS: function()
		{
			var arr = [];
			if ( this._translateX )
				arr.push( 'translateX(' + this._stepAdjust( this._translateX ) * tilesize + 'px)' );
			if ( this._translateY )
				arr.push( 'translateY(' + this._stepAdjust( this._translateY, true ) * tilesize + 'px)' );
			if ( this._rotate )
				arr.push( 'rotateZ(90deg)' );
			arr.push('rotateY(90deg)');
			arr.push('rotateZ(-90deg)');
			this.$el.css('transform', arr.join(' ') );
			this.$el.text( this._translateX + ',' + this._translateY + ',' + (this._rotate ? '1' : '0'));
		}
	} );
	function w(x,y,z) {
		return new Wall(x,y,z);
	}
	// w(0,0,0);
	// w(0,0,1);
	w(2,0,1);
	w(1,0,1);
	w(-1,0,1);
	w(-2,0,1);
	w(0,-1,0);
	w(0,1,0);
	// w( 1, 0,0);
	// w( 1,-1,0);
	// w( 1, 1,0);
	// w( 2, 0,0);
	// w( 2, 1,0);
	// w( 2,-1,0);
	// w( 2,-2,0);
	// w( 2,-2,1);
	// w(-1, 0,0);
	// w(-2, 0,0);
	// w( 0, 1,1);
	// w( 0,-1,1);
	// w( 1,-1,1);
})(jQuery, _);

