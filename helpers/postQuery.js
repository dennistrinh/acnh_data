module.exports = function(str, date) {
  const select = 'SELECT * FROM ';
  const newQuery = select + str + ' WHERE ' + '(start_month_1=\"2020' + date + ' \" OR start_month_2=\"2020' + date + ' \")';
  const sqlBuildA = '((CAST(\'2020' + date + '\' AS DATE) BETWEEN start_month_1 AND end_month_1) OR ';
  const sqlBuildB = '(CAST(\'2020' + date + '\' AS DATE) BETWEEN start_month_2 AND end_month_2) OR ';
  const sqlBuildC = '(CAST(\'2021' + date + '\' AS DATE) BETWEEN start_month_1 AND end_month_1) OR ';
  const sqlBuildD = '(CAST(\'2021' + date + '\' AS DATE) BETWEEN start_month_2 AND end_month_2) OR start_month_1 IS NULL);';
  const oldQuery = select + str + ' WHERE ' + sqlBuildA + sqlBuildB + sqlBuildC + sqlBuildD;
  const sqlQuery = newQuery + ';' + oldQuery;
  return sqlQuery;
}
