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

test('between', function () {
	var a = jgol.between(2, 1, 3),
		b = jgol.between(-1, -2, 0),
		c = jgol.between(1, 2, 3),
		d = jgol.between(1, 3, 2);

	equal(a, true,  '1 < 2 > 3 = true');
	equal(b, true,  '-2 < -1 > 0 = true');
	equal(c, false, '2 < 1 > 3 = false');
	equal(d, false, '3 < 1 > 2 = false');
});

// to refactor 
test('offsetTorus', function () {
	var a = jgol.offsetTorus(2, 1, 3),
		b = jgol.offsetTorus(-1, -2, 0),
		c = jgol.offsetTorus(5, 10, 20);

	equal(a, 2,  '1 < 2 > 3 = 2');
	equal(b, -1,  '-2 < -1 > 0 = -1');
	equal(c, 15, '5 : 10-20 = 15');
	//equal(c, 15, '5 : 10-20 = 15');
	//equal(c, 15, '5 : 10-20 = 15');
	//equal(c, 15, '5 : 10-20 = 15');
});



/*

test('offsetTorus', function () {
	var torusA = jgol.offsetTorus(-1, 0, 4),
		torusB = jgol.offsetTorus(4, 5, 10),
		torusC = jgol.offsetTorus(5, 1, 4),
		torusD = jgol.offsetTorus(7, 1, 4),
		torusE = jgol.offsetTorus(0, 1, 4);


    equal(torusA, 4,  'range 0-4, offset: -1 = 4');
	equal(torusB, 10, 'range 5-10, offset: 4(-1 rel 5) = 10');
	equal(torusC, 1,  'range 1-4, offset: 5(+1 rel 4) = 1');
	equal(torusD, 3, 'range 1-4, offset: 7(+3 rel 4) = 3');
	equal(torusE, 4, 'range 1-4, offset: 0(-1 rel 1) = 4');
});

test('offsetBound', function () {
	var boundA = jgol.offset(0, -1, 4, true),
		boundB = jgol.offset(4, 1, 4, true);

	equal(boundA, 0, '0 - 1 -> 0');
	equal(boundB, 4, '4 + 1 -> 4');
});

test('delta:standard', function () {
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

/*
test('findLive:toroidal', function () {
	var a = jgol.findLive(2, 2, this.fixA),
		b = jgol.findLive(0, 0, this.fixA);
	equal(n, 1, 'jgol.findLive -> sum of live adjacent cells');
});
*/
