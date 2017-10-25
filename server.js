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
	 fs.writeFile("./../webcat/shared/db/pagesInfo.js", "var pagesInfo = [];", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("The data was removed!");
    })
})

app.post('/intializeCatalogInfoDb', function (req, res) {
	var catalogNumber  = req.body.catalogNumber ;
	 fs.writeFile("./../webcat/shared/db/"+catalogNumber+"Info.js", "var linksInfo = [];", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("The data was removed!");
    })
})

app.post('/intializeSharedInfoDb', function (req, res) {
	 fs.writeFile("./../webcat/shared/db/sharedInfo.js", "var sharedInfo = [];", function(err) {
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
		if(arrayOfFileName.length==0){
			res.send("there is no files!")
		}
		else{
			res.send(arrayOfFileName);
		}
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
				var imageArray  =[];
				$("img").each(function (index, element) {
        imageArray.push($(element).attr("src"));
				})
                var obj = {title:title,link:fileName,bom1:bom1,image :imageArray };
                var dbPath = "./../webcat/shared/db/pagesInfo.js";
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
				
				
				
				
				
		 fs.readFile(path, 'utf8', function (err,dataArray1) {
                    if (err) {
                        return console.log(err);
                    }
				var bodyPosition1 = dataArray1.search("</body>");
                    var untilBody1 = dataArray1.slice(0, bodyPosition1);
                    var bodyAndNext1 = dataArray1.slice(bodyPosition1);
                    var scriptHomeAdd0 = "<script src='../shared/Script/highlight.js'></script>";
                    var check0 = dataArray1.search(scriptHomeAdd0);
                    var allScript="";
                    if(check0==-1) {
                        allScript += scriptHomeAdd0;
                    }
                    if(allScript!=""){
                        fs.writeFile(path, untilBody1 +allScript+"\n" + bodyAndNext1, function (err) {			
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }
				}) 			
       });
});

 app.post('/getCatalogFilesName4', function (req, res) {
	var catalogNumber  = req.body.catalogNumber ;
    var partsCatalog  = req.body.partsCatalog ;
    var path ="./../webcat/"+ partsCatalog;
    fs.readdir(path, function(err, files){
		if(typeof(files)=="undefined"){
			res.send("the folder is not exist!")
			return 
		}
        if (err) return;
        var arrayOfFileName = [];
        files.forEach(function(fileName) {
            var src = fileName.search(".htm");
            var src1 = fileName.search(".html");
            if ( src!=-1 || src1!=-1){
                arrayOfFileName.push(fileName)
            }
			 if(fileName == "home.htm"){
				var com = path +"/"+ fileName
                fs.readFile(com, 'utf8', function (err,dataArray1) {
                    if (err) {
                        return console.log(err);
                    }
                    var bodyPosition1 = dataArray1.search("</body>");
                    var untilBody1 = dataArray1.slice(0, bodyPosition1);
                    var bodyAndNext1 = dataArray1.slice(bodyPosition1);
                    var scriptHomeAdd0 = "<script src=\"./../shared/db/pagesInfo.js\"></script>";
                    var scriptHomeAdd1 = "<script src=\"./../shared/db/"+catalogNumber +"info.js\"></script>";
                    var scriptHomeAdd2 = "<script src=\"./../shared/db/sharedInfo.js\"></script>";
                    var scriptHomeAdd3 = "<script src=\"./../shared/Script/hpSearch.js\"></script>";
                    var check0 = dataArray1.search(scriptHomeAdd0);
                    var check1 = dataArray1.search(scriptHomeAdd1);
                    var check2 = dataArray1.search(scriptHomeAdd2);
                    var check3 = dataArray1.search(scriptHomeAdd3);
                    var allScript="";
                    if(check0==-1) {
                        allScript += scriptHomeAdd0;
                    }
                    if(check1==-1) {
                        allScript += "\n"+scriptHomeAdd1;
                    }
			 if(check2==-1) {
                        allScript += "\n"+scriptHomeAdd2;
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
		if(arrayOfFileName.length==0){
			res.send("there is no files in catalog "+catalogNumber+"!")
		}
		else{
			res.send(arrayOfFileName);
		}
    });
}); 

app.post('/createCatalog', function (req, res) {
    var catalogNumber  = req.body.catalogNumber;
    var partsCatalog  = req.body.partsCatalog;
    var fileName  = req.body.fileName;
    var path = "./../webcat/"+partsCatalog+"/"+fileName;
    fs.readFile(path, function(err, files){
        if (err) return;
        $ = cheerio.load(files.toString());
		var aArray1  =[];
				$("a").each(function (index, element) {
				aArray1.push($(element).attr("href"));
				})
		var aArray = [];
		for(var i =0; i<aArray1.length;i++){
            if(aArray1[i]!="HOME.htm" && aArray1[i]!="home.htm"){
            aArray.push(aArray1[i]);
		  }
          } 
        var dbPath = "./../webcat/shared/db/"+catalogNumber+"Info.js";
        fs.readFile(dbPath,'utf8', function(err, files1){
            if (err) return;
            var db = files1;
            db = db.slice(16,db.length-1);
            db = JSON.parse(db);
            db = db.concat(aArray);
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

app.get('/getSharedFilesName', function (req, res) {
    var path = "./../webcat/shared";
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
		if(arrayOfFileName.length==0){
			res.send("there is no files!")
		}
		else{
			res.send(arrayOfFileName);
		}
    });
});
//createSharedDb
app.post('/createSharedDb', function (req, res) {
    var fileName  = req.body.fileName;
    var path = "./../webcat/shared/"+fileName;
    fs.readFile(path, function(err, files){
        if (err) return;
        $ = cheerio.load(files.toString());
		var aArray1  =[];
				$("a").each(function (index, element) {
				aArray1.push($(element).attr("href"));
				})

        var dbPath = "./../webcat/shared/db/sharedInfo.js";
        fs.readFile(dbPath,'utf8', function(err, files1){
            if (err) return;
            var db = files1;
		var sliceFileName = fileName.slice(0,fileName.length-4)
		var objForShared ={};
		        objForShared.filename =  sliceFileName;
			  objForShared.links = aArray1;
            db = db.slice(17,db.length-1);
            db = JSON.parse(db);
		db.push(objForShared);
            db = JSON.stringify(db);
			
            fs.writeFile(dbPath, "var sharedInfo = "+db +";", function(err) {
                if(err) {
                    return console.log(err);
                }
                res.send("The data was saved!");
            });
        })
    })
});


