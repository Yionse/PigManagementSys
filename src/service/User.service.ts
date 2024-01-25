import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/entities/User';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  // 新增用户
  async register(newUser: User) {
    let user = new User();
    user = newUser;
    try {
      // 调用ORM中的方法，将实体同步至MySQL
      await this.userModel.save(user);
    } catch (error) {
      // 可能会出现primaryKey冲突的情况，需要抛出异常，并在前端提示
      throw new Error(error.message);
    }
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
    const user = await this.userModel.findOne({ where: { userId } });
    user.password = password;
    user.username = username;
    await this.userModel.save(user);
  }
}
