const form = document.getElementById("add-task-form");
const task = document.querySelector(".task-list");
const dark=document.getElementById("dark")


function checkStatus() {
  const selecter=document.querySelectorAll(".taskop")
  selecter.forEach(task => {
    for (let option of task.options) {
      if (option.defaultSelected) {
        if (option.value === "false") {
          const card2 = task.closest(".card-task");
          task.style.backgroundColor = "black";
          task.style.color = "white";
          card2.style.opacity = "0.3";
        }
        break;
      }
    }
  });
}   
async function updatestatus(id,newStatus){
  try{

  const callstatus= await fetch(url4=`api/status/${id}`,{method:"POST"
     ,headers: {
     'Content-Type': 'application/json',},
     body:JSON.stringify({newStatus})})                     
     const data = await callstatus.json()
     console.log(data)
  } catch(error){
    console.log("there is a problem")
  }



}


async function updatetask(upid,newtitle,newnote){
  try{

  const callup= await fetch(url3=`api/update/${upid}`,{method:"POST"
     ,headers: {
     'Content-Type': 'application/json',},
     body:JSON.stringify({newtitle,newnote})})
                          
     const data = await callup.json()
     if(data){
      alert("task updated")
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
    getdata(); 
  } catch (error) {
    console.log("there is a problem", error);
  }
}

async function getdata() {
  try {
    const response = await fetch("/api/viwe");
    const data = await response.json();

    const html = data.map(t => {
      let selectedTrue = "";
      if (t.status===false){
        selectedTrue="selected"

      }else{
        selectedTrue=""
      }

      return `
        <div class="card-task">
          <div class="task-title">
            <span class="id">${t.id}</span>
            <span class="title">${t.name}</span>
            <button class="del">Delete</button>
          </div>
          <div class="note">📝  ${t.note}</div>
          <div class="status-con">
            Status: <select class="taskop">
                   <option value="true" >panding</option>
                    <option value="false" ${selectedTrue}>completed</option></select>
             <div class="ed">
          <button class="edit">Edit</button></div>
          </div>
        </div>
      `;
    }).join('');




    task.innerHTML = html;
    showssign(data);
    checkStatus();
    

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
dark.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
})

task.addEventListener("change", function(e) {
  if (e.target.classList.contains("taskop")) {

    const select = e.target;
    const card = select.closest(".card-task");
    const id = card.querySelector(".id").textContent;

    const newStatus = select.value === "true";
    if (!newStatus) {
      select.style.backgroundColor = "black";
      select.style.color = "white";
      card.style.opacity="0.3"
    } else {
      select.style.backgroundColor = "";
      select.style.color = "";
      card.style.opacity = "";
    }

    updatestatus(id, newStatus);
    
  }
});
getdata();
checkStatus();


