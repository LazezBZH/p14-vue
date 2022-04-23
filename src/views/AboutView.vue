<template>
  <h2>
    Nouvelle version du P14 de la formation développeur front-end de
    OpenClassRooms
  </h2>
  <div class="about">
    <p>Projet initial en React</p>
    <p>Cette version est en vuejs</p>
    <p>Ajout de nouvelles fonctionnalités:</p>
    <ul>
      <li>possibilité d'éditer une entrée</li>
      <li>possibilité de supprimer une entrée</li>
      <li>
        possibilité de sélectionner les employés d'un département via bouton
        radio
      </li>
    </ul>

    <p>
      Ce projet fonctionne avec le locastorage, onMounted ajoute à l'ouverture
      quelques données dans le localstorage afin que vous puissiez voir les
      fonctionnalités du tableau sans devoir entrer par vous mêmes ces données,
      vous pouvez les supprimer ou les éditer, ajouter d'autres entrées.
    </p>
    <p>Projet en cours de développement, responsive pas encore géré.</p>
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
  margin-bottom: 0;
  margin-top: 3rem;
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
  margin-top: 3.1rem;
}
</style>
