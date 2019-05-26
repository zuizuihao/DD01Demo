import 'babel-polyfill';
import shortid from 'shortid'
import EmailAPI from '../server/api/email/index'

describe('测试发送验证邮箱', function () {
  before(function () {
    // runs before all tests in this block
    EmailAPI.init()
  });

  after(function () {
    // runs after all tests in this block
  });

  beforeEach(function () {
    // runs before each test in this block
  });

  afterEach(function () {
    // runs after each test in this block
  });

  // test cases

  it('should save without error', function (done) {
    let emailValidcode = shortid.generate()
    EmailAPI.send({
      // 发件人
      from: '1165622982@qq.com',
      // 主题
      subject: '测试',
      // 收件人
      to: 'zuizuihao@hotmail.com',
      // 邮件内容，HTML格式
      html: `<a href="http://localhost:9000/api/v1/user/validateEmail?code=${emailValidcode}">点击激活</a>`
    }).then(() => {
      done()
    }).catch(e => {
      console.log(e)
    })
  });
});