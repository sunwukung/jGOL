var jgol = (function (jgol) {


	jgol.generateCells = function (n, y) {
		var i = 0,
			cells = [];

		while (i < n) {
			cells.push({x:i, y:y, alive:false});
			i = i+1;
		}	

		return cells;
	};


	jgol.generateRows = function (n) {
		var i = 0,
			rows = [];

		while (i < n) {
			rows.push(jgol.generateCells(n, i));
			i = i+1;
		}	

		return rows;
	};


	jgol.generateField = function (n) {
		return jgol.generateRows(n);
	};


	jgol.generateFragment = function (field) {
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

	return jgol;

}(jgol || {}));