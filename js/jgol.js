var jgol = (function (jgol) {

	var generateCells,
		generateRows,
		generateField,
		generateFragment,
		normalise,
		nextState,
		update;


	generateCells = function (n, y) {
		var i = 0,
			cells = [];

		while (i < n) {
			cells.push({x:i, y:y, alive:false});
			i = i+1;
		}	

		return cells;
	};


	generateRows = function (n) {
		var i = 0,
			rows = [];

		while (i < n) {
			rows.push(generateCells(n, i));
			i = i+1;
		}	

		return rows;
	};

	generateField = function (n) {
		return generateRows(n);
	};

	generateFragment = function (field) {
		var fLen = field.length,
			i = 0,
			j = 0,
			x,y,
			frag,
			rowNode,
			cellNode;

		frag = document.createDocumentFragment();

		while(i < fLen) {
			rowNode = document.createElement('div');
			rowNode.setAttribute('class', 'row');
			while ( j < field[i].length) {
				cellNode = document.createElement('div');
				x = j;
				y = i;
				cellNode.setAttribute('class', 'cell');
				cellNode.setAttribute('id', 'x' + x + '-'  + 'y' + y);
				rowNode.appendChild(cellNode);
				j = j+1;
			}
			j = 0;
			frag.appendChild(rowNode);
			i = i+1;
		}

		return frag;

	};


	normalise = function (origin, delta, boundary) {
		// subtract delta from origin and wrap boundary
		var diff = origin + delta,// 0 + -1 : -1 //
			norm = diff;

		if(diff < 0) {
			norm = (boundary + diff) + 1; // array compensation
		} else if (diff > boundary) {
			norm = diff - boundary;
		} 

		return norm;
	};


	// or the problem is here
	nextState = function (state) {
		// return next state
		var newState = [],
			boundary = state.length - 1,// array compensation
			newRow,
			newCell,
			nDelta = [// neighbour position delta
				{x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},//top row
				{x:-1, y:0},{x:1, y:0},//middle row
				{x:-1, y:1}, {x:0, y:1}, {x:1, y:1},// last row
			],
			nX, nY, nLen;

		newState = _.map(state, function (row) {
			newRow = _.map(row, function (cell) {

				// get number of alive neighbours
				nLen = _.filter(nDelta, function (xy) {
					nX = normalise(cell.x, xy.x, boundary);
					nY = normalise(cell.y, xy.y, boundary);
					return state[nY][nX].alive === true;
				}).length;

				console.log('cell mutation');
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
						// some fall through here...
						console.log('something else is happening');
					}
				}
				console.log('original');
				console.log(cell);
				console.log('new')
				console.log(newCell);
				return newCell;
			});
			return newRow;
		});

		return newState;
	};

	update = function () {

	};


	jgol.generateField    = generateField;
	jgol.generateFragment = generateFragment;
	jgol.normalise        = normalise;
	jgol.update           = update;
	jgol.nextState        = nextState;
	
	return jgol;

}(jgol || {}));