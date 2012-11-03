var display, 
	fieldData, 
	frag;

display = document.getElementById('display');

fieldData = jgol.generateField(50);

frag = jgol.generateFragment(fieldData);
display.appendChild(frag);

$(display).delegate('div.cell', 'click', function () {
	var that = $(this),
		id = that.attr('id');

	that.hasClass('alive') ? that.removeClass('alive'): that.addClass('alive');
});


