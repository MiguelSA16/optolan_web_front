<template>
    <div >     
        <v-container fluid class="grey lighten-4 py-5">
       
            <v-container>
                
                <v-row>
                    <MenuFamilias/>
                    <v-col class="py-0">
                        <Slide/>
                    </v-col>
                </v-row>        
            </v-container>
        </v-container>
        <v-container>
            <p>ofertas </p>
        </v-container>
        
    </div>    
</template>

<script>

import Slide from "../components/Slide.vue";
import MenuFamilias from "../components/MenuFamilias.vue";
import { mapActions } from 'vuex';


import DefaulLayout from '@/layouts/Default.vue';

export default {
    components: {Slide, MenuFamilias},
    data(){
        return{
            
        }
    },

    created() {
        this.$emit(`update:layout`, DefaulLayout);
    },
    mounted(){
        this.getFamilias()
    },
    methods: {
        ...mapActions([
            'getFamilias'
        ])
    },

    
}

</script>