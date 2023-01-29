import DomStuff from './DomStuff.js';
import myTasks from './myTasks.js';
import localStorageStuff from './localStorageStuff.js';
import myProjects from './myProjects.js';

// page upload
document.body.addEventListener(
  'load',
  localStorageStuff.uploadFromLocalStorage()
);
document.body.addEventListener('load', DomStuff.renderTasks());
document.body.addEventListener('load', DomStuff.renderProject());
document.body.addEventListener('load', DomStuff.selectAll);

// page sections
document
  .getElementById('all-projects')
  .addEventListener('click', DomStuff.selectAll);
document
  .getElementById('delete-all-projects')
  .addEventListener('click', DomStuff.clearTaskAndProjectArrays);
document.getElementById('add-Task').addEventListener('click', myTasks.addTask);
document
  .getElementById('cancel-Task')
  .addEventListener('click', DomStuff.hideTaskForm);
document
  .getElementById('button-Task')
  .addEventListener('click', DomStuff.showTaskForm);
document
  .getElementById('plus-project')
  .addEventListener('click', myProjects.addProject);

// sorting
document
  .getElementById('priority-sort-asc')
  .addEventListener('click', myTasks.sortAscPriority);
document
  .getElementById('priority-sort-desc')
  .addEventListener('click', myTasks.sortDescPriority);
document
  .getElementById('date-sort-asc')
  .addEventListener('click', () => myTasks.sortTaskDate('asc'));
document
  .getElementById('date-sort-desc')
  .addEventListener('click', () => myTasks.sortTaskDate('desc'));
