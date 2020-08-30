import request from '../network/request'

export function fetchData(){
  return request({
    url:'./table.json',
    method:'get',
  })
}
