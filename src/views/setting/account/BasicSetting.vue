<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="用户名">{{ userStore.info.username }}</n-form-item>
        <n-form-item label="昵称" path="nickname">
          <n-input v-model:value="formValue.nickname" placeholder="请输入昵称" />
        </n-form-item>

        <n-form-item label="邮箱" path="email">
          <n-input placeholder="请输入邮箱" v-model:value="formValue.email" />
        </n-form-item>
        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { useUserStore } from '@/store/modules/user';
import { changeInfo } from '@/api/admin/admin';

const rules = {
  nickname: {
    required: true,
    message: '请输入昵称',
    trigger: 'blur',
  },
};
const formRef: any = ref(null);
const message = useMessage();

const userStore = useUserStore()

const formValue = reactive({
  nickname: '',
  email: '',
});


onMounted(() => {
  formValue.nickname = userStore.info.nickname
  formValue.email = userStore.info.email
})


function formSubmit() {
  formRef.value.validate((errors) => {
    if (!errors) {
      changeInfo(formValue).then((_res) => {
        userStore.info.nickname = formValue.nickname
        userStore.info.email = formValue.email
        message.success('修改信息成功！');
      }).catch((error) => {
        console.error(error)
      })
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
}
</script>
