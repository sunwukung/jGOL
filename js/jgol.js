var jgol = (function (jgol) {

	var posInt, 
		dimension, 
		makeCells,
		scan;

	// PRIVATE 
	// =========================================================

	// TRANSFORMERS
	// ---------------------------------------------------------



	jgol.offsetBound = function (offset, lo, hi) {
		return offset > hi 
			? hi 
			: offset < lo
				? lo
				: offset;
	};

	jgol.torusLo = function (position, lo, hi) {
		return (hi - jgol.difference(position, lo)) + 1; 
	};
	
	jgol.torusHi = function (position, lo, hi) {
		return (lo + jgol.difference(position, hi)) - 1;
	};

	jgol.offsetTorus = function (position, lo, hi) {
		return jgol.between(position, lo, hi) 
			? position 
			: position < lo 
				? jgol.torusLo(position, lo, hi)
				: jgol.torusHi(position, lo, hi);
	};


	jgol.offset = function (origin, offset, boundary, bound) {
		return bound 
			? jgol.offsetBound(origin + offset, 0, boundary) 
			: jgol.offsetTorus(origin + offset, 0, boundary);
	};


	jgol.delta = function (row, col, cells, bound) {
		// iterate over the required offsets - apply them to row,col
		return _.map([[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]
			], function (offset) {
				return [
					jgol.offset(row, offset[0], cells.length - 1, bound), 
					jgol.offset(col, offset[1], cells[0].length - 1, bound)
				];
			});
	};

	// QUERY
	// ---------------------------------------------------------

	scan = function (row, col, cells, bound) {
		return _.map(
			jgol.delta(row, col, cells, bound),
			function (xy) {
				return cells
					.slice(xy[0], xy[0]+1)[0]
					.slice(xy[1], xy[1]+1)[0];
			});
	};	

	jgol.resolve = function (cell, neighbours) {
		return cell === 1 
			? jgol.between(neighbours, 2, 3)
			: neighbours === 3
	};


	jgol.findLive = function (row, col, cells, bound){
		var scanned = (bound === true)
			? scan(row, col, cells, true)
			: scan(row, col, cells, false);
		return _.reduce(scanned, function (memo, num) {
			return memo + num;
		});
	};

	jgol.evolve = function (startState, bound) {
		var row, col;
		return _.map(startState, function (currentRow) {
				row = arguments[1];
				return _.map(currentRow, function (currentCell) {
					col = arguments[1];
					return jgol.resolve(
						currentCell, 
						jgol.findLive(row, col, startState, bound)
						) ? 1 : 0;
				});
			});
	};


	// GENERATION
	// ---------------------------------------------------------

	jgol.generate = function (cols, rows) {
		var d = dimension(cols, rows);
		return d > 0 ? makeCells(cols, rows) : false;
	};

	makeCells = function (rows, cols) {
		return _.map(_.range(rows), function(){
			return _.map(_.range(cols), function () {
				return 0;
			});
		});
	};

	jgol.toDOM = function (state) {
		var frag = document.createDocumentFragment('div'),
			row,
			nRow, 
			cell, 
			cellClass;
		_.map(state, function (row) {
			nRow = arguments[1];
			row = document.createElement('div');
			row.setAttribute('class', 'row');
			_.map(state[arguments[1]], function (c) {
				cell = document.createElement('div');
				cell.setAttribute('id', nRow + '-' + arguments[1]);	
				cellClass = (c === 1) ? 'cell alive': 'cell';
				cell.setAttribute('class', cellClass);
				row.appendChild(cell);
			});
			frag.appendChild(row);
		});
		return frag;
	};


	// VALIDATORS
	// =========================================================

	posInt = function (i) {
		return parseInt(i) > 0;
	}; 

	dimension = function (w, h) {
		return (posInt(w) && posInt(h)) ? w * h : false;
	};

	jgol.between = function (position, lo, hi) {
		return lo < hi && (position >= lo && position <= hi);
	};

	jgol.difference = function (a, b) {
		return a < b 
			? b - a
			: a - b;
	}

	return jgol;


}(jgol || {}));