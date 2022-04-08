<template>
  <div class="employees">
    <MyBanner />
    <h2>Current Employees</h2>

    <MyModal
      v-if="isInEditMode"
      :employee="employeeToEdit"
      @updateemployee="updateEmployee($event)"
      @cancel="cancelEdit"
    />
    <input
      type="search"
      name=""
      id="search"
      placeholder="Filtrer"
      v-model="letters"
      @input="filter"
    />

    <div>
      <div
        class="employee"
        v-for="employee in employeesFiltered"
        :key="employee.id"
      >
        <h3>{{ employee.firstName }}</h3>
        <p>{{ employee.lastName }}</p>
        <p>{{ employee.startDate }}</p>

        <p>{{ employee.department }}</p>
        <p>{{ employee.birthDate }}</p>
        <p>{{ employee.street }}</p>
        <p>{{ employee.city }}</p>
        <p>{{ employee.state }}</p>
        <p>{{ employee.zipCode }}</p>

        <button @click="() => deleteEmployee(employee.id)">Supprimer</button>
        <button @click="() => toggle(employee)">Modifier</button>
      </div>
    </div>
  </div>
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
  text-align: left;
  margin-left: 10%;
  font-size: 1.8rem;
}
</style>
