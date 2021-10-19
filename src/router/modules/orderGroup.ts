import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
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
    path: '/orderGroup',
    name: 'OrderGroup',
    redirect: '/orderGroup/list',
    component: Layout,
    meta: {
      title: '组局页面',
      icon: renderIcon(TableOutlined),
      sort: 10,
    },
    children: [
      {
        path: 'list',
        name: 'orderGroup-list',
        meta: {
          title: '组局列表',
        },
        component: () => import('@/views/orderGroup/list/index.vue'),
      },
      {
        path: 'add',
        name: 'orderGroup-add',
        meta: {
          title: '组局添加',
        },
        component: () => import('@/views/orderGroup/add/add.vue'),
      },
      {
        path: 'info/:id?',
        name: 'orderGroup-info',
        meta: {
          title: '组局详情',
          hidden: true,
          activeMenu: 'orderGroup-list',
        },
        component: () => import('@/views/orderGroup/edit/info.vue'),
      },
    ],
  },
];

export default routes;
