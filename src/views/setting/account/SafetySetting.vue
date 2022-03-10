<template>
  <n-grid cols="1" responsive="screen" class="-mt-5">
    <n-grid-item>
      <n-list>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" @click="showCPModal = true" text>修改</n-button>
          </template>
          <n-thing title="账户密码">
            <template #description>
              <span class="text-gray-400">对管理员的密码进行修改，保证其安全性</span>
            </template>
          </n-thing>
        </n-list-item>
        <!-- <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="绑定手机">
            <template #description
              ><span class="text-gray-400">已绑定手机号：+86189****4877</span></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>设置</n-button>
          </template>
          <n-thing title="密保问题">
            <template #description
              ><span class="text-gray-400"
                >未设置密保问题，密保问题可有效保护账户安全</span
              ></template
            >
          </n-thing>
        </n-list-item>
        <n-list-item>
          <template #suffix>
            <n-button type="primary" text>修改</n-button>
          </template>
          <n-thing title="个性域名">
            <template #description
              ><span class="text-gray-400">已绑定域名：https://www.naiveui.com</span></template
            >
          </n-thing>
        </n-list-item>-->
      </n-list>
    </n-grid-item>
  </n-grid>
  <n-modal v-model:show="showCPModal" :show-icon="false" preset="dialog" title="添加房间">
    <n-form
      :model="formCPParams"
      :rules="rules"
      ref="formRef"
      label-placement="left"
      :label-width="80"
      class="py-4"
    >
      <n-form-item label="旧密码" path="oldPassword">
        <n-input
          type="password"
          show-password-on="mousedown"
          placeholder="请输入旧密码"
          :maxlength="20"
          v-model:value="formCPParams.oldPassword"
        />
      </n-form-item>
      <n-form-item label="新密码" path="newPassword">
        <n-input
          type="password"
          show-password-on="mousedown"
          placeholder="请输入新密码"
          :maxlength="20"
          v-model:value="formCPParams.newPassword"
        />
      </n-form-item>
      <n-form-item label="确认密码" path="cPassword">
        <n-input
          type="password"
          show-password-on="mousedown"
          placeholder="请输入确认密码"
          :maxlength="20"
          v-model:value="formCPParams.cPassword"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-space>
        <n-button @click="() => (showCPModal = false)">取消</n-button>
        <n-button type="info" :loading="formBtnLoading" @click="confirmCPForm">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { changePassword } from '@/api/admin/admin';

const message = useMessage();
const showCPModal = ref(false)
const formBtnLoading = ref(false);
const formRef: any = ref(null);
const formCPParams = reactive({
  oldPassword: '',
  newPassword: '',
  cPassword: '',
})

const rules = {
  oldPassword: {
    required: true,
    message: '请输入旧密码',
    trigger: 'blur',
  },
  newPassword: {
    required: true,
    message: '请输入新密码',
    trigger: 'blur',
  },
  cPassword: {
    required: true,
    validator: () => formCPParams.cPassword != "" && formCPParams.newPassword == formCPParams.cPassword,
    message: '确认密码要和新密码一致',
    trigger: 'blur',
  },
}


const confirmCPForm = (e) => {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors) => {
    if (!errors) {
      doCP()
      setTimeout(() => {
        showCPModal.value = false;
      });
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
}
const doCP = () => {
  console.log(formCPParams);
  const CPForm = {
    oldPassword: formCPParams.oldPassword,
    newPassword: formCPParams.newPassword
  }
  changePassword(CPForm).then((_res) => {
    message.success('修改密码成功！');

  }).catch((error) => {
    console.error(error)
  })
}
</script>
