<template>
    <section>
        <Summary v-if="currentUser" :current-user="currentUser"/>
        <Login v-else/>
    </section>
</template>

<script>
import Login from '@/components/Login.vue'
import Summary from '@/components/Summary.vue'
//import 'firebase/database'
export default {
    components: {
        Login,
        Summary
    },
    props: {
        currentUser: Object
    },
    
}
</script>

<style>

</style>