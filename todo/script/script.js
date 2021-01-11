// UI Vars
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();
eventListeners();

function eventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
    deleteAll.addEventListener('click', deleteAllItem);
}

function addNewItem(e) {
    if (input.value === '') {
        alert('Add New Item');
    }
    setItemToLocalStorage(input.value);
    createItem(input.value);
    
    input.value = '';
    e.preventDefault();
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }
    else{
        items=JSON.parse(localStorage.getItem('items'))
    }
    return items;
}

function setItemToLocalStorage(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item, index){
        if(item===text){
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text){
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>'

    li.appendChild(a);
    taskList.appendChild(li);
    input.value = '';
}

function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
    e.preventDefault();
}

function deleteAllItem(e) {
    taskList.innerHTML='';
    localStorage.clear();
    e.preventDefault();
}