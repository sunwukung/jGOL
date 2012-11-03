module('generate', {});

test('jgol api', function () {
	ok(q.isF(jgol.generateField), 'jgol.generateField');
	ok(q.isF(jgol.update), 'jgol.update');
});

test('generateField', function () {
	var rows = jgol.generateField(10);
	ok(q.isA(rows));
	ok(rows.length === 10);
	ok(q.isA(rows[0]));
	ok(rows[0].length === 10);
});

test('normalise', function () {
	ok(q.isF(jgol.normalise), 'jgol.normalise');
	equal(jgol.normalise(1, -1, 10), 0, 'jgol.normalise adjusts arg1 value by arg2');
	equal(jgol.normalise(0, -1, 10), 10, 'jgol.normalise wraps negative values around boundary');
	equal(jgol.normalise(10, 1, 10), 1, 'jgol.normalise wraps positive values around boundary');
});
