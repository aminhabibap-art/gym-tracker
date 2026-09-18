const workoutForm = document.getElementById('workout-form');
const exerciseInput = document.getElementById('exercise');
const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const setsInput = document.getElementById('sets');
const logList = document.getElementById('log-list');

let logs = JSON.parse(localStorage.getItem('gymLogs')) || [];

document.addEventListener('DOMContentLoaded', renderLogs);

workoutForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const newLog = {
    id: Date.now(),
    exercise: exerciseInput.value,
    weight: weightInput.value,
    reps: repsInput.value,
    sets: setsInput.value
  };

  logs.push(newLog);
  localStorage.setItem('gymLogs', JSON.stringify(logs));
  renderLogs();
  workoutForm.reset();
});

function renderLogs() {
  logList.innerHTML = '';
  logs.forEach(log => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${log.exercise}</strong>: ${log.weight}kg × ${log.reps} reps (${log.sets} sets)</span>
      <button class="delete-btn" onclick="deleteLog(${log.id})">✕</button>
    `;
    logList.appendChild(li);
  });
}

function deleteLog(id) {
  logs = logs.filter(log => log.id !== id);
  localStorage.setItem('gymLogs', JSON.stringify(logs));
  renderLogs();
}
