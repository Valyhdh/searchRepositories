

const input = document.querySelector('.repo-input');
const autoComplete = document.querySelector('.autocomplete');
const autoCompleteElements = autoComplete.querySelectorAll('.autocomplete-item')
const repoListContainer = document.querySelector('.repo-list');

let addedRepos = [];





async function fetchRepositories(repo) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=5`);
    if (response.ok) {
        const data = await response.json();
        console.log(data.items)
        return data.items;
    }
}

async function updateAutocomplet() {
    const repoSearch = input.value;
    if (!repoSearch) {
        autoComplete.style.display = 'none'
        autoComplete.textContent = '';
   } else{
       autoComplete.style.display = 'block'
   }
    const repositories = await fetchRepositories(repoSearch);
    await repositories.map(elem => {
        autoComplete.insertAdjacentHTML("afterbegin", `<div class="autocomplete__item" data-repo="${elem}">${elem.name}</div>`)
    });
   
    
}


function debounce(callback, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => { callback(...args); }, delay);
    };
  }
  
  const onInputComplete = debounce(updateAutocomplet, 400);
  
  

// Обработчик ввода
input.addEventListener('keyup', onInputComplete);

