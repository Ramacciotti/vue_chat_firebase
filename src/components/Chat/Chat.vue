<!-- Html xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<template>

    <div class="view chat">

        <!-- Header ----------------------------------------------------------------------------------------------------------------------->
        <header>
            <h1>Chat with Firebase!</h1>
            <span class="autora">Developed by Mariana Ramacciotti</span>
            <button class="logout" @click="logout">X</button>
        </header>

        <!-- Chat ------------------------------------------------------------------------------------------------------------------------->
        <section>

            <!-- As mensagens aparecerão aqui ...................................................................................-->
            <main class="chat-box">
                <!-- Listar todas as mensagens dentro da array mensagens + criar uma chave index -->
                <div v-for="(msg, index) in messages" v-bind:key="'index-' + index" :class="['message', sentOrReceived(msg.userUID)]">
                    <!-- Foto do usuário -->    
                    <img :src="msg.photoURL" :alt="msg.displayName" />
                    <!-- Texto do usuário -->    
                    <p>{{ msg.text }}</p>
                </div>

                <!-- Scroll automático -->
                <div ref="scrollable"></div>

            </main>

            <!-- Botão enviar ..........................................................................................................-->  
            <footer>
            
                <form v-on:submit.prevent="sendMessage">
                    <!-- Método será ativado ao enviar o formulário-->
                    <input v-model="message" type="text" placeholder="Enter your message!" />
                    <input class="botao_enviar" :disabled="!message" type="submit"/>
                </form>

            </footer>

        </section>

    </div>

<!-- Javascript xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
</template>

<script>

// Importar biblioteca firebase
import firebase from "firebase";

export default {

    // Executa assim que a página carrega ---------------------------------------------------------------------------------------------
    mounted() {

        // Query: Listar todas as mensagens da database, e colocar dentro da mensagens array + snap é uma função que roda toda vez que há mudança na database
        // Faz as mensagens serem atualizadas em tempo real
        this.db.collection("messages").orderBy("createdAt").onSnapshot((querySnap) => {
            
            // Cada msg tem um document e temos que pegar cada document de cada msg
            this.messages = querySnap.docs.map((doc) => doc.data());
        
        });

    },

    // Variáveis -------------------------------------------------------------------------------------------------------------------------
    data() {
        return {
            user: firebase.auth().currentUser, // Pega o nome do usuário
            db: firebase.firestore(), // Instância do firestore
            message: "", // mensagem enviada
            messages: [], // Guarda todas as mensagens
        };
    },

    // Funções -----------------------------------------------------------------------------------------------------------------------------
    methods: {

        // Função que desloga usuário no google ...................................................................................
        logout() {
            firebase.auth().signOut();
        },

        // Checa se o UID é o mesmo do meu UID, e se for, terna string sent ou received ..................................................................
        sentOrReceived(userUID) {
            return userUID === this.user.uid ? "sent" : "received";
        },

        // Ativada ao clicar no botão ...............................................................................................
        async sendMessage() {

            // Pegar toda a informação da mensagem que será salva na database
            const messageInfo = {
                userUID: this.user.uid, // Id do usuário
                displayName: this.user.displayName, // Nome do usuário
                photoURL: this.user.photoURL, // Foto do usuário
                text: this.message,
                createdAt: Date.now(), // Pega data e horário da mensagem
            };

            // Espera até as mensagens serem recolhidas para continuar    
            await this.db.collection("messages").add(messageInfo);
            
            // Depois que terminar, limpar o campo da mensagem            
            this.message = "";
            
            // Scrolla para fim da page            
            this.$refs["scrollable"].scrollIntoView({ behavior: "smooth" });
        },
    },
};
</script>

<!-- Styles xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
<style src="./Chat.scss" lang="scss" scoped>
</style>