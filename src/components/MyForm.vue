<template>
  <div class="form">
    <modale v-bind:revele="revele" v-bind:toggleModal="toggleModal"></modale>
    <div class="form-title">Create Employee</div>
    <form v-on:submit.prevent="createEmployee">
      <div class="datas">
        <p>First Name</p>
        <input
          type="text"
          placeholder="Enter First Name"
          v-model="firstName"
          ref="txtName"
        />
        <p>Last Name</p>
        <input type="text" placeholder="Enter Last Name" v-model="lastName" />
        <p>Birth Date</p>
        <input type="date" v-model="birthDate" />
        <p>Start Date</p>
        <input type="date" v-model="startDate" />
        <div class="adress">
          <p>Street</p>
          <input type="text" placeholder="Enter The Street" v-model="street" />
          <p>City</p>
          <input type="text" placeholder="Enter The City" v-model="city" />
          <p>State</p>
          <select name="" id="" v-model="state">
            <option disabled value="">Select a State</option>
            <option v-for="stat in states" :value="stat.value" :key="stat.id">
              {{ stat.name }}
            </option>
          </select>
          <p>Zip Code</p>
          <input
            type="number"
            min="10000"
            placeholder="Enter The Zip Code"
            v-model="zipCode"
          />
        </div>
        <p>Department</p>
        <select name="" id="" v-model="department">
          <option disabled value="">Select a Department</option>
          <option v-for="dep in departments" :value="dep.value" :key="dep.id">
            {{ dep.name }}
          </option>
        </select>
      </div>
      <button :disabled="!isFormValid" v-on:click="toggleModal">
        Save &#x00AE;
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import MyFormModal from "../components/MyFormModal.vue";
//import employees from "@/services/employees";
export default {
  name: "MyForm",
  data() {
    return {
      revele: false,
    };
  },
  components: {
    modale: MyFormModal,
  },
  methods: {
    toggleModal: function () {
      this.revele = !this.revele;
    },
  },
  emits: ["createemployee"],
  setup(props, context) {
    const firstName = ref("");
    const lastName = ref("");
    const startDate = ref("");
    const department = ref("");
    const birthDate = ref("");
    const street = ref("");
    const city = ref("");
    const state = ref("");
    const zipCode = ref("");

    const states = ref([
      { id: 1, value: "AL", name: "Alabama" },
      { id: 2, value: "AK", name: "Alaska" },
      { id: 3, value: "AS", name: "American Samoa" },
      { id: 4, value: "AZ", name: "Arizona" },
      { id: 5, value: "AR", name: "Arkansas" },
      { id: 6, value: "CA", name: "California" },
      { id: 7, value: "CO", name: "Colorado" },
      { id: 8, value: "CT", name: "Connecticut" },
      { id: 9, value: "DE", name: "Delaware" },
      { id: 10, value: "DC", name: "District Of Columbia" },
      { id: 11, value: "FM", name: "Federated States Of Micronesia" },
      { id: 12, value: "FL", name: "Florida" },
      { id: 13, value: "GA", name: "Georgia" },
      { id: 14, value: "GU", name: "Guam" },
      { id: 15, value: "HI", name: "Hawaii" },
      { id: 16, value: "ID", name: "Idaho" },
      { id: 17, value: "IL", name: "Illinois" },
      { id: 18, value: "IN", name: "Indiana" },
      { id: 19, value: "IA", name: "Iowa" },
      { id: 20, value: "KS", name: "Kansas" },
      { id: 21, value: "KY", name: "Kentucky" },
      { id: 22, value: "LA", name: "Louisiana" },
      { id: 23, value: "ME", name: "Maine" },
      { id: 24, value: "MH", name: "Marshall Islands" },
      { id: 25, value: "MD", name: "Maryland" },
      { id: 26, value: "MA", name: "Massachusetts" },
      { id: 27, value: "MI", name: "Michigan" },
      { id: 28, value: "MN", name: "Minnesota" },
      { id: 29, value: "MS", name: "Mississippi" },
      { id: 30, value: "MO", name: "Missouri" },
      { id: 31, value: "MT", name: "Montana" },
      { id: 32, value: "NE", name: "Nebraska" },
      { id: 33, value: "NV", name: "Nevada" },
      { id: 34, value: "NH", name: "New Hampshire" },
      { id: 35, value: "NJ", name: "New Jersey" },
      { id: 36, value: "NM", name: "New Mexico" },
      { id: 37, value: "NY", name: "New York" },
      { id: 38, value: "NC", name: "North Carolina" },
      { id: 39, value: "ND", name: "North Dakota" },
      { id: 40, value: "MP", name: "Northern Mariana Islands" },
      { id: 41, value: "OH", name: "Ohio" },
      { id: 42, value: "OK", name: "Oklahoma" },
      { id: 43, value: "OR", name: "Oregon" },
      { id: 44, value: "PW", name: "Palau" },
      { id: 45, value: "PA", name: "Pennsylvania" },
      { id: 46, value: "PR", name: "Puerto Rico" },
      { id: 47, value: "RI", name: "Rhode Island" },
      { id: 48, value: "SC", name: "South Carolina" },
      { id: 49, value: "SD", name: "South Dakota" },
      { id: 50, value: "TN", name: "Tennessee" },
      { id: 51, value: "TX", name: "Texas" },
      { id: 52, value: "UT", name: "Utah" },
      { id: 53, value: "VT", name: "Vermont" },
      { id: 54, value: "VI", name: "Virgin Islands" },
      { id: 55, value: "VA", name: "Virginia" },
      { id: 56, value: "WA", name: "Washington" },
      { id: 57, value: "WV", name: "West Virginia" },
      { id: 58, value: "WI", name: "Wisconsin" },
      { id: 59, value: "WY", name: "Wyoming" },
    ]);
    const departments = ref([
      { id: 1, value: "Sales", name: "Sales" },
      { id: 2, value: "Marketing", name: "Marketing" },
      { id: 3, value: "Engineering", name: "Engineering" },
      { id: 4, value: "Human Resources", name: "Human Resources" },
      { id: 5, value: "Legal", name: "Legal" },
    ]);
    let txtName = ref(null);

    function createEmployee() {
      const employee = {
        id: Date.now(),
        firstName: firstName.value,
        lastName: lastName.value,
        startDate: startDate.value,
        department: department.value,
        birthDate: birthDate.value,
        street: street.value,
        city: city.value,
        state: state.value,
        zipCode: zipCode.value,
      };
      console.log("empl", employee);
      context.emit("createemployee", employee);
      resetForm();
    }
    function resetForm() {
      firstName.value = "";
      lastName.value = "";
      birthDate.value = "";
      startDate.value = "";
      street.value = "";
      city.value = "";
      state.value = "";
      zipCode.value = "";
      department.value = "";
      txtName.value.focus();
    }
    onMounted(() => {
      txtName.value.focus();
    });
    const isFormValid = computed(() => {
      if (
        firstName.value !== "" &&
        lastName.value !== "" &&
        birthDate.value !== "" &&
        startDate.value !== "" &&
        street.value !== "" &&
        city.value !== "" &&
        state.value !== "" &&
        zipCode.value !== "" &&
        department.value !== ""
      ) {
        return true;
      } else {
        return false;
      }
    });

    return {
      firstName,
      lastName,
      departments,
      department,
      startDate,
      birthDate,
      street,
      city,
      state,
      states,
      zipCode,
      createEmployee,
      txtName,
      isFormValid,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.datas {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: left;
  color: black;
}
.datas input {
  height: 1.5rem;
  margin-bottom: 0.5rem;
}
.datas select {
  height: 2rem;
}
.form-title {
  width: 50%;
  margin: auto;
  margin-bottom: 1rem;
  color: #444444;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #d5db99;
  border: 0.5rem ridge #d5db99;
}
.form {
  max-width: 30rem;

  margin: auto auto 3rem auto;
  border: 1rem ridge #444444;
  border-radius: 1rem;
  padding: 0.5rem 2rem 2rem 2rem;
  background-color: #c2c27da9;
}
.adress {
  width: 85%;
  border: solid 2px #6c8312;
  border-radius: 0.4rem;
  padding: 0.2rem 0.2rem 8rem 02rem;
  margin: 1.5rem auto;
  height: 14rem;
  position: relative;
}
.adress input,
.adress select {
  width: 85%;
}

button {
  width: 5rem;
  height: 2rem;
  margin: 1rem auto 0;
  background-color: #444444;
  color: white;
  border-radius: 0.5rem;
  padding-bottom: 1.6rem;
  padding-top: 0.6rem;
}
button:disabled {
  background-color: #4444443b;
}
</style>
