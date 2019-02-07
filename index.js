var express = require('express'),
    app     = express(),
    bodyParser = require('body-parser');
    
var todoRoutes = require('./routes/todos')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname +'/public'));

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, process.env.IP, function () {
    console.log(`The server has started successfully at Port: ${PORT}`);
});