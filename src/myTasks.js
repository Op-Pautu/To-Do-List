import DomStuff from './DomStuff.js';
import localStorageStuff from './localStorageStuff.js';
import myProjects from './myProjects.js';
import Tasks from './Tasks.js';

const myTasks = (function () {
  let myTasksList = [];

  // add the task created in the form task
  function addTask() {
    let title = document.getElementById('form-title').value;
    let project = document.getElementById('form-project').value;
    let content = document.getElementById('form-content').value;
    let date = document.getElementById('form-date').value;
    let priority = document.getElementById('form-status').value;

    if (title !== '' && date !== '') {
      let taskSelected = TaskToBeSelected(project);
      let newTask = new Tasks(
        title,
        project,
        content,
        date,
        priority,
        taskSelected
      );
      addToTasksList(newTask);
      DomStuff.renderTasks();
      DomStuff.resetTaskForm();
      DomStuff.hideTaskForm();
      enableDelete();
    } else {
      alert('A task must have a title and a completion date!');
    }
  }
})();
