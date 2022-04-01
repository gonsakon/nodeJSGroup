const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')

/** 取得所有Todo資料
 * @param data requestListener 資訊與清單物件
 */
const getTodos = (data) => {
  const { res, todos } = data
  successHandler(res, todos)
}

/** 取得單一Todo資料
 * @param data 列表資料
 */
const getTodo = (data) => {
  const { req, res, todos } = data;
  const id = req.url.split('/').pop();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    successHandler(res, todos[index]);
  } else {
    const { noData } = message
    errorHandler(res, 400, noData);
  }
}

module.exports = {
  getTodo,
  getTodos
};