<template>
  <footer class="footer">
    <div class="footer-main">
      <p class="footer-text">Copyright 2022 Wealth Health</p>
      <img class="footer-logo" alt="logo" src="../assets/WealthHealth.jpg" />
    </div>
  </footer>
</template>

<script>
export default {
  name: "MyBanner",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  width: 100%;

  background-color: #6c8312;
  margin: 0 auto;
}
.footer-main {
  width: auto;
  height: 30vh;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer-text {
  margin: auto;
  color: black;
}
.footer-logo {
  height: 15vh;
  margin: 0;
}

@media (max-width: 930px) {
  .footer-main {
    width: 100%;
  }
}
</style>
