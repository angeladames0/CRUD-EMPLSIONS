import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,

  state: {
    Items: [],
  },
  getters: {
    Items(state){
    return state.Items;
    }
  },
  mutations: {
        LlenarItems(state, data){
            state.Items = data;
        },
        EliminarItem(state, id) {
            state.Items = state.Items.filter(item => item.id !== id);
        },
        ActualizarItem(state, item) {
            const index = state.Items.findIndex(i => i.id === item.id);
            state.Items[index] = item;
        },
        AgregarItem(state, item) {
            state.items.push(item);
          },
  },
  actions: {
    cargarPermisos: async function ({commit}) {
        try {
            const setting = {
                method: 'GET',
            }
            const url = 'http://localhost:3000/api/permisos';
            const data = await fetch(url, setting);
            const json = await data.json();
            commit('LlenarItems', json)
        }
        catch (err) {
            console.log(err)
        }
    },
    cargarTipoPermiso: async function ({commit}) {
        try {
            const setting = {
                method: 'GET',
            }
            const url = 'http://localhost:3000/api/tipopermiso';
            const data = await fetch(url, setting);
            const json = await data.json();
            commit('LlenarItems', json)
        }
        catch (err) {
            console.log(err)
        }
    },
      deletePermiso: async function ({commit}, id) {
            try {
                const setting = {
                    method: 'DELETE',
                }
                const url = `http://localhost:3000/api/deletpermisos/${id}`;
                const data = await fetch(url, setting);
                if (data.status === 204) {
                    commit('EliminarItem', id);
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        actPermiso: async function ({commit}, item) {
            try {
                const setting = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                }
                const url = `http://localhost:3000/api/actpermisos/${item.id}`;
                const data = await fetch(url, setting);
                if (data.status === 204) {
                    commit('ActualizarItem', item);
                }
            }
            catch (err) {
                console.log(err)
            }
        },

        insertPermiso: async function ({ commit }, { nombre, apellidos, tipo_permiso, fecha_permiso }) {
            try {
              const response = await fetch('http://localhost:3000/api/insertpermisos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellidos, tipo_permiso, fecha_permiso })
              });
        
              if (response.ok) {
                const newPermiso = await response.json();
                commit('AgregarItem', newPermiso);
                return true;
              } else {
                throw new Error('Error al insertar permiso');
              }
            } catch (error) {
              console.error(error);
              return false;
            }
          }
  },
}
