import http from '@/utils/http/axios';

export function getTableList(params) {
  return http.request({
    url: '/users/listAll',
    method: 'GET',
    params,
  });
}

export function deleteUserByIds(ids) {
  return http.request({
    url: '/users',
    method: 'DELETE',
    params: ids,
  })
}