<template>
  <div class="home">
    <MyBanner />
    <h2>Your application to manage human ressources</h2>
    <h3>HRnet</h3>
    <div>
      <nav class="link" id="link">
        <router-link to="/employees"
          >View Current Employees &#x21AA;</router-link
        >
      </nav>
      <MyForm @createemployee="addEmployee" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyBanner from "@/components/MyBanner.vue";
import MyForm from "@/components/MyForm.vue";
import employeesServices from "@/services/employees.js";
import { onMounted } from "vue";

export default {
  name: "HomeView",
  components: {
    MyBanner,
    MyForm,
  },
  setup() {
    onMounted(() => {
      let employees = JSON.parse(localStorage.getItem("employees-vue")) || [
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
      localStorage.setItem("employees-vue", JSON.stringify(employees));
    });
    function addEmployee(data) {
      console.log("coucou");
      console.log("Home.vue | addEmployee()", data);
      employeesServices.create(data);
    }
    return { addEmployee };
  },
};
</script>
<style scoped>
h2 {
  text-align: left;
  margin-left: 10%;
  font-size: 1.8rem;
}
h3 {
  color: #444;
  font-size: 2.5rem;
  font-weight: bolder;
  margin-bottom: 0;
}
.link {
  margin: 0.5rem auto;
  width: 22%;
  height: 0.1rem;
  line-height: 0.1rem;
  padding: auto;
  background-color: #444;
  border-radius: 0.5rem;
}
.link a {
  color: white;
}
</style>
