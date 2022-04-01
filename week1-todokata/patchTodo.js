const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')

/** 編輯單筆代辦
 * @param data requestListener 資訊與清單物件
 */
const patchTodo = (data) => {
  const { req, res, todos } = data;
  /** http 傳來的 body 資訊 */
  let body = "";

  // 監聽 req 當 req 收到片段的 chunk 時，將片段資料加入 body 內。
  req.on('data', chunk => {
    body += chunk;
  });

  // 監聽 req 當 req 收完資料時，執行新增單筆代辦的功能
  req.on('end', () => {
    const { noData, wrongColumn } = message
    try {
      const { title } = JSON.parse(body);

      if (title) {
        const id = req.url.split('/').pop();
        const index = todos.findIndex((todo) => todo.id === id);

        if (index !== -1) {
          todos[index].title = title;
          successHandler(res, todos);
        } else {
          errorHandler(res, 400, noData);
        }
      } else {
        errorHandler(res, 400, wrongColumn);
      }
    } catch (err) {
      errorHandler(res, 400, err.message);
    }
  });
};

module.exports = patchTodo;