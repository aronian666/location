<template>
    <div class="flex">
        <div>
            <div class="ui secondary pointing menu">
                <a class="item" :class="{active: exist}" @click="exist = true">
                    Ingresar
                </a>
                <a class="item" :class="{active: !exist}" @click="exist = false">
                    Registrarse
                </a>
            </div>
            <form class="ui form" @submit.prevent="addUser(exist)">
                <SignIn :user="user" v-if="exist" />
                <SignUp :user="user" v-else />
            </form>
        </div>
        
    </div>
</template>

<script>
import firebase from 'firebase/app'
import SignIn from '@/components/login/SignIn.vue'
import SignUp from '@/components/login/SignUp.vue'
export default {
    components: {
        SignIn,
        SignUp
    },
    data: function(){
        return {
            user: {},
            exist: true
        }
    },
    methods: {
        addUser(exist){
            const {email, password} = this.user
            if (exist){
                firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                    location.reload()
                })
                return
            }
            firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
                location.reload()
            })
        }
    }
}
</script>

<style scoped>
    .flex{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    form {
        width: 100vw;
        max-width: 340px !important;
    }
    a {
        width: 50%;
    }
</style>