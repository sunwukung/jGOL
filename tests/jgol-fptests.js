module('jgol-calc', {
	setup : function () {
		this.fixA = [
				[0,0,0,0,0],
				[0,1,0,0,0],
				[0,0,1,0,0],
				[0,0,0,1,0],
				[0,0,0,0,0],
			]
	}
});


test('api',function () {
	ok(q.isF(jgol.generate), 'jgol.generate');
	ok(q.isF(jgol.findLive), 'jgol.findLive');
});


test('generate', function () {
	var field = jgol.generate(3, 3),
		badFieldA = jgol.generate(0.5, 1),
		badFieldB = jgol.generate('foo', 1),
		badFieldC = jgol.generate(0, 1);

	ok(q.isA(field), 'jgol.field -> array');
	equal(field.length, 3, 'jgol.field rows === w');
	equal(field[0].length, 3, 'jgol.field cols === h');

	equal(badFieldA, false, 'gol.generate(float, int) -> false ');
	equal(badFieldB, false, 'gol.generate(string, int) -> false ');
	equal(badFieldC, false, 'gol.generate(0, int) -> false ');
});

test('offset:torus', function () {
	var torusA = jgol.offset(0, -1, 4),
		torusB = jgol.offset(4, 1, 4);

	equal(torusA, 4, '0 - 1 -> 4');
	equal(torusB, 0, '4 + 1 -> 0');
});


test('offset:bound', function () {
	var boundA = jgol.offset(0, -1, 4, true),
		boundB = jgol.offset(4, 1, 4, true);

	equal(boundA, 0, '0 - 1 -> 0');
	equal(boundB, 4, '4 + 1 -> 4');
});

test('delta', function () {
	var delta = jgol.delta(2, 2, this.fixA),
		exp = [
			[1,1],[1,2],[1,3],
			[2,1],[2,2],[2,3],
			[3,1],[3,2],[3,3]
		];
	deepEqual(delta, exp, 'delta');
});

test('delta:torus', function () {
	var delta = jgol.delta(0, 0, this.fixA),
		exp = [
			[4,4],[4,0],[4,1],
			[0,4],[0,0],[0,1],
			[1,4],[1,0],[1,1]
		];
		console.log(delta);
	deepEqual(delta, exp, 'delta');
});

test('delta:bound', function () {
	var delta = jgol.delta(0, 0, this.fixA, true),
		exp = [
			[0,0],[0,0],[0,1],
			[0,0],[0,0],[0,1],
			[1,0],[1,0],[1,1]
		];
	deepEqual(delta, exp, 'delta used bound');
});



/*
test('findLive:toroidal', function () {
	var a = jgol.findLive(2, 2, this.fixA),
		b = jgol.findLive(0, 0, this.fixA);
	equal(n, 1, 'jgol.findLive -> sum of live adjacent cells');
});
*/
