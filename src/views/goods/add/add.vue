<template>
  <n-card :bordered="false" title="商品添加" class="proCard">
    <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
      <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
        <n-form
          :label-width="80"
          :model="formValue.goods"
          :rules="rules"
          label-placement="left"
          ref="formRef"
          class="py-8"
        >
          <n-form-item label="商品名称" path="name">
            <n-input placeholder="请输入商品名称" v-model:value="formValue.goods.name" />
          </n-form-item>
          <n-form-item label="游玩人数" path="playNum">
            <n-input-number
              placeholder="请输入游玩人数"
              v-model:value="formValue.goods.playNum"
              min="0"
              max="100"
            >
              <template #suffix>人</template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="商品描述" path="description">
            <n-input
              placeholder="请输入商品描述"
              type="textarea"
              v-model:value="formValue.goods.description"
            />
          </n-form-item>
          <n-form-item label="商品套餐" path="packageList">
            <PackageList ref="pl" />
          </n-form-item>
          <div style="margin-left: 80px">
            <n-space>
              <n-button type="primary" @click="formSubmit">添加商品</n-button>
              <n-button @click="resetForm">重置</n-button>
            </n-space>
          </div>
        </n-form>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, unref, reactive } from 'vue';
import { useMessage } from 'naive-ui';
import { FromData, PackageListData } from '../util/data';

import PackageList from '../components/PackageList.vue';
import { addGoods } from '@/api/goods/list';
import { RequestData } from '@/api/util/data';
import { HTTP_CODE } from "@/api/util/httpCode"

const validateNumber = (_rule, value) => value != null

const rules = {
  name: {
    required: true,
    message: '请输入商品名称',
    trigger: 'blur',
  },
  playNum: {
    validator: validateNumber,
    message: '请输入游玩人数',
    trigger: 'blur',
  },

};

const formRef: any = ref(null);
const message = useMessage();

const defaultValueRef = () => ({
  goods: {
    name: '',
    description: '',
    playNum: 0,
  },
  packageList: []
});

interface PackageListRef {
  packageList: PackageListData[]
  resetPackage: () => {}
}


let pl = ref<null | PackageListRef>(null)

let formValue: FromData = reactive(defaultValueRef());
const formSubmit = () => {
  formValue.packageList = pl.value?.packageList
  formRef.value.validate((errors) => {
    if (!errors) {
      doAddGoods()
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
}

const doAddGoods = () => {
  addGoods(formValue).then((_res) => {
    message.success('添加商品成功!');
  }).catch((error) => {
    console.error(error)
  })

}

const resetForm = () => {
  formRef.value.restoreValidation();
  formValue = Object.assign(unref(formValue), defaultValueRef());
  pl.value?.resetPackage()
}

</script>
