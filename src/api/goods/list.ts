import http from '@/utils/http/axios';
//获取table
export function getTableList(params) {
  return http.request({
    url: '/goods/listAll',
    method: 'GET',
    params,
  });
}

export function getGoodsById(id) {
  return http.request({
    url: '/goods/' + id,
    method: 'GET'
  })
}

export function addGoods(params) {
  return http.request({
    url: '/goods',
    method: 'POST',
    params
  })
}

export function editGoods(params) {
  return http.request({
    url: '/goods',
    method: 'PUT',
    params
  })
}

export function deleteGoodsByIds(ids) {
  return http.request({
    url: '/goods',
    method: 'DELETE',
    params: ids,
  })
}