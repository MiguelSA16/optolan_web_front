<template>

    <div 
      class="grey darken-3 b-cabecera white--text h-40" 
    >
        <v-container         
            class="d-flex justify-space-between align-center h-40"              
        >
            <v-toolbar-title class="col-sm-6 ">             
                <v-icon dense class="white--text">mdi-cellphone-sound</v-icon>
                <span class="size-12 mr-6"> +34 915 00 79 63 </span> 
                <v-icon  class="mr-1 white--text">mdi-email-fast-outline</v-icon>
                <span class="size-12"> comercial@sunprored.es </span>            
            </v-toolbar-title>
            <v-toolbar-title class="col-sm-6 text-right ">
                <v-icon color=" white" class="mr-2">mdi-linkedin</v-icon>
                <v-icon color=" white" class="mr-2">mdi-facebook</v-icon>
                <v-icon color=" white" class="mr-2">mdi-youtube</v-icon>            
                <v-icon color=" white" >mdi-instagram</v-icon>
            </v-toolbar-title>          
        </v-container>
    </div >
</template>

<script>
export default {
    name:'Cabecera',
    
}
</script>

<style scoped>
    .size-12 {
        font-size: 14px;
    }
    .h-40{
    height: 40px;
    }

</style>