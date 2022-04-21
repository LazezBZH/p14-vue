<template>
  <div class="modal" v-if="revele">
    <div class="overlay" v-on:click="toggleModal;"></div>
    <div class="modale">
      <div>Employee created</div>
      <div class="x" v-on:click="toggleModal">X</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyFormModal",
  props: ["revele", "toggleModal"],
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modale {
  display: flex;
  background: rgb(159, 174, 159);
  color: rgb(16, 42, 16);
  padding: 5rem;
  border-radius: 1rem;
  position: fixed;
  top: 25%;
  font-size: 1.5rem;
  font-weight: bold;
}
.x {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  font-size: 1.5rem;
  font-weight: 200;
  background: rgb(16, 42, 16);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  cursor: default;
}
</style>
