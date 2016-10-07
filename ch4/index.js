var fs = require('fs');
function readFile1(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,(err,data)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(data.toString());
            }
        })
    })
}
function readFile2(filepath){
    return new Promise(function(resolve,reject){
        var chunks = [];
        var size = 0;
        var rs = fs.createReadStream(filepath);
        rs.on('data',function(chunk){
            chunks.push(chunk);
            size+= chunk.length;
        });
        rs.on('end',function(){
            var buf = Buffer.concat(chunks,size);
            var str = buf.toString();
            resolve(str);
        });
        rs.on('error',function(err){
            reject(err);
        })
    })
}
//处理二进制数据 todo
module.exports={
    readFile1,
    readFile2
};