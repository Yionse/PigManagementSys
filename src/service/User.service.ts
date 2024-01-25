import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/entities/User';

@Provide()
// 用户相关操作，都在该类中
export class UserService {
  private usernameLength = 100;
  private passwordLength = 16;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  // 新增用户
  async register(newUser: User) {
    let user = new User();
    user = newUser;
    this.checkUsernameLength(user.username, user.password);
    await this.userModel.save(user);
  }

  // 登录
  async login({ username, password }: { username: string; password: string }) {
    const res = await this.userModel
      .createQueryBuilder('user')
      .where(
        // 利用该查询，查询出在数据库中密码和用户名能匹配上
        '(user.account = :username or user.username = :username) and user.password = :password',
        {
          username,
          password,
        }
      )
      .getExists();
    if (!res) {
      // res是一个Boolean值，如果有匹配则登录成功，否则登录失败
      throw new Error('密码错误');
    }
  }

  // 修改密码
  async update({
    userId,
    password,
    username,
  }: {
    userId: number;
    password: string;
    username: string;
  }) {
    this.checkUsernameLength(username, password);
    const user = await this.userModel.findOne({ where: { userId } });
    user.password = password;
    user.username = username;
    await this.userModel.save(user);
  }

  // 验证参数是否合法
  private checkUsernameLength(username: string, password: string) {
    if (username.length > this.usernameLength) {
      // 抛出异常，提醒用户
      throw new Error('用户名长度超出限制');
    } else if (password.length > this.passwordLength) {
      throw new Error('密码长度超出限制');
    }
  }
}
