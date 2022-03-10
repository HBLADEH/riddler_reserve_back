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
          <n-form-item label="封面图片" path="coverImg">
            <!-- @uploadChange="uploadChange" -->
            <!-- :data="{ type: 0 }" -->
            <BasicUpload
              action="/api/goods/uploadCoverImg"
              :headers="uploadHeaders"
              name="files"
              :width="100"
              :height="100"
              :maxNumber="1"
              @uploadChange="uploadChange"
              v-model:value="uploadList"
              helpText="图片不超过20MB, 最好在3:00前提交数据"
            />
          </n-form-item>
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
import { ref, unref, reactive, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { FromData, PackageListData, PackageListRef } from '../util/data';
import { BasicUpload } from '@/components/Upload';

import PackageList from '../components/PackageList.vue';
import { addGoods } from '@/api/goods/list';
import { rules } from '../util/FormRules'
import router from '@/router';
import { useRoute } from 'vue-router';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';

const route = useRoute();
const asyncRouteStore = useAsyncRouteStore();
const formRef: any = ref(null);
const message = useMessage();

const uploadHeaders = reactive({
  platform: 'miniPrograms',
  timestamp: new Date().getTime(),
  token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
});

const uploadList = ref<string[]>([
]);

const defaultValueRef = () => ({
  goods: {
    name: '',
    coverImg: '',
    description: '',
    playNum: 0,
  },
  packageList: []
});


onMounted(() => {
  // uploadList.value.push('123')
  // uploadList.value.slice(0, uploadList.value.length)
})

let pl = ref<null | PackageListRef>(null)

let formValue: FromData = reactive(defaultValueRef());
const formSubmit = () => {

  formValue.packageList = pl.value?.packageList
  formRef.value.validate((errors) => {
    if (!errors && checkPackageList(formValue.packageList)) {
      formValue.goods.coverImg = uploadList.value[0]
      doAddGoods()
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
}


const checkPackageList = (packageList: PackageListData[] | undefined) => {
  return packageList?.every(item => item.price && item.name)
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
  delKeepAliveCompName();
  router.push('/redirect/goods/add');
}

// 移除缓存组件名称
const delKeepAliveCompName = () => {
  if (route.meta.keepAlive) {
    const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
      ?.components?.default.name;
    if (name) {
      asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
        (item) => item != name
      );
    }
  }
};
const uploadChange = (list: string[]) => {
  uploadList.value = list
}

</script>
