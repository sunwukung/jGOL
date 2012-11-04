var display, 
	fieldData, 
	frag,
	alive,
	dead, 
	update,
	ticker,
	size = 10;

display = document.getElementById('display');

fieldData = jgol.generateField(size);

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
				alive(cell, c, r);
			} else {
				dead(cell, c, r);
			}
			c = c+1;
		});
		c = 0;
		r = r+1;
	});
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
	ticker = window.setInterval(function () {
		fieldData = jgol.nextState(fieldData);
		update(fieldData);
	}, 100);
});

$('#stop').click(function () {
	window.clearInterval(ticker);
});

$('#step').click(function () {
	window.clearInterval(ticker);
	fieldData = jgol.nextState(fieldData);
	update(fieldData);
})


$('#reset').click(function () {
	window.clearInterval(ticker);
	var fresh = jgol.generateField(size);
	update(fresh);
});






