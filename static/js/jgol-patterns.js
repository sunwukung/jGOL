var jgol = (function (jgol) {

	var rPentomino,
		bHeptomino,
		herschel,
		fHeptomino,
		piHeptomino,
		pattern = {};

	pattern.rPentomino = [
		[0, 1, 1],
		[1, 1, 0],
		[0, 1, 0]
	];	

	pattern.herschel = [
		[1, 0, 0],
		[1, 1, 1],
		[1, 0, 1],
		[0, 0, 1]
	];

	pattern.bHeptomino = [
		[1,0,0],
		[1,1,0],
		[0,1,1],
		[1,1,0]
	];

	jgol.pattern = pattern;
	return jgol;

}(jgol || {}));