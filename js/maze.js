(function($, _){'use strict';
	function Matrix(){
		this.matrix = [
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,0,0,1,
		];
	}
	_.extend(Matrix.prototype, {
		translate: function(x, y, z)
		{
			this.matrix[3] += x || 0;
			this.matrix[7] += y || 0;
			this.matrix[11] += z || 0;
			// ???
		},
		rotate: function(deg, axis)
		{
			// ???
		},
		css: function()
		{
			return "matrix3d(" + this.matrix.join(',') + ")";
		}
	})
	function Wall(){
		var e = $('<div>',{
			'class':'wall',
			'text': "wat"
		});
		console.log('e', e);
		this.$el = e;
		this.el = e[0];
		$('#geometry').append(e)
	}
	new Wall;
	var a = new Wall;
	var m = new Matrix;
	m.translate(0.1,0,0)
	a.$el.css('transform', m.css());
})(jQuery, _)
