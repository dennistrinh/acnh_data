function sortRows(id, colNum) {
  const table = document.getElementById(id);
  const rows = table.rows;
  const months = ["All", "January", "February", "March", "April", "May",
                  "June", "July", "August", "September", "October", "November", "December"];
  const times = ["All Day", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM",
                 "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM",
                 "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];
  let switching = true;
  let swap = true;
  let direction = "ascending";
  let count = 0;
  let i = 1;
  const header = rows[0].getElementsByTagName("th")[colNum].innerHTML;
  while (switching) {
    switching = false;
    for (i = 1; i < rows.length - 1; i++) {
      swap = false;
      const firstRow = rows[i].getElementsByTagName("td")[colNum];
      const secondRow = rows[i + 1].getElementsByTagName("td")[colNum];
      if (direction === "ascending") {
        if (header === "Price") {
          if (Number(firstRow.innerHTML) > Number(secondRow.innerHTML)) {
            swap = true;
            break;
          }
        } else if (header === "Months Available") {
          let firstMonth = JSON.stringify(firstRow.innerHTML.split(/[ -]+/)[0]).replace(/"/g, "");
          let secondMonth = JSON.stringify(secondRow.innerHTML.split(/[ -]+/)[0]).replace(/"/g, "");
          if (months.indexOf(firstMonth) > months.indexOf(secondMonth)) {
            swap = true;
            break;
          }
        } else if (header === "Time Found") {  
          let firstTime = JSON.stringify(firstRow.innerHTML
                              .split(/[-]+/)[0])
                              .replace(/"/g, "")
                              .trimStart()
                              .trimEnd();
          let secondTime = JSON.stringify(secondRow.innerHTML
                               .split(/[-]+/)[0])
                               .replace(/"/g, "")
                               .trimStart()
                               .trimEnd();
          if (times.indexOf(firstTime) > times.indexOf(secondTime)) {
            swap = true;
            break;
          }
        } else {
          if (firstRow.innerHTML.toLowerCase() > secondRow.innerHTML.toLowerCase()) {
            swap = true;
            break;
          }
        }
      } else {
        if (header === "Price") {
          if (Number(firstRow.innerHTML) < Number(secondRow.innerHTML)) {
            swap = true;
            break;
          }
        } else if (header === "Months Available") {
          let firstMonth = JSON.stringify(firstRow.innerHTML.split(/[ -]+/)[0]).replace(/"/g, "");
          let secondMonth = JSON.stringify(secondRow.innerHTML.split(/[ -]+/)[0]).replace(/"/g, "");
          if (months.indexOf(firstMonth) < months.indexOf(secondMonth)) {
            swap = true;
            break;
          }			  
        } else if (header === "Time Found") { 
          let firstTime = JSON.stringify(firstRow.innerHTML
                              .split(/[-]+/)[0])
                              .replace(/"/g, "")
                              .trimStart()
                              .trimEnd();
          let secondTime = JSON.stringify(secondRow.innerHTML
                               .split(/[-]+/)[0])
                               .replace(/"/g, "")
                               .trimStart()
                               .trimEnd();
          if (times.indexOf(firstTime) < times.indexOf(secondTime)) {
            swap = true;
            break;
          }
        } else {
          if (firstRow.innerHTML.toLowerCase() < secondRow.innerHTML.toLowerCase()) {
            swap = true;
            break;
          }
        }
      }
    }
    if (swap) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      count++;
    } else {
      if (count === 0 && direction === "ascending") {
        direction = "descending";
        switching = true;
      }
    }
  }
}
  
