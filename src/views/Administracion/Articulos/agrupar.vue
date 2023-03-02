<template>
    <v-container fluid>
        <v-alert
            :value="alert"
            color="success"
            border="left"
            transition="scale-transition"
            dark
        >
            {{message}}
        </v-alert>
        <v-data-table
            :headers="headers"
            :items="articulos"
            :search="search"
            item-key="id"
            class="elevation-1"
            v-model="selected"
            show-select        
        >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>ARTICULOS</v-toolbar-title>
                <v-spacer></v-spacer>     
                <v-divider class="mx-4" inset vertical light/>           
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                    class="px-4"
                >
                </v-text-field>
                <v-text-field
                    v-model="nomfam"
                    append-icon="mdi-magnify"
                    label="Familia"
                    single-line
                    hide-details
                    class="px-4"
                >
                </v-text-field>
                <v-divider class="mx-4" inset vertical light/>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="800px"
                    persistent
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Agrupar
                        </v-btn>
                    </template>
                    <v-card  color="grey lighten-3">
                        <v-card-title>
                            <span class="text-h5">
                                Agrupar Articulos                                
                            </span>
                        </v-card-title>
                        <v-card-text> 
                            <v-row  v-show="formularioAgrupar">
                                <v-col cols="6">
                                    <v-card color="info" dark>
                                        <v-card-title>
                                            {{toltalSelected}} Articulos Selecionados
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row>    
                                                <v-col cols="12" v-show="messageAgrupar">
                                                    <v-alert type="error">
                                                        {{messageAgrupar}}
                                                    </v-alert>                                                    
                                                </v-col>                                            
                                                <v-col cols="12" class=" pb-0">
                                                    <v-text-field
                                                        v-model="itemAgrupadoPor"
                                                        label="Agrupado por"
                                                    >
                                                    </v-text-field>
                                                </v-col>   
                                                <v-col cols="12" class=" pb-0" v-show="itemAgrupadoPor">
                                                    <label class="d-block">
                                                        {{itemAgrupadoPor}}
                                                    </label>
                                                    <v-chip-group column v-model="indexGrupo">
                                                        <v-chip small v-for="(item, index) in nombreTroceado" :key="index" :value="index"  @click="llenarCaracteristicaItem()">
                                                            {{item}}
                                                        </v-chip>
                                                    </v-chip-group>        
                                                                                                     
                                                </v-col>   
                                                 <v-col cols="12" class=" pb-0">
                                                    <v-divider class=" pb-4"></v-divider>
                                                    <label class="d-block">
                                                        Grupo General
                                                    </label>
                                                    <v-chip-group column >
                                                        <div v-for="item in selected" :key="item.id"  class=" d-block">
                                                            <v-chip small v-if="item.grupo_portada == 'portada'"  color="red" @click="grupoGenerar(item.codigo)">
                                                                {{item.codigo}}
                                                            </v-chip>
                                                        </div>                                                             
                                                    </v-chip-group>                                                                                                                                                    
                                                </v-col>  
                                                <v-col cols="6" class=" pt-0" v-show="nombreGrupoGeneral">
                                                    <v-text-field v-model="nombreGrupoGeneral">
                                                    </v-text-field> 
                                                </v-col>      
                                                <v-col cols="6" class=" pt-0" v-show="nombreGrupoGeneral">
                                                    <v-text-field v-model="nombreD1" label="Descricion Grupo General">
                                                    </v-text-field> 
                                                </v-col>   
                                                <v-col cols="12" class=" pb-0" v-show="nombreD1">
                                                    <label class="d-block">
                                                        {{nombreD1}}
                                                    </label>
                                                    <v-chip-group column >
                                                        <v-chip small v-for="(item, index) in nombreTroceado" :key="index"  @click="llenarC1(index)">
                                                            {{item}}
                                                        </v-chip>
                                                    </v-chip-group>        
                                                                                                     
                                                </v-col>                                                                           
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="6">
                                    <v-card >
                                        <v-card-text>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" v-for="item in selected" :key="item.id">
                                    <v-card >
                                        <v-card-text>
                                            <v-row>
                                               <v-col cols="3" class="pb-0 pr-0">
                                                    <label for="">Portada</label>
                                                    <v-checkbox
                                                        v-model="itemPortada"
                                                        :value="item.codigo"
                                                        class="my-0"
                                                    ></v-checkbox>
                                                </v-col>                                                  
                                                <v-col cols="3" class="pb-0">
                                                    <label class="d-block">
                                                        Grupo:
                                                    </label>
                                                    <v-btn x-small  elevation="0" color="info" block>
                                                        {{item.grupo_portada}}
                                                    </v-btn>
                                                </v-col>  
                                                <v-col cols="6" class="pb-0">
                                                    <label class="d-block">
                                                        Codigo:
                                                    </label>
                                                    <v-btn x-small  elevation="0"  color="info" block >
                                                        {{item.codigo}}
                                                    </v-btn>
                                                </v-col>  
                                                <v-col cols="12" class="py-1" >
                                                    <label class="d-block">
                                                        Nombre
                                                    </label>
                                                    <v-btn color="info" x-small elevation="0" block>
                                                        {{item.nombre}}
                                                    </v-btn>
                                                </v-col>  

                                                <v-col cols="6" class="pb-0 " v-show="itemAgrupadoPor">
                                                    <v-text-field
                                                        v-model="item.n_orden"
                                                        label="Nº"
                                                    >
                                                    </v-text-field>                                                    
                                                </v-col>    
                                                <v-col cols="6" class="pb-1" v-show="itemAgrupadoPor">
                                                    <v-text-field
                                                        v-model="item.caracteristica"
                                                        :label="itemAgrupadoPor"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="6"  v-show="nombreGrupoGeneral">
                                                    <label class="d-block">
                                                        Grupo General
                                                    </label>
                                                    <v-btn color="info" x-small elevation="0" block>
                                                        {{item.grupo_general}}
                                                    </v-btn>
                                                </v-col>  
                                                <v-col cols="6"  v-show="nombreGrupoGeneral">
                                                    <v-text-field
                                                        v-model="item.c1"
                                                        :label="item.d1"
                                                    >
                                                    </v-text-field>
                                                </v-col>  
                                            </v-row>
                                        </v-card-text>
                                    </v-card>        
                                </v-col>
                            </v-row>                  
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="saveSelect"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:item.actions="{item}">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
        <v-btn
            color="primary"
            @click="initialize"
        >
            Reset
        </v-btn>
        </template>
    </v-data-table>
    </v-container>    
 </template>

