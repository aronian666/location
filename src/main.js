import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import 'semantic-ui-css/semantic.min.css';

Array.prototype.search = function(search){ // Funcion general para busqueda en la tabla, las tablas dependeran de esta en el futuro, migrar todas las tablas aqui plox
  return this.filter(element => {
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
  })
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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
