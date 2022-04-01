const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')

/** 刪除所有Todo資料 */
const deleteTodos = (data) => {
  const { res, todos } = data
  todos.length = 0
  successHandler(res, todos);
}

/** 刪除單筆代辦
 * @param data requestListener 資訊與清單物件
 */
const deleteTodo = (data) => {
  const { req, res, todos } = data;

  try {
    const id = req.url.split('/').pop();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      todos.splice(index, 1)
      successHandler(res, todos);
    } else {
      errorHandler(res, 400, message.noData);
    }
  } catch (err) {
    errorHandler(res, 400, err.message);
  }
};

module.exports = {
  deleteTodo,
  deleteTodos
};