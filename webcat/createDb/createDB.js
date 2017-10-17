
function intializePageInfoDb(createDb){
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	var loadingMas = document.getElementById("loading");
	loadingMas.innerHTML = "";
	createDb();
    }
  };
  xhttp.open("POST", "http://localhost:8080/intializePageInfoDb", true);
  xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
}
 
 function getAndDo(){
	 
	var xhttp = new XMLHttpRequest();
  	      xhttp.onreadystatechange = function() {
  	  		if (this.readyState == 4 && this.status == 200) {
				if(this.responseText=="there is no files!"){
			alert("ther is no files in page folder!")
			return
		}
		  	  			var arrayOfPagesName  = this.responseText;
		intializePageInfoDb(function(){
                arrayOfPagesName  = JSON.parse(arrayOfPagesName);
				 function arrayOfPagesNameLengthState(){
						var load = arrayOfPagesName.length;
						var largeThenHundred = (arrayOfPagesName.length>=100);
						load = load-(load%100);
						var load1 =load/100;
							  return {load:load,load1:load1,largeThenHundred:largeThenHundred};
				};
				var load = arrayOfPagesNameLengthState().load;
				var load1 = arrayOfPagesNameLengthState().load1;
				var largeThenHundred =arrayOfPagesNameLengthState().largeThenHundred;
				var percent =0;
				var graf = document.getElementById("graf");
				var loading = document.getElementById("loading");
				var per = document.getElementById("per");
				var graf1 = document.getElementById("graf1");
				
				function writToFile(){
				var fileName = 	arrayOfPagesName[0];
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText=="The data was saved!"){
						arrayOfPagesName.splice(0,1);
								if(arrayOfPagesName.length<load && (arrayOfPagesName.length%load1)==0 && largeThenHundred==true){
									percent ++;
											graf1.style.background = "#ddd";
											loading.innerHTML = "loading..."
											graf.style.width = percent*2;
											per.style.marginLeft = percent*0.8;
											per.innerHTML = percent+"%";
								}
								if(arrayOfPagesName.length!=0){
									writToFile();
								}
								else{
									setTimeout(function(){
											loading.innerHTML = "page data was created!"
											graf.style.width = 0;
											graf1.style.background = "none";
											per.style.marginLeft = 0;
											per.innerHTML = "";
											},1300);
								}
							}
					}
				}
				xhttp.open("POST", "http://localhost:8080/postFilesName1", true);
				xhttp.setRequestHeader("Content-type", "application/json");
				xhttp.send(JSON.stringify({fileName:fileName}));
				}
				
			writToFile()
	})
  	  		}
  	  	
			
		};
             xhttp.open("GET", "http://localhost:8080/getFilesName3", true);
             xhttp.send();  
		 
 }
 
 
 function intializeCatalogInfoDb(catalogNumber,createDb){
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	var loadingMas = document.getElementById("loadingCatalog");
	loadingMas.innerHTML = "";
	createDb();
    }
  };
  xhttp.open("POST", "http://localhost:8080/intializeCatalogInfoDb", true);
  xhttp.setRequestHeader("Content-type", "application/json");
 xhttp.send(JSON.stringify({catalogNumber:catalogNumber}));
}
 
 function getPagesCatalogName(){
	 var catalogNumber = document.getElementById("catalogNumber").value;
	var partsCatalog = document.getElementById("partsCatalog").value;
	var checkIfNumIsNull= true;
	var checkIfCatIsNull= true;
	if(catalogNumber.length!=0){
		checkIfNumIsNull=false;
	}
	if(partsCatalog.length!=0){
		checkIfCatIsNull=false;
	}
	if(checkIfNumIsNull==false &&  checkIfCatIsNull==false){
			
	var a =JSON.stringify({catalogNumber :catalogNumber,partsCatalog :partsCatalog});
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		if(this.responseText[0]!="["){
			alert(this.responseText);
			return
		}
		var arrayOfPagesName  = JSON.parse(this.responseText);
		intializeCatalogInfoDb(catalogNumber,function(){

	  			   
	   function writToFile(){
				var fileName = 	arrayOfPagesName[0];
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText=="The data was saved!"){
						arrayOfPagesName.splice(0,1);
						if(arrayOfPagesName.length!=0){
							writToFile();
						}
						else{
							var loadingCatalog  = document.getElementById("loadingCatalog");
									loadingCatalog.innerHTML = "catalog " +catalogNumber+" data was created!"
									var catalogNumber1 = document.getElementById("catalogNumber");
									var partsCatalog1 = document.getElementById("partsCatalog");
									catalogNumber1.value = "";
									partsCatalog1.value = "";
						}
						}
					}
				}
				xhttp.open("POST", "http://localhost:8080/createCatalog", true);
				xhttp.setRequestHeader("Content-type", "application/json");
				xhttp.send(JSON.stringify({catalogNumber:catalogNumber, partsCatalog:partsCatalog,fileName:fileName}));
				}
	   writToFile(); 
	     })
	}
  }
  xhttp.open("POST", "http://localhost:8080/getCatalogFilesName4", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(a);
 
	}
	else{
		if(checkIfNumIsNull!=false){
		alert("catalog number is empty!")
	}
		else{
			alert("Parts Catalog is empty!")
		}
	}

};



