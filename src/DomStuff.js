import myTasks from './myTasks.js';
import localStorageStuff from './localStorageStuff.js';
import myProjects from './myProjects.js';

const DomStuff = (function () {
  function clearTasksDom() {
    let list = document.getElementById('tasks-items');
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }

  function clearProjects() {
    let list = document.getElementById('project-list-names');
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }

  // clear the task form
  function resetTaskForm() {
    document.getElementById('task-form').reset();
  }

  // clear the project name box
  function resetProjectField() {
    document.getElementById('plus-project-title').value = '';
  }

  function showTaskForm() {
    document.getElementById('task-form').style.display = 'block';
    myTasks.disableDelete();
  }

  function hideTaskForm() {
    document.getElementById('task-form').style.display = 'none';
    myTasks.enableDelete();
    resetTaskForm();
    document.getElementById('add-Task').style.display = 'block';
    document.getElementById('edit-Task').style.display = 'none';
  }

  // clear both project and task arrays
  function clearTaskAndProjectArrays() {
    myTasks.myTasksList.splice(0, myTasks.myTasksList.length);
    myProjects.myProjectsList.splice(0, myProjects.myProjectsList.length);
    clearTasksDom();
    clearProjects();
    localStorageStuff.saveToLocalStorage();
    deleteAllProjectFromTaskForm();
  }

  // adds the task entered through the form into DOM
  function addTaskDom() {
    for (let i = 0; i < myTasks.myTasksList.length; i++) {
      if (myTasks.myTasksList[i].selected == 'S') {
        let table = document.getElementById('tasks-items');
        let row = table.insertRow(-1);
        row.id = `task-${i}`;
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        cell1.innerHTML = myTasks.myTasksList[i].titleTask;
        cell2.innerHTML = myTasks.myTasksList[i].contentTask;
        cell3.innerHTML = myTasks.myTasksList[i].dateTask;
        cell4.innerHTML = myTasks.myTasksList[i].priorityTask;
        let nodeEdit = document.createElement('I');
        nodeEdit.classList.add('fas');
        nodeEdit.classList.add('fa-edit');
        cell5.classList.add('edit-task');
        cell5.append(nodeEdit);
        let nodeDelete = document.createElement('I');
        nodeDelete.classList.add('fas');
        nodeDelete.classList.add('fa-trash-alt');
        nodeDelete.classList.add('active-trash');
        let nodeDelete2 = document.createElement('I');
        nodeDelete2.classList.add('fas');
        nodeDelete2.classList.add('fa-trash-alt');
        nodeDelete2.classList.add('simple-trash');
        nodeDelete2.style.display = 'none';
        cell6.classList.add('delete-task');
        cell6.append(nodeDelete);
        cell6.append(nodeDelete2);
        nodeDelete.addEventListener('click', () => deleteTaskDom(i));
        nodeEdit.addEventListener('click', () => fillTaskForm(i));
      }
    }
  }
  // retrieves the task info and fills the task form with it for editing the task
  function fillTaskForm(i) {
    showTaskForm();

    let editButton = document.getElementById('edit-Task');
    let newEditButton = editButton.cloneNode(true);
    editButton.parentNode.replaceChild(newEditButton, editButton);

    document.getElementById('form-title').value =
      myTasks.myTasksList[i].titleTask;
    document.getElementById('form-project').value =
      myTasks.myTasksList[i].projectTask;
    document.getElementById('form-content').value =
      myTasks.myTasksList[i].contentTask;
    document.getElementById('form-date').value =
      myTasks.myTasksList[i].dateTask;
    document.getElementById('form-status').value =
      myTasks.myTasksList[i].priorityTask;
    document.getElementById('add-Task').style.display = 'none';
    document.getElementById('edit-Task').style.display = 'block';
    myTasks.disableDelete();
    document
      .getElementById('edit-Task')
      .addEventListener('click', () => editTask(i), { once: true });
  }

  // Saving the changes when editing the task
  function editTask(i) {
    myTasks.myTasksList[i].titleTask =
      document.getElementById('form-title').value;
    myTasks.myTasksList[i].projectTask =
      document.getElementById('form-project').value;
    myTasks.myTasksList[i].contentTask =
      document.getElementById('form-content').value;
    myTasks.myTasksList[i].dateTask =
      document.getElementById('form-date').value;
    myTasks.myTasksList[i].priorityTask =
      document.getElementById('form-status').value;
    document.getElementById('add-Task').style.display = 'block';
    document.getElementById('edit-Task').style.display = 'none';
    myTasks.enableDelete();
    hideTaskForm();
    renderTasks();
    resetTaskForm();
    localStorageStuff.saveToLocalStorage();
  }

  // adds the project created in the list in task form
  function addProjectToTaskForm(title) {
    let projectList = document.getElementById('form-project');
    let option = document.createElement('option');
    option.text = title;
    projectList.add(option);
  }

  // deletes the project from the list in task form
  function deleteProjectFromTaskForm(projectNumber) {
    let theSelect = document.getElementById('form-project');
    let options = theSelect.getElementsByTagName('OPTION');
    for (let i = 0; i < options.length; i++) {
      if (
        options[i].innerHTML ==
        myProjects.myProjectsList[projectNumber].titleProject
      ) {
        theSelect.removeChild(options[i]);
        i--;
      }
    }
  }

  // deletes all the projects from the list in task form
  function deleteAllProjectFromTaskForm() {
    let theSelect = document.getElementById('form-project');
    let options = theSelect.getElementsByTagName('OPTION');
    for (let i = 0; i < options.length; i++) {
      if (options[i].innerHTML != 'All projects') {
        theSelect.removeChild(options[i]);
        i--;
      }
    }
  }

  // delete the task
  function deleteTaskDom(numar) {
    let item = document.getElementById(`task-${numar}`);
    item.parentNode.removeChild(item);
    myTasks.deleteTask(numar);
    renderTasks();
  }

  // add a new project
  function addProjectDom() {
    for (let i = 0; i < myProjects.myProjectsList.length; i++) {
      let node = document.createElement('li');
      node.id = 'project-name-' + i;
      node.classList.add('project-name');
      let newDiv = document.createElement('div');
      newDiv.classList.add('project-select');
      newDiv.id = i;
      let textnode = document.createTextNode(
        myProjects.myProjectsList[i].titleProject
      );
      newDiv.appendChild(textnode);
      document.getElementById('project-list-names').appendChild(node);
      node.appendChild(newDiv);
      let newDiv2 = document.createElement('div');
      newDiv2.classList.add('trash-container');
      node.appendChild(newDiv2);
      let nodeI = document.createElement('I');
      nodeI.classList.add('fas');
      nodeI.classList.add('fa-trash-alt');
      nodeI.classList.add('active-trash');
      let nodeI2 = document.createElement('I');
      nodeI2.classList.add('fas');
      nodeI2.classList.add('fa-trash-alt');
      nodeI2.classList.add('simple-trash');
      nodeI2.style.display = 'none';
      newDiv2.appendChild(nodeI);
      newDiv2.appendChild(nodeI2);
      nodeI.addEventListener('click', () => deleteProjectDom(i));
      newDiv.addEventListener('click', () => showProjectDom(i));
    }
  }

  // delete a project
  function deleteProjectDom(projectNumber) {
    let item = document.getElementById(`project-name-${projectNumber}`);
    item.parentNode.removeChild(item);

    deleteProjectFromTaskForm(projectNumber);
    deleteProjectTasks(projectNumber);
    myProjects.deleteProject(projectNumber);
    if (myProjects.myProjectsList.length == 0) {
      selectAll();
    }
    renderProject();
    renderTasks();
  }

  // all tasks and projects are marked as selected
  function selectAll() {
    for (let i = 0; i < myTasks.myTasksList.length; i++) {
      myTasks.myTasksList[i].selected = 'S';
    }

    for (let x = 0; x < myProjects.myProjectsList.length; x++) {
      myProjects.myProjectsList[x].selected = 'S';
    }

    localStorageStuff.saveToLocalStorage();
    renderTasks();
  }

  // marks which tasks will be selected to be rendered when selecting a project
  function showProjectDom(projectNumber) {
    for (let i = 0; i < myTasks.myTasksList.length; i++) {
      myTasks.myTasksList[i].selected = 'S';
    }

    for (let x = 0; x < myProjects.myProjectsList.length; x++) {
      myProjects.myProjectsList[x].selected = 'S';
    }

    for (let x = 0; x < myProjects.myProjectsList.length; x++) {
      if (
        myProjects.myProjectsList[x].titleProject !=
        myProjects.myProjectsList[projectNumber].titleProject
      ) {
        myProjects.myProjectsList[x].selected = 'NS';
      }
    }

    for (let i = 0; i < myTasks.myTasksList.length; i++) {
      if (
        myProjects.myProjectsList[projectNumber].titleProject !=
        myTasks.myTasksList[i].projectTask
      ) {
        myTasks.myTasksList[i].selected = 'NS';
      }
    }
    renderTasks();
  }

  function renderTasks() {
    clearTasksDom();
    addTaskDom();
  }

  // when deleting a project all its tasks are deleted as well
  function deleteProjectTasks(projectNumber) {
    for (let i = 0; i < myTasks.myTasksList.length; i++) {
      if (myTasks.myTasksList.length > i) {
        if (
          myTasks.myTasksList[i].projectTask ==
          myProjects.myProjectsList[projectNumber].titleProject
        ) {
          myTasks.deleteTask(i);
          i--;
        }
      }
    }
  }

  function renderProject() {
    clearProjects();
    addProjectDom();
  }

  return {
    renderTasks,
    renderProject,
    selectAll,
    clearTaskAndProjectArrays,
    addProjectToTaskForm,
    resetTaskForm,
    showTaskForm,
    hideTaskForm,
    resetProjectField,
  };
})();

export default DomStuff;
