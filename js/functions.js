$(document).ready(function() {

	// how much do you owe on a certain date?
	$('input[type=date]').on('change', function() {

		// calculate what number day of the year it is
		var enteredDate = $('input[type=date]').val();
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
			var amt = "$0.";
			if (finalDay < 10) {
				amt += "0" + finalDay;
			} else {
				amt += finalDay;
			}
		} else {
			// over $1.00
			var dollarAmt = Number(finalDay.toString()[0]);
			var centAmt = Number(finalDay.toString().slice(1));
			var amt = "$" + dollarAmt + "." + centAmt;
		}

		// output how much you owe on the chosen day
		var msg = "You owe " + amt + " on " + enteredDate;
		$('#output').html(msg);
		
	});

	// have you missed multiple days? calculate what you owe between those days

	// calculate how much you owe at the end of a week (mon - sun)

	// create tracking calendar

});