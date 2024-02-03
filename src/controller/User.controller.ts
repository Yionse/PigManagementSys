import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { UserService } from '../service/User.service';
import { Context } from '@midwayjs/express';
import { Userinfo } from '../interface';
import { User } from '../entity/entities/User';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;

  @Post('/register')
  async register(@Body() registerData: Userinfo) {
    await this.userService.register(registerData as User);
    this.ctx.statusMessage = '注册成功';
    return { isSuccess: true };
  }

  @Post('/login')
  async login(@Body() loginData: { username: string; password: string }) {
    await this.userService.login(loginData);
    this.ctx.statusMessage = '登陆成功';
    return { isLogin: true };
  }

  @Post('/update')
  async update(
    @Body() updateData: { userId: number; password: string; username: string }
  ) {
    await this.userService.update(updateData);
    this.ctx.statusMessage = '修改成功';
    return { isSuccess: true };
  }
}
