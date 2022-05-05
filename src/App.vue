<template>
    <v-app>
        <component :is="layout">
            <router-view :layout.sync="layout" />    
        </component> 
    </v-app>    
</template>

<script>
import { mapActions, } from 'vuex';

const defaultLayout = 'default'

export default {
    name: 'App',
    data() {
        return {
            layout:`div`,
        }
    },

    computed:{
        layout(){
            return (this.$route.meta.Layout || defaultLayout) + '-layout'
        } 
    },

    mounted() {
        if(localStorage.getItem("authToken")) {
            this.getUserData();
        }
    },  

    methods: {
        ...mapActions("auth", ["getUserData"]),       
    }
  
    

};
</script>
