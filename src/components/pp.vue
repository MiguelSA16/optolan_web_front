
<template>
  <div>

        

            <v-list  >
                <v-list-item dense to="#" link v-for="j in 2" :key="j" >
                    <v-list-item-icon>
                        <v-icon>mdi-tag-multiple-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title >Familia {{j}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-menu 
                    v-for=" x in 4 "
                    :key="x"
                    offset-x
                    nudge-right="5"
                    transition="slide-x-transition"
                    open-on-click
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item v-on="on" to="#" v-bind="attrs" dense active-class="active" >
                            <v-list-item-icon>
                                <v-icon> mdi-tag-multiple</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Categorias</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon> mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </template>
                    <v-list>
                        <v-list-item to="#" dense link v-for="i in 3" :key="i" @click="closeMenu()" >
                            <v-list-item-icon>
                                <v-icon>mdi-tag-multiple-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title >Categoria {{i}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-menu 
                            v-for="x in 4"
                            :key="x"
                            offset-x
                            nudge-right="5"
                            transition="slide-x-transition"
                            open-on-click
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item v-on="on" v-bind="attrs" dense active-class="active" >
                                    <v-list-item-icon>
                                        <v-icon> mdi-tag-multiple</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Categorias</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-icon>
                                        <v-icon> mdi-chevron-right</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </template>
                            <v-list>
                                <v-list-item to="#" dense link v-for="i in 3" :key="i" @click="closeMenu()" >
                                    <v-list-item-icon>
                                        <v-icon>mdi-tag-multiple-outline</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title >SubCategoria {{i}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-list>
                </v-menu>
                
            </v-list>
      
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    
    data(){
        return{
            menu:false,
        }
    },


    methods:{       

        ...mapMutations([
            'closeMenuFam'
        ]),

        closeMenu(){
            console.log('iii');
            this.closeMenuFam();
        }        
    }
}
</script>