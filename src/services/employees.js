let employees = [];
const storageKey = "employees-vue";

function create(employee) {
  if (employees === null) {
    employees = JSON.parse(localStorage.getItem("employees-vue"));
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
function convertCase(theadConvert) {
  let result;
  switch (theadConvert) {
    case "firstName":
      result = "First Name";
      break;
    case "lastName":
      result = "Last Name";
      break;
    case "startDate":
      result = "Start Date";
      break;
    case "birthDate":
      result = "Date of Birth";
      break;
    case "department":
      result = "Department";
      break;
    case "street":
      result = "Street";
      break;
    case "city":
      result = "City";
      break;
    case "state":
      result = "State";
      break;
    case "zipCode":
      result = "Zip Code";
      break;
    default:
      result = theadConvert;
      break;
  }
  return result;
}

export default {
  create,
  read,
  deleteEmployee,
  updateEmployee,
  convertCase,
};
