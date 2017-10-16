const express = require('express') ;
const app = express() ;
const port = 8080;
const fs = require('fs');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
var $ = cheerio.load("file.htm");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var testFolder = "./../webcat/page";
app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
 app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/intializePageInfoDb', function (req, res) {
	 fs.writeFile("./../webcat/db/pagesInfo.js", "var pagesInfo = [];", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("The data was removed!");
    })
})

app.post('/intializeCatalogInfoDb', function (req, res) {
	var catalogNumber  = req.body.catalogNumber ;
	 fs.writeFile("./../webcat/db/"+catalogNumber+"Info.js", "var linksInfo = [];", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("The data was removed!");
    })
})

app.get('/getFilesName3', function (req, res) {
    var path = "./../webcat/page";
    fs.readdir(path, function(err, files){
        if (err) return;
        var arrayOfFileName = [];
        files.forEach(function(fileName) {
            var src = fileName.search(".htm");
            var src1 = fileName.search(".html");
            if (src!=-1 || src1!=-1){
                arrayOfFileName.push(fileName)
            }
        });
        res.send(arrayOfFileName);
    });
});

app.post('/postFilesName1', function (req, res) {
    var fileName = req.body.fileName;
    var pathPrefix = "./../webcat/page/";
    var path = pathPrefix+fileName;
            fs.readFile(path, function(err, files){
                if (err) return;
                $ = cheerio.load(files.toString());
                var title = $('#title').text();
                var bom1 = $('.bom1 td').text();
                var obj = {title:title,link:fileName,bom1:bom1};
                var dbPath = "./../webcat/db/pagesInfo.js";
                fs.readFile(dbPath,'utf8', function(err, files1){
                    if (err) return;
                    var db = files1;
                    db = db.slice(16,db.length-1);
                    db = JSON.parse(db);
                    db.push(obj);
                    db = JSON.stringify(db);
                    fs.writeFile(dbPath, "var pagesInfo = "+db +";", function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        res.send("The data was saved!");
                    });
                });
        });
});

 app.post('/getCatalogFilesName4', function (req, res) {
	var catalogNumber  = req.body.catalogNumber ;
    var partsCatalog  = req.body.partsCatalog ;
    var path ="./../webcat/"+ catalogNumber+"/"+ partsCatalog;
    fs.readdir(path, function(err, files){
        if (err) return;
        var arrayOfFileName = [];
        files.forEach(function(fileName) {
            var src = fileName.search(".htm");
            var src1 = fileName.search(".html");

            if (fileName != "home.htm" &&(src!=-1 || src1!=-1)){
                arrayOfFileName.push(fileName)
            }
			else if(fileName == "home.htm"){
				var com = path +"/"+ fileName
                fs.readFile(com, 'utf8', function (err,dataArray1) {
                    if (err) {
                        return console.log(err);
                    }
                    var bodyPosition1 = dataArray1.search("</body>");
                    var untilBody1 = dataArray1.slice(0, bodyPosition1);
                    var bodyAndNext1 = dataArray1.slice(bodyPosition1);
                    var scriptHomeAdd0 = "<script src=\"./../../db/pagesInfo.js\"></script>";
                    var scriptHomeAdd1 = "<script src=\"./../../db/"+catalogNumber +"info.js\"></script>";
                    var scriptHomeAdd3 = "<script src=\"./../../Script/hpSearch.js\"></script>";
                    var check0 = dataArray1.search(scriptHomeAdd0);
                    var check1 = dataArray1.search(scriptHomeAdd1);
                    var check3 = dataArray1.search(scriptHomeAdd3);
                    var allScript="";
                    if(check0==-1) {
                        allScript += scriptHomeAdd0;
                    }
                    if(check1==-1) {
                        allScript += "\n"+scriptHomeAdd1;
                    }
                    if(check3==-1){
                        allScript+= "\n"+scriptHomeAdd3;
                    }
                    if(allScript!=""){
                        fs.writeFile(com, untilBody1 +allScript+"\n" + bodyAndNext1, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }
                });
            }
        });
        res.send(arrayOfFileName);
    });
}); 

app.post('/createCatalog', function (req, res) {
    var catalogNumber  = req.body.catalogNumber;
    var partsCatalog  = req.body.partsCatalog;
    var fileName  = req.body.fileName;
    var path = "./../webcat/"+catalogNumber+"/"+partsCatalog+"/"+fileName;
    fs.readFile(path, function(err, files){
        if (err) return;
        $ = cheerio.load(files.toString());
        var title1 = $("a").toArray().map(function(x){
                   return $(x).text();
            });
        var array2 = [];
        for(var i =0; i<title1.length;i++){
            if(title1[i].split(" ")[0]!="HOME" && title1[i].split(" ")[0]!="home")
            array2.push("../../page/"+title1[i].split(" ")[0]+".htm");
        }
        var dbPath = "./../webcat/db/"+catalogNumber+"Info.js";
        fs.readFile(dbPath,'utf8', function(err, files1){
            if (err) return;
            var db = files1;
            db = db.slice(16,db.length-1);
            db = JSON.parse(db);
            db = db.concat(array2);
            db = JSON.stringify(db);
            fs.writeFile(dbPath, "var linksInfo = "+db +";", function(err) {
                if(err) {
                    return console.log(err);
                }
                res.send("The data was saved!");
            });
        })
    })
});





