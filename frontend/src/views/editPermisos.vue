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
              :items="tipoPermisoItems"
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
            <v-btn color="success" type="submit" block class="mt-2" >Actualizar</v-btn>
          </v-form>
        </v-sheet>
      </v-card>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  export default {
    
    data() {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      tipoPermiso: null,
      tipoPermisoItems: [],
      date: null,

    };
  },
  async created() {
    const id = this.$route.params.id;
    // Obtener datos del permiso
    const permisoResponse = await fetch(`http://localhost:3000/api/permisos/${id}`);
    const permisoData = await permisoResponse.json();
    this.firstName = permisoData.nombreempleado;
    this.lastName = permisoData.apellidosempleado;
    this.date = this.formatDate(permisoData.fechapermiso);

    // Obtener datos del tipo de permiso
    const tipoPermisoResponse = await fetch(`http://localhost:3000/api/tipopermiso/`);
    const tipoPermisoData = await tipoPermisoResponse.json();
    this.tipoPermisoItems = tipoPermisoData;
    this.tipoPermiso = permisoData.tipopermisoid;
  },

    methods: {
        ...mapActions('permisos', ['actPermiso']),
        formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().substr(0, 10);
        },

        async submit() {

            if (!this.firstName || !this.lastName || !this.tipoPermiso || !this.date) {
            this.$toasted.error('Por favor complete todos los campos', { 
                    duration: 3000,
                });
            return;
            }

        const id = this.$route.params.id;
        const item = {
            id: id,
            nombre: this.firstName,
            apellidos: this.lastName,
            tipo_permiso: this.tipoPermiso,
            fecha_permiso: this.date,
        };
        await this.actPermiso(item)
        .then(() => {
        this.$toasted.success('Permiso actualizado con éxito', { 
            duration: 3000,
          });
        this.$router.push('/');
        })
        .catch((error) => {
          this.$toasted.error('Error al crear el permiso', {
            duration: 3000,
          });
          console.log(error);
        });
        },
    },
  };
  </script>
  