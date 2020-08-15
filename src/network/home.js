// 获取数据列表
export async function Index(that, path, message, queryInfo) {
  // 发送Get请求
  const {data: result} = await that.$http.get('admin/' + path, {params: queryInfo})
  // 判断请求是否成功
  if (result.meta.status !== 200) return that.$message.error(message + "失败")
  that.$message.success(message + "成功")
  return result.data
}

// 保存新建资源
export async function Save(that, path, message, addForm) {
  // 发送POST请求
  const {data : result} = await that.$http.post('admin/' + path, addForm)
  // 判断请求是否成功
  if (result.meta.status !== 201 )  return that.$message.error(message + "失败")
  that.$message.success(message + "成功")
}

// 显示指定的资源
export async function Read(that, path, message, id) {
  // 发送GET请求
  const {data : result} = await that.$http.get('admin/' + path + '/' + id)
  if (result.meta.status !== 200) return this.$message.error(message + "失败")
  return result.data
}

// 保存更新的资源
export async function Put(that, path, message, id, queryInfo) {
  // 发送PUT请求
  const {data : result} = await that.$http.put('admin/' + path + '/' + id, queryInfo)
  // 判断请求是否成功
  if (result.meta.status !== 200 )  return that.$message.error(message + "失败")
  that.$message.success(message + "成功")
}

// 删除指定资源
export async function Delete(that, path, message, id) {
  // 发送DELETE请求
  const {data : result} = await that.$http.delete('admin/' + path + '/' + id)
  // 判断请求是否成功
  if (result.meta.status !== 200) return that.$message.error(message + "失败")
  that.$message.success(message + "成功")
}