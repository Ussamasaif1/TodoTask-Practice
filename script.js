const input = document.getElementById("inputBox");
const Btn1 = document.getElementById("btn");
const Btn2 = document.getElementById("btn2");
const ul = document.getElementById("list");
const reset = document.getElementById("reset");

const update = document.getElementById("counterUpdate");
const complete = document.getElementById("completed");
const pendingCounter = document.getElementById("pendingCounter");

// Recalculates all task counts dynamically
function updateCounters() {
    const totalTasks = ul.children.length;
    
    // Count active completed and pending buttons across the list
    const completedCount = ul.querySelectorAll(".completed-btn.active").length;
    const pendingCount = ul.querySelectorAll(".pending-btn.active").length;

    if (update) update.innerText = `Total Tasks: ${totalTasks}`;
    if (complete) complete.innerText = `Completed Tasks: ${completedCount}`;
    if (pendingCounter) pendingCounter.innerText = `Pending Tasks: ${pendingCount}`;
}

Btn1.addEventListener("click", () => {
    if (input.value.trim() === "") {
        alert("Please enter something!");
        return;
    }

    // Random background color
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Create li
    let li = document.createElement("li");

    // Create span to hold task text
    let text = document.createElement("span");
    text.innerText = input.value;

    // Create span for current timestamp
    let timeSpan = document.createElement("span");
    let now = new Date();
    timeSpan.innerText = ` ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} `;
    timeSpan.classList.add("task-time");

    // Mark tick btn
    let mark = document.createElement("button"); 
    mark.innerText = "Mark";
    
    mark.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    // Create Edit button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    // Create Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    // Create Completed & Pending buttons with specific classes for counting
    let completed = document.createElement("button");
    completed.innerText = "T.Completed";
    completed.classList.add("completed-btn");

    let pending = document.createElement("button");
    pending.innerText = "Pending";
    pending.classList.add("pending-btn");

    // Edit functionality
    editBtn.addEventListener("click", () => {
        let newText = prompt("Edit your task:", text.innerText);
        if (newText !== null && newText.trim() !== "") {
            text.innerText = newText;
        }
    });

    // Delete functionality
    deleteBtn.addEventListener("click", () => {
        let userConfirmed = confirm("Are you sure you want to delete this task?");
        if (userConfirmed) {
            li.remove();
            updateCounters(); // Recalculate everything after removal
        }
    });

    // Toggle button handler
    function handleClick(clickedBtn, otherBtn) {
        if (clickedBtn.classList.contains("active")) {
            // Second click: deactivate button & re-enable the other
            clickedBtn.classList.remove("active");
            otherBtn.disabled = false;
        } else {
            // First click: activate button & disable the other
            clickedBtn.classList.add("active");
            otherBtn.disabled = true;
        }
        
        updateCounters();
    }

    completed.addEventListener("click", () => handleClick(completed, pending));
    pending.addEventListener("click", () => handleClick(pending, completed));

    // Append elements inside li
    li.appendChild(text);
    li.appendChild(timeSpan); // Time added right after text
    li.appendChild(mark);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.appendChild(completed);
    li.appendChild(pending);

    // Append li to ul
    ul.appendChild(li);

    input.value = "";
    updateCounters();
});

input.addEventListener("keydown", (e) => { 
    if (e.key === "Enter") {
        Btn1.click();
    }
});

Btn2.addEventListener("click", () => {
    input.value = "";
    document.body.style.backgroundColor = "white";
});

reset.addEventListener("click", () => {
    ul.innerHTML = "";
    input.value = "";
    document.body.style.backgroundColor = "white";
    updateCounters();
});

// Initial load
updateCounters();