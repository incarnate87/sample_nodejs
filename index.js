const http=require('http');
const fs=require('fs');
const path=require('path');
const hostname='localhost';
const port=3000;
const server = http.createServer((req,res)=>{
    // console.log(req.headers); to get source of request on screen
    console.log(`Request for ${req.url} by ${req.method}`);
    if(req.method=='GET'){
      var fileURL;
      if(req.url=='/')
      fileURL='/index.html'
    else
    fileURL=req.url;
    var filePath=path.resolve('./public'+fileURL);
    const fileExt=path.extname(filePath);
    if(fileExt=='.html')
    {
      fs.exists(filePath,(exist)=>
      {
          if(!exist)
          {
              res.statusCode=404;
              res.setHeader('Content-Type','text/html');
              res.end('<html><body></body><h1>Error 404:'+fileURL+' does not exist</h1></html>');
          }
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "text/html");
                            fs.createReadStream(filePath).pipe(res);
      }
      )
    }  
    else{
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body></body><h1>Error 404:" +
          fileURL +
          " is not a html file</h1></html>"
      );
    }
}
else{
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body></body><h1>Error 404:" +
        fileURL +
        "not supported</h1></html>"
    );
}
    // res.statusCode=200; 
    // res.setHeader('Content-Type','text/html');
    // res.end('<html><body><h1>Connected to server</h1></body></html>')
});
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});