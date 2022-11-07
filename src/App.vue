<template>
  <v-app>
    <v-main>
      <aside><Nav /></aside>
      <div>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Nav
  }
};
</script>
