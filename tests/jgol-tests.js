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

/*
test('update', function () {
})
*/