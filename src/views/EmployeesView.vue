<template>
  <div class="employees">
    <MyBanner />
    <MyTable />
  </div>
  <nav class="link" id="link">
    <router-link to="/">&#x21A9; Home</router-link>
  </nav>
  <MyFooter />
</template>
<script>
import MyBanner from "@/components/MyBanner.vue";
import MyFooter from "@/components/MyFooter.vue";
import MyTable from "@/components/MyTable.vue";

export default {
  name: "EmployeesView",

  components: {
    MyBanner,
    MyFooter,
    MyTable,
  },
};
</script>

<style scoped>
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
</style>
