<template>
    <div>
        <Cabecera/>
        <div class="container py-0 px-0">
            <Navegacion />            
        </div>
            <slot></slot>
    </div>

</template>

<script>

import Cabecera from "../components/Cabecera.vue";
import Navegacion from "../components/Navegacion.vue";

export default {
    components:{ Cabecera, Navegacion }    
}
</script>