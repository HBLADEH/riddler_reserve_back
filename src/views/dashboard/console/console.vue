<template>
  <div class="console">
    <!--数据卡片-->
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item>
        <NCard
          title="访问量"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else suffix=" 次" :endVal="dashBoardData.data?.views" class="text-3xl" />
          </div>

          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" text :repeat="2" />
              <template v-else>
                <div class="text-sn">昨日数据：</div>
                <div class="text-sn">
                  <CountTo suffix=" 次" :endVal="dashBoardData.data?.viewsYesterday" />
                </div>
                <div class="text-sn">相比差距：</div>
                <div class="text-sn">
                  <CountTo suffix=" 次" :endVal="dashBoardData.data?.viewsCompareYesterday" />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="商品数"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="info">总</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else suffix=" 件" :endVal="dashBoardData.data?.goodsSum" class="text-3xl" />
          </div>

          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="text-sn">用户总数：</div>
                <div class="text-sn">
                  <CountTo suffix=" 人" :endVal="dashBoardData.data?.userSum" />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="订单量"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="warning">月</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo
              v-else
              suffix=" 份"
              :endVal="dashBoardData.data?.orderGroupSum"
              class="text-3xl"
            />
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="text-sn">上月数据：</div>
                <div class="text-sn">
                  <CountTo suffix=" 份" :endVal="dashBoardData.data?.orderGroupSumYesterday" />
                </div>
                <div class="text-sn">相比差距：</div>
                <div class="text-sn">
                  <CountTo suffix=" 份" :endVal="dashBoardData.data?.orderGroupSumYesterday" />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="成交额"
          :segmented="{ content: 'hard', footer: 'hard' }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="error">月</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo
              v-else
              prefix="￥"
              :startVal="1"
              :endVal="dashBoardData.data?.orderPriceSum"
              class="text-3xl"
            />
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="text-sn">上月数据：</div>
                <div class="text-sn">
                  <CountTo
                    prefix="￥"
                    :startVal="1"
                    :endVal="dashBoardData.data?.orderPriceSumYesterday"
                  />
                </div>
                <div class="text-sn">相比差距：</div>
                <div class="text-sn">
                  <CountTo
                    prefix="￥"
                    :startVal="1"
                    :endVal="dashBoardData.data?.orderPriceSumCompareYesterday"
                  />
                </div>
              </template>
            </div>
          </template>
        </NCard>
      </n-grid-item>
    </n-grid>

    <!--导航卡片-->
    <div class="mt-4">
      <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
        <n-grid-item v-for="(item, index) in iconList" :key="index">
          <NCard content-style="padding-top: 0;" size="small" :bordered="false">
            <template #footer>
              <n-skeleton v-if="loading" size="medium" />
              <div class="cursor-pointer" v-else>
                <p class="flex justify-center">
                  <span>
                    <n-icon :size="item.size" class="flex-1" :color="item.color">
                      <component :is="item.icon" v-on="item.eventObject || {}" />
                    </n-icon>
                  </span>
                </p>
                <p class="flex justify-center">
                  <span>{{ item.title }}</span>
                </p>
              </div>
            </template>
          </NCard>
        </n-grid-item>
      </n-grid>
    </div>

    <!--访问量 | 流量趋势-->
    <VisiTab />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { getConsoleInfo } from '@/api/dashboard/console';
import VisiTab from './components/VisiTab.vue';
import { CountTo } from '@/components/CountTo/index';
import {
  // CaretUpOutlined,
  // CaretDownOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  TagsOutlined,
  SettingOutlined,
  CalendarOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
} from '@vicons/antd';
import router from '@/router';

// const cardHeaderStyle = ref({ 'border-bottom': '1px solid #eee', 'font-size': '16px' });

interface DashBoardType {
  views: number
  viewsYesterday: number
  viewsCompareYesterday: number
  goodsSum: number
  orderPriceSum: number
  orderPriceSumYesterday: number
  orderPriceSumCompareYesterday: number
  orderGroupSum: number
  orderGroupSumYesterday: number
  orderGroupSumCompareYesterday: number
  userSum: number
}

interface DashBoardDataType {
  data?: DashBoardType
}
const loading = ref(true);
const dashBoardData = reactive<DashBoardDataType>({
})

// 图标列表
const iconList = [
  {
    icon: UsergroupAddOutlined,
    size: '32',
    title: '用户',
    color: '#69c0ff',
    eventObject: {
      click: () => {
        router.push("/user/list")
      },
    },
  },
  {
    icon: ShoppingCartOutlined,
    size: '32',
    title: '商品',
    color: '#ff9c6e',
    eventObject: {
      click: () => {
        router.push("/goods/list")
      },
    },
  },
  {
    icon: CalendarOutlined,
    size: '32',
    title: '组局',
    color: '#69c0ff',
    eventObject: {
      click: () => {
        router.push("/orderGroup/list")
      },
    },
  },
  {
    icon: HomeOutlined,
    size: '32',
    title: '房间',
    color: '#ffd666',
    eventObject: {
      click: () => {
        router.push("/store/room")
      },
    },
  },
  {
    icon: AppstoreAddOutlined,
    size: '32',
    title: '场次',
    color: '#5cdbd3',
    eventObject: {
      click: () => {
        router.push("/store/round")
      },
    },
  },
  {
    icon: AccountBookOutlined,
    size: '32',
    title: '订单',
    color: '#b37feb',
    eventObject: {
      click: () => {
        router.push("/order/list")
      },
    },
  },
  {
    icon: TagsOutlined,
    size: '32',
    title: '标签',
    color: '#ff85c0',
    eventObject: {
      click: () => { },
    },
  },
  {
    icon: SettingOutlined,
    size: '32',
    title: '配置',
    color: '#ffc069',
    eventObject: {
      click: () => { },
    },
  },
];

onMounted(async () => {
  dashBoardData.data = await getConsoleInfo();
  // console.log(dashBoardData.data?.views);

  loading.value = false;
});
</script>

<style lang="less" scoped></style>
