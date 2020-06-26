// Appends 0's to months with one digit
// i.e. 2020-5-01 turns to 2020-05-01
function dateFormater(date) {
	return (`0${date}`).slice(-2);
}

// Grabs the current date and formats the SQL
// query to be sent to the database
module.exports = function () {
	const date_now = Date.now();
	const date_obj = new Date(date_now);
	const day = dateFormater(date_obj.getDate());
	const month = dateFormater(date_obj.getMonth() + 1);
	const year = date_obj.getFullYear();
	const hours = dateFormater(date_obj.getHours());
	const mins = dateFormater(date_obj.getMinutes());
	const secs = dateFormater(date_obj.getSeconds());
	const date = year + "-" + month + "-" + day;
	const time = hours + ":" + mins + ":" + secs;
	const bug = 'SELECT * FROM bugs WHERE ';
	const fish = 'SELECT * FROM fish WHERE ';
	const dateQuery = '((CAST(\'' + date + '\' AS DATE) BETWEEN start_month_1 AND end_month_1) OR (CAST(\'' + date + '\' AS DATE) BETWEEN start_month_2 AND end_month_2) OR start_month_1 IS NULL) AND ';
	const timeQueryA = '((start_time_1 >= CAST(\'' + time + '\' AS TIME) AND CAST(\'' + time + '\' AS TIME) < end_time_1) OR ';
	const timeQueryB = '(start_time_2 >= CAST(\'' + time + '\' AS TIME) AND CAST(\'' + time + '\' AS TIME) < end_time_2) OR start_time_1 IS NULL)';
	const bugQuery = bug + dateQuery + timeQueryA + timeQueryB;
	const fishQuery = fish + dateQuery + timeQueryA + timeQueryB;
	const sqlQuery = bugQuery + ';' + fishQuery;

	return [sqlQuery, date, time];

}
