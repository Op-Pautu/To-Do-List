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

  // check if the task to be created will be selected for rendering imediately
  function TaskToBeSelected(project) {
    for (let x = 0; x < myProjects.myProjectsList.length; x++) {
      if (myProjects.myProjectsList[x].titleProject == project) {
        if (myProjects.myProjectsList[x].selected == 'NS') {
          return 'NS';
        } else {
          return 'S';
        }
      }
    }

    function isSameAnswer(el, index, arr) {
      if (index === 0) {
        if (arr[index].selected == 'NS') {
          return false;
        } else {
          return true;
        }
      } else {
        return el.selected === arr[index - 1].selected;
      }
    }

    if (myProjects.myProjectsList.every(isSameAnswer)) {
      return 'S';
    } else {
      return 'NS';
    }
  }

  function addToTasksList(task) {
    myTasksList.push(task);
    localStorageStuff.saveToLocalStorage();
  }

  // delete task from array of tasks
  function deleteTask(taskNumber) {
    myTasksList.splice(taskNumber, 1);
    localStorageStuff.saveToLocalStorage();
  }

  // sorting depending on priority
  function sortAscPriority() {
    myTasksList.sort(compare);
    DomStuff.renderTasks();
  }

  function sortDescPriority() {
    myTasksList.sort(compare).reverse();
    DomStuff.renderTasks();
  }

  function compare(a, b) {
    if (a.priorityTask < b.priorityTask) {
      return -1;
    }
    if (a.priorityTask > b.priorityTask) {
      return 1;
    }
    return 0;
  }

  // sort the task on date of completion
  function sortTaskDate(direction) {
    if (direction == 'desc') {
      myTasksList.sort((a, b) => new Date(b.dateTask) - new Date(a.dateTask));
    } else {
      myTasksList.sort((a, b) => new Date(a.dateTask) - new Date(b.dateTask));
    }
    DomStuff.renderTasks();
  }

  // delete functionality for trash icons
  function disableDelete() {
    let disableTasks = document.getElementsByClassName('active-trash');
    let enableTasks = document.getElementsByClassName('simple-trash');
    for (let i = 0; i < disableTasks.length; i++) {
      disableTasks[i].style.display = 'none';
    }
    for (let i = 0; i < enableTasks.length; i++) {
      enableTasks[i].style.display = 'inline';
    }
  }

  // enable functionality for trash icons
  function enableDelete() {
    let disableTasks = document.getElementsByClassName('simple-trash');
    let enableTasks = document.getElementsByClassName('active-trash');
    for (let i = 0; i < disableTasks.length; i++) {
      disableTasks[i].style.display = 'none';
    }
    for (let i = 0; i < enableTasks.length; i++) {
      enableTasks[i].style.display = 'inline';
    }
  }

  return {
    addTask,
    deleteTask,
    addToTasksList,
    sortAscPriority,
    sortDescPriority,
    sortTaskDate,
    disableDelete,
    enableDelete,
    myTasksList,
  };
})();

export default myTasks;
