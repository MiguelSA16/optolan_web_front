<template>
    <h1> Bienvenido a admnistracion</h1>
</template>

<script>

import AdminLayout from "@/layouts/Admin.vue";
export default {
    

    created() {
        this.$emit(`update:layout`, AdminLayout);
    },
}
</script>