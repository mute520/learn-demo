import request from './request'

export const productGet = (data) => request({url: '/product/get', method: 'get', data})
export const productPost = (data) => request({url: '/product/post', method: 'post', data})

// 获取数据
export const getPosts = (data) => request({url: '/posts', method: 'get', data})
export const getComments = (data) => request({url: '/comments', method: 'get', data})
export const getAlbums = (data) => request({url: '/albums', method: 'get', data})
export const getPhotos = (data) => request({url: '/photos', method: 'get', data})
export const getTodos = (data) => request({url: '/todos', method: 'get', data})
export const getUsers = (data) => request({url: '/users', method: 'get', data})
// 创建数据
export const postPosts = (data) => request({url: '/posts', method: 'post', data})
export const postComments = (data) => request({url: '/comments', method: 'post', data})
export const postAlbums = (data) => request({url: '/albums', method: 'post', data})
export const postPhotos = (data) => request({url: '/photos', method: 'post', data})
export const postTodos = (data) => request({url: '/todos', method: 'post', data})
export const postUsers = (data) => request({url: '/users', method: 'post', data})
// 修改数据
export const updatePosts = (data) => request({url: '/posts/1', method: 'put', data})
export const updateComments = (data) => request({url: '/comments', method: 'put', data})
export const updateAlbums = (data) => request({url: '/albums', method: 'put', data})
export const updatePhotos = (data) => request({url: '/photos', method: 'put', data})
export const updateTodos = (data) => request({url: '/todos', method: 'put', data})
export const updateUsers = (data) => request({url: '/users', method: 'put', data})
// 删除数据
export const deletePosts = (data) => request({url: '/posts/1', method: 'delete', data})
export const deleteComments = (data) => request({url: '/comments', method: 'delete', data})
export const deleteAlbums = (data) => request({url: '/albums', method: 'delete', data})
export const deletePhotos = (data) => request({url: '/photos', method: 'delete', data})
export const deleteTodos = (data) => request({url: '/todos', method: 'delete', data})
export const deleteUsers = (data) => request({url: '/users', method: 'delete', data})
export const youdao = (data) => request({
  url: 'http://fanyi.youdao.com/openapi.do?keyfrom=Skykai521&key=977124034&type=data&doctype=jsonp&version=1.1',
  method: 'post',
  data
})
export const deleteById = (data) => request({
  // url: 'http://localhost:80/web/demo2/score_delete.php',
  url: '/web/demo2/score_delete.php',
  method: 'post',
  data,
  qs: true
})
export const getStudentInfo = data => request({
  url: '/web/student/list.php',
  method: 'get',
  data,
  qs: true
})
export const addStudentInfo = data => request({
  url: '/web/student/add.php',
  method: 'post',
  data,
  qs: true
})
export const deleteStudentInfo = data => request({
  url: '/web/student/delete.php',
  method: 'post',
  data,
  qs: true
})
export const udpateStudentInfo = data => request({
  url: '/web/student/update.php',
  method: 'post',
  data,
  qs: true
})
export const createStudents = data => request({
  url: '/web/student/createStudents.php',
  method: 'post',
  data,
  qs: true
})
export const uploadImage = data => request({
  url: '/web/student/upload_image.php',
  method: 'post',
  data,
  qs: true,
  headers: { 'Content-Type': 'multipart/form-data' },
  timeout: 60 * 1000 * 10,
})
