<template> 
  <div>
    <h1>All Requests</h1>
    <ButtonBack />

    <el-dialog v-model="dialogVisible" title="Editing request" width="80%" >
      <span>It's a draggable Dialog</span>
      <template #footer  >
        <span class="dialog-footer">
          <el-form
            ref="formRef"
            :model="editingForm"
            label-width="120px"
            :rules="rules"
          >
            <el-form-item label="City From" prop="cityFrom">
              <el-input v-model="editingForm.cityFrom" />
            </el-form-item>
            <el-form-item label="City To" prop="cityTo">
              <el-input v-model="editingForm.cityTo" />
            </el-form-item>
            <el-form-item label="Type of parcel">
              <el-select
                v-model="editingForm.typeOfParcel"
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
                  v-model="editingForm.date"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="Descirption">
              <el-input  v-model="editingForm.desc" type="textarea" />
            </el-form-item>
          </el-form>
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button el-button type="primary" @click="confirmEditingRequest($refs.formRef)"
                >Confirm</el-button
            >
        </span>
      </template>
    </el-dialog>

    <el-table
      v-loading="isLoading"
      :data="allRequests"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="form.date" label="Date" width="180" sortable>
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span>{{ scope.row.form.date  }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="USER_ID" label="ID" sortable width="180" />
      <el-table-column prop="form.cityFrom" sortable label="City From" />
      <el-table-column prop="form.cityTo" sortable label="City To" />
      <el-table-column prop="form.typeOfParcel" sortable label="Type" />
      <el-table-column prop="form.desc" sortable label="Description" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="editRequest(scope.$index,scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deleteRequest(scope.row)"
            >Delete</el-button
          >
             
        </template>
      </el-table-column>
    </el-table>
  </div>
</template> 
<script>
import axios from "axios";
export default {
  name: "allRequests",
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
      allRequests: [],
      isLoading: false,
      dialogVisible: false,
      temporaryIndexForRequest : null,
      editingForm: {
        cityFrom: "",
        cityTo: "",
        typeOfParcel: "",
        date: "",
        desc: "",
      },

    };
  },
  async created() {
    this.isLoading = true;
    await axios
      .get("/api/requests")
      .then((res) => this.allRequests.push(...res.data));
    this.isLoading = false;
  },
  methods: {
    deleteRequest(row) {
      this.allRequests = this.allRequests.filter((request) => request !== row);
      localStorage.setItem("allRequestsList", JSON.stringify(this.allRequests));
    },
    editRequest(index, row) {
      this.dialogVisible = true;

      this.editingForm.cityFrom = row.form.cityFrom
      this.editingForm.cityTo = row.form.cityTo
      this.editingForm.typeOfParcel = row.form.typeOfParcel
      this.editingForm.date = row.form.date
      this.editingForm.desc = row.form.desc

      this.temporaryIndexForRequest = index;

      

    },
    async confirmEditingRequest(formEl) {
     
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          this.allRequests[this.temporaryIndexForRequest].form.cityFrom = this.editingForm.cityFrom
          this.allRequests[this.temporaryIndexForRequest].form.cityTo = this.editingForm.cityTo
          this.allRequests[this.temporaryIndexForRequest].form.typeOfParcel = this.editingForm.typeOfParcel
          this.allRequests[this.temporaryIndexForRequest].form.date = this.editingForm.date
          this.allRequests[this.temporaryIndexForRequest].form.desc = this.editingForm.desc

          localStorage.setItem("allRequestsList", JSON.stringify(this.allRequests));

           this.dialogVisible = false
        }
        else {
          console.log("error submit!", fields);
        }
      })
    },

  },

};
</script>
