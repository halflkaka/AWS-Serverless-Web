# Second-hand-furniture-trading-website

## 10/15
实现了基本的登录和注册。
克隆下来后要装一些包，在nodeJS里用mongodb要npm install mongoose一下。  
### 用法
- 本地启动mongodb, 用mongod命令
- 本地的mongodb创建一个数据库，命名为demo
- 在demo数据库里建一个collection, db.createCollection("users")
- 启动项目，几个路由是
	- localhost:3000/ or /index
	- /users	显示现在所有的用户
	- /users/login	登录界面，在数据库里查到用户，然后比较密码
	- /users/register	注册界面，注册完后把用户加到数据库里，直接跳到主页
### TODO
- Facebook登录
- 用户密码要加密
- ......


## 10/22
实现Facebook登录  
实现注册邮件验证 by nodemailer  
实现对用户密码加密 by bcrypt  
改了下架构
### TODO
- 定义一下每个功能的api，可以各自开始做


## 11/15
Elastic beanstalk的一些坑
- IAM里添加User，给User添加权限
- 打包上传后会报错，要在Configuration里加一个npm start命令，并配置Database为Mysql
- 本地连接远程Mysql会显示没有权限，要在EC2下面给数据库Internal添加访问权限

## 11/28
- Login/Registration
- RDS/DynamoDB
- API Gateway/Lambda Function
- JWT/Session
- S3/Elastic Beanstalk

- Static files(.html, .css, .js) are stored in S3，host a static web.
- Deploy routers on Elastic Beanstalk. Use AWS RDS to store username and password. Use salthash to encode password.
- After registration, notify SNS, trigger Lambda function, send email verification. Activate user.
- After login, generate token, add token into sessionStorage.
- Check user profile, decode token into username, go through API Gateway, search in DynamoDB. Edit profile and update in DynamoDB.
