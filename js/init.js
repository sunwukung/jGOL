var display = document.getElementById('display'), 
	fieldData, 
	frag,
	alive,
	dead, 
	scan,
	update,
	ticker,
	fieldSize  = 10,
	fieldLimit = 50,
	start = $('#start'), 
	stop  = $('#stop'), 
	step  = $('#step'),
	reset = $('#reset'), 
	size  = $('#size'),
	show  = $('#show'),
	showNeighbours = false;

fieldData = jgol.generateField(fieldSize);

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

// either the problem is here
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
		col = Number(xy[0].replace('x', '')),
		row = Number(xy[1].replace('y', '')),
		neighbours,
		id;
	if(showNeighbours){
		$('.scan').removeClass('scan');
		neighbours = jgol.getNeighbours({x:col, y:row}, fieldData);
		$('#x' + col + '-y' + row).addClass('scan');
		_.map(neighbours, function (i){
			id = '#x' + i.x + '-y' + i.y;
			$(id).addClass('scan');
		});
		//add the scan class to the zone
	} else {
		that.hasClass('alive') ? dead(that, col, row): alive(that, col, row);
	}
});


// handle controls

start.click(function (ev) {
	start.addClass('active');
	ticker = window.setInterval(function () {
		fieldData = jgol.nextState(fieldData);
		update(fieldData);
	}, 100);
});

stop.click(function () {
	start.removeClass('active');
	window.clearInterval(ticker);
});

step.click(function () {
	window.clearInterval(ticker);
	fieldData = jgol.nextState(fieldData);
	update(fieldData);
})


reset.click(function () {
	window.clearInterval(ticker);
	var fresh = jgol.generateField(fieldSize);
	update(fresh);
});

size.submit(function () {
	window.clearInterval(ticker);

	var v = $("input:first").val(),
		fresh;
	if ($.isNumeric(v)) {
		if(v <= fieldLimit) {

		v = (v % 2 > 0) ? Math.floor(v / 2) * 2 : v;
		fieldSize = v;
		
		fieldData = jgol.generateField(fieldSize);
		frag = jgol.generateFragment(fieldData);

		display.innerHTML='';
		display.appendChild(frag);
		}
	}

	return false;
});

show.click(function () {
	// toggles neighbour scan
	showNeighbours = showNeighbours ? false : true;
	if(show.hasClass('active')){
		// remove scan class
		$('.scan').removeClass('scan');
		show.removeClass('active');
	}else {
		show.addClass('active');
	}
});