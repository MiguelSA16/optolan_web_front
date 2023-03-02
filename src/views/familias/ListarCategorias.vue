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
                            <v-breadcrumbs-item v-if="familia.familia != null">
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
                            <v-breadcrumbs-item>
                                {{familia.nombre}}
                            </v-breadcrumbs-item>                               
                        </v-breadcrumbs> 
                </v-container>
        </v-container>
        <v-container fluid>
            
            <v-container>
                
                <div class="pt-4 pb-8">
                    
                    <p class="sub-subtitle text--red ">
                        Nuestros productos mas destacadas                   
                    </p>
                    
                    <h1 class="title pb-2">
                        <v-icon    
                            color="red darken-2"
                            large
                        >
                            mdi-format-list-text
                        </v-icon>
                        {{familia.nombre}}             
                    </h1>
                    <v-divider></v-divider>
                    <pre>
                        
                    </pre>
                </div>
                <v-row>
                    <v-col
                        v-for="categoria in categorias" :key="categoria.id"
                    >
                        

                        <template v-if="categoria.categorias ==''">
                            <v-card                        
                                elevation="3"
                                :to="'/familia/'+categoria.slug+'/articulos'"
                            >
                                <v-img                           
                                    class=" mx-auto my-auto"
                                    :src="'http://www.optolan.es/images/familias/'+categoria.imagen"                                        
                                    max-height="250"
                                    max-width="250"
                                >
                                </v-img>
                                <v-divider></v-divider>
                                <div class="pa-4 ">
                                    <h3 class="me-3">
                                        {{categoria.nombre}}
                                    </h3>
                                </div>
                            </v-card>  
                        </template>
                        <template v-else>
                            <v-card                        
                                elevation="3"
                                :to="'/familia/'+categoria.slug+'/categorias'"
                                @click="cargarCategorias(categoria.slug)"
                            >
                                <v-img                           
                                    class=" mx-auto my-auto"
                                    :src="'http://www.optolan.es/images/familias/'+categoria.imagen"                                        
                                    max-height="250"
                                    max-width="250"
                                >
                                </v-img>
                                <v-divider></v-divider>
                                <div class="pa-4 ">
                                    <h3 class="me-3">
                                        {{categoria.nombre}}
                                    </h3>
                                </div>
                            </v-card>  
                        </template>                                       
                    </v-col>

                </v-row>
                
            </v-container>
        </v-container>
    </div>
        
</template>

<script>
import DefaulLayout from '@/layouts/Default.vue';
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
        }
    },

    computed: {
        ...mapState([   
            'categorias', 
            'familia'
        ]),        
        
    },        
    created() {
        this.$emit(`update:layout`, DefaulLayout);      
        
    }, 

    mounted(){
        this.getCategorias(this.$route.params.slug)
    },

    methods: {
        ...mapActions([
            'getCategorias'
        ]),

        cargarCategorias(slug){
            this.getCategorias(slug)
        }
    }
}


</script>

<style scoped>
    .title {
        font-weight: 300 !important;
        font-size: 1.8rem !important;
        text-transform: uppercase;
    }
    .sub-subtitle {
        margin-bottom: 0.10em;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: 500;
    }
</style>
