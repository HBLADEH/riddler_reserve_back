import http from '@/utils/http/axios';
//获取table
export function getTableList(params) {
  http.configAxios({ requestOptions: { isTransformResponse: false } })

  return http.request({
    url: '/goods/listAll',
    method: 'GET',
    params,
  });
}

export function addGoods(params) {
  return http.request({
    url: '/goods',
    method: 'POST',
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