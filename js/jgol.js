var jgol = (function (jgol) {

	var generateCells,
		generateRows,
		generateField,
		generateFragment,
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
				x = j+1;
				y = i+1;
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

	update = function () {

	};


	jgol.generateField = generateField;
	jgol.generateFragment = generateFragment;
	jgol.update = update;
	return jgol;

}(jgol || {}));