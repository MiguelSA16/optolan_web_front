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
                    <v-card-title  class="d-block">
                        <h6 class=" text-h6 text-center">
                            Formulario de Registro 
                        </h6>
                        <h6 class="text-center grey--text text--darken-3 text-body-2 ">
                            Registrate y no te pierdas ninguna de nuestra ofertas
                        </h6>    
                    </v-card-title>
                    <v-card-text class=" pt-6">      
                        <v-form
                            ref="form"
                            v-model="rules.valid"
                            lazy-validation
                        >                   
                        <v-row>                        
                            <v-col cols="6" class="py-0">
                                <v-text-field 
                                    dense 
                                    outlined 
                                    color="grey darken-2"
                                    label="Nombre"                                    
                                    v-model="formRegistro.name"
                                    :rules="[rules.required]"
                                    required
                                > 
                                </v-text-field>
                            </v-col>
                            <v-col cols="6" class="py-0">
                                <v-text-field
                                    dense 
                                    outlined 
                                    type="phone"
                                    color="grey darken-2"
                                    label="Telefono"
                                    v-model="formRegistro.telefono"
                                    :rules="[rules.phone]"
                                >
                                </v-text-field>  
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <v-text-field
                                    dense 
                                    outlined 
                                    color="grey darken-2"
                                    label="Nombre Empresa"
                                    v-model="formRegistro.empresa"
                                    :rules="[rules.required]"
                                    placeholder="Nombre empresa o Particular"
                                >
                                </v-text-field>  
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <v-text-field
                                    dense 
                                    outlined 
                                    color="grey darken-2"
                                    label="Email"
                                    v-model="formRegistro.email"
                                    :rules="[rules.email]"   
                                    @keydown="closeAlert"
                                >
                                </v-text-field>                                  
                            </v-col>
                            <v-col cols="6" class="py-0">
                                <v-text-field 
                                    :type="mostrar ? 'text' : 'password'"
                                    dense 
                                    outlined 
                                    color="grey darken-2"
                                    label="Contraseña"
                                    v-model="formRegistro.password"
                                    :rules="passwordRules"
                                > 
                                </v-text-field>
                            </v-col>
                            <v-col cols="6" class="py-0">
                                <v-text-field
                                    :type="mostrar ? 'text' : 'password'"
                                    dense 
                                    outlined 
                                    color="grey darken-2"
                                    label="confirmacion"
                                    v-model="formRegistro.c_password"
                                    :rules="passwordRules"
                                    :error="!valid()"
                                >
                                </v-text-field>  
                            </v-col>

                            <v-col cols="12" class="py-0">
                                Utiliza ocho caracteres como mínimo con una combinación de letras, números y símbolos
                                <v-checkbox
                                    @click="mostrarContraseña()"
                                    label="mostrar contraseña"
                                ></v-checkbox>
                            </v-col>

                            <v-col cols="12">                                
                                <v-btn :disabled="!rules.valid" block  color="red darken-2" class="white--text"  @click.prevent="register()" >
                                    Registrarse
                                </v-btn>
                            </v-col>                                                 
                        </v-row>                   
                        </v-form>        
                                    
                    </v-card-text>
                </v-card>
            </v-row>
            <p>{{this.formRegistro.nombre}}</p>
        </v-container>
    </v-container>
</template>

<script>
import { mapActions,mapMutations,mapState } from 'vuex';
import axios from "axios";

export default {
    data() {
        return {
            mostrar:false,
            formRegistro:{
                name:'',
                telefono:'',
                empresa:'',
                email:'',
                password:'',
                c_password:''
            },
            alertData:{
                message:null,
                type:null,
                value:false
            },
            passwordRules: [
                v => !!v || 'se requiere contraseña',
                v => (v && v.length >= 8) || 'Utiliza ocho caracteres como mínimo.',
            ],
                        
            rules: {
                valid:true,
                required: value => !!value || "Required",
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Email inválido.";
                },
                phone:value => {
                    const pattern = /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/;
                    return pattern.test(value) || "telefono inválido.";
                }
            }            
        }
    },
    computed:{
        ...mapState(['url']),
        //...mapState('auth',['alertData']),
    },

    methods: {

        mostrarContraseña(){
            this.mostrar = !this.mostrar;
        },

        valid() {
            //retorna un verdadero
            return this.formRegistro.password === this.formRegistro.c_password;            
        }, 
        
        closeAlert(){
            this.alertData.value= false
        },

        ...mapMutations("auth",["setUserData"]),
        ...mapActions("auth", ["sendRegisterRequest"]),

        register: function() {
            if(this.$refs.form.validate()){
                axios
                    .post(this.url+"register",this.formRegistro)
                    .then(response => {                        
                        const message =response.data.message;
                        this.alertData.value=true;
                        this.alertData.message=message;
                        this.alertData.type = 'success';
                        
                        //Asigna los datos a USER
                        this.setUserData(response.data.user);

                        //Redireccion al inicio d e la web
                        this.$router.push({ name: "index" });
                        
                        //Guarda el token de autenticacion                        
                        localStorage.setItem("authToken", response.data.access_token);                        
                    })
                    .catch(error => {                        
                        const message =error.response.data.message;
                        this.alertData.value=true
                        this.alertData.message=message
                        this.alertData.type = 'error'
                        this.formRegistro.email=''                   
                    });            
                }
        }  

    }
}
</script>