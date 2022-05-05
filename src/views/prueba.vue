
<template>
  <!--  <div>
    <v-container >

        <v-menu nudge-bottom="5" bottom offset-y v-model="menu" >
            <template v-slot:activator="{ on, attrs }">          
                <v-btn  v-bind="attrs" v-on="on" dark color="red darken-2 " depressed>      
                        <v-icon> mdi-view-dashboard </v-icon>
                            Categorias
                        <v-icon> mdi-chevron-down </v-icon>
                    </v-btn>  
            </template>

            <v-list  >
                <v-list-item dense to="#" link v-for="j in 2" :key="j" >
                    <v-list-item-icon>
                        <v-icon>mdi-tag-multiple-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title >Familia {{j}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-menu 
                    v-for=" x in 4 "
                    :key="x"
                    offset-x
                    nudge-right="5"
                    transition="slide-x-transition"
                    open-on-click
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item v-on="on" to="#" v-bind="attrs" dense active-class="active" >
                            <v-list-item-icon>
                                <v-icon> mdi-tag-multiple</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Categorias</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon> mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </template>
                    <v-list>
                        <v-list-item to="#" dense link v-for="i in 3" :key="i" @click="closeMenu()" >
                            <v-list-item-icon>
                                <v-icon>mdi-tag-multiple-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title >Categoria {{i}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-menu 
                            v-for="x in 4"
                            :key="x"
                            offset-x
                            nudge-right="5"
                            transition="slide-x-transition"
                            open-on-click
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item v-on="on" v-bind="attrs" dense active-class="active" >
                                    <v-list-item-icon>
                                        <v-icon> mdi-tag-multiple</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>Categorias</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-icon>
                                        <v-icon> mdi-chevron-right</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </template>
                            <v-list>
                                <v-list-item to="#" dense link v-for="i in 3" :key="i" @click="closeMenu()" >
                                    <v-list-item-icon>
                                        <v-icon>mdi-tag-multiple-outline</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title >SubCategoria {{i}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-list>
                </v-menu>
                
            </v-list>
                
      </v-menu>

      
      
    </v-container>
  </div> -->
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        
        <v-col cols="12">
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
/*
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    
    data(){
        return{
        }
    },

     computed:{
        ...mapState([   
            'menu'
            
        ]),
    },


    methods:{

        ...mapMutations([
            'closeMenuFam'
        ]),

        

        closeMenu(){
           this.closeMenuFam()
        }


        
    }
}*/
export default {
  data: () => ({
    valid: true,
    
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ]
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>