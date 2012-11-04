var cloneMe = function (originalArray) {
	return $.map(originalArray, function (obj) {
		return $.extend(true, {}, obj);
		});
};



module('jgol', {
	setup: function () {
		this.startState = [
			[{x:0, y:0, alive: false},{x:1, y:0, alive: false},{x:2, y:0, alive: false},{x:3, y:0, alive: false},{x:4, y:0, alive: false}],
			[{x:0, y:1, alive: false},{x:1, y:1, alive: false},{x:2, y:1, alive: false},{x:3, y:1, alive: false},{x:4, y:1, alive: false}],
			[{x:0, y:2, alive: false},{x:1, y:2, alive: false},{x:2, y:2, alive: false},{x:3, y:2, alive: false},{x:4, y:2, alive: false}],
			[{x:0, y:3, alive: false},{x:1, y:3, alive: false},{x:2, y:3, alive: false},{x:3, y:3, alive: false},{x:4, y:3, alive: false}],
			[{x:0, y:4, alive: false},{x:1, y:4, alive: false},{x:2, y:4, alive: false},{x:3, y:4, alive: false},{x:4, y:4, alive: false}]
		]
	}
});



test('api', function () {
	ok(q.isF(jgol.generateField), 'jgol.generateField');
	ok(q.isF(jgol.normalise), 'jgol.normalise');
	ok(q.isF(jgol.neighbours), 'jgol.neighbours');
	ok(q.isF(jgol.nextState), 'jgol.nextState');
});



test('generateField', function () {
	var rows = jgol.generateField(10);
	ok(q.isA(rows));
	ok(rows.length === 10);
	ok(q.isA(rows[0]));
	ok(rows[0].length === 10);
});



test('normalise', function () {
	equal(jgol.normalise(1, -1, 10), 0, 'jgol.normalise adjusts arg1 value by arg2');
	equal(jgol.normalise(0, -1, 10), 10, 'jgol.normalise wraps negative values around boundary');
	equal(jgol.normalise(10, 1, 9), 1, 'jgol.normalise wraps positive values around boundary');
});



test('neighbours', function () {
	var localState = cloneMe(this.startState),
		numN;

	numN = jgol.neighbours(
		localState[2][2],//centre cell
		localState);

	equal(numN, 0, '0 neighbours when all cells are dead');

	localState[1][1].alive=true;
	localState[3][3].alive=true;

	numN = jgol.neighbours(
		localState[2][2],//centre cell
		localState);

	equal(numN, 2, '2 neighbours when 2 cells are alive');

});

test('neighbours:wrap', function () {
	var localState = cloneMe(this.startState),
		numN;

	localState[0][0].alive = true;
	localState[4][4].alive = true;
	localState[0][4].alive = true;
	localState[4][0].alive = true;

	numN = jgol.neighbours(
		localState[0][0],//centre cell
		localState);

	equal(numN, 3, 'jgol.neighbours detects boundary wrapped neighbours');
});



test('nextState:death', function () {
	var localState, 
		nextState;


	//dies with < 2 neighbours
	localState = cloneMe(this.startState),
	localState[2][2].alive=true;
	nextState = jgol.nextState(localState);

	equal(nextState[2][2].alive, false, 'cells die when isolated');


	// dies with > 3 neighbours
	localState = cloneMe(this.startState),
	localState[2][2].alive=true;

	localState[1][1].alive=true;
	localState[3][3].alive=true;
	localState[1][3].alive=true;
	localState[3][1].alive=true;
	nextState = jgol.nextState(localState);

	equal(nextState[2][2].alive, false, 'cells die when overpopulated');

});



test('nextState:survival', function () {
	var localState, 
		nextState;


	// cells live when they have 2 neighbours
	localState = cloneMe(this.startState);
	localState[2][2].alive=true;

	// neighbours on diagonal corners - should live
	localState[1][1].alive=true;
	localState[3][3].alive=true;

	nextState = jgol.nextState(localState);
	equal(nextState[2][2].alive, true, 'cells survive with 2 neighbours');


	// cells live when they have 3 neighbours
	localState = cloneMe(this.startState);
	localState[2][2].alive=true;

	// neighbours on diagonal corners - should live
	localState[1][1].alive=true;
	localState[1][3].alive=true;
	localState[3][3].alive=true;

	nextState = jgol.nextState(localState);
	equal(nextState[2][2].alive, true, 'cells survive with 3 neighbours');

	// cells born when appropriate number of neighbours

});


test('nextState:birth', function () {
	var localState, 
		nextState;


	// cells live when they have 2 neighbours
	localState = cloneMe(this.startState);

	// neighbours on diagonal corners - should live
	localState[1][3].alive=true;
	localState[1][1].alive=true;
	localState[3][3].alive=true;

	nextState = jgol.nextState(localState);
	equal(nextState[2][2].alive, true, 'cells born with 3 neighbours');


});
