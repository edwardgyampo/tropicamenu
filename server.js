let port = process.env.PORT || 5000;
let path = require('path')
let express = require('express');
let favicon = require('serve-favicon');

let app = express();

app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use('/', express.static('public'));

app.get('/**/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`running server on port ${port}`);
});

module.exports = app;