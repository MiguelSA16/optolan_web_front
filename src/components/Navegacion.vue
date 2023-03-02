<template>
    <v-app-bar color="white"  height="100" elevation="0">
        <v-toolbar-title>
            <router-link to="/">
                <v-img max-width="250"  src="@/assets/logo.png" />
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>        
        <v-text-field 
            outlined
            clearable
            dense
            hide-details 
            label="Buscar por nombre o codigo" 
            prepend-inner-icon="mdi-magnify"
            color="red darken-2"
        >
        </v-text-field>
        <v-spacer></v-spacer>  

        <v-btn v-if="userData.name==null" dark color="red darken-2" to="/login">             
            Iniciar sesión
            <v-icon right>
                mdi-login
            </v-icon>
        </v-btn>

        <v-menu v-else offset-y nudge-bottom="5">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red darken-2" v-bind="attrs" class="white--text " v-on="on" active-class="red">
                    <span class="text-capitalize font-weight-light">Hola,</span> 
                    <span class="text-capitalize">{{userData.name}}</span>   
                    <v-icon> mdi-chevron-down </v-icon> 
                </v-btn>
            </template>
            <v-list>
                <v-list-item dense @click="logout()" >                    
                    <v-icon left>mdi-logout</v-icon>
                    Cerrar sesión                    
                </v-list-item>             
            </v-list>
        </v-menu>     
                
        
        <template v-slot:extension>            
            <v-menu nudge-bottom="5" bottom offset-y v-model="menu" >
                <template v-slot:activator="{ on, attrs }">   
                <v-btn  v-bind="attrs" v-on="on" dark color="red darken-2" depressed>      
                        <v-icon> mdi-view-dashboard </v-icon>
                            Categorias
                        <v-icon> mdi-chevron-down </v-icon>
                    </v-btn>                      
                </template>
                <v-list>
                    <div v-for="familia in familias" :key="familia.id" >
                        <template >
                            <v-list-item v-if="familia.categorias ==''" dense link :to="'/familia/'+familia.slug+'/articulos'" :id="familia.slug" @click="cargarArticulosFamilia(familia.slug)">
                                <v-list-item-icon >
                                    <v-icon>mdi-{{familia.icono}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title >{{familia.nombre}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template >
                            <v-menu 
                                v-if="familia.categorias !=''"
                                offset-x
                                nudge-right="5"
                                transition="slide-x-transition"
                                open-on-click  
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-on="on" v-bind="attrs" dense >
                                        <v-list-item-icon>
                                            <v-icon> mdi-{{familia.icono}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{familia.nombre}}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon> mdi-chevron-right</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </template>
                                <v-card>
                                    <v-list>
                                        <v-subheader>{{familia.nombre}}</v-subheader>
                                        <div v-for="categoria in familia.categorias" :key="categoria.id">
                                            <template v-if="categoria.categorias ==''">
                                                <v-list-item dense link :to="'/familia/'+categoria.slug+'/articulos'" :id="categoria.slug" @click="cargarArticulosFamilia(categoria.slug)">
                                                    <v-list-item-icon>
                                                        <v-icon>mdi-format-list-text </v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title>{{categoria.nombre}}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </template>
                                            <template v-else>
                                                <v-menu 
                                                    offset-x
                                                    nudge-right="5"
                                                    transition="slide-x-transition"
                                                    open-on-click 
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-list-item v-on="on" v-bind="attrs" dense>
                                                            <v-list-item-icon>
                                                                <v-icon> mdi-format-list-text</v-icon>
                                                            </v-list-item-icon>
                                                            <v-list-item-content>
                                                                <v-list-item-title>{{categoria.nombre}}</v-list-item-title>
                                                            </v-list-item-content>
                                                            <v-list-item-icon>
                                                                <v-icon> mdi-chevron-right</v-icon>
                                                            </v-list-item-icon>
                                                        </v-list-item>
                                                    </template>
                                                    <v-card>
                                                        <v-list>
                                                            <v-subheader>{{categoria.nombre}}</v-subheader>
                                                            <div v-for="subcategoria in categoria.categorias" :key="subcategoria.id">
                                                                <v-list-item dense link :to="'/familia/'+subcategoria.slug+'/articulos'" :id="subcategoria.slug" @click="cargarArticulosFamilia(subcategoria.slug)">
                                                                    <v-list-item-icon>
                                                                        <v-icon> mdi-format-list-text</v-icon>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                        <v-list-item-title>{{subcategoria.nombre}}</v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                            </div>
                                                        </v-list>
                                                    </v-card>
                                                </v-menu>
                                            </template>
                                        </div>
                                    </v-list>                                                                                          
                                </v-card>
                            </v-menu>
                        </template>
                    </div>  
                </v-list>                                       
            </v-menu>

            <v-spacer></v-spacer>  
            <v-btn text>
                <v-icon color="red darken-2"> mdi-tag-multiple-outline </v-icon>
                Liquidacion
            </v-btn>

            <v-btn text>
                <v-icon color="red darken-2"> mdi-file-download-outline </v-icon>
                Descargas
            </v-btn>
            <v-btn text>
                <v-icon color="red darken-2"> mdi-handshake-outline </v-icon>
                Contactanos
            </v-btn>                  
        </template>

    </v-app-bar>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions, mapMutations} from 'vuex'
import MenuFamilias from './MenuFamilias.vue'

    export default {
        components: { MenuFamilias},
       
        name:'Navegacion',
        data(){
            return{
                menu:false
            }
        },

        computed:{
            ...mapState(['familias','url']),
            ...mapState('auth',['userData'])

        },

        created(){
            this.getFamilias()
        },

        methods:{
            
            ...mapActions([
                'getFamilias',
                'getArticulosFamilia',
            ]),  
            
            ...mapMutations("auth",["setUserData"]),

            cargarArticulosFamilia(slug){
                this.getArticulosFamilia(slug);
                this.menu=false;
            }, 
            
            logout(){
                
                const token = localStorage.getItem('authToken');

                const headers = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                
                axios
                    .post(this.url+'logout','',headers)
                    .then(response => {   
                        console.log(response.data)
                        localStorage.clear();
                        
                        //Asignar valores null a USER
                        const user ={
                            name: null,
                            role_id: null
                        }
                        //Asigna los datos a USER
                        this.setUserData(user);
                    })
            }
        }
    }
</script>

<style scoped>

    

</style>