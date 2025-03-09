<script setup>
import Imagey from './Imagey.vue';
    const props = defineProps(["url", "data"]);
</script>

<template>
    <article class="thumb">
        <Imagey :reffed="url !== undefined ? url : '/index.jpg'" />
    </article>
</template>

<style scoped>
    @import url("./thumbs.css");
</style>