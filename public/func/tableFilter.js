function tableFilter(id) {
  const table = document.getElementById(id);
  const rows = table.rows;
  let input = document.getElementById("userInput").value.toLowerCase();
  let select = document.getElementById("option").value;
  for (let i = 1; i < rows.length; i++) {
    td = rows[i].getElementsByTagName("td")[select];
    if (td) {
      text = td.innerText.toLowerCase();
      if (text.indexOf(input) >= 0) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    } 
  }
}
