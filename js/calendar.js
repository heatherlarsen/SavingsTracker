function Calendar(month, year) {
  	this.month = (isNaN(month) || month == null) ? currDate.getMonth() : month;
  	this.year  = (isNaN(year) || year == null) ? currDate.getFullYear() : year;
  	this.html = '';
}

Calendar.prototype.generateHTML = function(){

  	// get first day of month
  	var firstDay = new Date(this.year, this.month, 1);
  	var startingDay = firstDay.getDay();
  
  	// find number of days in month
  	var monthLength = daysInMonth(this.year, this.month);
  
  	// do the header
  	var monthName = monthLabel[this.month]
  	var html = '<table class="table  table-condensed calendar-table">';
  	html += '<tr><th colspan="7">';
  	html +=  monthName + "&nbsp;" + this.year;
  	html += '</th></tr>';
  	html += '<tr class="calendar-header">';
  	for(var i = 0; i <= 6; i++ ){
    	html += '<td class="calendar-header-day">';
    	html += daysLabel[i];
    	html += '</td>';
  	}
  	html += '</tr><tr>';

  	// fill in the days
  	var amtOfRows = Math.ceil((monthLength + startingDay) / 7);

  	var day = 1;
  	// this loop is for is weeks (rows)
  	for (var i = 0; i < amtOfRows; i++) {
    	// this loop is for weekdays (cells)
    	for (var j = 0; j <= 6; j++) { 
      		html += '<td class="calendar-day">';
      		if (day <= monthLength && (i > 0 || j >= startingDay)) {
        		html += day;
        		day++;
      		}
      		html += '</td>';
    	}
    	// stop making rows if we've run out of days
    	if (day > monthLength) {
      		break;
    	} else {
      		html += '</tr><tr>';
    	}
  	}
  	html += '</tr></table>';

  	this.html = html;
}

Calendar.prototype.getHTML = function() {
  	return this.html;
}

function daysInMonth(year, month) {
	var dd = new Date(year, month, 0);
	return dd.getDate();
}