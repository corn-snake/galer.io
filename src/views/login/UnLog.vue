<script setup>
import { computed, ref } from 'vue';
import { auth } from '../../stores/login';

/*
@click="e=>{
            fetch('/api/login', {
                "Access-Control-Allow-Origin": '*',
                method: "POST",
                body: ""
            })
        }"
*/
    const block = ref(true),
    uname=ref(""),
    pwd=ref(""),
    isBlocked = computed(()=>{
        if (uname.value.toString().length < 5 || pwd.value.toString().length < 6) return "block";
        return "";
    });
</script>

<template>
    <form>
        <label for="uname">Username</label><input type="text" name="uname" id="uname" v-model="uname" /><br/>
        <label for="pwd">Password</label><input type="password" name="pwd" id="pwd" v-model="pwd" /><br/><br/>
        <span :class="['fakeSubmit', isBlocked]" @click="(e)=>auth()">Submit</span>
    </form>
</template>

<style scoped>
    span.fakeSubmit {
        transition: filter;
        transition: 0.25s filter linear;
            -webkit-transition: 0.25s -webkit-filter linear;
            -o-transition: 0.25s -o-filter linear;
    }
    span.block {
        -webkit-filter: blur(12px);
            -moz-filter: blur(12px);
            -o-filter: blur(12px);
            -ms-filter: blur(12px);
            filter: url(#blur);
            filter: blur(12px);
        pointer-events: none;
    }
</style>