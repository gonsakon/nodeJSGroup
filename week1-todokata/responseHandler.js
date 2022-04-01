const { headers } = require('./libs');

/** 成功
 * @param res requestListener 的 res
 * @param data requestListener 資訊與清單物件
 */
const successHandler = (res, data) => {
  res.writeHeader(200, headers);
  res.write(JSON.stringify({
    status: 'success',
    data,
  }));
  res.end();
};

/** 失敗
 * @param res requestListener 的 res
 * @param statusCode 狀態碼
 * @param message 錯誤訊息
 */
const errorHandler = (res, statusCode, message) => {
  res.writeHeader(statusCode, headers);
  res.write(JSON.stringify({
    status: 'fail',
    message,
  }));
  res.end();
};

module.exports = {
  successHandler,
  errorHandler,
};