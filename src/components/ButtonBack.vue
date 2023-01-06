<template>
     <el-button @click="goMain">Back</el-button>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute() 

    
export default{
    
   methods: {
    goMain(query) {      
        this.$router.push({
        name: 'main',
        query: {
          ...this.$route.query,
        },
      })
    }  
   }
}
</script>
