import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { AccountBookOutlined, OrderedListOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/order',
    name: 'Order',
    redirect: '/order/list',
    component: Layout,
    meta: {
      title: '订单页面',
      icon: renderIcon(AccountBookOutlined),
      sort: 5,
    },
    children: [
      {
        path: 'list',
        name: 'order-list',
        meta: {
          title: '订单列表',
          icon: renderIcon(OrderedListOutlined),
        },
        component: () => import('@/views/order/list/index.vue'),
      },
      {
        path: 'basic-info/:id?',
        name: 'basic-info',
        meta: {
          title: '基础详情',
          hidden: true,
          activeMenu: 'basic-list',
        },
        component: () => import('@/views/list/basicList/info.vue'),
      },
    ],
  },
];

export default routes;
