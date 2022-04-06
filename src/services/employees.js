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
  const index = employees.findIndex((e) => e.id === employee.id);
  if (index === -1) {
    return;
  }
  employees[index] = employee;
  save();
}

function deleteEmployee(id) {
  employees = employees.filter((e) => e.id !== id);
  save();
}

/*function convertCase(temporalityKebabCase) {
  let result;
  switch (temporalityKebabCase) {
    case "short-term":
      result = "court terme";
      break;
    case "medium-term":
      result = "moyen terme";
      break;
    case "long-term":
      result = "long terme";
      break;
    default:
      result = temporalityKebabCase;
      break;
  }
  return result;
}*/

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
