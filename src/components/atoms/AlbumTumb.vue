<script setup>
import { RouterLink } from 'vue-router';
import Imagey from './Imagey.vue';

</script>

<template>
    <article class="thumb">
        <RouterLink to="/a/sample">
            <Imagey reffed="/index.jpg" />
            <span class="caption">Sample album</span>
        </RouterLink>
    </article>
</template>

<style scoped>
    @import url("./albums.css");
</style>