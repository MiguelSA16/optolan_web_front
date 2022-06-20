<template>
<v-container>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque dolorem sunt nulla doloribus sint rem ipsa, impedit, quam totam itaque ipsam. Quisquam ullam deserunt officia nesciunt nam eaque modi debitis?</p>
</v-container>
</template>

<script>
import DefaulLayout from '@/layouts/Default.vue';
export default {
    data() {
        return {
        }
    },
     created() {
        this.$emit(`update:layout`, DefaulLayout);
    }
}

</script>