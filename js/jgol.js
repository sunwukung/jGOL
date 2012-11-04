var jgol = (function (jgol) {


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


	jgol.neighbours = function (cell, state) {
		// establish number of living neighbours
		var nDelta = [// neighbour position delta
				{x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},//top row
				{x:-1, y:0},{x:1, y:0},//middle row
				{x:-1, y:1}, {x:0, y:1}, {x:1, y:1},// last row
			],
			boundary = state.length - 1,// array compensation
			nX, nY;
		
		return _.filter(nDelta, function (xy) {
			nX = jgol.normalise(cell.x, xy.x, boundary);
			nY = jgol.normalise(cell.y, xy.y, boundary);
			return state[nY][nX].alive === true;
			}).length;
	};

	jgol.nextState = function (state) {
		// return next state
		var newState = [],			
			newRow,
			newCell,
			nLen;

		newState = _.map(state, function (row) {
			newRow = _.map(row, function (cell) {

				nLen = jgol.neighbours(cell, state);
				console.log(nLen);

				newCell = {
					x : cell.x,
					y : cell.y
				};

				if(cell.alive) {
					console.log('dying');
					if(nLen < 2 || nLen > 3) {
						newCell.alive = false;
					}
				} else {
					console.log('living');
					if(nLen === 3) {
						newCell.alive = true;
					} else {
						// some are falling through here...
						console.log('something else is happening');
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