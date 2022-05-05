<template>
    <v-container fluid >
           
        <v-container>
            
            <v-row class=" justify-center">
                <v-card width="550" class=" my-10">
                    <v-alert
                        border="left"
                        dismissible
                        :type="alertData.type"
                        class="mt-2 mb-0 mx-4"
                        transition="scale-transition"
                        :value="alertData.value"                                        
                    >
                        {{alertData.message}}

                    </v-alert> 
                    <v-card-title class="d-block">
                        <h6 class=" text-h6 text-center">
                            Bienvenido a Optolan Technology S.L.
                        </h6> 
                        <h6 class="text-center grey--text text--darken-3 text-body-2 ">
                            Log in with email and password
                        </h6>                     
                    </v-card-title>
                    <v-card-text class="grey--text text--darken-3 pt-4">         

                        <v-text-field 
                            dense 
                            outlined 
                            color="grey darken-2"
                            label="Email"
                            :rules="[rules.email]"  
                            v-model="formLogin.email"
                        >                        
                        </v-text-field>
                        
                        <v-text-field
                            :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="mostrarPassword ? 'text' : 'password'"
                            name="input-10-2"
                            label="Password"
                            class="input-group--focused"
                            @click:append="mostrarPassword = !mostrarPassword"
                            color="grey darken-2"
                            outlined
                            dense
                            v-model="formLogin.password"
                        ></v-text-field>
                        <v-btn block dark color="red darken-2" class="mt-4" @click="login">
                            Login
                        </v-btn>
                        <p class="text-center text-body-2 pt-1">
                            ¿No tienes cuenta?
                            <v-btn text small to="/registrate">
                                Regístrate
                            </v-btn>  
                        </p>
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            mostrarPassword: false,
            formLogin: {
                email:'miguelsotoalania@gmail.com',
                password:'Pato1902@'
            },
            alertData:{
                message:null,
                type:null,
                value:false
            },
            rules: {
                valid:true,
                required: value => !!value || "Required",
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Email inválido.";
                }
            }
        }
    },

    computed:{
        ...mapState(['url'])
    },

    methods:{
        ...mapMutations("auth",["setUserData"]),

        login(){

            const headers={
                'Content-Type': 'application/json'
            }            
            axios
                .post(this.url+"login",this.formLogin,{
                    headers: headers
                })
                .then(response => {
                    
                    //Asigna los datos a USER
                        this.setUserData(response.data.user);

                    //Redireccion al inicio d e la web
                    this.$router.push({ name: "index" });
                    
                    //Guarda el token de autenticacion                        
                    localStorage.setItem("authToken", response.data.access_token);      
                })
                .catch(error => {                        
                    /*const message =error.response.data.message;
                    this.alertData.value=true
                    this.alertData.message=message
                    this.alertData.type = 'error'*/
                    //this.formRegistro.email=''                   
                });     
        }

    }
}
</script>