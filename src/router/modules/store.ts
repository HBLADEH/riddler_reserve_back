import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ShopOutlined, HomeOutlined, AppstoreAddOutlined } from '@vicons/antd';
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
    path: '/store',
    name: 'store',
    component: Layout,
    meta: {
      title: '店铺管理',
      icon: renderIcon(ShopOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'room',
        name: 'room-list',
        meta: {
          title: '房间管理',
          icon: renderIcon(HomeOutlined),
        },
        component: () => import('@/views/room/list/index.vue'),
      },
      {
        path: 'round',
        name: 'round-list',
        meta: {
          title: '场次管理',
          icon: renderIcon(AppstoreAddOutlined),
        },
        component: () => import('@/views/round/list/index.vue'),
      },
    ],
  },
];

export default routes;
