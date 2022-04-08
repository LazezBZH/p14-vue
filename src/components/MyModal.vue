<template>
  <div class="modal-background">
    <div class="modal">
      <div>
        <h2>Modifier cet employé</h2>
        <form @submit.prevent="saveEmployee">
          <div class="datas">
            <p>First Name</p>
            <input
              type="text"
              v-model="employeeToEdit.firstName"
              ref="txtName"
            />
            <p>Last Name</p>
            <input
              type="text"
              placeholder="Enter Last Name"
              v-model="employeeToEdit.lastName"
            />
            <p>Birth Date</p>
            <input type="date" v-model="employeeToEdit.birthDate" />
            <p>Start Date</p>
            <input type="date" v-model="employeeToEdit.startDate" />
            <div class="adress">
              <p>Street</p>
              <input
                type="text"
                placeholder="Enter The Street"
                v-model="employeeToEdit.street"
              />
              <p>City</p>
              <input
                type="text"
                placeholder="Enter The City"
                v-model="employeeToEdit.city"
              />
              <p>State</p>
              <select name="" id="" v-model="employeeToEdit.state">
                <option disabled value="">Select a State</option>
                <option
                  v-for="stat in states"
                  :value="stat.value"
                  :key="stat.id"
                  :selected="stat.value === employeeToEdit.state"
                >
                  {{ stat.name }}
                </option>
              </select>
              <p>Zip Code</p>
              <input
                type="number"
                placeholder="Enter The Zip Code"
                v-model="employeeToEdit.zipCode"
              />
            </div>
            <p>Department</p>
            <select name="" id="" v-model="employeeToEdit.department">
              <option disabled value="">Select a Department</option>
              <option
                v-for="dep in departments"
                :value="dep.value"
                :key="dep.id"
                :selected="dep.value === employeeToEdit.department"
              >
                {{ dep.name }}
              </option>
            </select>
          </div>
          <button :disabled="!isFormValid">Sauvegarder</button>
          <button @click="cancel">Annuler</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  name: "MyModal",
  props: {
    employee: {
      require: true,
    },
  },
  setup(props, context) {
    let employeeToEdit = ref({ ...props.employee });

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
    let state = ref("");
    const departments = ref([
      { id: 1, value: "sales", name: "Sales" },
      { id: 2, value: "marketing", name: "Marketing" },
      { id: 3, value: "engineering", name: "Engineering" },
      { id: 4, value: "humanResources", name: "Human Resources" },
      { id: 5, value: "legal", name: "Legal" },
    ]);
    let department = ref("");

    function saveEmployee() {
      const employeeUpdated = {
        id: employeeToEdit.value.id,
        firstName: employeeToEdit.value.firstName,
        lastName: employeeToEdit.value.lastName,
        startDate: employeeToEdit.value.startDate,
        birthDate: employeeToEdit.value.birthDate,
        street: employeeToEdit.value.street,
        city: employeeToEdit.value.city,
        state: employeeToEdit.value.state,
        department: employeeToEdit.value.department,
        zipCode: employeeToEdit.value.zipCode,
      };
      console.log("taskUpdated", employeeToEdit);
      context.emit("updateemployee", employeeUpdated);
    }
    function cancel() {
      context.emit("cancel");
    }
    const isFormValid = computed(() => {
      if (
        employeeToEdit.value.firstName !== "" &&
        employeeToEdit.value.lastName !== "" &&
        employeeToEdit.value.city !== ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    return {
      states,
      state,
      departments,
      department,
      employeeToEdit,
      saveEmployee,
      cancel,
      isFormValid,
    };
  },
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: table;
  transition: opacity 05s ease;
}
.modal {
  width: 50%;
  margin: 2rem auto;
  border: 0.3rem solid #42b983;
  border-radius: 0.8rem;
  background-color: white;
  padding-bottom: 2rem;
}
input,
textarea,
select {
  width: 60%;
  margin: 0.5rem auto;
}
input,
select {
  height: 1.7rem;
}
button {
  margin: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  background: #42b983;
  color: white;
  padding: 0.4rem;
  cursor: pointer;
}
button:disabled {
  color: rgba(255, 0, 0, 0.4);
  cursor: not-allowed;
}
</style>
