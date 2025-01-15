<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <article>
        <RouterLink to="/a/sample">
            <img src="/index.jpg" />
            <span class="caption">Sample album</span>
        </RouterLink>
    </article>
</template>

<style scoped>
    article {
        position: relative;
        height: 120px;
        width: 120px;
        max-height: 120px;
        max-width: 120px;
        background-color: #c0c0c0;
        &::after {
            position: absolute;
            left: 0;
            top: 0;
            height: 120px;
            width: 120px;
            content: "";
            background-color: #000;
            opacity: 0;
            z-index: 2;
            transition: opacity 60ms linear;
        }
        .caption {
            z-index: 3;
            width: 106px;
            height: 1.2em;
            color: white;
            position: absolute;
            bottom: 7px;
            left: 7px;
            translate: 0 15%;
            transition: color 60ms linear, translate 90ms ease-out;
        }
        &:hover .caption {
            translate: 0;
            color: #000;
        }
        &:hover::after {
            opacity: 50%;
        }
        a {
            position: absolute;
            z-index: 8;
            height: 120px;
        }
    }
</style>