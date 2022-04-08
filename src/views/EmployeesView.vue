<template>
  <div class="employees">
    <MyBanner />

    <MyModal
      v-if="isInEditMode"
      :employee="employeeToEdit"
      @updateemployee="updateEmployee($event)"
      @cancel="cancelEdit"
    />

    <div class="input">
      <input
        type="search"
        name=""
        id="search"
        placeholder="Search"
        v-model="letters"
        @input="filter"
      />
    </div>
    <table width="90%" border="1">
      <caption>
        <h2>Current Employees</h2>
      </caption>

      <thead>
        <tr>
          <th width="9%">First Name</th>
          <th width="9%">Last Name</th>
          <th width="9%">Start Date</th>
          <th width="9%">Department</th>
          <th width="9%">Birth Date</th>
          <th width="9%">Street</th>
          <th width="9%">City</th>
          <th width="9%">State</th>
          <th width="9%">Zip Code</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="employees.length === 0">
          <td colspan="11" class="no-data">No data available in table</td>
        </tr>
        <tr v-for="employee in employeesFiltered" :key="employee.id">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.startDate }}</td>

          <td>{{ employee.department }}</td>
          <td>{{ employee.birthDate }}</td>
          <td>{{ employee.street }}</td>
          <td>{{ employee.city }}</td>
          <td>{{ employee.state }}</td>
          <td>{{ employee.zipCode }}</td>

          <td>
            <button @click="() => deleteEmployee(employee.id)">Delete</button>
          </td>
          <td><button @click="() => toggle(employee)">Update</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <nav class="link" id="link">
    <router-link to="/">&#x21A9; Home</router-link>
  </nav>
</template>
<script>
// @ is an alias to /src
import MyBanner from "@/components/MyBanner.vue";
import MyModal from "@/components/MyModal.vue";
import { ref } from "vue";
import employeesService from "@/services/employees.js";

export default {
  name: "EmployeesView",
  data() {
    return {
      columns: [
        { name: "firstName", text: "First Name" },
        { name: "lastName", text: "Last Name" },
        { name: "startDate", text: "Start Date" },
        { name: "department", text: "Department" },
        { name: "birthDate", text: "Birth Date" },
        { name: "street", text: "Street" },
        { name: "firstName", text: "First Name" },
        { name: "firstName", text: "First Name" },
        { name: "firstName", text: "First Name" },
      ],
    };
  },
  components: {
    MyBanner,
    MyModal,
  },
  methods: {},
  setup() {
    const employees = ref([]);
    const letters = ref("");

    let employeesFiltered = ref([]);
    let isInEditMode = ref(false);
    let employeeToEdit = ref(null);
    employees.value = employeesService.read();
    filter();

    function filter() {
      console.log(letters.value);
      if (letters.value.length === 0) {
        employeesFiltered.value = employees.value;
      } else {
        employeesFiltered.value = employees.value.filter(
          (e) =>
            e.firstName
              .toLocaleLowerCase()
              .includes(letters.value.toLocaleLowerCase()) ||
            e.lastName
              .toLocaleLowerCase()
              .includes(letters.value.toLocaleLowerCase()) ||
            e.city
              .toLocaleLowerCase()
              .includes(letters.value.toLocaleLowerCase())
        );
      }

      console.log("employeesFiltered", employeesFiltered);
    }

    function toggle(employee) {
      employeeToEdit.value = employee;
      isInEditMode.value = true;
    }
    function updateEmployee(employee) {
      console.log("updateEmployee", employee);
      employeesService.updateEmployee(employee);
      employees.value = employeesService.read();
      cancelEdit();
    }
    function cancelEdit() {
      isInEditMode.value = false;
      employeeToEdit.value = null;
    }
    function deleteEmployee(id) {
      employeesService.deleteEmployee(id);
      employees.value = employeesService.read();
      filter();
    }

    return {
      employees,
      letters,
      employeesFiltered,
      filter,
      deleteEmployee,
      isInEditMode,
      employeeToEdit,
      toggle,
      updateEmployee,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
h2 {
  width: 25%;
  color: #444444;
  font-size: 2rem;
  font-weight: bold;
  background-color: #d5db99;
  border: 0.5rem ridge #d5db99;
  margin-bottom: 0.5rem;
}
table {
  table-layout: fixed;
  width: 95%;
  border-collapse: collapse;
  border: 0.5rem ridge #444444;
  margin: 1rem auto;
  text-align: center;
}
th,
td {
  color: black;
  padding: 0.3rem;
  font-size: 0.9rem;
}
thead th {
  padding-bottom: 0.5rem;
  font-size: 1.4rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
}
table tbody tr:nth-child(odd) {
  background-color: #eaecce;
  border-bottom: solid 0.05rem #9fa09b;
}
table tbody tr:nth-child(even) {
  background-color: #daddc8;
  border-bottom: solid 0.05rem #9fa09b;
}

table tbody tr:hover {
  background-color: #b4d179;
}

table td:nth-child(3),
table td:nth-child(4) {
  background-color: rgba(0, 0, 0, 0.08);
}

button {
  margin: auto 1%;
}
input {
  height: 2rem;
  width: 10rem;
  margin-left: 1rem;
  padding-left: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgb(206, 206, 128);
  font-size: 1.2rem;
  font-weight: bold;
}
.input {
  margin-right: 0;
  margin-bottom: -3rem;
  padding-right: 5%;
  text-align: right;
}
caption {
  width: auto;
}
.no-data {
  font-size: 1.2rem;
  font-weight: bold;
}

.link {
  margin: 0.5rem auto;
  width: 5%;
  height: 0.1rem;
  line-height: 0.1rem;
  padding: auto;
  background-color: #444;
  border-radius: 0.5rem;
}
.link a {
  color: white;
}
button {
  width: 80%;
}
</style>
