<template>
    <div>
        <v-app-bar
        class="primario"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
  
        <v-toolbar-title>{{
            this.$route.path == "/"
              ? "Home"
              : this.$route.name.charAt(0).toUpperCase() + $route.name.slice(1)
          }}</v-toolbar-title>
      </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            </router-link>

            <router-link to="/usuarios">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item>
            </router-link>
  
            <router-link to="/roles">
              <v-list-item>
              	<v-list-item-icon>
                	<v-icon>mdi-account-multiple-plus</v-icon>
              	</v-list-item-icon>
              	<v-list-item-title>Roles</v-list-item-title>
            	</v-list-item>
            </router-link>

						<router-link to="/historial-pagos">
              <v-list-item>
              	<v-list-item-icon>
                	<v-icon>mdi-cash-sync</v-icon>
              	</v-list-item-icon>
              	<v-list-item-title>Pagos</v-list-item-title>
            	</v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>      
</template>
  
<script>

export default {
    name: 'Nav',
    data: () => ({
        drawer: false,
        
    })
}

</script>  
<style lang="scss" scoped>
@import "@/scss/variables-globales.scss";
    .altura {
        height: 100vh;
    }
</style>