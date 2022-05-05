<template>  
            <v-list>
                <div v-for="familia in familias" :key="familia.id" >
                    <template >
                        <v-list-item v-if="familia.categorias ==''" dense link :to="'/familia/'+familia.slug+'/articulos'" :id="familia.slug" @click="getArticulosFamilia(familia.slug)">
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
                                            <v-list-item dense link :to="'/familia/'+categoria.slug+'/articulos'" :id="categoria.slug" @click="getArticulosFamilia(categoria.slug)">
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
                                                            <v-list-item dense link :to="'/familia/'+subcategoria.slug+'/articulos'" :id="subcategoria.slug" @click="getArticulosFamilia(subcategoria.slug)">
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
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    
    data(){
        return{
        }
    },

    computed:{
        ...mapState([   
            'familias',
            'menu'
            
        ]),
    },
    
    mounted(){
        this.getFamilias()
    },

    methods:{

        
        ...mapActions([
            'getFamilias',
            'getArticulosFamilia',
        ]),

        ...mapMutations([
            'closeMenuFam'
        ]),
       
    }
}
</script>



<style>
    .show-3 {
        line-height: 1.2;
        font-size: 50px!important;
    }
</style>