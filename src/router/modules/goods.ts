import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ShoppingCartOutlined, OrderedListOutlined, PlusOutlined } from '@vicons/antd';
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
    path: '/goods',
    name: 'Goods',
    redirect: '/goods/list',
    component: Layout,
    meta: {
      title: '商品页面',
      icon: renderIcon(ShoppingCartOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'list',
        name: 'goods-list',
        meta: {
          title: '商品列表',
          icon: renderIcon(OrderedListOutlined),
        },
        component: () => import('@/views/goods/list/index.vue'),
      },
      {
        path: 'add',
        name: 'goods-add',
        meta: {
          title: '商品添加',
          icon: renderIcon(PlusOutlined),
        },
        component: () => import('@/views/goods/add/add.vue'),
      },
      {
        path: 'info/:id?',
        name: 'goods-info',
        meta: {
          title: '商品详情',
          hidden: true,
          activeMenu: 'goods-list',
        },
        component: () => import('@/views/goods/edit/info.vue'),
      },
    ],
  },
];

export default routes;
