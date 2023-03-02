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

        /*Almacena el listado de todas la Familias 
        con sus Caetegorias y subcategorias*/  
        familias: [],
        
        /*Guardad datos del familia selecionada todos 
        los articulos en ArticulosFam y Familia en familia*/
        familia:{},
        articulosFam:[],

        categorias:[],
        
        openLogin: false,
        menu: false,
        
        /*Datos del usuario */
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
        },

        fillCategorias(state,categoria){
            state.categorias = categoria;
        },

      
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

        getCategorias({commit,state},uri){
            const url = state.url+"familia/"+uri;
            axios
                .get(url)
                .then(reponse=>{
                    const categorias = reponse.data.categorias;
                    const familia=reponse.data;
                    commit('fillfamilia',familia);
                    commit('fillCategorias',categorias);
                    //commit('fillArticulosFam',articulosFam);

                })
        }


    },

    modules: {
        auth
    }
})
