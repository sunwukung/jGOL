var display, 
	fieldData, 
	frag,
	alive,
	dead, 
	update;

display = document.getElementById('display');

fieldData = jgol.generateField(5);

jgol.update(fieldData);

frag = jgol.generateFragment(fieldData);
display.appendChild(frag);

alive = function (el, col, row) {
	$(el).addClass('alive');
	fieldData[row][col].alive = true;
};

dead = function (el, col, row) {
	$(el).removeClass('alive');
	fieldData[row][col].alive = false;
};

update = function (nextState) {
	var r = 0,
		c = 0;

	_.map(display.children, function (row) {
		_.map(row.children, function (cell) {
			if(nextState[r][c].alive){
				console.log('live');
				alive(cell, c, r);
			} else {
				console.log('dead');
				dead(cell, c, r);
			}
			c = c+1;
			return;
		});
		c = 0;
		r = r+1;
	});
	return fieldData;
};




//hook up interface
$(display).delegate('div.cell', 'click', function () {
	var that = $(this),
		id = that.attr('id'),
		xy = id.split('-'),
		col = xy[0].replace('x', ''),
		row = xy[1].replace('y', '');
	that.hasClass('alive') ? dead(that, col, row): alive(that, col, row);
});


// handle controls

$('#start').click(function () {
	var t, i=1, limit=20;
	t = window.setInterval(function () {
		console.log('tick');
		update(fieldData);

		if(i >= limit) {
			window.clearInterval(t);
		}
		i = i+1;
	}, 100);
});




