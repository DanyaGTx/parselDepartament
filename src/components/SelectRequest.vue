<template>
  <div class="text-center">
    <h1 class="mb-8">Choose type of request</h1>
    ID :
    <el-input-number
      class="mr-[50px]"
      :min="1"
      v-model="user_id"
      @change="changeUserID"
      placeholder="Please input your ID"
    />
    <el-select
      v-model="typeOfRequest"
      class="m-2"
      placeholder="Select"
      size="large"
    >
      <el-option label="Order" value="create" />
      <el-option label="Delivery" value="deliver" />
    </el-select>
    <el-button @click="chooseTypeOfRequest" type="primary">Go on</el-button>
    <el-button @click="goToAllRequests" type="primary">All Request</el-button>
    <el-button @click="goToMyRequests" type="primary">My Requests</el-button>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

export default {
  name: "SelectRequest",
  data() {
    return {
      typeOfRequest: "",
      user_id: 1,
    };
  },
  methods: {
    changeUserID() {
      localStorage.setItem("USER_ID", this.user_id.toString());
      console.log(localStorage.getItem("USER_ID"));
    },
    chooseTypeOfRequest(query) {
      if (this.typeOfRequest === "create") {
        this.$router.push({
          name: "create",
          query: {
            ...this.$route.query,
          },
        });
      } 
      else if (this.typeOfRequest === "deliver") {
        this.$router.push({
          name: "deliver",
          query: {
            ...this.$route.query,
          },
        });
      } else {
        alert("You have to choose which type of order do you want to execute");
      }
    },
    goToAllRequests(query) {
      
      this.$router.push({
        name: "requests",
        query: {
          ...this.$route.query,
        },
      });
    },
    goToMyRequests(query){
    // this.$router.push({
    //     name: "my-requests",
    //     query: {
    //       ...this.$route.query,
    //     },
    //   });
    this.$router.push({path: `${this.user_id}/my-requests`})
  },
  },
  
  created() {
    if (!localStorage.getItem("USER_ID")) {
      localStorage.setItem("USER_ID", this.user_id.toString());
    }
    console.log(localStorage.getItem("USER_ID"));
    this.user_id = +localStorage.getItem("USER_ID");
  },
};
</script>

