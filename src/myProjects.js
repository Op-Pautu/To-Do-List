import DomStuff from './DomStuff.js';
import localStorageStuff from './localStorageStuff.js';
import Projects from './Projects.js';

const myProjects = (function () {
  let myProjectsList = [];

  // add a project
  function addProject() {
    let title = document.getElementById('plus-project-title').value;

    if (title !== '') {
      if (projectAlreadyCreated(title)) {
        let newProject = new Projects(title, 'S');
        addToProjectList(newProject);
        DomStuff.renderProject();
        DomStuff.addProjectToTaskForm(title);
        DomStuff.resetProjectField();
      } else {
        alert('Project already exists!');
      }
    } else {
      alert('You must choose a project title!');
    }
  }

  // check if the project is already created
  function projectAlreadyCreated(title) {
    for (let i = 0; i < myProjectsList.length; i++) {
      if (myProjectsList[i].titleProject == title) {
        return false;
      }
    }
    return true;
  }

  // add a project in the array of projects
  function addToProjectList(newProject) {
    myProjectsList.push(newProject);
    localStorageStuff.saveToLocalStorage();
  }

  // deletes a project from the array of projects
  function deleteProject(deleteProject) {
    myProjectsList.splice(deleteProject, 1);
    localStorageStuff.saveToLocalStorage();
  }

  return {
    addProject,
    deleteProject,
    addToProjectList,
    myProjectsList,
  };
})();
