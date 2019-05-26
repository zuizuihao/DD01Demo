import nodemailer from 'nodemailer'
var transporter

const API = {
  init() {
    var config = {
      host: 'smtp.qq.com',
      port: 465,
      auth: {
        user: '1165622982@qq.com', //刚才注册的邮箱账号
        pass: 'zpmdczpmzyrsbafi'  //邮箱的授权码，不是注册时的密码
      }
    };
    // 创建一个SMTP客户端对象
    transporter = nodemailer.createTransport(config);
    console.log('初始化邮件成功')
  },
  async send(emailObj) {
    await transporter.sendMail(emailObj)
  }
}

export default API