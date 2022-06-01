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
        sort-by="calories"
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
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-divider class="mx-4" inset vertical light/>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="550px"
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
                    <v-card width="800px">
                        <v-card-title>
                            <span class="text-h5">
                                Agrupar Articulos                                
                            </span>
                        </v-card-title>
                        <v-card-text>                            
                            <v-container>                                
                                <v-row 
                                    v-for="item in selected"
                                    :key="item.id"
                                >                                    
                                    <v-col cols="3" class="pb-0">
                                        <label for="">Padre</label>
                                        <v-checkbox
                                            v-model="itemPadre"
                                            :value="item.codigo"
                                            class="my-0"
                                        ></v-checkbox>
                                    </v-col>   
                                    <v-col cols="3" class="pb-0">
                                        <label class="d-block">
                                            Grupo:
                                        </label>
                                        <v-btn x-small rounded color="info" >
                                            {{item.grupo}}
                                        </v-btn>
                                    </v-col>   
                                    <v-col cols="6" class="pb-0">
                                        <label class="d-block">
                                            Codigo:
                                        </label>
                                        <v-btn x-small rounded color="info" >
                                            {{item.codigo}}
                                        </v-btn>
                                    </v-col>
                                   <v-col cols="12" class="py-1" >
                                        <label class="d-block">
                                            Nombre
                                        </label>
                                        <v-btn color="info" x-small elevation="0">
                                            {{item.nombre}}
                                        </v-btn>
                                    </v-col>                                    
                                    <v-col cols="2" class="pb-1">
                                        <v-text-field
                                            v-model="item.n_orden"
                                            label="Nº Orden"
                                        >
                                        </v-text-field>
                                    </v-col>                                       
                                    <v-col cols="3" class="pb-1">
                                        <v-text-field
                                            v-model="item.caracteristica"
                                            label="Caracteristica"
                                        >
                                        </v-text-field>
                                    </v-col>   
                                    <v-col cols="4" class="pb-1">
                                        <v-text-field
                                            v-model="itemAgrupadoPor"
                                            label="Agrupado por"
                                        >
                                        </v-text-field>
                                    </v-col>                 
                                    <v-col cols="12" >
                                        <v-divider horizontal class=" py-0"></v-divider>
                                    </v-col>
                                    
                                </v-row>                                
                            </v-container>                            
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
        search: '',
        message: '',
        dialog: false,
        dialogDelete: false,
        selected: [],
        itemPadre:'',
        itemAgrupadoPor:'',
        headers: [
            { text: 'ID', value: 'id' },
            { text: 'Codigo', value: 'codigo' },
            { text: 'Nº Orden', value: 'n_orden'},
            { text: 'Grupo', value: 'grupo' },            
            { text: 'Agrupado por', value: 'agrupado_por' },
            { text: 'Caracteristica', value: 'caracteristica' },
            { text: 'Nombre', value: 'nombre', sortable: false },
            { text: 'Familia', value: 'nomfam', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        articulos: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
        itemPadre(val){
            let index = 1
            this.selected.forEach(item =>{                
                if(item.codigo != this.itemPadre){
                    item.grupo = this.itemPadre
                    index++
                    item.n_orden = index
                }                    
                else{
                    item.grupo = 'padre'
                    item.n_orden = 1                    
                }
            }) 
        },
        itemAgrupadoPor(val){
            this.selected.forEach(item =>{        
                item.agrupado_por = this.itemAgrupadoPor
            })
        }
    },
    computed:{
    },
    created () {
        this.$emit(`update:layout`, AdminLayout)
        this.initialize()        
    },
    methods: {
        llenarCaracteristicaItem(caracteristica, nombre, codigo){
            let text = nombre.toLowerCase()
            let buscar = caracteristica.toLowerCase()
            let position = text.search(buscar);    
            this.selected.forEach(item =>{      
                if(item.codigo != codigo){
                    let result = item.nombre.substring(position);
                    item.caracteristica = result                    
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
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
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