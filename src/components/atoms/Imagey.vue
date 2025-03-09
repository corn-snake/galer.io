<template>
    <div class="imgy">
        <img :src="reffed" />
    </div>
</template>
<script>
    export default {
        props: ["reffed"],
    };
</script>
<style scoped>
    div, img {
        max-height: inherit;
        height: inherit;
        object-fit: contain;
    }
    @media (max-width: 500px) {
        .imgy, img {
            height: 60dvw;
            width: 60dvw;
        }
    }
</style>