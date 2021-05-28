class Task {
  constructor(name, description, date) {
    this.name = name;
    this.description = description;
    this.date = date;
  }

  addToTable(table) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-secondary');
    removeButton.innerHTML = 'Mark Completed';

    cell1.innerHTML = this.name;
    cell2.innerHTML = this.description;
    cell3.innerHTML = this.date;
    removeButton.addEventListener('click', () => {
      tasks = tasks.filter(task => task.date != this.date);
      console.log(tasks);
      updateTableWithTasks();
    });

    cell4.append(removeButton);
    row.append(cell1);
    row.append(cell2);
    row.append(cell3);
    row.append(cell4);
    table.append(row);
  }
}

let tasks = [];
const tasksAsJson = localStorage.getItem('tasks');
if (tasksAsJson) {
  const taskArr = JSON.parse(tasksAsJson);
  tasks = taskArr.map(x => new Task(x.name, x.description, x.date));
}


const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const button = document.getElementById('button');
const table = document.getElementById('table-body');
const rowTemplate = document.getElementById('row-template');


button.addEventListener('click', () => {
  const name = titleInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;

  titleInput.value = '';
  descriptionInput.value = '';
  dateInput.value = '';

  const task = new Task(name, description, date);

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateTableWithTasks();
});


function updateTableWithTasks() {

  let length = table.children.length;
  for (let i = 0; i < length; i++) {
    const row = table.children[0];
    row.remove();
  }

  for (const task of tasks) {
    task.addToTable(table);
  }
}

updateTableWithTasks();