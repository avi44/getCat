function get() {
//localStorage["hpProject"] = null
 if (document.getElementById('title') != null) 
    {
        var title = document.getElementById('title').innerHTML;
         var link = title.split(" ");
         link = link[0] + ".html";
    }
        else{
            var link = "noLink"
            var title ="noTitle"
        }
  
    if (document.getElementsByClassName("bom1") != null) 
        {
            var bom1 = document.querySelectorAll(".bom1 tr")
            var arrayForCatNumber = ""

            for(var i =1; i<bom1.length;i++)
                {
                  arrayForCatNumber += " " + bom1[i].innerHTML;
                }
           
            var bom1 = arrayForCatNumber
            
        }
    else
        {
            var bom1 = "q"
        }
    var link = title.split(" ");
    link = link[0] + ".html";
    var pageObject ={"title" : title, "link" : link, "bom1":bom1};
    var myLocalStorage =[] 
    if(localStorage["hpProject"] !== "null")
        {
            myLocalStorage = JSON.parse(localStorage["hpProject"])
        }
        else
            {
               var a =["a"]
               localStorage.setItem( "hpProject" , JSON.stringify(a))
               myLocalStorage = JSON.parse(localStorage["hpProject"])
            }
         
    for(i=0; i < myLocalStorage.length; i++)
        {
            if(JSON.stringify(myLocalStorage[i]) === JSON.stringify(pageObject))
                {
                    var alreadyHave = 1
                }
                else{var alreadyHave = 0}
               
        }
            if (alreadyHave === 1)
                {}
               else
                    {
                        myLocalStorage.push(pageObject)
                        localStorage.setItem( "hpProject" , JSON.stringify(myLocalStorage) ) 
                    }
   
    console.log(JSON.parse( localStorage["hpProject"]))

}
//get()

function search()
{
    var all = JSON.parse( localStorage["hpProject"])
    var word = document.getElementById("search").value
    for (i=0;i < all.length; i++)
        {
            var link1 = all[i]["link"]
            allSplit =JSON.stringify(all[i])
            allSplit = allSplit.split(" ")
            for(j=0;j<allSplit.length;j++)
                {
                        if(allSplit[j].search(word)!=-1)
                        {
                        console.log(link1)
                        
                        }
                }
        }
}

function getLinks(catalogNum){
    var hpProjectLinks = catalogNum;
    var links = document.getElementsByTagName('a');
    if(links.length==0){console.log("Links is not found!"); return}
    var arrayForLinks = [];
    for(var i =0; i<links.length;i++)
        {
            var linkValue = links[i].attributes[0].value
            if(linkValue[0]=="."){
                arrayForLinks.push(linkValue)
            }
        }

    var myLocalStorage =[];

    if(typeof localStorage[hpProjectLinks] =="undefined")//not exist
        {
            localStorage.setItem( hpProjectLinks , JSON.stringify(arrayForLinks))
        }
        else
            {
                
                console.log("@!")
                myLocalStorage = JSON.parse(localStorage[hpProjectLinks]);
                var arrayForDumpLinks = [];
            function checkIfLinkExist(){
                for(var j=0; j<myLocalStorage.length; j++){
                    for(var k=0; k<arrayForLinks.length; k++){
                        if(arrayForLinks[k]==myLocalStorage[j]){
                            arrayForDumpLinks.push(k); 
                        }
                    }
                }
             }
            function deleteExistLinks(){
                for(var l=0; l<arrayForDumpLinks.length; l++){
                    arrayForLinks.splice(arrayForDumpLinks[i],1)
                }
            }
            checkIfLinkExist();
            deleteExistLinks();
            myLocalStorage = myLocalStorage.concat(arrayForLinks);
            console.log(myLocalStorage)
            localStorage.setItem( hpProjectLinks , JSON.stringify(myLocalStorage))
            }
}

getLinks(5000);

// var array1 =["ah","ahw","c","d"];
// function searchInArray1() {
//     var clientSearch = document.getElementById("mySearch").value;
//    for(var i=0;i<array1.length;i++){
// 		if (array1[i].search(clientSearch)!=-1){
// 		console.log(array1[i]);
// 		}
//    }

// for(var i =0; i<links.length;i++)
//     {
//         var linkValue = links[i].attributes[0].value
//         if(linkValue[0]=="."){
//             if(i==links.length-2){
//                 arrayForLinks+=linkValue
//             }
//             else{
//             arrayForLinks+=linkValue+", "
//             }
//         }
//     }