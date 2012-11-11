var display = document.getElementById('display'), 
	frag,
	state,
	ticker,
	render,
	fieldSize  = 10,
	dead, alive,
	start = $('#start'), 
	stop  = $('#stop'), 
	step  = $('#step'),
	reset = $('#reset'), 
	size  = $('#size'),
	show  = $('#show');


render = function (state) {
	if(state === undefined) {
		state = jgol.generate(fieldSize, fieldSize);
	}
	frag = jgol.toDOM(state);
	display.innerHTML = '';
	display.appendChild(frag);
};

alive = function (el, col, row) {
	$(el).addClass('alive');
	state[row][col] = 1;
};

dead = function (el, col, row) {
	$(el).removeClass('alive');
	state[row][col]= 0;
};

// EDITOR

$(display).delegate('div.cell', 'click', function () {
	var that = $(this),
		id = that.attr('id'),
		xy = id.split('-'),
		row = parseInt(xy[0]),
		col = parseInt(xy[1]),
		neighbours,
		id;
	/*
	if(showNeighbours){
		$('.scan').removeClass('scan');
		neighbours = jgol.getNeighbours({x:col, y:row}, state);
		$('#x' + col + '-y' + row).addClass('scan');
		_.map(neighbours, function (i){
			id = '#x' + i.x + '-y' + i.y;
			$(id).addClass('scan');
		});
		//add the scan class to the zone
	} else {
	}
		*/
	that.hasClass('alive') ? dead(that, col, row): alive(that, col, row);
});


// CONTROLS

start.click(function (ev) {
	start.addClass('active');
	ticker = window.setInterval(function () {
		state = jgol.evolve(state);
		render(state);
	}, 100);
});

stop.click(function () {
	start.removeClass('active');
	window.clearInterval(ticker);
});

step.click(function () {
	window.clearInterval(ticker);
	state = jgol.evolve(state);
	render(state);
})


reset.click(function () {
	window.clearInterval(ticker);
	state = jgol.generate(fieldSize);
	render(state);
});

size.submit(function () {
	window.clearInterval(ticker);
	var v = $("input:first").val(),
		fresh;
	if ($.isNumeric(v)) {
		if(v <= fieldLimit) {

		v = (v % 2 > 0) ? Math.floor(v / 2) * 2 : v;
		fieldSize = v;
		
		state = jgol.generate(fieldSize, fieldSize);
		frag = jgol.toDOM(state);

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

render();