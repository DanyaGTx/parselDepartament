<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="City From" prop="cityFrom">
      <el-input v-model="form.cityFrom" />
    </el-form-item>
    <el-form-item label="City To" prop="cityTo">
      <el-input v-model="form.cityTo" />
    </el-form-item>
    <el-form-item label="Type of parcel">
      <el-select
        v-model="form.typeOfParcel"
        placeholder="please select your type"
      >
        <el-option label="Gadgets" value="gadgets" />
        <el-option label="Drinks" value="drinks" />
        <el-option label="Clothes" value="clothes" />
        <el-option label="Medicines" value="medicines" />
        <el-option label="Other" value="other" />
      </el-select>
    </el-form-item>
    <el-form-item label="Date of dispatch">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
            
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Descirption">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm($refs.formRef)">Create</el-button>

      <ButtonBack />
    </el-form-item>
  </el-form>
</template>



<script>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

export default {
  name: "CreateOrderForm",
  data() {
    return {
      rules: {
        cityFrom: [
          {
            required: true,
            message: "Please input a city from",
            trigger: "blur",
          },
        ],
        cityTo: [
          {
            required: true,
            message: "Please input a city to",
            trigger: "blur",
          },
        ],
      },
      form: {
        cityFrom: "",
        cityTo: "",
        typeOfParcel: "",
        date: "",
        desc: "",
      },
      requestsList: [],
      
    };
  },
  methods: {
    async submitForm(formEl) {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          const newRequest = { ...this.form };
          axios.post("/api/requests", { data: newRequest });

          this.$router.push({
            name: "requests",
            query: {
              ...this.$route.query,
            },
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    },
  },
};
</script>



