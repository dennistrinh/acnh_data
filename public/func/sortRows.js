function sortRows(id, colNum) {
	const table = document.getElementById(id);
	const rows = table.rows;
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
