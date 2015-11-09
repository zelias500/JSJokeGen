'use strict';

var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-route');
var send = require('koa-send');
var app = koa();

var jokes = [
"I tried to hire a Javascript plumber the other day. He didn't callback, but made a promise to fix the a-sink for me",

"A SQL query walks into a bar, walks up to two tables and says 'Can I join you?' ",

"Q: What's the Object-Oriented way to become wealthy? A: Inheritance",

"The bartender says 'Success, but you're not ready!' A Javascript function walks into a bar"
];

// logging middleware
app.use(function *(next){
	var start = new Date;
	yield next;
	var ms = new Date - start;
	console.log('%s %s - %s', this.method, this.url, ms);
})

// app.use(serve('node_modules'));
app.use(serve(__dirname+'/browser'));

app.use(router.get('/joke', function* (){
	var rand = Math.floor((Math.random()*jokes.length));
	this.body = jokes[rand];
}))

// app.use(router.routes());

// app.use(router.get('/', serve('.')))

// app.use(function* index() {
//   yield send(this, __dirname + '/index.html');
// });

app.listen(3000);
console.log("tell me a joke on port 3000")


// this last middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
