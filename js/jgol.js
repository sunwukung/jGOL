var jgol = (function (jgol) {

	var generateCells,
		generateRows,
		generateField,
		generateFragment,
		locate,
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


	update = function (state) {
		// return next state
		var newState = [],
			boundary = state.length - 1,// array compensation
			newRow,
			nDelta = [// neighbour position delta
				{x:-1, y:-1}, {x:0, y:-1}, {x:1, y:-1},//top row
				{x:-1, y:0},{x:1, y:0},//middle row
				{x:-1, y:1}, {x:0, y:1}, {x:1, y:1},// last row
			],
			nX, nY, nLen;

		newState = _.map(state, function (row) {
			newRow = _.map(row, function (cell) {
				nLen = _.filter(nDelta, function (xy) {
					nX = normalise(cell.x, xy.x, boundary);
					nY = normalise(cell.y, xy.y, boundary);
					return state[nY][nX].alive === true;
				}).length;
				if(cell.alive) {
					if(nLen < 2 || nLen > 3) {
						cell.alive = false;
					}
				} else {
					if(nLen === 3) {
						cell.alive = true;
					}
				}
				return cell;
			});
			return newRow;
			
		});
		//cells

		return newState;
	};


	jgol.generateField = generateField;
	jgol.generateFragment = generateFragment;
	jgol.normalise = normalise;
	jgol.update = update;
	return jgol;

}(jgol || {}));