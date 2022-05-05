<template>
    <v-card flat tile color="grey lighten-4">
        <v-window  v-model="onboarding">
            <v-window-item >
                <div >
                    <v-row class="fill-height align-center">
                        <v-col cols="7" lg="8">
                            <v-col xl="7" cols="12">
                                <h1 class="show-3 font-weight-bold mb-4">
                                    Fabricación de cualquier tipo de cable
                                </h1>
                            </v-col>

                            <v-col xl="8" cols="12">
                                <p class="secondary--text banner-text mb-4">                                    
                                    Bajo descripción del cliente
                                </p>
                            </v-col>
                        </v-col>
                        <v-col lg="4" cols="5">
                            <v-responsive max-width="320">
                                <v-img src="@/assets/1.png" >

                            </v-img>
                            </v-responsive>
                            
                        </v-col>
                    </v-row>
                </div>
            </v-window-item>
            <v-window-item >
                <div>
                    <v-row class="fill-height align-center">
                        <v-col cols="7" lg="8">
                            <v-col xl="7" cols="12">
                                <h1 class="show-3 font-weight-bold mb-4">
                                    60% Off For Your First Shopping
                                </h1>
                            </v-col>

                            <v-col xl="8" cols="12">
                                <p class="secondary--text banner-text mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Quis lobortis consequat eu, quam etiam at quis
                                    ut convallis.
                                </p>

                                <v-btn class="text-capitalize primary" >
                                    Shop Now
                                </v-btn>
                            </v-col>
                        </v-col>
                        <v-col lg="4" cols="5">
                            <v-responsive max-width="320">
                                <v-img src="@/assets/reloj.png" >

                            </v-img>
                            </v-responsive>
                            
                        </v-col>
                    </v-row>
                </div>
            </v-window-item>
        </v-window>

        <v-card-actions class="justify-space-between">
            <v-btn text @click="prev">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-item-group v-model="onboarding" class="text-center" mandatory>
                <v-item
                    v-for="n in length"
                    :key="`btn-${n}`"
                    v-slot="{ active, toggle }"
                >
                    <v-btn :input-value="active" icon @click="toggle">
                        <v-icon>mdi-record</v-icon>
                    </v-btn>
                </v-item>
            </v-item-group>
            <v-btn text @click="next">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>        
</template>
<script>
export default {
  
    data() {
        return {
            length: 2,
            onboarding: 0,            
        }
    },

    

    
    methods: {

        next() {
            this.onboarding =
            this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
        },
        prev() {
            this.onboarding =
            this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
        },
    },
    
};


</script>

<style>
    .show-3 {
        line-height: 1.2;
        font-size: 50px!important;
    }
</style>