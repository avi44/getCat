
function disableButton(id){
	var button = document.getElementById(id);
		  button.disabled = true;
}
function ableButton(id){
	var button = document.getElementById(id);
		  button.disabled = false;
}

function timeLeft(lengthArray){
			var timMas = document.getElementById("timeLeft");
			var time = lengthArray*0.1282051282051282;
			var timeMinutes = (time-(time%60))/60;
			var timeSeconds = (time%60).toFixed(0);
			var state = "";
			if(timeMinutes!=0 && timeSeconds!=0 && timeSeconds!=60){state = 1}//5 & 59
			if(timeMinutes!=0 && timeSeconds==0){state = 2}//5 & 0
			if(timeMinutes==0 && timeSeconds!=0 && timeSeconds!=60){state = 3}//0 & 59
			if(timeMinutes==0 && timeSeconds!=0 && timeSeconds==60){state =4}//0 & 60
			if(timeMinutes!=0 && timeSeconds!=0 && timeSeconds==60){state =5}//4 & 60
			if(timeMinutes==0 && timeSeconds==0){state = 6}//0

		var left;	
			switch (state) {
    case 1:
        left = timeMinutes +" minutes and "+timeSeconds +" seconds is left";
        break;
    case 2:
         left = timeMinutes +" minutes is left";
        break;
    case 3:
         left = timeSeconds +" seconds is left";
        break;
    case 4:
         left = ++timeMinutes +" minutes is left";
        break;
    case 5:
         left = ++timeMinutes +" minutes is left";
        break;
    case 6:
        left = "";
}		
		timMas.innerHTML = left;	
}


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
	 disableButton("getDataPageBtn");
	var xhttp = new XMLHttpRequest();
  	      xhttp.onreadystatechange = function() {
  	  		if (this.readyState == 4 && this.status == 200) {
				if(this.responseText=="there is no files!"){
			alert("ther is no files in page folder!")
			ableButton("getDataPageBtn");
			return
		}
		  	  var arrayOfPagesName  = this.responseText;
					intializePageInfoDb(function(){
					arrayOfPagesName  = JSON.parse(arrayOfPagesName);
					function arrayOfPagesNameLengthState(){
							var load = arrayOfPagesName.length;
							var time = arrayOfPagesName.length*0.1282051282051282;
							var timeMinuats = (time-(time%60))/60
							console.log()
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
											timeLeft(arrayOfPagesName.length)
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
											ableButton("getDataPageBtn");
											},600);
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
	 disableButton("getDataCatalogBtn");
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
			ableButton("getDataCatalogBtn");
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
									ableButton("getDataCatalogBtn");
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
		ableButton("getDataCatalogBtn");
	}
		else{
			alert("Parts Catalog is empty!")
			ableButton("getDataCatalogBtn");
		}
	}

};



