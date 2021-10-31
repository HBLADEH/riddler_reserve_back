<template>
  <n-card :bordered="false" :title="'商品编辑 编号:' + route.params.id" class="proCard">
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
              :autosize="{ minRows: 3 }"
              v-model:value="formValue.goods.description"
            />
          </n-form-item>
          <n-form-item label="商品套餐" path="packageList">
            <PackageList ref="pl" />
          </n-form-item>
          <div style="margin-left: 80px">
            <n-space>
              <n-button type="primary" @click="formSubmit">编辑商品</n-button>
              <n-button @click="goBack">返回</n-button>
            </n-space>
          </div>
        </n-form>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import PackageList from '../components/PackageList.vue';
import { FromData, PackageListData, PackageListRef } from '../util/data';
import { rules } from '../util/FormRules'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import { editGoods, getGoodsById } from '@/api/goods/list';
import { useTabsViewStore } from '@/store/modules/tabsView';
import { BasicUpload } from '@/components/Upload';

const route = useRoute()
const router = useRouter()
const tabsViewStore = useTabsViewStore();

const message = useMessage();


const uploadHeaders = reactive({
  platform: 'miniPrograms',
  timestamp: new Date().getTime(),
  token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
});

// const setImgs = inject("setImgs")
const formRef: any = ref(null);

const defaultValueRef = () => ({
  goods: {
    name: '',
    description: '',
    playNum: 0,
    coverImg: ""
  },
  packageList: []
});
const uploadList = ref<string[]>([

]);
let pl = ref<null | PackageListRef>(null)
onMounted(() => {
  getGoodsById(route.params.id).then((res) => {
    const { goods, packageList } = res
    formValue.goods = goods
    formValue.packageList = packageList
    if (goods.coverImg) uploadList.value.push(goods.coverImg)
    if (packageList.length > 0)
      pl.value?.setPackage(packageList)
  })
});



let formValue: FromData = reactive(defaultValueRef());
const formSubmit = () => {
  formValue.packageList = pl.value?.packageList
  formRef.value.validate((errors) => {
    if (!errors && checkPackageList(formValue.packageList)) {
      formValue.goods.coverImg = uploadList.value[0]
      doEditGoods()
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
}

const checkPackageList = (packageList: PackageListData[] | undefined) => {
  return packageList?.every(item => item.price && item.name)
}

const doEditGoods = () => {
  editGoods(formValue).then((_res) => {
    message.success('修改商品成功!');
    goBack()
  }).catch((error) => {
    console.error(error)
  })
}

// const resetForm = () => {
//   formRef.value.restoreValidation();
//   formValue = Object.assign(unref(formValue), defaultValueRef());
//   pl.value?.resetPackage()
// }
const uploadChange = (list: string[]) => {
  uploadList.value = list
}
const goBack = () => {
  tabsViewStore.closeCurrentTab(route);
  router.push("/goods/list")
}

</script>

<style lang="less" scoped>
</style>
