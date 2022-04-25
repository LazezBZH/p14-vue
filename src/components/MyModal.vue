<template>
  <div class="modal-background">
    <div class="modal">
      <div>
        <h1>Update this employee's data</h1>
        <form @submit.prevent="saveEmployee">
          <div class="datas">
            <p>First Name</p>
            <input
              type="text"
              v-model="employeeToEdit.firstName"
              placeholder="Enter First Name"
            />
            <p>Last Name</p>
            <input
              type="text"
              placeholder="Enter Last Name"
              v-model="employeeToEdit.lastName"
            />
            <p>Birth Date</p>
            <input
              class="date"
              type="date"
              v-model="employeeToEdit.birthDate"
            />
            <p>Start Date</p>
            <input
              class="date"
              type="date"
              v-model="employeeToEdit.startDate"
            />
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
          <button @click="cancel">Cancel</button>
          <button :disabled="!isFormValid">Save &#x1F4BE;</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  name: "MyModal",
  emits: ["updateemployee", "cancel"],
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
      { id: 1, value: "Sales", name: "Sales" },
      { id: 2, value: "Marketing", name: "Marketing" },
      { id: 3, value: "Engineering", name: "Engineering" },
      { id: 4, value: "Human Resources", name: "Human Resources" },
      { id: 5, value: "Legal", name: "Legal" },
    ]);
    let department = ref("");
    function saveEmployee() {
      const employeeUpdated = {
        id: employeeToEdit.value.id,
        firstName: employeeToEdit.value.firstName,
        lastName: employeeToEdit.value.lastName,
        startDate: employeeToEdit.value.startDate,
        department: employeeToEdit.value.department,
        birthDate: employeeToEdit.value.birthDate,
        street: employeeToEdit.value.street,
        city: employeeToEdit.value.city,
        state: employeeToEdit.value.state,
        zipCode: employeeToEdit.value.zipCode,
      };
      console.log("employeeUpdated", employeeUpdated);
      context.emit("updateemployee", employeeUpdated);
      location.reload();
    }
    function cancel() {
      context.emit("cancel");
    }
    const isFormValid = computed(() => {
      if (
        employeeToEdit.value.firstName !== "" &&
        employeeToEdit.value.lastName !== "" &&
        employeeToEdit.value.birthDate !== "" &&
        employeeToEdit.value.startDate !== "" &&
        employeeToEdit.value.street !== "" &&
        employeeToEdit.value.city !== "" &&
        employeeToEdit.value.state !== "" &&
        employeeToEdit.value.zipCode !== "" &&
        employeeToEdit.value.department !== ""
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
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150%;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal {
  width: 40%;
  margin: 2rem auto;
  border: 0.5rem solid #2c3e50;
  border-radius: 0.8rem;
  background-color: rgb(196, 196, 170);
  padding-bottom: 2rem;
}
.datas {
  width: 60%;
  margin: auto;
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
  background: #2c3e50;
  color: white;
  padding: 0.7rem;
  cursor: pointer;
}
button:disabled {
  color: rgba(255, 0, 0, 0.4);
  cursor: not-allowed;
}
.adress {
  width: 55%;
  border: solid 2px #6c8312;
  border-radius: 0.4rem;
  padding: 0.2rem 0.2rem 14rem 02rem;
  margin: 1.5rem auto;
  height: 14rem;
  position: relative;
}
.adress input,
.adress select {
  width: 85%;
}
.date {
  width: 30%;
}
</style>
