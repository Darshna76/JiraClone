
var list=document.getElementById("not-started");
var list1 = document.getElementById("in-progress");
var list2 = document.getElementById("completed");
var taskName=document.getElementById("task-name")
 var priority=document.getElementById("priority");
 var dueDate=document.getElementById("due-date");
var taskStatus=document.getElementById("status");

function openModal(){
   document.querySelector(".modal").style.display="block";
}
function closed(){
    document.querySelector(".modal").style.display="none";
    
}
let data=[];

let acceptData = ()=>{
   data.push({taskName:taskName.value,
    priority:priority.value,
    dueDate:dueDate.value,
    taskStatus:taskStatus.value
});
}

document.getElementById("add-task-btn").addEventListener("click", (event) => {
    event.preventDefault();
    if(taskStatus.value==""||priority.value==""||dueDate.value==""||taskName.value==""){
     alert("all the fields are required");
     deleteTask(e);

    }
    document.querySelector(".modal").style.display = "none";
    acceptData();
    
    if (taskStatus.value == "not-started") {
      list.innerHTML = ""; // clear only the not-started list
    } else if (taskStatus.value == "in-progress") {
      list1.innerHTML = ""; // clear only the in-progress list
    } else if (taskStatus.value == "completed") {
      list2.innerHTML = ""; // clear only the completed list
    }
  
    data.map((item) => {
      if (item.taskStatus == "not-started" && taskStatus.value == "not-started") {
        list.innerHTML += `<li>
        <div class="data-container">
        <h4>${item.taskName}</h4>
        <p  class="priority"  style='${prio(item.priority)}'>${item.priority}</p>
        <p class="date">${item.dueDate}</p>
        <p class="task-status" style='${stat(item.taskStatus)}'>${item.taskStatus}</p>
        </div>
        <div class="options">
            <i onClick="deleteTask(this)"  class="fas fa-trash-alt"></i>
            <i onClick="editTask(this)" class="fas fa-edit"></i>
        </div>
        </li>`;

      } else if (item.taskStatus == "in-progress" && taskStatus.value == "in-progress") {
        list1.innerHTML += `<li>
        <div class="data-container">
        <h4>${item.taskName}</h4>
        <p class="priority"  style='${prio(item.priority)}'>${item.priority}</p>
        <p class="date">${item.dueDate}</p>
        <p class="task-status" style='${stat(item.taskStatus)}'>${item.taskStatus}</p>
        </div>
        <div class="options">
            <i onClick="deleteTask(this)"  class="fas fa-trash-alt"></i>
            <i onClick="editTask(this)" class="fas fa-edit"></i>
        </div>
        </li>`;

      } else if (item.taskStatus == "completed" && taskStatus.value == "completed") {
        list2.innerHTML += `<li>
        <div class="data-container">
        <h4>${item.taskName}</h4>
        <p class="priority" style='${prio(item.priority)}'>${item.priority}</p>
        <p class="date">${item.dueDate}</p>
        <p class="task-status" style='${stat(item.taskStatus)}'>${item.taskStatus}</p>
        </div>
        <div class="options">
            <i onClick="deleteTask(this)"  class="fas fa-trash-alt"></i>
            <i onClick="editTask(this)" class="fas fa-edit"></i>
        </div>
        </li>`;
      }
    });
    resetForm();
  });

  let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
  }
  let editTask = (e) => {
    let taskItem = e.parentElement.parentElement;
    let taskName = taskItem.querySelector('h4:nth-child(1)').textContent;
    let priority = taskItem.querySelector('p:nth-child(2)').textContent;
    let dueDate = taskItem.querySelector('p:nth-child(3)').textContent;
    let taskStatus = taskItem.querySelector('p:nth-child(4)').textContent;

    document.querySelector(".modal").style.display = "block";
    document.getElementById("task-name").value = taskName;
    document.getElementById("priority").value = priority;
    document.getElementById("due-date").value = dueDate;
    document.getElementById("status").value = taskStatus;

    // Remove the old task from the data array
    let index = data.findIndex(item => item.taskName === taskName && item.priority === priority && item.dueDate === dueDate && item.taskStatus === taskStatus);
    data.splice(index, 1);
    deleteTask(e);

  }
  function prio(priority){
    if(priority=='low'){
        return "background-color:green";
    }
    else if(priority=='medium'){
        return "background-color:red";
    }
    else{
        return "background-color:blue";
    }
}

function stat(taskStatus){
    if(taskStatus=='not-started'){
        return "background-color:rgb(206, 40, 11)";
    }
    else if(taskStatus=='in-progress'){
        return "background-color:tomato;";
    }
    else{
        return "background-color:rgb(6, 151, 28);";
    }
}



  let resetForm = () => {
    taskName.value="";
    priority.value="";
    dueDate.value="";
    taskStatus.value="";
}