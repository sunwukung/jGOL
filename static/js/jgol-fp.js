var jgol = (function (jgol) {

	var posInt, 
		dimension, 
		makeCells,
		toroidal, 
		bounded,
		lookUp;

	// PRIVATE FUNCTIONS
	// =========================================================


	posInt = function (i) {
		return parseInt(i) > 0;
	}; 


	dimension = function (w, h) {
		return (posInt(w) && posInt(h)) ? w * h : false;
	};
	

	lookUp = function (index, cols) {
		return [
			(index - cols) - 1,
			index - 1,
			(index + cols) - 1
		];
	};	

	collect = function (cells, lu) {
		return cells
			.slice(lu[0],lu[0] + 3)
			.concat(cells.slice(lu[1],lu[1]+1))
			.concat(cells.slice(lu[2],lu[2]+3));
	};


	makeCells = function (d) {
		return _.map(_.range(d), function(){
			return false;});
	};


	toroidal = function (index, cols, cells) {
		return collect(cells, lookUp(index, cols));	
	};


	bounded = function(index, cols, cells) {
		return collect(cells, lookUp(index, cols));
	};


	// PUBLIC FUNCTIONS
	// =========================================================


	jgol.findLive = function (index, cols, cells, bound){
		var collected =  bound ? 
			bounded(index, cols, cells) :
			toroidal(index, cols, cells);

		return _.reduce(collected,
			function (collector, c) {
				return collector + c;
			});
	};


	jgol.generate = function (cols, rows) {
		var d = dimension(cols, rows);
		return d > 0 ?
		{
			cols : cols,
			cells : makeCells(d)
		} : 
		false;
	};


	return jgol;


}(jgol || {}));