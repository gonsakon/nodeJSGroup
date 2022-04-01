const http = require('http');
const libs = require('./libs');
const { errorHandler } = require('./responseHandler');
const { getTodo, getTodos } = require('./getTodo');
const postTodo = require('./postTodo');
const patchTodo = require('./patchTodo');
const { deleteTodos, deleteTodo } = require('./deleteTodo');
/** 代辦清單 */
const todos = []

const requestListener = (req, res) => {
  const { url, method } = req
  const { headers, message } = libs
  /** requestListener 資訊與清單物件 */
  const data = {
    /** requestListener req */
    req,
    /** requestListener res */
    res,
    /** 代辦清單 */
    todos
  }

  if (url === "/todos" && method === "GET") {
    //取得所有待辦事項
    getTodos(data)
  } else if (url.startsWith("/todos/") && method === "GET") {
    //取得單筆待辦事項
    getTodo(data)
  } else if (url === "/todos" && method === "POST") {
    //新增待辦事項
    postTodo(data)
  } else if (url === "/todos" && method === "DELETE") {
    //刪除所有待辦事項
    deleteTodos(data)
  } else if (url.startsWith("/todos/") && method === "DELETE") {
    //刪除單筆待辦事項
    deleteTodo(data)
  } else if (url.startsWith("/todos/") && method === "PATCH") {
    //修改單筆待辦事項
    patchTodo(data)
  } else if (method === "OPTIONS") {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandler(res, 404, message[404])
  }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3000);