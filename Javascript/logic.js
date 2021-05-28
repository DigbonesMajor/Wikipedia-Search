let input= document.getElementById('searchInput');
let searchResults= document.getElementById('searchResults');
let temp=null;
function display(item,insert)
{
    let heading= document.createElement('a');
    heading.setAttribute("href",item["link"]);
    heading.textContent= item["title"];
    heading.style.color="blue";
    heading.style.fontSize="30px";
    insert.appendChild(heading);
    insert.appendChild(document.createElement('br'));
    
    let sub= document.createElement('a');
    sub.setAttribute("href",item["link"]);
    sub.textContent=item["link"];
    sub.style.color="green";
    insert.appendChild(sub);
    insert.appendChild(document.createElement('br'));
    
    let para= document.createElement('p');
    para.textContent=item["description"];
    para.style.fontWeight="500";
    insert.appendChild(para);
    searchResults.appendChild(insert);
}
let search= function(event){
    if(event.key=="Enter")
    {
        if(temp!==null) searchResults.removeChild(temp);
        document.getElementById('spinner').classList.toggle("d-none");
        let query=input.value;
        let url="https://apis.ccbp.in/wiki-search?search="+query;
        let options={
            method:"GET"
        }
        fetch(url,options).then(function(response){
            return response.json();
        }).then(function(data){
            let {search_results}=data;
            let insert= document.createElement('div');
            document.getElementById('spinner').classList.toggle("d-none");
            for (let x of search_results)
            {
                display(x,insert);
            }
            temp=insert;
            
        })
    }

}
input.addEventListener("keydown",search);