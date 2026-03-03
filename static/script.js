const form = document.getElementById("add-task-form");
const task = document.querySelector(".task-list");
const edit= document.querySelector(".edit")



async function updatetask(upid,newtitle,newnote){
  try{

  const callup= await fetch(url3=`api/update/${upid}`,{method:"POST"
     ,headers: {
     'Content-Type': 'application/json',},
     body:JSON.stringify({newtitle,newnote})})
                          
     const data = await callup.json()
     if(data){
      alert("task has been updated")
      getdata();
     }
     console.log(data)
    
  } catch(error){
    console.log("there is a problem")
  }

}

function showssign(data) {
  if (!data.length) {
    task.innerHTML = `
      <h2 class="worn">THERE IS NO TASK YET!</h2>
    `;
  }
}

async function delet(id) {
  try {
    const calldel = await fetch(`/api/remove/${id}`, { method: "POST" });
    const data = await calldel.json();
    console.log("success", data);
    getdata(); // refresh list
  } catch (error) {
    console.log("there is a problem", error);
  }
}

async function getdata() {
  try {
    const response = await fetch("/api/viwe");
    const data = await response.json();

    const html = data.map(t => {
      const statusText = t.status ? "Completed" : "Pending";
      const statusClass = t.status ? "completed" : "pending";

      return `
        <div class="card-task">
          <div class="task-title">
            <span class="id">${t.id}</span>
            <span class="title">${t.name}</span>
            <button class="del">Delete</button>
          </div>
          <div class="note">${t.note}</div>
          <div class="status ${statusClass}">
            Status: <span class="task-status">${statusText}</span>
             <div class="ed">
          <button class="edit">Edit</button></div>
          </div>
        </div>
      `;
    }).join('');

    task.innerHTML = html;
    showssign(data);

  } catch (error) {
    console.log("there is a problem", error);
  }
}

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const formData = new FormData(form);
  await fetch('/add', { method: 'POST', body: formData });
  form.reset();
  getdata();
});

task.addEventListener('click', function(e) {
  if (e.target.classList.contains('del')) {
    const card = e.target.closest('.card-task');
    const id = card.querySelector('.id').textContent;
    delet(id);
  }
});
task.addEventListener("click", function(e) {
  if (e.target.classList.contains("edit")) {

    const card = e.target.closest(".card-task");
    const upid = card.querySelector(".id").textContent;
    const title = card.querySelector(".title");
    const note = card.querySelector(".note");
    const button = e.target;

    if (button.textContent === "Edit") {
      title.contentEditable = true;
      note.contentEditable = true;
      title.focus();
      button.textContent = "Save";
    } else {
      title.contentEditable = false;
      note.contentEditable = false;

      const newtitle = title.textContent;
      const newnote = note.textContent;

      button.textContent = "Edit";
      updatetask(upid, newtitle, newnote);
    }
  }
});

getdata();

