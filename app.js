const express = require('express');
const app = express();
const path = require('path');
const port = 9000;

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './index.html'));
});

var server = app.listen(port, function() {
	console.log('Express started on localhost:' + port);
});
