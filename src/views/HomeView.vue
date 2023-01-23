<template>
  <div class="home">
    <home />
  </div>
</template>

<script>
// @ is an alias to /src
import home from "../components/home.vue";

export default {
  name: "HomeView",
  components: {
    home,
  },
};
</script>
