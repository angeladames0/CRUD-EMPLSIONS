<template>
  <div>
    <tabla Title="PERMISOS" :Head="Head" :Items="Items" />
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import tabla from "@/components/permisos/Table.vue"
export default {
name: "CLIENTES",

components:{
  tabla
},

created(){
  this.cargarPermisos();
},

data(){
    return{
      Head: [
        {text: 'Nombre', value: 'nombreempleado'},
        {text: 'Apellido', value: 'apellidosempleado'},
        {text: 'Tipo de Permiso', value: 'tipopermisoid'},
        {text: 'Fecha de Permiso', value: 'fechapermiso'},
        {text: '', value: 'actions'},
      ]
    }
},

methods:{
  ...mapActions('permisos', ['cargarPermisos'])
},

computed:{
  ...mapGetters('permisos', ['Items'])
}

}
  </script>