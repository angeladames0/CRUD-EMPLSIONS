<template>
    <div>
        <v-card>
         <v-card-title>
            <v-spacer></v-spacer>
         </v-card-title>
            <v-data-table
                    dense
                        :headers="Head"
                        :items="Items"
                        :item-per-page="5"
                        class="elevation-1"
                    >
            <template v-slot:item.actions="{ item }">

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            size="small"
                            class="me-2"
                            @click="editar(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-pencil
                        </v-icon>
                    </template>
                    <span>Editar</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                    <v-icon
                        size="small"
                        v-bind="attrs"
                        v-on="on"
                        @click="eliminar(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <span>Eliminar</span>
            </v-tooltip>

                </template>
                </v-data-table>
        </v-card>
    </div>
  </template>

  <script>
import {mapActions} from 'vuex'
export default {
  props: ['Title', 'Head', 'Items'],
  methods: {
    ...mapActions('permisos', ['deletePermiso']),

    eliminar(item) {
      this.$alertify.confirm(
        'Desea eliminar este permiso?', 
        () => {
            this.deletePermiso(item.id);
            this.$alertify.success('Permiso eliminado correctamente')
        },
        () => this.$alertify.error('No se elimino este permiso')
      );
    },

    editar(item) {
    this.$router.push({ name: 'editpermisos', params: { id: item.id } });
    this.editingItem = item;
    this.formData.nombre = item.nombre;
    this.formData.descripcion = item.descripcion;
    this.editDialog = true;
    },

    async edit() {
    const data = {
        id: this.editingItem.id,
        nombre: this.formData.nombre,
        descripcion: this.formData.descripcion
    };

    try {
        await this.editarPermiso(data);
        // Muestra un mensaje de éxito y cierra el diálogo de edición
        this.$toast.success('Permiso editado correctamente', { duration: 3000 });
        this.editDialog = false;
    } catch (error) {
        // Muestra un mensaje de error
        this.$toast.error('Error al editar el permiso');
    }
    },

  }
}
  </script>
