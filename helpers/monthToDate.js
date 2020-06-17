module.exports = function(str) {
	switch(str) {
		case 'January':
			return "-01-01";
		case 'February':
			return "-02-01";
		case 'March':
			return "-03-01";
		case 'April':
			return "-04-01";
		case 'May':
			return "-05-01";
		case 'June':
			return "-06-01";
		case 'July':
			return "-07-01";
		case 'August':
			return "-08-01";
		case 'September':
			return "-09-01";
		case 'October':
			return "-10-01";
		case 'November':
			return "-11-01";
		case 'December':
			return "-12-01";
		default:
			console.log("Invalid Month");
			break;
	}
}
