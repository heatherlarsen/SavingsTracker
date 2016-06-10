// GLOBAL VARIABLES
// days of week
daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// months
monthLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// current date
currDate = new Date();

$(document).ready(function() {

	// how much do you owe on a certain date?
	$('.js-single-date').on('change', function() {

		// calculate what number day of the year it is
		var dateSelected = $(this).val();
		var dayTotal = getCostOfDay(dateSelected);

		// output how much you owe on the chosen day
		var msg = "<div class='alert alert-warning fade in'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>You owe $" + dayTotal + " for " + prettyDate(dateSelected) + "</div>";
		$(msg).insertAfter('#js-single-lookup');
		
	});

	// have you missed multiple days? calculate what you owe between those days
	$('.js-calculate-multiday').on('click', function() {
		var start = $('.js-start-date').val();
		var end = $('.js-end-date').val();

		var startTotal = Number(getCostOfDay(start));
		var endTotal = Number(getCostOfDay(end));
		var dayCost = startTotal;
		var costArr = [startTotal];

		
		while (startTotal < endTotal) {
			// keep adding 0.01
			startTotal += 0.01;
			costArr.push(startTotal);
		}

		var totalCost = costArr.reduce(function(a, b) {
			return a + b;
		});

		var msg = "<div class='alert alert-warning fade in'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>You owe $" + totalCost.toFixed(2) + " from " + prettyDate(start) + " to " + prettyDate(end) + "</div>";
		$(msg).insertAfter('#js-multi-lookup');

	});

	// create tracking calendar -- NEED TO BE ABLE TO TRACK STILL
	var cal = new Calendar();
	cal.generateHTML();
	var calOutput = cal.getHTML();
	$('.js-calendar-output').html(calOutput);


});

function getCostOfDay(date) {
	var enteredDate = date;
	var year = enteredDate.split("-")[0];
	var month = enteredDate.split("-")[1] - 1;	// month starts counting at 0
	var day = enteredDate.split("-")[2];
	var userDate = new Date(year, month, day);
	var start = new Date(userDate.getFullYear(), 0, 0);
	var diff = userDate - start + (start.getTimezoneOffset() - userDate.getTimezoneOffset()) * 60 * 1000;
	var oneDay = 1000 * 60 * 60 * 24;
	var finalDay = Math.floor(diff / oneDay);

	// calculate how much you owe on this day
	if (finalDay >= 0 && finalDay < 100) {
		// under $1.00
		var amt = "0.";
		if (finalDay < 10) {
			amt += "0" + finalDay;
		} else {
			amt += finalDay;
		}
	} else {
		// over $1.00
		var dollarAmt = Number(finalDay.toString()[0]);
		var centAmt = Number(finalDay.toString().slice(1));
		var amt = dollarAmt + "." + centAmt;
	}

	return amt;
}

function prettyDate(date) {
	
	var year = date.split("-")[0];
	var month = date.split("-")[1] - 1;		// month starts counting at 0
	var day = date.split("-")[2];

	var newDate = monthLabel[month] + " " + day + ", " + year;

	return newDate;
}