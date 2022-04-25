<template>
  <div class="employees">
    <MyBanner />

    <MyModal
      v-if="isInEditMode"
      :employee="employeeToEdit"
      @updateemployee="updateEmployee($event)"
      @cancel="cancelEdit"
    />

    <div class="entries">
      <label for="choose-entries"> Show</label>
      <select
        name="choose-entries"
        id="choose-entries"
        v-model="entrie"
        @change="goFirstPage()"
      >
        <option :value="5" :key="1">5</option>
        <option :value="10" :key="2">10</option>
        <option :value="25" :key="3">25</option>
        <option :value="50" :key="4">50</option>
        <option :value="100" :key="5">100</option>
      </select>
      <span>entries</span>
    </div>
    <div class="input">
      <input
        type="search"
        name=""
        id="search"
        placeholder="Search"
        v-model="letters"
        @input="
          filter();
          goFirstPage();
        "
      />
    </div>
    <table width="90%" border="1">
      <caption>
        <h2>Current Employees</h2>
        <div class="radio-filters">
          <p>Select employees by department:</p>
          <label for="all"
            ><input
              type="radio"
              id="all"
              value=""
              v-model="selectedDepartment"
            />All</label
          >
          <label for="sales"
            ><input
              type="radio"
              id="sales"
              value="Sales"
              v-model="selectedDepartment"
              @click="goFirstPage()"
            />Sales</label
          >
          <label for="marketing"
            ><input
              type="radio"
              id="marketing"
              value="Marketing"
              v-model="selectedDepartment"
              @click="goFirstPage()"
            />Marketing</label
          >
          <label for="engineering"
            ><input
              type="radio"
              id="engineering"
              value="Engineering"
              v-model="selectedDepartment"
              @click="goFirstPage()"
            />Engineering</label
          >
          <label for="human-ressources"
            ><input
              type="radio"
              id="human-ressources"
              value="Human Resources"
              v-model="selectedDepartment"
              @click="goFirstPage()"
            />Human Resources</label
          >
          <label for="legal"
            ><input
              type="radio"
              id="legal"
              value="Legal"
              v-model="selectedDepartment"
              @click="goFirstPage()"
            />Legal</label
          >
        </div>
      </caption>

      <thead>
        <tr>
          <th
            class="nones"
            v-for="col in columns"
            v-on:click="
              sortTable(col);
              goFirstPage();
            "
            :key="col"
            width="9.2%"
          >
            <div class="sort">clic to sort</div>
            <div class="sortby">{{ convertCase(col) }}</div>

            <div
              class="arrow"
              v-if="col == sortColumn"
              v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="employees == undefined || employees.length <= 0">
          <td colspan="11" class="no-data">No data available in table</td>
        </tr>
        <tr v-if="employeesFiltered.length <= 0 && employees.length > 0">
          <td colspan="11" class="no-data">No result for this research</td>
        </tr>
        <tr v-for="employee in employeesFilteredToShow" :key="employee.id">
          <td class="none">{{ employee.id }}</td>
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
            <button
              @click="
                deleteEmployee(employee.id);
                goFirstPage();
              "
            >
              Delete
            </button>
          </td>
          <td><button @click="() => toggle(employee)">Update</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="showing"
    v-if="
      currentPage === 1 &&
      currentPage < Math.ceil(employeesFiltered.length / entrie)
    "
  >
    Showing {{ (currentPage - 1) * entrie + 1 }} to
    {{ (currentPage - 1) * entrie + entrie }} of
    {{ employeesFiltered.length }} entries
  </div>

  <div
    class="showing"
    v-if="
      currentPage > 1 &&
      currentPage < Math.ceil(employeesFiltered.length / entrie)
    "
  >
    Showing {{ (currentPage - 1) * entrie + 1 }} to
    {{ currentPage * entrie }}
    of
    {{ employeesFiltered.length }} entries
  </div>
  <div
    class="showing"
    v-if="currentPage === Math.ceil(employeesFiltered.length / entrie)"
  >
    Showing {{ (currentPage - 1) * entrie + 1 }} to
    {{ employeesFiltered.length }}
    of
    {{ employeesFiltered.length }} entries
  </div>
  <MyPagination
    v-if="employeesFiltered.length > 0"
    :totalPages="Math.ceil(employeesFiltered.length / entrie)"
    :perPage="entrie"
    :total="employeesFiltered.length"
    :currentPage="currentPage"
    @pagechanged="onPageChange"
    @onClickPreviousPage="onClickPreviousPage"
    @onClickNextPage="onClickNextPage"
  />
  <nav class="link" id="link">
    <router-link to="/">&#x21A9; Home</router-link>
  </nav>
  <MyFooter />
</template>
<script>
import MyBanner from "@/components/MyBanner.vue";
import MyFooter from "@/components/MyFooter.vue";
import MyModal from "@/components/MyModal.vue";

import MyPagination from "@/components/MyPagination.vue";
import { ref, watch } from "vue";
import employeesService from "@/services/employees.js";

