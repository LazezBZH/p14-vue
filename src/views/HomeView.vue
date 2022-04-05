<template>
  <div class="home">
    <MyBanner />
    <h2>Your application to manage human ressources</h2>
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
}
</style>
