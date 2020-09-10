module.exports = function(str, month) {
  if (str === 'bugs') {
    const sqlQuery = `
      SELECT name, start_time_1, end_time_1,
      start_time_2, end_time_2, start_month_1,
      end_month_1, start_month_2, end_month_2,
      location, price 
      FROM ${str}
      INNER JOIN ${str}_monthly_spawn
      ON ${str}.id = ${str}_monthly_spawn.id
      AND ${str}_monthly_spawn.${month} = 1;
      `;
    return sqlQuery;
  } else if (str === 'fish') {
    const sqlQuery = `
      SELECT name, start_time_1, end_time_1,
      start_time_2, end_time_2, start_month_1,
      end_month_1, start_month_2, end_month_2,
      location, price, shadow_size 
      FROM ${str}
      INNER JOIN ${str}_monthly_spawn
      ON ${str}.id = ${str}_monthly_spawn.id
      AND ${str}_monthly_spawn.${month} = 1;
      `;
    return sqlQuery;
  } else {
    const sqlQuery = `
      SELECT name, start_time_1, end_time_1,
      start_time_2, end_time_2, start_month_1,
      end_month_1, start_month_2, end_month_2,
      shadow_size, swim_speed, price 
      FROM ${str}
      INNER JOIN ${str}_monthly_spawn
      ON ${str}.id = ${str}_monthly_spawn.id
      AND ${str}_monthly_spawn.${month} = 1;
      `;
    return sqlQuery;
  }
}
