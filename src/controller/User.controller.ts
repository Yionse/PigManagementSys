import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { UserService } from '../service/User.service';
import { Context } from '@midwayjs/express';
import { Userinfo } from '../interface';
import { User } from '../entity/entities/User';

// 定义控制器，处理与用户相关的请求
@Controller('/user')
export class UserController {
  // 注入 UserService 实例
  @Inject()
  userService: UserService;

  // 注入 Express 的 Context 对象
  @Inject()
  ctx: Context;

  // 处理 POST 请求，用户注册
  @Post('/register')
  async register(@Body() registerData: Userinfo) {
    await this.userService.register(registerData as User);
    this.ctx.statusMessage = '注册成功';
    return { isSuccess: true };
  }

  // 处理 POST 请求，用户登录
  @Post('/login')
  async login(@Body() loginData: { username: string; password: string }) {
    await this.userService.login(loginData);
    this.ctx.statusMessage = '登陆成功';
    return { isLogin: true };
  }

  // 处理 POST 请求，修改用户信息
  @Post('/update')
  async update(
    @Body() updateData: { userId: number; password: string; username: string }
  ) {
    await this.userService.update(updateData);
    this.ctx.statusMessage = '修改成功';
    return { isSuccess: true };
  }
}
