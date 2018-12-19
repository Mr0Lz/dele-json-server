const path = require('path');
const config = require('./config');
const jsonServer = require('json-server');
const rules = require('./routes');
const dbfile = require("./"+config.DB);

const host = config.HOST;
const port = config.PORT;

const server = jsonServer.create();
const router = jsonServer.router(dbfile());
const middlewares = jsonServer.defaults();

//console.log(dbfile())
//console.log(rules);

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
 res.header('X-Hello', 'World');
 next();
})

router.render = (req, res) => {
    res.jsonp({
        code: 0,
        body: res.locals.data
    })
}

server.use(jsonServer.rewriter(rules));
server.use(router);

server.listen({
    host: host,
    port: port,
}, function() {
    console.log(JSON.stringify(jsonServer));
    console.log(`JSON Server is running in http://${host}:${port}`);
});
