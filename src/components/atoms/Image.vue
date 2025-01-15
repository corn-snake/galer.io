<script setup></script>

<template>
    <article>
        <img src="/index.jpg" />
    </article>
</template>

<style scoped>
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
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
            transition: box-shadow 0.15s linear;
        }
    }
}
</style>