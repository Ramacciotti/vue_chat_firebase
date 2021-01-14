<!-- Html xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<template>

    <div class="container">      

        <div class="login_container">      

            <div class="login_titulo">
                <h1>Online Chat</h1>     
            </div>
            
            <div class="login_botao">
                <button class="primary" @click="loginSubmit">
                    <i class="fab fa-google"></i>
                    Login with Google!
                    </button>
            </div>

            <div class="login_autora">
                <p>Developed by Mariana Ramacciotti</p>         
            </div>

        </div>

    </div>

</template>

<!-- Javascript xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<script>

// Importar biblioteca firebase
import firebase from 'firebase'

// Exportar
export default {

    methods: {

        // Função que loga usuário no google ---------------------------------------------------------------------------------------------
        loginSubmit(){

            // Dizer que queremos o provedor do google
            const provider = new firebase.auth.GoogleAuthProvider()

            // Redirecionar após o login do usuário
            firebase.auth().signInWithRedirect(provider)

            // Verificar se existem erros
            .catch(console.log)

        }
    }

}

</script>

<!-- Styles xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<style src="./Login.scss" lang="scss" scoped>

</style>