<script>

import AdminLayout from "@/layouts/Admin.vue"
import axios from "axios"
export default {
    data: () => ({
        alert: false,
        toltalSelected:'',
        nombreTroceado:[],
        search: '',
        message: '',
        indexGrupo:'',
        messageAgrupar:'',
        nombreGrupoGeneral:'',
        nombreD1:'',
        formularioAgrupar: false,
        dialog: false,
        dialogDelete: false,
        selected: [],
        itemPortada:'',
        nomfam:'',
        itemAgrupadoPor:'',
        
        articulos: []
    }),

    watch: {
        dialog (val) {
            val || this.close()
            this.toltalSelected = this.selected.length
            this.selected.forEach(item =>{ 
                if(item.grupo_portada == 'portada'){
                    this.formularioAgrupar = true
                    this.itemAgrupadoPor = item.agrupado_por
                    this.longitudNombres(item.nombre)
                }
                if(item.grupo_portada != 'portada' && item.grupo_portada != null ){
                    this.formularioAgrupar = true
                    this.itemAgrupadoPor = item.agrupado_por
                    this.longitudNombres(item.nombre)
                }
            })            
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
        itemPortada(val){
            console.log(val)
            this.formularioAgrupar = true
            let index = 1                       
            this.selected.forEach(item =>{                               
                if(item.codigo != val && val != null){
                    item.grupo_portada = val                    
                    item.n_orden = index
                    index++
                }                    
                else if(item.codigo == val && val != null){
                    item.grupo_portada = 'portada'
                    item.n_orden = 0
                    this.longitudNombres(item.nombre)                     
                }
                else{
                    item.grupo_portada = ''
                    item.n_orden = 0
                }
            })           
        },
        itemAgrupadoPor(val){
            this.selected.forEach(item =>{                   
                item.agrupado_por = val                
            })
        },
        nombreGrupoGeneral(val){
            this.selected.forEach(item=>{
                item.grupo_general = val
            })
        },
        nombreD1(val){
            this.selected.forEach(item=>{
                item.d1 = val
            })
        },
        indexGrupo(val){
            let arrayNombre = []            
            this.selected.forEach(item =>{
                arrayNombre = item.nombre.split(" ")
                item.caracteristica = arrayNombre[val]
            })
        }, 
    },
    computed:{
        headers () {
            return [
                { text: 'ID', value: 'id' },
                { text: 'Codigo', value: 'codigo' },
                { text: 'Nº Orden', value: 'n_orden'},
                { text: 'Portada', value: 'grupo_portada' },            
                { text: 'Agrupado por', value: 'agrupado_por' },
                { text: 'Caracteristica', value: 'caracteristica' },
                { text: 'Grupo', value: 'grupo_general' },
                { text: 'C1', value: 'c1' },
                { text: 'D2', value: 'd2' },
                { text: 'Nombre', value: 'nombre', sortable: false },
                { 
                    text: 'Familia', 
                    value: 'nomfam',
                    filter: value => {
                        if (!this.nomfam){
                            return true
                        } 
                        return value == this.nomfam
                    },
                },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
      },
    },
    created () {
        this.$emit(`update:layout`, AdminLayout)
        this.initialize()        
    },
    methods: {
        
        llenarC1(index){
            let arrayC1 = []            
            this.selected.forEach(item =>{
                arrayC1 = item.nombre.split(" ")
                item.c1 = arrayC1[index]
            })
        },
        grupoGenerar(cdogigoGrupoGeneral){
            this.nombreGrupoGeneral = cdogigoGrupoGeneral
            this.selected.forEach(item =>{
                item.grupo_general = this.nombreGrupoGeneral
            })
        }, 
        longitudNombres(nombre){
            this.nombreTroceado= nombre.split(" ")            
            let tamañoNombre = this.nombreTroceado.length
            this.selected.forEach(item =>{  
                if((item.nombre.split(" ").length) != tamañoNombre){
                this.messageAgrupar = "El nombre de los articulos es distinto"
                }
            })
        },   
        initialize () {
            const url = process.env.VUE_APP_URL + 'articulos';
            axios.get(url).then(response => {   
                    this.articulos = response.data.articulos;
            })
        },
        saveSelect() {
             this.selected.forEach(item =>{  
                let url = process.env.VUE_APP_URL + 'grupo_articulos/' + item.id;
                axios.put(url,item).then(response => {
                    this.message = response.data.message
                })    
            })
            this.alert = true
            this.selected = []
            this.itemAgrupadoPor =''
            this.itemPortada = ''
            this.formularioAgrupar=false
            this.close()
            setTimeout(()=>{this.alert=false},2000)
            
        },

        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.selected=[]
            this.initialize()
            this.formularioAgrupar=false
            this.dialog = false
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        }       
    },
  }
</script>