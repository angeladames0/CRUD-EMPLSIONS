<template>
  <div class="py-4">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-sheet width="300" class="mx-auto">
      <br>
        <v-form fast-fail v-on:submit.prevent="submit">
          <v-text-field
            v-model="firstName"
            label="Nombre del Empleado"
            :rules="firstNameRules"
          ></v-text-field>
    
          <v-text-field
            v-model="lastName"
            label="Apellidos del Empleado"
            :rules="lastNameRules"
          ></v-text-field>

          <v-select
            v-model="tipoPermiso"
            :rules="tipoPermisoRules"
            label="Tipo de Permiso"
            :items="Items"
            item-value="id"
            item-text="descripcion"
          ></v-select>

          <v-date-picker
          v-model="date"
          label="Fecha"
          format="YYYY-MM-DD"
          :rules="dateRules" 
          ></v-date-picker>
        <br>
          <v-btn color="success" type="submit" block class="mt-2" >Enviar</v-btn>
        </v-form>
      </v-sheet>
    </v-card>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import Toasted from 'vue-toasted';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      tipoPermiso: '',
      date: new Date().toISOString().substr(0, 10),
    };
  },


  computed: {
    ...mapGetters('permisos', ['Items']),
  },

  methods: {
    ...mapActions('permisos', ['cargarTipoPermiso', 'insertPermiso']),
      submit() {

      if (!this.firstName || !this.lastName || !this.tipoPermiso || !this.date) {
      this.$toasted.error('Por favor complete todos los campos', { 
            duration: 3000,
          });
      return;
      }

        const data = {
          nombre: this.firstName,
          apellidos: this.lastName,
          tipo_permiso: this.tipoPermiso,
          fecha_permiso: this.date
        };
        this.insertPermiso(data)
        .then(() => {
          this.$toasted.success('Permiso creado correctamente', { 
            duration: 3000,
          });
          this.firstName = '';
          this.lastName = '';
          this.tipoPermiso = '';
          this.date = new Date().toISOString().substr(0, 10);
          this.$router.push('/');
        })
        .catch((error) => {
          this.$toasted.error('Error al crear el permiso', {
            duration: 3000,
          });
          console.log(error);
        });
    }
  },
  created() {
    this.cargarTipoPermiso();
    Vue.use(Toasted);
  }
}
</script>
