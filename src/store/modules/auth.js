import axios from "axios";
export default{
    namespaced: true,
    state: {
        userData: {
            name:null,
            role:null
        }
    },
    getters: {
        
    },
    
    mutations: {
        setUserData(state,user) {
            state.userData.name = user.name,
            state.userData.role = user.role_id
        },
        
    },
    actions: {
        getUserData({commit}){

            const token = localStorage.getItem('authToken');
            const config = {
                 headers: { Authorization: `Bearer ${token}` }
            };
            
            axios.get(process.env.VUE_APP_URL+'user',config).then(response => {   
                const user = response.data.profile
                commit('setUserData',user)
                
            })
            .catch(error=>{
                console.log('token invalido');
            })
        },

        

        
    }
}