export default {
  name: "EmployeesView",
  data() {
    return {
      currentPage: 1,
      entrie: 5,
    };
  },
  components: {
    MyBanner,
    MyModal,
    MyFooter,
    MyPagination,
  },
  methods: {
    goFirstPage() {
      this.$emit((this.currentPage = 1));
    },
    onPageChange(page) {
      this.currentPage = page;
      console.log("coucou page", page);
    },
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.employeesFiltered.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
    onClickNextPage: function () {
      if (this.currentPage * this.entrie < this.employeesFiltered.length)
        this.currentPage++;
    },
    onClickPreviousPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  computed: {
    columns: function columns() {
      if (
        this.employeesFiltered == null ||
        this.employeesFiltered.length == 0
      ) {
        return [
          "First Name",
          "Last Name",
          "Start Date",
          "Department",
          "Date of Birth",
          "Street",
          "City",
          "State",
          "Zip Code",
        ];
      }
      return Object.keys(this.employeesFiltered[0]);
    },
    employeesFilteredToShow: function () {
      return this.employeesFiltered.filter((row, index) => {
        let start = (this.currentPage - 1) * this.entrie;
        let end = this.currentPage * this.entrie;
        if (index >= start && index < end) return true;
      });
    },
  },

  setup() {
    const employees = ref([]);
    const letters = ref("");
    const selectedDepartment = ref("");
    const entrie = ref("");
    const page = ref("");
    const perpage = entrie;
    let employeesFiltered = ref([]);

    let isInEditMode = ref(false);
    let employeeToEdit = ref(null);
    let employeeIsEdited = ref(false);

    employees.value = employeesService.read();
    filter();

    function convertCase(theadTxt) {
      return employeesService.convertCase(theadTxt);
    }

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
      if (selectedDepartment.value !== "") {
        employeesFiltered.value = employeesFiltered.value.filter(
          (emp) => emp.department === selectedDepartment.value
        );
        console.log("employeesFiltered", employeesFiltered);
        console.log("selectedDepartment.value", selectedDepartment.value);
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
      employeeIsEdited.value = true;
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

    watch(selectedDepartment, (newValue, oldValue) => {
      console.log("new: ", newValue, "   ", "old: ", oldValue);
      if (newValue !== "") {
        filter();
      } else {
        employeesFiltered.value = employees.value;
        filter();
      }
    });

    return {
      employees,
      letters,
      selectedDepartment,
      employeesFiltered,
      filter,
      deleteEmployee,
      isInEditMode,
      employeeToEdit,
      toggle,
      updateEmployee,
      cancelEdit,
      convertCase,
      perpage,

      page,
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
  margin-bottom: 1rem;
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
  height: 5rem;
  padding-bottom: 0rem;
  font-size: 1.2rem;
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

td button {
  margin: auto 1%;
  padding: 0;
  font-size: 0.6rem;
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
  margin-bottom: -7.5rem;
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
  width: 90%;
  font-size: 0.8rem;
}
.none,
.nones:first-child {
  display: none;
}

.arrow_down {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC");
}
.arrow_up {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=");
}
.arrow {
  position: absolute;
  top: 3rem;
  width: 1rem;
  height: 1.5rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
  margin-left: 40%;
}
.sort {
  position: absolute;
  font-size: 0.7rem;
  text-align: left;
  top: 0.2rem;
}
.sortby {
  position: absolute;
  top: 1.5rem;
  margin-left: 10%;
}
.nones {
  position: relative;
}

.entries {
  width: 15%;
  height: 2.5rem;
  background-color: #444444;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-left: 3%;
  margin-bottom: -2.5rem;
}
.entries select {
  padding: 0.5rem;
  margin: auto 1rem;
  background-color: rgb(206, 206, 128);
  font-size: 1rem;
  font-weight: bolder;
  border-radius: 0.5rem;
}
.entries label {
  padding: 0.5rem;
  margin: auto 0;
}
.showing {
  color: #486200;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
  margin-left: 3.5%;
}

.radio-filters {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}
.radio-filters p {
  line-height: 0.3rem;
  font-weight: bold;
}
input[type="radio"] {
  -webkit-appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  border: 0.15rem solid darkgray;
  border-radius: 50%;
  outline: none;
}

input[type="radio"]:hover {
  box-shadow: 0 0 1rem 0px #486200 inset;
}

input[type="radio"]:before {
  content: "";
  display: block;
  width: 180%;
  height: 100%;
  margin: auto -0.45rem;
  border-radius: 50%;
}
input[type="radio"]:checked:before {
  background: #486200;
}

@media (max-width: 1440px) {
  input[type="radio"] {
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    margin-top: 0.6rem;
    margin-left: 0.5rem;
  }

  input[type="radio"]:hover {
    box-shadow: 0 0 1rem 0px #486200 inset;
  }

  input[type="radio"]:before {
    width: 340%;
    height: 100%;
  }
}
@media (max-width: 1370px) {
  .radio-filters {
    margin-top: 4rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }
  .entries {
    width: 18%;
  }
}
@media (max-width: 1300px) {
  th,
  td {
    font-size: 0.9rem;
  }
  thead th {
    padding-left: 0.1rem;
    font-size: 1rem;
  }

  td button {
    font-size: 0.6rem;
  }
}
@media (max-width: 1230px) {
  th,
  td {
    font-size: 0.8rem;
  }
  thead th {
    font-size: 0.9rem;
  }

  td button {
    font-size: 0.4rem;
  }
  .sortby {
    margin-left: 0.2rem;
  }
}
@media (max-width: 1150px) {
  .entries {
    width: 22%;
  }
}
</style>
