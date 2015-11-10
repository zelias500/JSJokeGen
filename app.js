'use strict';

var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-route');
var bodyParser = require('koa-body-parser');
var app = koa();


// this is the 'database'
// actual database coming in next version
var jokes = [
"I tried to hire a Javascript plumber the other day. He didn't callback, but made a promise to fix a-sink for me",

"A SQL query walks into a bar, walks up to two tables and says 'Can I join you?' ",

"Q: What's the Object-Oriented way to become wealthy? A: Inheritance",

"The bartender says 'Success, but you're not ready!' A Javascript function walks into a bar",
"If you're happy and you know it, syntax error",
' typeof ["hip", "hip"]  ',
"To understand what recursion is, you must first understand recursion",
"Q: How do you comfort a Javascript bug? A: You console it"
];

// body parser
app.use(bodyParser());

// logging middleware
app.use(function *(next){
	var start = new Date;
	yield next;
	var ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
})

app.use(serve(__dirname+'/browser'));

app.use(router.get('/joke', function* (){
	var rand = Math.floor((Math.random()*jokes.length));
	this.body = jokes[rand];
}))

app.use(router.post('/joke', function* () {
	jokes.push(this.request.body.joke);
	this.body = this.request.body.joke;
}))

app.listen(3000);
console.log("tell me a joke on port 3000")