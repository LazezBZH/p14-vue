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
      <MyForm />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyBanner from "@/components/MyBanner.vue";
import MyForm from "@/components/MyForm.vue";

export default {
  name: "HomeView",
  components: {
    MyBanner,
    MyForm,
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
