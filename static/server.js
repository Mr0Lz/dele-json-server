const path=require('path');
const jsonServer=require('json-server');
const config=require('./config');

const host=config.HOST;
const port=config.PORT;
const db=config.DB;

const server=jsonServer.create();
//根据db.json文件自动生成路由规则
const router=jsonServer.router(path.join(__dirname,db));
//中间件
const middlewares=jsonServer.defaults();
server.use(jsonServer.bodyParser);
server.use(middlewares);
//设置增加一个响应头信息“从server到前端”
server.use((req,res,next)=>{
    res.header('X-Hello', 'World');
    next();
});

//数据发送之前包装一层
router.render = (req, res)=>{
    res.jsonp({
        code: 0,
        body: res.locals.data//res.locals.data这个是真正的数据
    })
}

server.use(router);

server.listen({
    host: host,
    port: port,
},function(){
    console.log(JSON.stringify(jsonServer));
    console.log(`JSON Server is running in http://${host}:${port}`);
});