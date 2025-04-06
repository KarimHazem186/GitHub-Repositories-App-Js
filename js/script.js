// Set up Varaibles 

let userFormEl = document.querySelector('#user-form');
let userInputEl = document.querySelector('#username');
let languagesEl = document.querySelector('.languages');
let searchTermEl = document.querySelector('#search-term');
let reposEl = document.querySelector('#repos');

// Events 
userFormEl.addEventListener('submit',formSumbitHandler);
languagesEl.addEventListener('click',handleClick)

// Functions

function handleClick(e){
    // console.log(e.target);
    let lng = e.target.getAttribute('data-lng');

    if(lng){
        reposEl.innerHTML =  '';
        getLangRepos(lng);
    }
}

function getLangRepos(lng){
    let apiUrl = "https://api.github.com/search/repositories?q="+lng;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayRepos(data.items,lng))
        .catch(err => alert('Something went wrong!!'))
}

function formSumbitHandler(e) {
    e.preventDefault();

    let user = userInputEl.value.trim();

    if(user) {
        // logic 
        reposEl.innerHTML = "";
        getUserRepos(user); // single respository prensiable كل الفاكشن مسئولة عن حاجة واحده فقط

    } else {
        alert("Please Enter user!");
    }
}

function getUserRepos(user) {
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
    // let apiUrl ="https://github.com/HamzaNabil";
    
    fetch(apiUrl)
        .then(res=>res.json()) // response
        .then(data => displayRepos(data,user)) 
        .catch(err => alert('Something is wrong!!') )
}

function displayRepos(repos,searchTerm) {
    // console.log(repos);
    if(repos.length == 0) {
        reposEl.innerHTML = "NO Repos...!"
        return;
    }

    searchTermEl.innerHTML = searchTerm;

    repos.forEach(repo => {
        let name = repo.owner.login + '/' + repo.name;
       reposEl.innerHTML += `
          <a href='./repo.html?repo=${name}' class="repo-item">
            <span>${repo.owner.login} / ${repo.name}</span>
            <span>${repo.open_issues_count > 0 ?  '<i class="fas fa-times"></i>' :  '<i class="fas fa-check-square"></i>'}</span>
          </a>
        `
    })
}