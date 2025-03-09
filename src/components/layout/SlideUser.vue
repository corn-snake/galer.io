<script setup>
    import { computed } from 'vue';
    import { sliding } from '../../stores/misc';
    const isHiding = computed(()=>sliding.value ? '' : "hide")
</script>

<template>
    <div :class="['sidebar', isHiding]">
        <slot></slot>
        <div class="button behave-button" @click="e=>sliding = !sliding">⦀</div>
    </div>
</template>

<style scoped>
    .sidebar {
        position: absolute;
        height: calc(100% - 3em);
        max-width: 30%;
        width: 30%;
        left: 0;
        top: 0;
        padding: 1.5em;
        transition: translate 0.45s ease-out;
        -webkit-transition: -webkit-transform 0.45s ease-out;
        z-index: 2;
        background-color: var(--off-background);
        color: var(--off-text);
        .button {
            position: absolute;
            bottom: 0;
            right: -2em;
            top: 0;
            margin: auto;
            box-sizing: border-box;
            max-height: 3em;
            background-color:var(--off-background);
            color: var(--off-text);
        }
        &.hide {
            transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
        }
    }
    @media (max-width: 500px) {
        .sidebar {
            width: 70dvw;
            max-width: 70ddvw;
        }
    }
</style>