const inputbox = document.getElementById('input-box');
const listContainer = document.getElementById('list-containers');
const priority = document.getElementById('priorityInput');
const deadline = document.getElementById('deadlineInput');
let previousInput = "";
let tasks = [];

function addTask() {
    // Chek if the task is empty and user is clicking on add button then give an alert to the user to user
    if (inputbox.value === '') {
        alert('You must write something!');
    }
    else if (priority.value === '') {
        alert('Please add priority!');
    }
    else if (deadline.value === '') {
        alert('Please add a deadline!');
    }

    else {
        // Check if the new input value is the same as the previous input value
        if (inputbox.value === previousInput) {
            alert('You entered the same task again: ' + inputbox.value);
        }
        else {
            // We are giving the current value of inputbox to the prev value of the inputbox
            previousInput = inputbox.value;
            tasks.push({
                task: inputbox.value,

            // parseIn because we basically converting the string value into int value for comparision

                priority: parseInt(priority.value),
                deadline: deadline.value

            });
            
            sortTasksByPriority();
            displayTasks(); // This function will save the task in the listcontainer according to the priority
            saveData();

            // To clear the task, priority and deadline value when user have tab the add button
            inputbox.value = "";
            priority.value = '';
            deadline.value = '';
        }
    }
    
}


// We are shorting the priority here
function sortTasksByPriority() {
    tasks.sort((a, b) => b.priority - a.priority);
}

// Here we are taking all the inputs
function displayTasks() {

    // Every time the user is entering a data we are clearing the previous data and then adding it to listContainer in priority wise.

    // When the displayTasks function is called, it iterates over the tasks array and creates HTML elements for each task. If we don't clear the inner HTML of listContainer before appending the sorted tasks, the new tasks will be added after the existing tasks, resulting in duplicated or mixed-up display of tasks.

    listContainer.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {

        // task varible is having the (i)th task.
        let task = tasks[i];

        // Creating a HTML tag li with ---> createElement("li")
        let li = document.createElement('li');
        // Put the value of (i)th task of the tasks object in the li tag which we have created
        li.innerHTML = task.task;

        // Created a small tag
        let span1 = document.createElement("small");
        // Added a class task to the small tag
        span1.classList.add("task");
        // Putting the value of (i)th task's priority in the small tag created
        span1.innerHTML = 'Priority: ' + task.priority;
        // Appending the span1 or small tag after li tag
        li.appendChild(span1);

        // Created a small tag to collect the deadline
        let span2 = document.createElement("small");
        // Adding a class into it named as deadline
        span2.classList.add("deadline");
        // Adding the value of (i)th task's deadline into small tag which we had created
        span2.innerHTML = 'Deadline: ' + task.deadline;
        // Appending the span2 or small tag after li tag
        li.appendChild(span2);

        // Creating a span element for cross icon
        let span = document.createElement('span');
        // Adding the cross icon by the code
        span.innerHTML = "\u00d7";
        // Adding the cross icon or span tag after li tag
        li.appendChild(span);

        // Finally we are adding li tag created after listContainer
        listContainer.appendChild(li);
    }
    saveData();
}


// Js for click function
listContainer.addEventListener('click', function (e) {
    if (e.target.tagName == 'LI' || e.target.tagName == 'SMALL') {
        e.target.classList.toggle("checked");
        saveData();
    }

    else if (e.target.tagName == 'SPAN') {
        e.target.parentElement.remove();
        saveData();

    } 
}, false)


// Note : There are some issues with SaveData and ShowData

// ---------------------------------SaveData and ShowData----------------------------

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("priority", priority.innerHTML);
    localStorage.setItem("deadline", deadline.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
    priority.innerHTML = localStorage.getItem('priority');
    deadline.innerHTML = localStorage.getItem('deadline');
}

// Function to validate the priority value
function validatePriority(input) {
    const value = parseInt(input.value);
    if (isNaN(value) || value < 1 || value > 5) {
      input.value = '';
      alert("Please enter a valid priority in between 1 to 5 !");
    }
  }

 showTask();