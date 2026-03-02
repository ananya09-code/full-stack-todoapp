const form=document.getElementById("add")
const task=document.querySelector(".con2")
const del=document.querySelector(".del")
function showssign(data){
    if(!data?.length){ 
      task.innerHTML=`
      <h2 class="worn">THERE IS NO TASK YET!</h2>
      
      `
      
    }};
async function delet(id){
  try{
    const calldel=await fetch(url2=`/api/remove/${id}`,{method:"post"})
    const data=calldel.json()
    console.log("succes",data)
  }catch(error){
    console.log("there is a problem",error)
  }
  
}
async function getdata(){
    try{
        const response= await fetch(url='/api/viwe')
        const data= await response.json()
        console.log(data)
      const html = data.map(t => `
      <div class="card-task">
        <div class="task-title">
          <span class="id">${t.id}</span>
          <span>${t.name}</span>
          <button class="del">delete</button>
        </div>
        <div class="note">${t.note}</div>
        <div class="status">
          status: <span class="task-status">pending</span>
        </div>
      </div>
    `).join('');
    task.innerHTML = html;
    showssign(data)
    }catch(error){
        console.log("there is aproblem ")
    }
}





 form.addEventListener("submit", async function(event){
    event.preventDefault();
    const formData = new FormData(form);
    await fetch('/add', { method: 'POST', body: formData });
    getdata();
})
getdata();

task.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('del')) {
    const card = e.target.closest('.card-task');
    const idElement = card.querySelector('.id');
    const id = idElement.textContent;
    delet(id);
    card.remove();
    showssign(true)
}});