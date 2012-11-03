var display, 
	fieldData, 
	frag,
	alive,
	dead;

display = document.getElementById('display');

fieldData = jgol.generateField(5);

jgol.update(fieldData);

frag = jgol.generateFragment(fieldData);
display.appendChild(frag);

alive = function (el, col, row) {
	el.addClass('alive');
	fieldData[row][col].alive = true;
};

dead = function (el, col, row) {
	el.removeClass('alive');
	fieldData[row][col].alive = false;
};


//enable setup
$(display).delegate('div.cell', 'click', function () {
	var that = $(this),
		id = that.attr('id'),
		xy = id.split('-'),
		col = xy[0].replace('x', ''),
		row = xy[1].replace('y', '');
	that.hasClass('alive') ? dead(that, col, row): alive(that, col, row);
});


