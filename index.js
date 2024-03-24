var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

var counter = 0;
var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get("/", function(req, res) {
  res.send("Hello")
})

app.get('/test/*', function(req, res) {
  res.json({ "msg": req.url.substr(6) })
});

app.get('/cpt/query', function(req, res) {
  res.json(counter)
})

app.get('/cpt/inc', function(req, res) {
  var code = 0;
  if (req.query.v == undefined) {
    counter += 1;
  }
  else if (parseInt(req.query.v)) {
    counter += parseInt(req.query.v);
  }
  else {
    code = -1;
  }
  res.json({ "code": code })

})

app.get('/msg/post/*', function(req, res) {
  allMsgs.push(req.url.substr(10));
  res.json(allMsgs.length - 1)
})

app.get('/msg/get/*', function(req, res) {
  console.log(req.url.substr(9));
  var index = parseInt(req.url.substr(9));
  if (!isNaN(index) && index < allMsgs.length) {
    res.json({ "code": 1, "msg": allMsgs[index] })
  }
  else {
    res.json({ "code": 0 })
  }
})

app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs)
})

app.get('/msg/nber', function(req, res) {
  res.json(allMsgs.length)
})

app.get('/msg/del/*', function(req, res) {
  var index = parseInt(req.url.substr(9));
  if (!isNaN(index) && index < allMsgs.length) {
    allMsgs.splice(index, 1);
    res.json({ "code": 1 })
  }
  else {
    res.json({ "code": 0 })
  }
})

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

