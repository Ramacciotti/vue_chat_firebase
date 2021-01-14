import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

// Configuração tirada do firebase
var firebaseConfig = {
    apiKey: "AIzaSyApgjs4gUDZkRYz8AivAXQjwWHcym-2-s4",
    authDomain: "vue-chat-firebase-d4839.firebaseapp.com",
    projectId: "vue-chat-firebase-d4839",
    storageBucket: "vue-chat-firebase-d4839.appspot.com",
    messagingSenderId: "878920803353",
    appId: "1:878920803353:web:70cd97ae128ad946407688"
};

// Inicializar firebase
firebase.initializeApp(firebaseConfig)

// Certificar-se que o aplicativo só carregue depois que o usuário logar
firebase.auth().onAuthStateChanged(() => new Vue({
    render: h => h(App)
}).$mount('#app')
)

