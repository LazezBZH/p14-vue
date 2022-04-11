let employees = [];
const storageKey = "employees-vue";

function create(employee) {
  if (employees === null) {
    employees = [];
  }
  employees = [employee, ...employees];
  console.log("empl", employees);
  save();
}
function read() {
  employees = retrieveEmployees();
  return employees;
}

function updateEmployee(employee) {
  const index = employees.findIndex((emp) => emp.id === employee.id);
  if (index === -1) {
    return;
  }
  employees[index] = employee;
  save();
}

function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
  save();
}

function save() {
  localStorage.setItem(storageKey, JSON.stringify(employees));
}

function retrieveEmployees() {
  const fromLocalStorage = localStorage.getItem(storageKey);
  return JSON.parse(fromLocalStorage);
}

export default {
  create,
  read,
  deleteEmployee,
  updateEmployee,
};
