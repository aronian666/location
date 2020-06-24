import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import router from './router'
import 'semantic-ui-css/semantic.min.css';

Array.prototype.search = function(search){ // Funcion general para busqueda en la tabla, las tablas dependeran de esta en el futuro, migrar todas las tablas aqui plox

  return this.filter(element => {
    if (typeof search == 'string'){
      let values = Object.values(element)
      for (let i = 0; i < values.length; i++){
        if (typeof values[i] != 'string'){
          continue
        }
        if (values[i].toLowerCase().search(search.toLowerCase()) != -1){
          return true
        }
      }
      
      return false
    } else {
      var keys = Object.keys(search)
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (element[key] == undefined || element[key] == null){
          element[key] = ""
        }
        if (element[key].toString().toLowerCase().search(search[key].toString().toLowerCase()) == -1){
          return false
        }
      }
      return true
    }
  })
}
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyC090yeXmE6adzPnrEDPhG-vQ2bPdbdt4s",
  authDomain: "location-96c4d.firebaseapp.com",
  databaseURL: "https://location-96c4d.firebaseio.com",
  projectId: "location-96c4d",
  storageBucket: "location-96c4d.appspot.com",
  messagingSenderId: "946479963428",
  appId: "1:946479963428:web:3d70ea4df949ba0f56e7b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const initializeAuth = new Promise(resolve => {
  // this adds a hook for the initial auth-change event
  firebase.auth().onAuthStateChanged(user => {
    //authService.setUser(user)
    resolve(user)
  })
})
initializeAuth.then(user => {
  //console.log(user)
  new Vue({
    router,
    render: h => h(App, {props: {user}})
  }).$mount('#app')
})


