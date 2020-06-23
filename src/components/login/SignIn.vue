<template>
    <div>
        <div class="field">
            <label for="user[email]">Correo Electronico</label>
            <input v-model="user.email" type="email" id="users[email]" name="users[email]">
        </div>
        <div class="field">
            <label for="user[password]">Contrase;a</label>
            <input v-model="user.password" type="password" id="users[password]" name="users[password]">
        </div>
        <button class="ui button fluid">Ingresar</button>
    </div>
    
</template>

<script>
export default {
    props: {
        user: Object
    },
    
}
</script>

<style>

</style>