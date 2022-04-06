<template>
  <div class="employees">
    <MyBanner />
    <h2>Current Employees</h2>
  </div>
</template>
<script>
// @ is an alias to /src
import MyBanner from "@/components/MyBanner.vue";

export default {
  name: "HomeView",
  components: {
    MyBanner,
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
