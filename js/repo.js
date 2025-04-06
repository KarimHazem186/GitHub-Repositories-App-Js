let reposEl = document.querySelector('#repos');

function getRepoName(){
    let qurStr = document.location.search;

    let repoName = qurStr.split('=')[1];

    // console.log(repoName);

    if(repoName){
        getIssues(repoName)
    }

}

function getIssues(repoName){
    let apiUrl = "https://api.github.com/repos/" + repoName + "/issues";

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayIsseues(data))
        .catch(err => alert("Something went wrong")) 
}


function displayIsseues(issues) {
    // console.log(issues);
    if(issues.length == 0) {
        reposEl.innerHTML = "NO Issues...!"
        return;
    }
    issues.forEach(issue => {
       reposEl.innerHTML += `
          <a href='${issue.html_url}' class="repo-item">
            <span>${issue.title}</span>
          </a>
        `
    })
}

getRepoName()