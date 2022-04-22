<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/employees">Employees</router-link> |

    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style>
body {
  background-color: #d6db99a9;
}
#app {
  max-width: 1500px;
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #526409;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #8aa716;
}
h1 {
  color: #5a6f08;
}
h2 {
  margin: 0 auto;
  color: #6c8312;
}
</style>
