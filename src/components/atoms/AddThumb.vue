<script setup>
    const props = defineProps(["album"])
</script>

<template>
    <article class="thumb">
        <h3>+</h3>
        <span class="caption">
            <h4>Add a{{ props.album === undefined ? "n Album" : " Photo" }}</h4>
        </span>
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
    @media (max-width: 500px) {
        a, .thumb, article::after {
            max-height: 60vw;
                max-width: 60vw;
                height: 60vh;
                width: 60vw;
        }
    }
</style>
<style scoped>
    h4 {
        margin: auto;
        margin-left: 1.5rem;
    }
    @media (max-width: 500px) {
        h3,
            h4 {
                margin: 0;
            }
        
            h3 {
                font-size: 3.7rem;
            }
        
            h4 {
                font-size: 3rem;
                margin-left: 2.5rem;
            }
    }
</style>