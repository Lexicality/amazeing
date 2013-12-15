(function($, _){'use strict';
	var i = 0;
	var tilesize = 200;
	function Wall(){
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
		this.rebuildCSS();
	}
	_.extend( Wall.prototype, {
		_stepAdjust: function(steps)
		{
			if ( steps > 0 )
				steps -= 0.5;
			else if ( steps < 0 )
				steps += 0.5;
			return steps;
		},
		translateX: function(steps) {
			this._translateX = this._stepAdjust( steps );
			this.rebuildCSS();
		},
		translateY: function(steps) {
			this._translateY = this._stepAdjust( steps );
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
				arr.push( 'translateX(' + this._translateX * tilesize + 'px)' );
			if ( this._translateY )
				arr.push( 'translateY(' + this._translateY * tilesize + 'px)' );
			if ( this._rotate )
				arr.push( 'rotateZ(90deg)' );
			arr.push('rotateY(90deg)');
			arr.push('rotateZ(-90deg)');
			this.$el.css('transform', arr.join(' ') );
		}
	} );
	// new Wall();
	var a = new Wall();
	var b = new Wall();
	// var c = new Wall();
	var d = new Wall();
	a.translateX(1);
	b.translateX(-1);
	// c.translateY(1);
	// c.rotate(true);
	d.translateY(-1);
	d.rotate(true);

})(jQuery, _);
