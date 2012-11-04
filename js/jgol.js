var jgol = (function (jgol) {

	var logging = false,
		jlog = function (msg) {
			if (logging) {
				console.log(msg);
			}
		},
		nDelta = [// neighbour position delta
			{x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},//top row
			{x:-1, y:0},{x:1, y:0},//middle row
			{x:-1, y:1}, {x:0, y:1}, {x:1, y:1},// last row
		];

	jgol.normalise = function (origin, delta, boundary) {
		// calculate position @delta relative to origin
		// enforce boundary wrapping
		var diff = origin + delta,
			norm = diff;

		if(diff < 0) {
			norm = (boundary + diff) + 1; // array compensation
		} else if (diff > boundary) {
			norm = diff - boundary;
		} 
		return norm;
	};

	jgol.getNeighbours = function (cell, state) {
		var boundary = state.length - 1,// array compensation
			nX, nY;
		
		return _.map(nDelta, function (xy) {
			nX = jgol.normalise(cell.x, xy.x, boundary);
			nY = jgol.normalise(cell.y, xy.y, boundary);
			return state[nY][nX];
			});
	};


	jgol.neighbours = function (cell, state) {
		// establish number of living neighbours
		var boundary = state.length - 1,// array compensation
			nX, nY;
		
		return _.filter(nDelta, function (xy) {
			nX = jgol.normalise(cell.x, xy.x, boundary);
			nY = jgol.normalise(cell.y, xy.y, boundary);
			return state[nY][nX].alive === true;
			}).length;
	};

	jgol.nextState = function (state) {
		// return nextState state
		var newState = [],			
			newRow,
			newCell,
			nLen;

		newState = _.map(state, function (row) {
			newRow = _.map(row, function (cell) {

				nLen = jgol.neighbours(cell, state);

				newCell = {
					x : cell.x,
					y : cell.y,
					alive : false
				};

				if(cell.alive) {
					// LIVING CELLS
					jlog('this cell is alive');
					jlog('cell @ x' + cell.x +  ':y' + cell.y + ' has ' + nLen + ' neighbours');
					if(nLen < 2 || nLen > 3) {
						jlog('this cell must die');
						newCell.alive = false;
					} else {
						newCell.alive = true;
						jlog('this cell will survive');
					}

				} else {
					// DEAD CELLS
					jlog('this cell is dead');
					if(nLen === 3) {
						newCell.alive = true;
					} else {
						// some are falling through here...
						newCell.alive = false;
						jlog('cell remains dead');
					}
				}

				return newCell;
			});
			return newRow;
		});
		return newState;
	};

	
	return jgol;

}(jgol || {}));