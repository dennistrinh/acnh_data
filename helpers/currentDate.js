// Appends 0's to months with one digit
// i.e. 2020-5-01 turns to 2020-05-01
function dateFormater(date) {
  return (`0${date}`).slice(-2);
}

function militaryConvert(time) {
  spl = time.split(':');
  let hour = Number(spl[0]);
  if (hour > 12) { 
    hour -= 12
    return String(hour) + ':' + spl[1] + ':' + spl[2] + ' PM';
  } else {
    return time + ' AM';
  }
}

function queryCreator(date, time) {
  const bug = 'SELECT * FROM bugs WHERE ';
  const fish = 'SELECT * FROM fish WHERE ';
  const sea = 'SELECT * FROM sea_creatures WHERE ';
  const dateQuery = '((CAST(\'' + date + '\' AS DATE) BETWEEN start_month_1 AND end_month_1) OR (CAST(\'' + date + '\' AS DATE) BETWEEN start_month_2 AND end_month_2) OR start_month_1 IS NULL) AND ';	
  // A: start <= time < end (time is between start and end times)
  // B: end < start; time <= start; time < end (covers day changes)
  // C: end < start; time >= start (covers 11 PM to midnight)
  const timeQueryA_1 = '((CAST(\'' + time + '\' AS TIME) >= start_time_1 AND CAST(\'' + time + '\' AS TIME) < end_time_1) OR ';
  const timeQueryB_1 = '(end_time_1 < start_time_1 AND CAST(\'' + time + '\' AS TIME) <= start_time_1 AND CAST(\'' + time + '\' AS TIME) < end_time_1) OR ';
  const timeQueryC_1 = '(end_time_1 < start_time_1 AND CAST(\'' + time + '\' AS TIME) >= start_time_1) OR ';
  const timeQueryA_2 = '(CAST(\'' + time + '\' AS TIME) >= start_time_2 AND CAST(\'' + time + '\' AS TIME) < end_time_2) AND ';
  const timeQueryB_2 = '(end_time_2 < start_time_2 AND CAST(\'' + time + '\' AS TIME) <= start_time_2 AND CAST(\'' + time + '\' AS TIME) < end_time_2) OR ';
  const timeQueryC_2 = '(end_time_1 < start_time_1 AND CAST(\'' + time + '\' AS TIME) >= start_time_1) OR start_time_1 IS NULL)';
  const timeQuery1 = timeQueryA_1 + timeQueryB_1 + timeQueryC_1;
  const timeQuery2 = timeQueryA_2 + timeQueryB_2 + timeQueryC_2;
  const bugQuery = bug + dateQuery + timeQuery1 + timeQuery2;
  const fishQuery = fish + dateQuery + timeQuery1 + timeQuery2;
  const seaQuery = sea + dateQuery + timeQuery1 + timeQuery2;
  const sqlQuery = bugQuery + ';' + fishQuery + ';' + seaQuery;
  return sqlQuery;
}

// Grabs the current date and formats the SQL
// query to be sent to the database
module.exports = function (timezone) {
  const date_now = Date.now();
  const date_obj = new Date(date_now);
  const day = dateFormater(date_obj.getDate());
  const month = dateFormater(date_obj.getMonth() + 1);
  const year = date_obj.getFullYear();
  let hours = dateFormater(date_obj.getHours());
  if (timezone) {
    const zone = Number(timezone);
    if (Number(hours) + zone >= 24) {
    	hours = String(Number(hours) - 24 + zone);
    } else if (Number(hours) + zone < 0) {
    	hours = String(Number(hours) + 24 + zone);
    } else {
    	hours = String(Number(hours) + zone);
    }  
  }
  hours = dateFormater(hours);
  const mins = dateFormater(date_obj.getMinutes());
  const secs = dateFormater(date_obj.getSeconds());
  const date = year + '-' + month + '-' + day;
  const time = hours + ':' + mins + ':' + secs;
  const sqlQuery = queryCreator(date, time);
  const time_adjusted = militaryConvert(time);
  return [sqlQuery, date, time_adjusted];
}
