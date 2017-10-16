function search(catalogNum)
{   
    var linksForLocal = []
    var catalogName = catalogNum
    var links = JSON.parse(localStorage[catalogName]) //catalogName must be identical to catalogName from function getLinks(this)
    var all = JSON.parse( localStorage["HPpage"])
    var word = document.getElementById("search").value
    for (i=0;i < all.length; i++)
        {
            var link1 = all[i]["link"]
            link1 =  "../../page/" + link1
            allSplit =JSON.stringify(all[i])
            allSplit = allSplit.split(" ")
            for(j=0;j<allSplit.length;j++)
                {
                        if(allSplit[j].search(word)!=-1)
                        {
                            for(k=0;i<links.length;k++)
                                {
                                   if(link1 === links[k])
                                    {
                                        console.log("!!")
                                       linksForLocal.push(link1)
                                    }
                        
                                }
                        }
                }
        }
        localStorage.setItem("SearchResult", linksForLocal)
        window.open("searchResult.html");
}