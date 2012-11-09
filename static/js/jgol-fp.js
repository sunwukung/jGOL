var jgol = (function (jgol) {

	var posInt, 
		dimension, 
		makeCells,
		scan,
		offset,
		torusOffset, 
		boundOffset;

	// PRIVATE 
	// =========================================================


	// TRANSFORMERS
	// ---------------------------------------------------------
	torusOffset = function (sum, lo, hi) {
		return sum > hi 
			? (sum - hi) - 1
			: sum < lo 
				? (hi + sum) + 1
				: sum;
	};

	boundOffset = function (sum, lo, hi) {
		return sum > hi 
			? hi 
			: sum < lo
				? lo
				: sum;
	};


	jgol.offset = function (origin, offset, boundary, bound) {
		return bound 
			? boundOffset(origin + offset, 0, boundary) 
			: torusOffset(origin + offset, 0, boundary);
	};


	jgol.delta = function (row, col, cells, bound) {
		return _.map([[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 0],[0, 1],[1, -1],[1, 0],[1, 1]
			], function (offset) {
				return [
					jgol.offset(row, offset[0], cells.length, bound), 
					jgol.offset(col, offset[1], cells[0].length, bound)
				];
			});
	};


	scan = function (row, col, cells, toroidal) {

		/*
		return _.map(delta(cells, toroidal), function (xy) {
			return cells
				.slice(row + xy[0],(row + xy[0]) + 1)[0]
				.slice(col + xy[1],(col + xy[1]) + 1)[0];
			});
*/
	};	


	// GENERATORS
	// ---------------------------------------------------------

	posInt = function (i) {
		return parseInt(i) > 0;
	}; 

	dimension = function (w, h) {
		return (posInt(w) && posInt(h)) ? w * h : false;
	};


	makeCells = function (rows, cols) {
		return _.map(_.range(rows), function(){
			return _.map(_.range(cols), function () {
				return 0;
			});
		});
	};


	


	// PUBLIC FUNCTIONS
	// =========================================================


	jgol.findLive = function (row, col, cells, bound){
		var scanned =  bound ? 
			scan(row, col, cells, false) :
			scan(row, col, cells, true);

		return _.reduce(scanned,
			function (sum, cell) {
				return sum + cell;
			}) - 1;
	};


	jgol.generate = function (cols, rows) {
		var d = dimension(cols, rows);
		return d > 0 ? makeCells(cols, rows) : false;
	};


	return jgol;


}(jgol || {}));