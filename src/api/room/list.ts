import http from '@/utils/http/axios';
//获取table
export function getTableList(params) {
  return http.request({
    url: '/rooms/listAll',
    method: 'GET',
    params,
  });
}

export function getRoomById(id) {
  return http.request({
    url: '/rooms/' + id,
    method: 'GET'
  })
}

export function addRoom(params) {
  return http.request({
    url: '/rooms',
    method: 'POST',
    params
  })
}

export function editRoom(params) {
  return http.request({
    url: '/rooms',
    method: 'PUT',
    params
  })
}

export function deleteRoomByIds(ids) {
  return http.request({
    url: '/rooms',
    method: 'DELETE',
    params: ids,
  })
}