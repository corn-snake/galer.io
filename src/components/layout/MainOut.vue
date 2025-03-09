<script setup>
    import { computed } from 'vue';
    import { sliding } from '../../stores/misc';
    import { pageName } from '../../stores/page';
    import { useRoute } from 'vue-router';

    import AddThumb from "./../atoms/AddThumb.vue"
    import router from '../../router';

    const isUnder =  computed(()=>sliding.value ? "under" : undefined)
    const p = defineProps(["single", "previous", "al"]),
        r = useRoute();
    const isAlbum =  computed(()=>r.params.alb ? "album" : undefined)
    const fR = () => r.params.alb ? router.push("/") : '';
</script>

<template>
    <section :class="['maine', isUnder, isAlbum]">
        <header @click="fR">
            <h1>{{ pageName }}</h1>
        </header>
        <main>
            <AddThumb :album="isAlbum" />
            <slot></slot>
        </main>
    </section>
</template>

<style scoped>
    .maine {
        position: absolute;
        top: 0;
        left: 0;
        height: 100dvh;
        max-height: 100dvh;
        width: fit-content;
        min-width: 100%;
        overflow-x: scroll;
        transition: 0.25s filter linear;
            -webkit-transition: 0.25s -webkit-filter linear;
            -o-transition: 0.25s -o-filter linear;
        &.under {
            -webkit-filter: blur(12px) brightness(70%) grayscale(20%);
                -moz-filter: blur(12px) brightness(70%) grayscale(20%);
                -o-filter: blur(12px) brightness(70%) grayscale(20%);
                -ms-filter: blur(12px) brightness(70%) grayscale(20%);
                filter: url(#blur) url(#brightness) url(#grayscale);
                filter: blur(12px) brightness(70%) grayscale(20%);
            transition: 0.25s filter linear;
            -webkit-transition: 0.25s -webkit-filter linear;
                -o-transition: 0.25s -o-filter linear;
        }
    }
    header {
        display: flex;
        position: absolute;
        width: calc(30% - 2.6rem);
        max-width: calc(30% - 2.6rem);
        height: 100%;
        align-items: center;
        margin-left: 2.6rem;
        transition: 0.3s top linear;
        h1 {
            transition: 0.3s font-size linear;
        }
    }
    .album header {
        top: 0;
        height: 30dvh;
        width: 100dvw;
        max-width: 100%;
        h1 {
            font-size: 2rem;
            width: 100%;
        }
    }
    main {
        position: absolute;
        overflow-x: visible;
        min-width: 70%;
        height: 100%;
        max-height: 100%;
        left: 30%;
        display: grid;
        grid-template-rows: repeat(auto-fit, minmax(170px, 1fr));
        grid-auto-columns: 170px;
        grid-auto-flow: column;
        transition: 0.3s left linear;
        & > * {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
    .album main {
        left: 0;
        top: 30%;
        height: 70%;
        padding-left: 10vw;
    }
    @media (max-height: 339px) {
        main {
            column-gap: 70px;
            padding-left: 70px;
        }
        @media (max-height: 800px) {
            main {
                column-gap: 10px;
            }
        }
    }
    header::after, main::after {
        content: "";
        width: inherit;
        position: absolute;
        display: block;
        height: 100%;
        opacity: 0;
        background-color: #000;
        transition: opacity 0.45s ease-in;
        z-index: 1;
    }
    .under header::after, .under main::after {
        opacity: 10%;
        transition: opacity 0.45s ease-out;
    }

    @media (max-width: 500px) {
        .maine {
            overflow-x: hidden;
            overflow-y: scroll;
            max-width: 100dvw;
        }
        header {
            position: relative;
            max-height: 25%;
            width: calc(100% - 2.6rem);
            max-width: calc(100dvw - 2.6rem);
            h1 {
                font-size: 2rem !important;
            }
        }
        main {
            position: relative;
            min-height: 75%;
            width: 100%;
            max-width: 100%;
            max-height: fit-content;
            left: 0;
            grid-template-rows: max-content;
            grid-auto-flow: row;
            grid-auto-columns: 100dvw;
            row-gap: 15vw;
            padding: 0;
        }
        .album main {
            top: 0;
            padding: 0;
            height: fit-content;
        }
        header::after, main::after {
            width: 100dvw;
        }
    }
</style>