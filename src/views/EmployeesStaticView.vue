<template>
  <div class="employees">
    <MyBanner />

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
            <button class="notallowed">Delete</button>
          </td>
          <td><button class="notallowed">Update</button></td>
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
</template>
<script>
import MyBanner from "@/components/MyBanner.vue";
import MyPagination from "@/components/MyPagination.vue";
import { ref } from "vue";
import employeesService from "@/services/employees.js";

export default {
  name: "EmployeesStaticView",
  data() {
    return {
      currentPage: 1,
      entrie: 5,
    };
  },
  components: {
    MyBanner,
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
    const employees = [
      {
        id: 1,
        firstName: "Bob",
        lastName: "Léponge",
        startDate: "2022-04-20",
        department: "Engineering",
        birthDate: "1994-03-29",
        street: "5 aqua street",
        city: "Palma",
        state: "GU",
        zipCode: 10000,
      },
      {
        id: 2,
        firstName: "Jack",
        lastName: "Léventreur",
        startDate: "2021-09-28",
        department: "Engineering",
        birthDate: "1954-01-29",
        street: "95 terror street",
        city: "Larks",
        state: "HI",
        zipCode: 58926,
      },
      {
        id: 3,
        firstName: "John",
        lastName: "Snow",
        startDate: "2020-08-20",
        department: "Engineering",
        birthDate: "2000-03-20",
        street: "98 winter street",
        city: "Coldcity",
        state: "VT",
        zipCode: 25489,
      },
      {
        id: 4,
        firstName: "Aria",
        lastName: "Stark",
        startDate: "2021-10-10",
        department: "Engineering",
        birthDate: "2008-03-09",
        street: "58 game street	",
        city: "Lieurks",
        state: "PW",
        zipCode: 10800,
      },
      {
        id: 5,
        firstName: "Ella",
        lastName: "Fitj",
        startDate: "1999-12-03",
        department: "Engineering",
        birthDate: "1975-03-29",
        street: "8 round street",
        city: "London",
        state: "WI",
        zipCode: 85000,
      },
      {
        id: 6,
        firstName: "Sarah",
        lastName: "Connor",
        startDate: "2020-01-30",
        department: "Engineering",
        birthDate: "1964-03-25",
        street: "9 wild street",
        city: "Banko",
        state: "TX",
        zipCode: 96050,
      },
      {
        id: 7,
        firstName: "Dana",
        lastName: "Kill",
        startDate: "2022-04-20",
        department: "Engineering",
        birthDate: "1985-03-29",
        street: "38 no street	",
        city: "Jumaji",
        state: "SC",
        zipCode: 26584,
      },
      {
        id: 8,
        firstName: "Hello",
        lastName: "World",
        startDate: "2021-12-08",
        department: "Engineering",
        birthDate: "2002-01-29",
        street: "866 Hop street",
        city: "Where",
        state: "AK",
        zipCode: 80900,
      },
      {
        id: 9,
        firstName: "Tar	",
        lastName: "Zan",
        startDate: "2021-07-17",
        department: "Engineering",
        birthDate: "1922-01-01",
        street: "258 jungle street",
        city: "Savana",
        state: "DC",
        zipCode: 10850,
      },
      {
        id: 10,
        firstName: "Petit",
        lastName: "Padawan",
        startDate: "2022-04-20",
        department: "Engineering",
        birthDate: "2002-03-29",
        street: "45 i don't know",
        city: "Here",
        state: "KS",
        zipCode: 32856,
      },
      {
        id: 11,
        firstName: "Harry",
        lastName: "Potter",
        startDate: "2014-07-20",
        department: "Engineering",
        birthDate: "1992-07-07",
        street: "9.3/4 quay",
        city: "Poudlard",
        state: "OR",
        zipCode: 66666,
      },
    ];
    const letters = ref("");
    const entrie = ref("");
    const page = ref("");
    const perpage = entrie;
    let employeesFiltered = ref([]);

    let isInEditMode = ref(false);
    let employeeToEdit = ref(null);

    employees.value = [...employees];
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

      console.log("employeesFiltered", employeesFiltered);
    }

    return {
      letters,
      employeesFiltered,
      filter,

      isInEditMode,
      employeeToEdit,

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
  margin-bottom: -4.5rem;
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
  margin-bottom: -2rem;
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

.notallowed {
  cursor: not-allowed;
}
</style>
