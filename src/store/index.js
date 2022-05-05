import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';

//Modulos

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        url: `${process.env.VUE_APP_URL}`,
        modalFam:false,    
        familias: [],
        familia:{},
        articulosFam:[],
        openLogin: false,
        menu: false,
        user:{}
    },

    mutations: {

        fillFamilias(state,familias){
            state.familias = familias;
        },

        fillArticulosFam(state,articulos){
            state.articulosFam = articulos;
        },

        fillfamilia(state,familia){
            state.familia = familia;
           
        },

        openCloseLogin(state){
            state.openLogin = !state.openLogin
        },

        closeMenuFam(state){
            state.menu =false;
            console.log('ggg');
        }

      
    },

    actions: {

        getFamilias({commit,state}){      
            const url = state.url+'familias';    
            axios
                .get(url)
                .then(reponse=>{
                    /*
                    Creamos una costante (familias) y le asignamos los datos
                    que traemos desde el Backend.*/
                        const familias = reponse.data.familias;
                        commit('fillFamilias',familias);
                })
        },

        getArticulosFamilia({commit,state},uri){

            const url = state.url+"listar_articulos/"+uri;
            axios
                .get(url)
                .then(reponse=>{
                    const articulosFam = reponse.data.articulos;
                    const familia=reponse.data.familia;
                    commit('fillfamilia',familia);
                    commit('fillArticulosFam',articulosFam);

                })
        },    


    },

    modules: {
        auth
    }
})
