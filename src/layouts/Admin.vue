<template>
    <div>
    <v-app-bar  
        
        color="white"
        elevation="0"
        extension-color="blue"
        extension-height="35"
    >
        <v-toolbar-title><v-img max-width="140"  src="@/assets/logo.png" /></v-toolbar-title>
        <v-divider class="mx-3" vertical></v-divider>
        <v-spacer></v-spacer>  
            <v-btn text> Desconectar </v-btn>
            <v-divider class="mx-3" vertical></v-divider>
            <v-btn text> Ayuda </v-btn>
            <v-divider class="mx-3" vertical></v-divider>
            <v-btn text>
                <v-icon> mdi-account </v-icon>
                Miguel S.
                <v-icon> mdi-chevron-down </v-icon>
            </v-btn> 
            <template v-slot:extension> 
                <v-btn 
                    color="white"
                    plain
                    to="/administracion"
                >
                    inicio
                </v-btn>
                 <v-btn 
                    color="white"
                    plain
                    to="/administracion/articulos/agrupar"
                >
                    articulos
                </v-btn>
            </template>        
    </v-app-bar>
    <slot></slot>
  </div>
</template>

<style scoped>
    .v-divider--vertical{
        max-height: 60% ;
        min-height: 60%;
        margin-top: auto ;
        margin-bottom: auto;
    }
    * >>> .v-toolbar__extension {
        background-color: #D32F2F;
        color: white;       
    }
    * >>> .v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) .v-btn__content {
        opacity:1;
    }

    
</style>