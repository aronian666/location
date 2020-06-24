<template>
    <form class="ui container" @submit.prevent="addUser">
        <div class="ui form stackable equal width grid">
            <div class="column">
                <div class="inline field">
                    <label for="user[name]">Nombre:</label>
                    <div class="ui icon input">
                        <input v-model="user.name" required type="text" placeholder="Nombre" name="user[name]" id="user[name]">
                        <i v-if="user.name" class="check icon" style="color: green"></i>
                        <i v-else class="expand arrows alternate icon" style="color: red"></i>
                    </div>
                </div>
                <div class="inline field">
                    <label for="user[last_name1]">Apellido Paterno:</label>
                    <div class="ui icon input">
                        <input v-model="user.last_name1" required type="text" placeholder="Apellido" name="user[last_name1]" id="user[last_name2]">
                        <i v-if="user.last_name1" class="check icon" style="color: green"></i>
                        <i v-else class="expand arrows alternate icon" style="color: red"></i>
                    </div>
                </div>
                <div class="inline field">
                    <label for="user[last_name2]">Apellido Materno:</label>
                    <div class="ui icon input">
                        <input v-model="user.last_name2" required type="text" placeholder="Apellido" name="user[last_name2]" id="user[last_name2]">
                        <i v-if="user.last_name2" class="check icon" style="color: green"></i>
                        <i v-else class="expand arrows alternate icon" style="color: red"></i>
                    </div>
                </div>
                <div class="inline field">
                    <label for="user[name]">Genero:</label>
                    <div class="ui icon input">
                        <select v-model="user.gender" name="user[gender]" id="user[gender]">
                            <option :value="gender" :key="gender" v-for="gender in ['Masculino', 'Femenino']">{{ gender }}</option>
                        </select>
                        <i v-if="user.gender" class="check icon" style="color: green"></i>
                        <i v-else class="expand arrows alternate icon" style="color: red"></i>
                    </div>
                </div>
                <div class="inline field">
                    <label for="user[dni]">DNI:</label>
                    <div class="ui icon input">
                        <input v-model="user.dni" required type="number" placeholder="DNI" name="user[dni]" id="user[dni]">
                        <i v-if="!verify.dni && user.dni" class="check icon" style="color: green"></i>
                        <i v-else class="expand arrows alternate icon" style="color: red"></i>
                    </div>
                </div>
                <div class="inline field">
                    <label for="user[cellphone]">Celular:</label>
                    <div class="ui icon input">
                        <input v-model="user.cellphone"  required placeholder="Cellphone" name="user[cellphone]" id="user[cellphone]">
                        <i v-if="!verify.cellphone && user.cellphone" class="check icon" style="color: green"></i>
                        <i v-else class="expand arrows alternate icon" style="color: red"></i>
                    </div>
                </div>
                <div class="inline field">
                    <label for="user[email]">Correo Electronico:</label>
                    <div class="ui icon input">
                        <input v-model="user.email" required type="email" placeholder="Email" name="user[email]" id="user[email]">
                        <i v-if="user.email && !verify.email" class="check icon" style="color: green"></i>
                        <i v-else class="expand arrows alternate icon" style="color: red"></i>
                    </div>
                </div>
            </div>
            <div class="column field">
                <label>Su casa</label>
                <GoogleMaps :user="user" :options="{marker: true}" />
            </div>
        </div>
        <button class="ui teal button" :disabled="!verifyAllInputs">Add User</button> 
    </form>
</template>

<script>
import { database } from 'firebase/app'
import 'firebase/database'
import GoogleMaps from '@/components/Map.vue'
export default {
    name: 'New',
    components: {
        GoogleMaps
    },
    props: {
        currentUser: Object
    },
    data: function(){
        this.ref = {
            //users: firestore().collection('users')
            users: database().ref('users')
        }
        return {
            user: {},
            verify: {},
        }
    },
    watch: {
        'user.dni': function(dni){
            if (dni.length < 8){
                this.verify.dni = "El numero de DNI no es muy corto!"
            } else if (dni.length > 8){
                this.verify.dni = "El numero tiene mas de 8 caracteres"
            } else {
                this.verify.dni = null
            }
        },
        'user.cellphone': function(cellphone){
            cellphone = cellphone.replace(/\s/g, '').replace(/(\d{3})/g, '$1 ').trim()
            this.user.cellphone = cellphone
            if (cellphone.length < 11){
                this.verify.cellphone = "El numero de celular es muy corto!"
            } else if (cellphone.length > 13){
                this.verify.cellphone = "El numero tiene mas de 11 caracteres"
            } else {
                this.verify.cellphone = null
            }   
        },
        'user.email': function(email){
            if (!(/\S+@\S+\.\S+/.test(email))){
                this.verify.email = "Email invalido"
            } else {
                this.verify.email = null
            }
        }
    },
    computed: {
        verifyAllInputs: function(){
            console.log(Object.values(this.verify))
            return Object.values(this.verify).filter(x => x != null).length == 0
        }
    },
    methods: {
        addUser: async function(){
            
            //this.verifyUser()
            //await this.ref.users.add(this.user)
            if (!this.user.location){
                alert('Selecciona un punto en el mapa')
                return 
            }
            let ref = this.ref.users.push()
            await ref.set(Object.assign({created: Date.now(), created_by: this.currentUser.uid}, this.user))
            this.$router.push({ name: 'users/:id', params: {id: ref.key, user: this.user}});
        },
    }
}

</script>

<style scoped>
    .inline.field {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .inline.field label {
        width: 25% !important;
    }
    .inline.field div {
        width: 75% !important;
    } 
    button {
        margin-top: 2rem !important;
    }
</style>

