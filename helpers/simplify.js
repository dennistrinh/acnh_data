// This isolates the hour from the time string and assigns
// the appropriate AM/PM value based on the 24 hour time.
function simpleTime(str) {
	const spl = str.split(':', 1);
	let time = Number(spl);
	if (time > 12)
		time = (time - 12).toString() + " PM";
	else
		time = time.toString() + " AM";

	return time;
	
}

// Similar to simpleTime, this function isolates the month
// to give the user an easier to read format.
// i.e. 2020-06-01 is just June
function simpleMonth(obj) {
	const spl = JSON.stringify(obj).split('-', 2);
	switch (spl[1]) {
		case "01":
			return "January";
		case "02":
			return "February";
		case "03":
			return "March";
		case "04":
			return "April";
		case "05":
			return "May";
		case "06":
			return "June";
		case "07":
			return "July";
		case "08":
			return "August";
		case "09":
			return "September";
		case "10":
			return "October";
		case "11":
			return "November";
		case "12":
			return "December";
		default:
			return "All Year";
	}
}

// Export the function for use on SQL queries
module.exports = function(rows) {
	for (let i = 0; i < rows.length; i++) {
		// Check for first set of times
		if (rows[i].start_time_1) {
			rows[i].start_time_1 = simpleTime(rows[i].start_time_1);
			rows[i].end_time_1 = simpleTime(rows[i].end_time_1);
		}
		
		if (rows[i].start_month_1) {
			rows[i].start_month_1 = simpleMonth(rows[i].start_month_1);
			rows[i].end_month_1 = simpleMonth(rows[i].end_month_1);
		}
		// Check if bug/fish has second set of times
		if (rows[i].start_time_2) {
			rows[i].start_time_2 = simpleTime(rows[i].start_time_2);
			rows[i].end_time_2 = simpleTime(rows[i].end_time_2);
		}

		if (rows[i].start_month_2) {
			rows[i].start_month_2 = simpleMonth(rows[i].start_month_2);
			rows[i].end_month_2 = simpleMonth(rows[i].end_month_2);
		}
	}
}
