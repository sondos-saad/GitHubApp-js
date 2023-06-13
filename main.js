
let userFormEl = document.querySelector('#user-form');
let userInputEl = document.querySelector('#username');
let languageEl = document.querySelector('#language');
let searchTermEl = document.querySelector('#search-term');
let reposEl = document.querySelector('#repos');

userFormEl.addEventListener('submit', formSubmit);
languageEl.addEventListener('click', handleClick);

function handleClick(e){
    let lang = e.target.getAttribute('data-lng');
    if(lang){
        reposEl.innerHTML = "";
        getLangRepos(lang);
    }
}
function getLangRepos(lang){
    let apiUrlLang = "https://api.github.com/search/repositories?q=" + lang;

    fetch(apiUrlLang)
    .then(res => res.json())
    .then(data => displayRepo(data.items , lang))
    .catch(err => alert("Error"))
}

function formSubmit(e){
    e.preventDefault(); // to stop reload page (form when type submit make reload page this line to stop reload)
    let user = userInputEl.value.trim();
    if(user){
        reposEl.innerHTML = "";
        getUserRepos(user);
        userInputEl.value = "";
    }else{
        alert('Please Enter user')
    }
}
function getUserRepos(user){
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
    .then(res => res.json())
    .then(data => displayRepo(data , user))
    .catch(err => alert("Error"))
}
function displayRepo(repos , searchTerm){
    if(repos.length == 0){
        reposEl.innerHTML = "No Repos..!"
        return;
    }

    searchTermEl.innerHTML = searchTerm;
    repos.forEach(repo => {
        reposEl.innerHTML += `
            <a href="#" class="repo-item">
                <span>${repo.owner.login} / ${repo.name}</span>
                <span>${repo.open_issues_count}</span>
            </a>
        `
    })
}
