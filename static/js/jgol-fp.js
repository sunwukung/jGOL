var jgol = (function (jgol) {

	var posInt, 
		dimension, 
		makeCells,
		scan;

	// PRIVATE 
	// =========================================================

	// TRANSFORMERS
	// ---------------------------------------------------------

	jgol.between = function (position, lo, hi) {
		return lo < hi && position > lo && position < hi;
	}

	jgol.offsetTorus = function (position, lo, hi) {
		return jgol.between(position, lo, hi) 
			? position 
			: false; // now calculate
	};

	/*
	jgol.offsetTorus = function (offset, lo, hi) {
		return offset > hi 
			? offset - hi
			: offset < lo 
				? offset > 0 
					? (hi - (lo - offset)) + 1
					: hi - ((lo - offset) -1)
				: offset;
	};
	*/

	jgol.offsetBound = function (offset, lo, hi) {
		return offset > hi 
			? hi 
			: offset < lo
				? lo
				: offset;
	};


	jgol.offset = function (origin, offset, boundary, bound) {
		return bound 
			? jgol.offsetBound(origin + offset, 0, boundary) 
			: jgol.offsetTorus(origin + offset, 0, boundary);
	};


	jgol.delta = function (row, col, cells, bound) {
		return _.map([[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 0],[0, 1],[1, -1],[1, 0],[1, 1]
			], function (offset) {
				return [
					jgol.offset(row, offset[0], cells.length - 1, bound), 
					jgol.offset(col, offset[1], cells[0].length - 1, bound)
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