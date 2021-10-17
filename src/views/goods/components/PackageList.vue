<template>
  <n-grid :cols="1">
    <n-gi class="mb-2">
      <n-button type="info" class="w-full" dashed @click="addPackage">添加</n-button>
    </n-gi>
    <n-gi class="packageItem" v-for="(item,index) in packageList">
      <n-grid x-gap="3" :cols="12" class="mb-1">
        <n-gi span="6">
          <n-input type="text" placeholder="套餐名称" v-model:value="item.name" />
        </n-gi>
        <n-gi span="4">
          <n-input-number type="text" placeholder="价格" min="0" v-model:value="item.price" />
        </n-gi>
        <n-gi span="2" style="text-align: right;">
          <n-button type="error" @click="deletePackage(index)">删除</n-button>
        </n-gi>
      </n-grid>
    </n-gi>
  </n-grid>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { PackageListData } from '../util/data';

let packageList: PackageListData[] = reactive([])

const addPackage = () => {
  packageList.push({ name: '', price: undefined })
}

const deletePackage = (index: number) => {
  packageList.splice(index, 1)
}

const resetPackage = () => {
  packageList.splice(0, packageList.length)
}
defineExpose({
  packageList,
  resetPackage
})
</script>
