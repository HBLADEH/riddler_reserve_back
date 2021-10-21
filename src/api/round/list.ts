import http from '@/utils/http/axios';
//获取table
export function getTableList(params) {
  return http.request({
    url: '/rounds/listAll',
    method: 'GET',
    params,
  });
}

export function getRoundById(id) {
  return http.request({
    url: '/rounds/' + id,
    method: 'GET'
  })
}

export function addRound(params) {
  return http.request({
    url: '/rounds',
    method: 'POST',
    params
  })
}

export function editRound(params) {
  return http.request({
    url: '/rounds',
    method: 'PUT',
    params
  })
}

export function deleteRoundByIds(ids) {
  return http.request({
    url: '/rounds',
    method: 'DELETE',
    params: ids,
  })
}