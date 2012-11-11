var display = document.getElementById('display'), 
	frag,
	state,
	ticker,
	render,
	fieldSize  = 20,
	fieldLimit = 50,
	dead, alive,
	start = $('#start'), 
	stop  = $('#stop'), 
	step  = $('#step'),
	reset = $('#reset'), 
	size  = $('#size'),
	show  = $('#show');

// @ TODO - not passing active state back into the render function
render = function (state) {
	if(state === undefined) {
		console.log('state is undefined');
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
		col = parseInt(xy[1]);

	that.hasClass('alive') ? dead(that, col, row): alive(that, col, row);
});


// CONTROLS

start.click(function (ev) {
	start.addClass('active');
		//console.log(state);
		//console.log(jgol.evolve(state));
	ticker = window.setInterval(function () {
		state = jgol.evolve(state);
		render(state);
	}, 50);
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
	state = jgol.generate(fieldSize, fieldSize);
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
		render(state);
		}
	}

	return false;
});


state = jgol.generate(fieldSize, fieldSize);

render(state);