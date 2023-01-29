import myProjects from './myProjects.js';
import DomStuff from './DomStuff.js';
import myTasks from './myTasks.js';
import Tasks from './Tasks.js';
import Projects from './Projects.js';

const localStorageStuff = (function () {
  function saveToLocalStorage() {
    let lenTask = myTasks.myTasksList.length;
    localStorage.setItem('tasksNumber', lenTask);

    let lenProject = myProjects.myProjectsList.length;
    localStorage.setItem('projectsNumber', lenProject);

    for (let i = 0; i < myTasks.myTasksList.length; i++) {
      localStorage.setItem(`titleTask${i}`, myTasks.myTasksList[i].titleTask);
      localStorage.setItem(`selectedTask${i}`, myTasks.myTasksList[i].selected);
      localStorage.setItem(
        `projectTask${i}`,
        myTasks.myTasksList[i].projectTask
      );
      localStorage.setItem(
        `priorityTask${i}`,
        myTasks.myTasksList[i].priorityTask
      );
      localStorage.setItem(`dateTask${i}`, myTasks.myTasksList[i].dateTask);
      localStorage.setItem(
        `contentTask${i}`,
        myTasks.myTasksList[i].contentTask
      );
    }

    for (let i = 0; i < myProjects.myProjectsList.length; i++) {
      localStorage.setItem(
        `titleProject${i}`,
        myProjects.myProjectsList[i].titleProject
      );
      localStorage.setItem(
        `selectedProject${i}`,
        myProjects.myProjectsList[i].selected
      );
    }
  }

  function uploadFromLocalStorage() {
    let lenTask = localStorage.getItem('tasksNumber');
    let lenProject = localStorage.getItem('projectsNumber');

    for (let i = 0; i < lenTask; i++) {
      let title = localStorage.getItem(`titleTask${i}`);
      let project = localStorage.getItem(`projectTask${i}`);
      let content = localStorage.getItem(`contentTask${i}`);
      let date = localStorage.getItem(`dateTask${i}`);
      let priority = localStorage.getItem(`priorityTask${i}`);
      let taskSelected = localStorage.getItem(`selectedTask${i}`);
      let newTask = new Tasks(
        title,
        project,
        content,
        date,
        priority,
        taskSelected
      );
      myTasks.addToTasksList(newTask);
    }

    for (let i = 0; i < lenProject; i++) {
      let title = localStorage.getItem(`titleProject${i}`);
      let projectSelected = localStorage.getItem(`selected${i}`);
      let newProject = new Projects(title, projectSelected);
      myProjects.addToProjectList(newProject);
      DomStuff.addProjectToTaskForm(title);
    }
  }

  return {
    saveToLocalStorage,
    uploadFromLocalStorage,
  };
})();

export default localStorageStuff;
