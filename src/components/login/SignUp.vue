<template>
    <div>
        <div class="field">
            <label for="user[email]">Correo Electronico</label>
            <input v-model="user.email" placeholder="Correo electronico" type="email" id="users[email]" name="users[email]">
        </div>
        <div class="field">
            <label for="user[password]">Contraseña</label>
            <input v-model="user.password" placeholder="Contraseña" type="password" id="users[password]" name="users[password]">
        </div>
        <div class="field">
            <label for="user[password]">Repetir Contraseña</label>
            <input v-model="user.repeat_password" placeholder="Contraseña" type="password" id="users[password]" name="users[password]">
        </div>
        <button class="ui button primary fluid">Registrarse</button>
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