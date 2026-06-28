const students = [
  { nombre: "Maria", apellidos: "Mora Perez", nota: 90 },
  { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
  { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 }
];

const form = document.querySelector("#student-form");
const nombreInput = document.querySelector("#nombre");
const apellidosInput = document.querySelector("#apellidos");
const notaInput = document.querySelector("#nota");
const message = document.querySelector("#message");
const tableBody = document.querySelector("#students-table");
const highestStudent = document.querySelector("#highest-student");
const averageGrade = document.querySelector("#average-grade");
const lowestGrade = document.querySelector("#lowest-grade");

function getGradeClass(nota) {
  if (nota >= 80) {
    return "nota-alta";
  }

  if (nota < 65) {
    return "nota-baja";
  }

  return "";
}

function renderStudents() {
  tableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const gradeCell = document.createElement("td");
    const gradeClass = getGradeClass(student.nota);

    nameCell.textContent = student.nombre;
    lastNameCell.textContent = student.apellidos;
    gradeCell.textContent = student.nota;
    gradeCell.className = gradeClass;

    row.append(nameCell, lastNameCell, gradeCell);
    tableBody.appendChild(row);
  });
}

function updateSummary() {
  const total = students.reduce((sum, student) => sum + student.nota, 0);
  const average = total / students.length;
  const highestGrade = Math.max(...students.map((student) => student.nota));
  const topStudents = students.filter((student) => student.nota === highestGrade);
  const lowest = students.reduce((minimum, student) => {
    return student.nota < minimum.nota ? student : minimum;
  });

  highestStudent.textContent = `${topStudents
    .map((student) => `${student.nombre} ${student.apellidos}`)
    .join(", ")} (${highestGrade})`;
  averageGrade.textContent = average.toFixed(2);
  lowestGrade.textContent = lowest.nota;
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function clearForm() {
  form.reset();
  nombreInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = nombreInput.value.trim();
  const apellidos = apellidosInput.value.trim();
  const nota = Number(notaInput.value);

  if (!nombre || !apellidos || notaInput.value.trim() === "") {
    showMessage("Todos los campos son obligatorios.", "error");
    return;
  }

  if (Number.isNaN(nota) || nota < 0 || nota > 100) {
    showMessage("La nota debe ser un valor numérico entre 0 y 100.", "error");
    return;
  }

  students.push({ nombre, apellidos, nota });
  renderStudents();
  updateSummary();
  showMessage("Estudiante agregado correctamente.", "success");
  clearForm();
});

renderStudents();
updateSummary();
