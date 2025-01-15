<script setup>
    import Logged from './login/Logged.vue';
    import SlideUser from '../components/layout/SlideUser.vue';
    import MainOut from '../components/layout/MainOut.vue';
    import Land from './screen/Land.vue';
</script>

<template>
    <SlideUser>
        <Logged />
    </SlideUser>
    <MainOut>
        <Land/>
    </MainOut>
</template>

<style scoped>
</style>