import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false
var firebaseConfig = {
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
  render: h => h(App),
}).$mount('#app')
