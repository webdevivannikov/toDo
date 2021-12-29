const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplete = document.querySelector('.todo-completed');

const toDoData = [];



const render = function () {
    todoComplete.innerHTML = '';
    todoList.innerHTML = '';

    toDoData.forEach(function (item, index) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

        if (item.completed) {
            todoComplete.append(li);
        } else {
            todoList.append(li);
        }
        
        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
            
        });
        li.querySelector('.todo-remove').addEventListener('click', function () {

            toDoData.splice(index, 1);
            render();
        });
        localStorage.setItem("toDoData", JSON.stringify(toDoData));

    });
    
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

        
    if (headerInput.value != '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        };
        toDoData.push(newToDo);
        headerInput.value = '';
        
        render();
    }
        
});

if (localStorage.getItem('toDoData') != null){
    const newToDo = JSON.parse(localStorage.getItem('toDoData'));
    for (let i = 0; i < newToDo.length; i++)
        toDoData.push(newToDo[i]);
    
    console.log(toDoData);
    render();
}
//localStorage.clear();