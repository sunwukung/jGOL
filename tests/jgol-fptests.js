module('jgol-calc', {
	setup : function () {
		this.fixA = {
			cols : 5,
			cells : [
				0,0,0,0,0,
				0,1,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0,
				0,0,0,0,0,
			]
		};
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

	ok(q.isO(field), 'jgol.field -> object');
	equal(field.cols, 3, 'jgol.field = (w * h)');

	equal(badFieldA, false, 'gol.generate(float, int) -> false ');
	equal(badFieldB, false, 'gol.generate(string, int) -> false ');
	equal(badFieldC, false, 'gol.generate(0, int) -> false ');
});

test('findLive:toroidal', function () {
	var n = jgol.findLive(12, 5, this.fixA.cells);
	equal(n, 2, 'jgol.findLive -> sum of live adjacent cells');
});