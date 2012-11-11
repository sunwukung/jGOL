module('jgol', {
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


test('difference', function () {
	var a = jgol.difference(10, 20),
		b = jgol.difference(0, 10),
		c = jgol.difference(-5, 5),
		d = jgol.difference(-5, -10);

	equal(a, 10,'10 ~ 20  = 10');
	equal(b, 10,' 0 ~ 10  = 10');
	equal(c, 10,'-5 ~ 5   = 10');
	equal(d, 5, '-5 ~ -10 = 5');
});

test('torusLo', function () {
	var a = jgol.torusLo(4, 5, 10),
		b = jgol.torusLo(0, 5, 10),
		c = jgol.torusLo(-1, 5, 10),
		d = jgol.torusLo(-6, -5, -10);

	equal(a, 10, ' 4 -> 5:10   = 10');
	equal(b, 6,  ' 0 -> 5:10   = 6');
	equal(c, 5,  '-1 -> 5:10   = 5');
	equal(d, -10,'-6 -> -5:-10 = -10');
});

test('torusHi', function () {
	var a = jgol.torusHi(6, 1, 5),
		b = jgol.torusHi(0, 1, 10),
		c = jgol.torusHi(-11, -5, -10);

	equal(a, 1, ' 6  -> 1:5  = 1');
	equal(b, 10,' 0  -> 1:10 = 10');
	equal(c, -5,'-11 -> -5:-10 = -5');
});

// to refactor 
test('offsetTorus', function () {
	var a = jgol.offsetTorus(2, 1, 3),
		b = jgol.offsetTorus(-1, -2, 0),
		c = jgol.offsetTorus(5, 10, 20);

	equal(a, 2,  '2  -> 1:3  = 2');
	equal(b, -1, '-1 -> -1:0 = -1');
	equal(c, 16, '5  -> 10:20 = 16');
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
			[2,1],[2,3],
			[3,1],[3,2],[3,3]
		];
	deepEqual(delta, exp, 'delta');
});

test('delta:torus', function () {
	var delta = jgol.delta(0, 0, this.fixA);
	ok(true);	
		exp = [
			[4,4],[4,0],[4,1],
			[0,4],[0,1],
			[1,4],[1,0],[1,1]
		];
	deepEqual(delta, exp, 'delta');
});

test('delta:bound', function () {
	var delta = jgol.delta(0, 0, this.fixA, true),
		exp = [
			[0,0],[0,0],[0,1],
			[0,0],[0,1],
			[1,0],[1,0],[1,1]
		];
	deepEqual(delta, exp, 'delta used bound');
});

test('findLive:toroidal', function () {
	var a = jgol.findLive(2, 2, this.fixA),
		b = jgol.findLive(0, 0, this.fixA),
		c = jgol.findLive(2, 4, this.fixA);
	equal(a, 2, 'jgol.findLive -> sum of live adjacent cells');
	equal(b, 1, 'jgol.findLive -> sum of live adjacent cells');
	equal(c, 1, 'jgol.findLive -> sum of live adjacent cells');

});

test('resolve:survival', function () {
	var a = jgol.resolve(1,1),
		b = jgol.resolve(1,2),
		c = jgol.resolve(1,3),
		d = jgol.resolve(1,4);

	equal(a, false,'live with less than 2 dies');
	equal(b, true, 'live with 2 neighbours survives');
	equal(c, true, 'live with 3 neighbours survives');
	equal(d, false,'live with more than 3 dies');
});

test('resolve:birth', function () {
	var a = jgol.resolve(0,2),
		b = jgol.resolve(0,3),
		c = jgol.resolve(0,4);

	equal(a, false, 'dead with less than 3 stays dead');
	equal(b, true, 'dead with 3 is birthed');
	equal(c, false, 'dead with more than 3 stays dead');

});

test('evolve', function () {
	var evolved = jgol.evolve(this.fixA),
		expected = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,1,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
		];

	deepEqual(evolved, expected);

});
/*
*/
