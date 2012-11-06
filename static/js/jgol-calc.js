var jgol = (function (jgol) {


	jgol.field = function (w, h) {
		var length = w * h,
			field = [];
		while (length) {
			field.push(0);
			length--;
		}
		return field
	};


	jgol.numRows = function (length, width) {
		return length / width;
	}


	jgol.row = function (a, fn, w) {
    	// apply query to row
        var result = false, i=0, len;
        if(q.isA(a) && q.isF(fn) && q.isN(w)){
            len = a.length;
            //ensure the chunk is compatible with the list size
            if(len % w === 0){
                //loop the array
                result = [];
                while(i < len){
                    result.push(fn(a.slice(i, i+n)));
                    i = i+n;
                }
            }
        }
        return result;
	};


	jgol.findRow = function (index, field, width) {
	 	var fieldLength = field.length,
	 		numRows = jgol.numRows(fieldLength, width),
	 		rowStart = fieldLength - width;

	 	if (index < fieldLength) {
	 		// start counting down
	 		while (numRows) {
	 			if (index > rowStart) {
	 				return field.slice(rowStart, width);
	 			}
	 			numRows--;
	 		}
	 	} 
	 	return false;
	};


	return jgol;

}(jgol || {}));