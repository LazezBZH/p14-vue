<template>
  <div class="employees">
    <MyBanner />
    <h2>Current Employees</h2>
    <h2>Toutes les tâches</h2>

    <input
      type="search"
      name=""
      id="search"
      placeholder="Filtrer"
      v-model="letters"
      @keyup="filter"
    />
    <div class="radio-filters">
      <label for="all"
        ><input
          type="radio"
          id="all"
          value=""
          v-model="selectedTemporality"
        />Toutes</label
      >
      <label for="short-term"
        ><input
          type="radio"
          id="short-term"
          value="short-term"
          v-model="selectedTemporality"
        />Court terme</label
      >
      <label for="medium-term"
        ><input
          type="radio"
          id="medium-term"
          value="medium-term"
          v-model="selectedTemporality"
        />Moyen terme</label
      >
      <label for="long-term"
        ><input
          type="radio"
          id="long-term"
          value="long-term"
          v-model="selectedTemporality"
        />Long terme</label
      >
    </div>
    <div v-if="tasks.length > 0">
      <div class="task" v-for="task in tasksFiltered" :key="task.id">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
        <p>Échéance: {{ convertCase(task.temporality) }}</p>
        <button @click="() => deleteTask(task.id)">Supprimer</button>
        <button @click="() => toggle(task)">Modifier</button>
      </div>
    </div>
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
