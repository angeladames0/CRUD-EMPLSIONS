<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>CRUD</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-for="(item, index) in rutas" :key="index"
      text @click="InsertarRuta(item.ruta)">
      <span class="mr-2">{{item.nombre}}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    rutas: [
      {nombre:'lista permisos', ruta:'/'},
      {nombre:'Agregar permiso', ruta:'/addpermisos'}
    ]
  }),

  methods: {
    InsertarRuta(ruta){
    this.$router.push(ruta);
    }
  }
};
</script>
