<template>
  <div class="banner">
    <img alt="logo" src="../assets/WealthHealth.jpg" />
    <h1><span className="name">WealthHealth </span>IntraNetwork</h1>
    <img alt="logo" src="../assets/HRnetLogo.gif" />
  </div>
</template>

<script>
export default {
  name: "MyBanner",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  margin-top: 5rem;
  height: 22vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}
h1 {
  margin: 2rem 5% 0 0;
}
.name {
  color: #444444;
}
.banner img {
  height: 18rem;
  position: relative;
  bottom: 8rem;
}
</style>
