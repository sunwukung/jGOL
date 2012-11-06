module('jgol-calc', {});


test('api',function (){
	ok(q.isF(jgol.field), 'jgol.field');
	ok(q.isF(jgol.row), 'jgol.row');
	ok(q.isF(jgol.findRow), 'jgol.findRow');
});


test('field', function () {
	var f = jgol.field(3,3);
	ok(q.isA(f), 'jgol.field -> array');
	equal(f.length, 9, 'jgol.field = (w * h)');
});


test('findRow', function () {
	var f = jgol.field(3,3),
		index = 4;


});