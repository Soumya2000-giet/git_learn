// public/script.js
const dateInput = document.getElementById('date-input');
const searchBtn = document.getElementById('search-btn');
const markBtn = document.getElementById('mark-btn');
const reportBtn = document.getElementById('report-btn');
const container = document.getElementById('attendance-container');

// Hardcoded student list
const students = ['Rohit', 'Shyam', 'Kavya', 'Krishan'];

function alertMsg(msg) { alert(msg); }

function renderMarked(attMap) {
  container.innerHTML = '';
  students.forEach(name => {
    const status = attMap[name];
    console.log(status)
    const div = document.createElement('div');
    div.className = 'student-row';
    if (status) {
      div.innerHTML = `${name}: ${status === 'present' ? '<span class="tick">✔ Present</span>' : '<span class="cross">✘ Absent</span>'}`;
    } else {
      div.innerHTML = `${name}: <span class="cross">✘ Not marked</span>`;
    }
    container.appendChild(div);
  });
  markBtn.style.display = 'none';
}

function renderForm() {
  container.innerHTML = '';
  students.forEach(name => {
    const div = document.createElement('div');
    div.className = 'student-row';
    div.innerHTML = `
      ${name}: <label><input type="radio" name="${name}" value="present"> Present</label> <label><input type="radio" name="${name}" value="absent"> Absent</label>
    `;
    container.appendChild(div);
  });
  markBtn.style.display = 'inline-block';


  
}

searchBtn.addEventListener('click', async () => {
  const date = dateInput.value;
   if (!date) return alertMsg('Please select a date.');

   let response_li


   try{
     response_li = await axios.get(`http://localhost:3000/Student/getattendance/${date}`)
    //console.log(`get request response ${JSON.stringify(response_li.data)}`)
   }

   catch(err){
    console.log(err)
   }


  if (response_li.data.data) {
    renderMarked(response_li.data.data);
  } else {
    renderForm();
  }
   //renderForm();
});

markBtn.addEventListener('click', async () => {
  const date = dateInput.value;
  if(!date){
    alert('please select a date')
    return
  }
  const rows = document.querySelectorAll('.student-row');
  const attendance = {};
  rows.forEach(row => {
    const name = row.textContent.split(':')[0].trim();
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    attendance[name] = selected ? selected.value : 'unamrked';
    if(attendance[name] === 'unamrked'){
      alert('please select a present/absent')
      return
    }
  });

  console.log(JSON.stringify(attendance))

  console.log(date)

  // await fetch(`/attendance/${date}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ attendance })
  // });
  try{
     const result =await axios.post(`http://localhost:3000/Student/markattendance/${date}`,
         {attendance})

  }
  catch(err){
      console.log(err)
  }


  searchBtn.click();
});

reportBtn.addEventListener('click', async () => {
  const res = await axios.get(`http://localhost:3000/Student/getattendancesummery`);
  const summary = res.data.data
  if (!summary){
    alert('no data available for attendance')
  }
  container.innerHTML = '';
  markBtn.style.display = 'none'; 
  students.forEach(name => {
    const s = summary[name] || { present: 0, total: 0, percentage: 0 };
    const div = document.createElement('div');
    div.className = 'student-row';
    //div.innerHTML = `${name}:${s.present}/${s.total} ${s.percentage}%`;
    div.innerHTML = `<pre>${name.padEnd(10)} ${s.present}/${s.total}   ${s.percentage}%</pre>`;

    container.appendChild(div);
  });
});
