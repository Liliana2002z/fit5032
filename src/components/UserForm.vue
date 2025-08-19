<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="text-center">User Information Form</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input 
                type="text" 
                class="form-control" 
                id="username" 
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username" />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password" />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="form-check">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="isAustralian" 
                  v-model="formData.isAustralian"
                >
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
                <div v-if="errors.isAustralian" class="text-danger">
                  {{ errors.isAustralian }}
                </div>
              </div>
            </div>

            <div class="col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select 
                class="form-select" 
                id="gender" 
                v-model="formData.gender"
              >
                <option value="" disabled>Select Gender</option> 
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea 
              class="form-control" 
              id="reason" 
              rows="3" 
              v-model="formData.reason"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">
              {{ errors.reason }}
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container mt-5" v-if="submittedCards.length">
    <DataTable :value="submittedCards" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" stripedRows tableStyle="min-width: 50rem">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="isAustralian" header="Australian Resident">
        <template #body="slotProps">
          {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
        </template>
      </Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason for Joining"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
  
const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
});

const submittedCards = ref([]);

const submitForm = () => {
  // 1. 在验证开始时重置所有错误
  errors.value = {
    username: null,
    password: null,
    isAustralian: null,
    gender: null,
    reason: null,
  };
  
  let isValid = true;
  
  // 1. 验证 Username
  if (formData.value.username.length < 3) {
      errors.value.username = "Name must be at least 3 characters";
      isValid = false;
  }
  
  // 2. 验证 Password
  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
      errors.value.password = `Password must be at least ${minLength} characters long.`;
      isValid = false;
  } else if (!hasUppercase) {
      errors.value.password = "Password must contain at least one uppercase letter.";
      isValid = false;
  } else if (!hasLowercase) {
      errors.value.password = "Password must contain at least one lowercase letter.";
      isValid = false;
  } else if (!hasNumber) {
      errors.value.password = "Password must contain at least one number.";
      isValid = false;
  } else if (!hasSpecialChar) {
      errors.value.password = "Password must contain at least one special character.";
      isValid = false;
  }

  // 3. 验证 Australian Resident Checkbox
  if (!formData.value.isAustralian) {
    errors.value.isAustralian = 'You must confirm you are an Australian Resident.';
    isValid = false;
  }
  
  // 4. 验证 Gender
  if (!formData.value.gender) {
    errors.value.gender = 'Please select a gender.';
    isValid = false;
  }
  
  // 5. 验证 Reason for joining
  if (!formData.value.reason) {
    errors.value.reason = 'Reason for joining is required.';
    isValid = false;
  }

  // 如果所有验证都通过，则提交表单
  if (isValid) {
    // 将 'isAustralian' 转换为 'Yes'/'No' 或直接存储布尔值，取决于你的需求。
    // 在 DataTable 中使用模板显示时，布尔值更灵活。
    submittedCards.value.push({
        ...formData.value
    });
    clearForm();
  }
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        isAustralian: false,
        reason: '',
        gender: '',
    };
    errors.value = {
      username: null,
      password: null,
      isAustralian: null,
      gender: null,
      reason: null,
    };
};

const errors = ref({
  username: null,
  password: null,
  isAustralian: null,
  gender: null,
  reason: null,
});

const validateName = (blur = false) => {
    if (formData.value.username.length < 3) {
      if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
      errors.value.username = null;
    }
};

const validatePassword = (blur = false) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
};
</script>

<style scoped>
   .p-datatable-header,
   .p-datatable-thead > tr > th,
   .p-datatable-tbody > tr > td {
       background-color: transparent;
       border: none;
       padding: 0.75rem 0.5rem;
   }

   .p-datatable-thead > tr > th {
       font-weight: bold;
   }

   .p-datatable-tbody > tr {
       border-bottom: 1px solid #eee;
   }

   .p-datatable-tbody > tr:last-child {
       border-bottom: none;
   }

   /* 隐藏 PrimeVue 默认的分页器 */
   .p-paginator {
       display: none;
   }
</style>