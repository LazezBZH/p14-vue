<template>
  <h2>
    Nouvelle version du P14 de la formation développeur front-end de
    OpenClassRooms
  </h2>
  <div class="about">
    <p>Projet initial en React</p>
    <p>Cette version est en vuejs</p>
    <p>
      Ajout de nouvelles fonctionnalités (pour l'instant possibilité d'éditer ou
      supprimer une entrée)
    </p>
    <p>
      Projet en cours de développement, encore à gérer l'affichage de la
      pagination, le choix du nombre d'entrées.
    </p>
    <div class="links">
      <p>Liens:</p>
      <a
        target="_blank"
        href="https://hrnet-p14-dfe-oc-herault-benedicte.netlify.app/"
        >Projet initial en React</a
      >
      <a
        target="_blank"
        href="https://github.com/LazezBZH/BenedicteHERAULT_14_23112021"
        >github projet en React.js</a
      >
      <a target="_blank" href="https://github.com/LazezBZH/p14-vue"
        >github projet en vue.js</a
      >
    </div>
  </div>
</template>
<style scoped>
h2 {
  font-size: 3rem;
}
.about {
  text-align: left;
}
p {
  font-size: 1.5rem;
}
.links {
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  font-size: 1.3rem;
}
.links p {
  font-weight: bold;
}
.links a {
  color: rgb(33, 178, 33);
  text-decoration: none;
  margin-top: 1.7rem;
}
</style>
