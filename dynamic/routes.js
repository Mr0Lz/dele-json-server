//路由是一层层往下 ,:变量名 左右要一致 ,使用特殊字符要转译 ?=>\\? ,每一条路径都应该以/开头
module.exports= {
    "/api/v1/*": "/$1",
}