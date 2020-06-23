<template>
    <div>
        Aqui va la lista de mis busquedas recientes
    </div>
</template>

<script>
//import {database} from 'firebase/database'
export default {
    data: function(){
        return {
            users: null
        }
    },
    created: function(){
        this.users = []   
    }
}
</script>

<style>

</style>