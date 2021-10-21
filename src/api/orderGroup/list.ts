import http from '@/utils/http/axios';
//获取table
export function getTableList(params) {
  return http.request({
    url: '/orderGroups/listAll',
    method: 'GET',
    params,
  });
}

export function getOrderGroupById(id) {
  return http.request({
    url: '/orderGroups/' + id,
    method: 'GET'
  })
}

export function addOrderGroup(params) {
  return http.request({
    url: '/orderGroups',
    method: 'POST',
    params
  })
}

export function editOrderGroup(params) {
  return http.request({
    url: '/orderGroups',
    method: 'PUT',
    params
  })
}

export function deleteOrderGroupByIds(ids) {
  return http.request({
    url: '/orderGroups',
    method: 'DELETE',
    params: ids,
  })
}

export function getAllDWGoods() {
  return http.request({
    url: '/goods/allDW',
    method: "GET",
  })
}

export function getAllDWRoomds() {
  return http.request({
    url: '/rooms/allDW',
    method: "GET",
  })
}
export function getAllDWRounds() {
  return http.request({
    url: '/rounds/allDW',
    method: "GET",
  })
}