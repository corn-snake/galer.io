<script setup>
    import Logged from './login/Logged.vue';
    import SlideUser from '../components/layout/SlideUser.vue';
    import MainOut from '../components/layout/MainOut.vue';
    import Album from './screen/Album.vue';
import { useRoute } from 'vue-router';

    const r = useRoute();

    const albumName = `Your ${r.params.alb} album`;
</script>

<template>
    <SlideUser>
        <Logged />
    </SlideUser>
    <MainOut :al="albumName">
        <Album/>
    </MainOut>
</template>

<style scoped>
</style>