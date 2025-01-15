<script setup>
    const props = defineProps(["album"])
</script>

<template>
    <article>
        <h3>+</h3>
        <span class="caption">Add a{{ props.album ? "n Album" : " Photo" }}</span>
    </article>
</template>

<style>
    article {
        position: relative;
        height: 120px;
        width: 120px;
        max-height: 120px;
        max-width: 120px;
        img {
            width: 120px;
            position: relative;
            top: 0;
            left: 0;
            z-index: 1;
        }
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
            opacity: 0;
            translate: 0 15%;
            transition: opacity 60ms linear, translate 90ms ease-out;
        }
        &:hover .caption {
            opacity: 100%;
            translate: 0;
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