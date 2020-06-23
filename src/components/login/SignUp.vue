<template>
    <div>
        <div class="field">
            <label for="user[email]">Correo Electronico</label>
            <input v-model="user.email" type="email" id="users[email]" name="users[email]">
        </div>
        <div class="field">
            <label for="user[password]">Contrasena</label>
            <input v-model="user.password" type="password" id="users[password]" name="users[password]">
        </div>
        <div class="field">
            <label for="user[name]">Nombre</label>
            <input v-model="user.name" type="text" id="users[name]" name="users[name]">
        </div>
        <div class="field">
            <label for="user[cellphone]">Telefono</label>
            <input v-model="user.cellphone" type="text" id="user[cellphone]" name="user[cellphone]">
        </div>
        <button class="ui button fluid">Registrarse</button>
    </div>
    
</template>

<script>
export default {
    props: {
        user: Object
    }
}
</script>

<style>

</style>