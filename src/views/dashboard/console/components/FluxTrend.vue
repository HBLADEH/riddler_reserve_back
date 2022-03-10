<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';

import { useECharts } from '@/hooks/web/useECharts';

import { basicProps } from './props';
import { getAfterViews } from '@/api/dashboard/console';

export default defineComponent({
  props: basicProps,
  setup() {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
    // const afterData = [
    //   { view_date: '2021-12-24', views: 0 },
    //   { view_date: '2021-12-25', views: 1 },
    //   { view_date: '2021-12-26', views: 5 },
    //   { view_date: '2021-12-27', views: 10 },
    //   { view_date: '2021-12-28', views: 2 },
    //   { view_date: '2021-12-29', views: 3 },
    //   { view_date: '2021-12-30', views: 0 },
    // ]
    // const afterDay = afterData.map(t => { return t.view_date.slice(5) })
    // const afterView = afterData.map(t => { return t.views })
    // console.log(afterDay);
    onMounted(() => {
      getAfterViews().then((res) => {
        const afterData = res
        const afterDay = afterData.map(t => { return t.viewDate.slice(5) })
        const afterView = afterData.map(t => { return t.views })
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: afterDay,
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid',
                color: 'rgba(226,226,226,0.5)',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              type: 'value',
              splitNumber: 4,
              axisTick: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                },
              },
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          series: [
            {
              smooth: true,
              data: afterView,
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#5ab1ef',
              },
            },
          ],
        });
      })
    });
    return { chartRef };
  },
});
</script>
