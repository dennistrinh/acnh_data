module.exports = function(str) {
	const spl = str.split(':', 1);
	let time = Number(spl);
	if (time > 12)
		time = (time - 12).toString() + " PM";
	else
		time = time.toString() + " AM";

	return time;
	
}
