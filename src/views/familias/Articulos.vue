<template>
    <div>
         <v-container fluid class="grey lighten-3 py-0 mt-2">
                <v-container class="py-2">
                    <v-breadcrumbs  class="px-1 py-1 text-uppercase "> 
                            <v-breadcrumbs-item to="/"> 
                                Inicio
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-divider>/</v-breadcrumbs-divider>
                            <v-breadcrumbs-item to="/nuestros-productos"> 
                                Familias
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-divider>/</v-breadcrumbs-divider>

                            <!--Familia -->
                            <v-breadcrumbs-item 
                                v-if="familia.familia != null"
                                :to="'/familia/'+familia.familia.url+'/categorias'"
                            >
                                {{familia.familia.nomfam}}
                            </v-breadcrumbs-item>  
                            <v-breadcrumbs-divider v-if="familia.familia != null">/</v-breadcrumbs-divider>  
                                                    
                            <!--Categoria-->
                            <v-breadcrumbs-item 
                                v-if="familia.categoria != null" 
                                :to="'/familia/'+familia.categoria.url+'/categorias'"
                                @click="cargarCategorias(familia.categoria.url)"
                            >
                                {{familia.categoria.nomfam}}
                                
                            </v-breadcrumbs-item>
                            <v-breadcrumbs-divider v-if="familia.categoria != null">/</v-breadcrumbs-divider>
                                                    
                            <!--Familia Actual--> 
                            <v-breadcrumbs-item >
                                {{familia.nombre}}
                            </v-breadcrumbs-item>                               
                        </v-breadcrumbs> 
                </v-container>
        </v-container>
        <v-container>
            <v-row>   
                <!--<v-col cols="12">
                    <v-card class="flex justify-space-between align-center flex-wrap">
                        <v-card-text >
                            <div class="my-2">
                                <h4>Searching for "mobile phone"</h4> 
                                <p class="gray--text text--darken-1 mb-0">48 results found</p>
                            </div>                            
                        </v-card-text>
                    </v-card>
                </v-col>-->
                <v-col cols="2" class=" hidden-xs-only " >
                    <v-card>
                        <v-card-title class=" subtitle-2 pb-1">
                            Categorias
                        </v-card-title>
                        <v-card-text>                            
                            <span class=" d-block">Categoria 1</span> 
                            <span class=" d-block">Categoria 2</span> 
                            <span class=" d-block">Categoria 3</span> 
                            <span class=" d-block">Categoria 4</span> 
                        </v-card-text>

                        <v-card-title>
                            Colores
                        </v-card-title>

                        <v-divider></v-divider>
                        
                    </v-card>
                </v-col>
                
                <v-col cols="10" class=" mx-auto">               
                    <v-row>                        
                        <v-col cols="12">                            
                            <div class=" d-flex align-center">
                                <v-icon color=" red darken-3 " left>mdi-{{familia.icono}}</v-icon>
                                <h1 class="text-h6  ">{{familia.nombre}}</h1>                                
                            </div>                                       
                        </v-col>                        
                        <v-col  align-self cols="12"  md="6" sm="6" lg="4" xl="3"  v-for="articulo in articulosFam" :key="articulo.id">
                            <v-card 
                                elevation="3"
                                min-width="300"    
                            >
                                <div style="height:250">
                                    <v-img                           
                                        class=" mx-auto my-auto"
                                        :src="'http://www.optolan.es/images/articulos/'+articulo.imagen"                                       
                                        
                                    >
                                    </v-img>
                                </div>
                               

                                <v-card-text>                                    
                                    <h2 class="grey--text text--darken-3 text-subtitle-1 font-weight-medium h-titulo" >
                                        {{articulo.nombre}}
                                    </h2> 
                                    <span class=" text-subtitle-2 pr-3">Referencia:</span>     
                                    <v-chip 
                                        small
                                        color="red darken-2" 
                                        text-color="white"
                                    >
                                        {{articulo.referencia}}
                                    </v-chip>  
                                    <!-- borrar par producion --> 
                                        <v-icon color="red  darken-2 "  v-if="articulo.baja != '0'" >
                                                mdi-close
                                        </v-icon>   
                                        <v-chip color="info" dark small label class=" ml-1"  >
                                            Nº. {{articulo.orden}}
                                        </v-chip>   
                                    <!-- borrar par producion -->     
                                </v-card-text>   
                                <v-divider class="mx-4"></v-divider> 

                                <v-card-text>              
                                    <span class=" text-button">
                                        {{articulo.agrupado_por}} diponibles
                                    </span>   
                                    <v-chip-group center-active column >                                        
                                        <v-chip color=" primary" small>
                                            {{articulo.caracteristica}}
                                        </v-chip>
                                        <v-chip small color=" secondary" v-for="item in articulo.g_articulos" :key="item.id"  >
                                            {{item.caracteristica}}
                                        </v-chip>
                                        <v-chip grey small class=" text-uppercase" >
                                            consultar otros/as {{articulo.agrupado_por}}
                                        </v-chip>
                                    </v-chip-group>                         
                                </v-card-text>
                                <v-card-actions class="grey lighten-3 m-auto" dark>                                    
                                    <v-btn text >
                                        <v-icon color=" red darken-2" >
                                            mdi-file-download-outline
                                        </v-icon>                                        
                                        F. tecnica
                                        <v-icon color=" green darken-1 " dense >
                                            mdi-check
                                        </v-icon>
                                    </v-btn>
                                    <v-btn text class="my-0" >
                                        <v-icon  color="yellow darken-4"  >
                                            mdi-file-certificate-outline
                                        </v-icon>
                                        Certicado
                                        <v-icon color="red darken-2 " dense>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                
            </v-row>       
        </v-container>        
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import MenuFamilias from '../../components/MenuFamilias.vue';
import DefaulLayout from '@/layouts/Default.vue';
export default {
  components: { MenuFamilias },
    data() {
        return {
        }
    },
     created() {
        this.$emit(`update:layout`, DefaulLayout);
    },

    computed: {
        ...mapState([
            'url',
            'articulosFam',
            'familia',
            'modalFam',
            'menu'
        ]),
    },

    mounted(){
        this.getArticulosFamilia(this.$route.params.slug),
        this.closeMenuFam
    },

    methods: {

        ...mapActions([
            'getArticulosFamilia'
        ]),

        ...mapMutations([
            'closeMenuFam'
        ])
    },
}
</script>

<style scoped>
    .h-titulo{
        height: 70px;
    }

    .imagen-articulo{
        min-height: 180px;
    }

    .titulo{
        height: 100px;
    }
    .v-btn:not(.v-btn--round).v-size--default {
        height: 36px;
        min-width: 64px;
        padding: 0 5px;
    }
    
</style>