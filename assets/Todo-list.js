document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const notification = document.getElementById("notification");

  function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") return;

      const listItem = createTaskElement(taskText);

      taskList.appendChild(listItem);
      taskInput.value = "";

      
      showNotification("Task added successfully!");

      setTimeout(function () {
          hideNotification();
      }, 2000);
  }

  function createTaskElement(taskText) {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerHTML = `
          <input type="checkbox" class="task-checkbox">
          <span>${taskText}</span>
          <button type="button" class="btn btn-danger btn-sm float-end delete-btn">
              <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-danger btn-sm float-end edit-btn">
              <i class="bi bi-pencil"></i> Edit
          </button>
      `;

      return listItem;
  }

  function editTask(e) {
      if (e.target.classList.contains("edit-btn")) {
          const listItem = e.target.parentElement;
          const taskText = listItem.querySelector("span");
          const updatedTask = prompt("Edit the task:", taskText.innerText);

          if (updatedTask !== null && updatedTask.trim() !== "") {
              taskText.innerText = updatedTask;
              showNotification("Task updated successfully!");
          }
      }
  }

  function deleteTask(e) {
      if (e.target.classList.contains("delete-btn")) {
          const listItem = e.target.parentElement;
          taskList.removeChild(listItem);

        
          showNotification("Task deleted successfully!");
      }
  }

  function TaskCompletion(e) {
      if (e.target.classList.contains("task-checkbox")) {
          const listItem = e.target.parentElement;
          const taskText = listItem.querySelector("span");
          taskText.style.textDecoration = e.target.checked ? "line-through" : "none";
      }
  }

  function showNotification(message) {
      notification.textContent = message;
      notification.style.display = "block";
  }

  function hideNotification() {
      notification.style.display = "none";
  }

  addTaskBtn.addEventListener("click", addTask);
  taskList.addEventListener("click", function (e) {
      editTask(e);
      deleteTask(e);
  });

  taskList.addEventListener("change", TaskCompletion);
});
