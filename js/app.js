
// Get the elements :

const searchForm = document.getElementById("searchForm");
const search = document.getElementById("search");
const output = document.querySelector(".output");
const loading = document.querySelector(".loading");
const feedback = document.querySelector(".feedback");

const BASE = "https://en.wikipedia.org/w/api.php";
const URL = "?action=query&format=json&origin=*&prop=&list=search&srsearch=";

// add event listner 

searchForm.addEventListener("submit", function(event){
    event.preventDefault();
    const value = search.value;
    console.log(value);

    if(value === ""){
        showFeedBack("Please enter the valid search");
    }
    else{
        search.value = "";
        ajaxWiki(value);
    }
 });



 // show feedback

function showFeedBack(text) {
    feedback.classList.add("showItem");
    feedback.innerHTML = `<p>${text}</p>`;
    
    setTimeout(()=> {feedback.classList.remove("showItem");},3000);
}

function ajaxWiki(search){
    output.innerHTML = '';
    loading.classList.add("showItem");

    const mainURL = `${BASE}${URL}${search}`
    fetch(mainURL)
    .then(data => data.json())
    .then(data => displayData(data))
    .then(e => console.log(e));
}

function displayData(data){
    loading.classList.remove("showItem");
    const { search: result } = data.query;
    console.log(result);

    let info = "";
    result.forEach( result =>{
        const{title,snippet, pageid:link} = result;
        const pageId = 'https://en.wikipedia.org/?curid=';
        info += `<div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
        <div class="card card-body">
         <h1 class="card-title blueText">${title}</h1>
         <p>${snippet}</p>
         <a href="${pageId}${link}" target="_blank" class="my-2 text-capitalize">read
          more...</a>
    
    
        </div>
    
       </div>`
    });
    output.innerHTML = info;
}


