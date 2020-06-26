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

// Export the function for use on SQL queries
module.exports = function(rows) {
	for (let i = 0; i < rows.length; i++) {
		// Check for first set of times
		if (rows[i].start_time_1) {
			rows[i].start_time_1 = simpleTime(rows[i].start_time_1);
			rows[i].end_time_1 = simpleTime(rows[i].end_time_1);
		}
		
		// Check if bug/fish has second set of times
		if (rows[i].start_time_2) {
			rows[i].start_time_2 = simpleTime(rows[i].start_time_2);
			rows[i].end_time_2 = simpleTime(rows[i].end_time_2);
		}
	}
}
