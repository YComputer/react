var http = require('http');
var url =require('url')
var path = require('path')
var fs = require('fs')

var mimeTypes = {
    "html" : "text/html",
    "jpeg" : "text/jpeg",
    "jpg" : "text/jpeg",
    "png" : "text/png",
    "js" : "text/javascript",
    "css" : "text/css"
}

http.createServer(function(req, res){
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('Loading'+uri);
    var stats;
    console.log(fileName);
    try{
        stats = fs.lstatSync(fileName);
    } catch (e) {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
        res.writeHead(200,{'Content-type': mimeType});
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);// 这里不用调用end()方法吗？还是说流当中已经做了对应处理。
        
    }else if(stats.isDirectory()){
        console.log('我要到index啦');
        res.writeHead(302, {
            'Location': 'index.html'
        });
        res.end();
    }else{
        res.writeHead(500, {'Content-type': 'text/plain'})
        res.write('500 Internal Error\n');
        res.end();
    }
}).listen(3000);