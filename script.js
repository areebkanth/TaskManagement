document.addEventListener('DOMContentLoaded', () => {  
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const searchTasks = document.getElementById('search-tasks');
    const filterRadios = document.querySelectorAll('input[name="filter"]');
       
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Function to render tasks   
    function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
    if (filterRadios[1].checked) return task.completed;
    if (filterRadios[2].checked) return !task.completed;
    return true;});
    
    filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
    <span>${task.title} - ${task.desc || ''} (Due: ${task.date})</span>
    <div>
    <button class="complete">Complete</button>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button></div>`;
    taskList.appendChild(li);
    
    li.querySelector('.complete').addEventListener('click', () => completeTask(index));
    li.querySelector('.edit').addEventListener('click', () => editTask(index));
    li.querySelector('.delete').addEventListener('click', () => deleteTask(index));}); }
    
        // Add task
    taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;
    tasks.push({ title, desc, date, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskForm.reset();
    renderTasks();});
    
        // Complete task
    function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();}
    
        // Edit task
    function editTask(index) {
    const newTitle = prompt('Edit Task Title', tasks[index].title);
    const newDesc = prompt('Edit Task Description', tasks[index].desc);
    const newDate = prompt('Edit Task Due Date', tasks[index].date);
    
    if (newTitle) tasks[index].title = newTitle;
    if (newDesc) tasks[index].desc = newDesc;
    if (newDate) tasks[index].date = newDate;
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
        }
    
        // Delete task
    function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    }
    }
    
        // Search tasks
    searchTasks.addEventListener('input', () => {
    const searchText = searchTasks.value.toLowerCase();
    tasks.forEach((task, index) => {
    const taskItem = taskList.children[index];
    if (task.title.toLowerCase().includes(searchText) || task.desc.toLowerCase().includes(searchText)) {
    taskItem.style.display = '';} else {
    taskItem.style.display = 'none';} });
    });
    
        // Filter tasks
    filterRadios.forEach(radio => {
    radio.addEventListener('change', renderTasks);
        });
    
        // Initial render
        renderTasks();
    });
    