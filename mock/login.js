import { defineFakeRoute } from 'vite-plugin-fake-server/client';
const BASE_API = process.env.NODE_ENV === 'development' ? '/dev-api' : '/prod-api';

export default defineFakeRoute(
  [
    // 登录
    {
      url: BASE_API + '/login',
      method: 'post',
      response: ({ body }) => {
        const { username, password, code } = body;
        if (username === 'admin' && password === '123456') {
          if (code.toUpperCase() !== 'CQFB') {
            return {
              code: 500,
              msg: '验证码错误'
            }
          }
          return {
            code: 200,
            msg: '操作成功',
            token: 'admin-token'
          };
        } else {
          return {
            code: 500,
            msg: '用户不存在/密码错误'
          };
        }
      }
    },
    // 获取用户信息
    {
      url: BASE_API + '/getInfo',
      method: 'get',
      response: () => {
        return {
          code: 200,
          msg: '操作成功',
          roles: ['admin'],
          user: {
            id: 1,
            username: 'admin',
            avatar: '',
            remark: '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。'
          }
        };
      }
    },
    // 获取验证码
    {
      url: BASE_API + '/captchaImage',
      method: 'get',
      response: () => {
        return {
          code: 200,
          msg: "操作成功",
          captchaEnabled: true, 
          img: "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", 
          uuid: "uuid"
        }
      }
    },
    // 登出
    {
      url: BASE_API + '/logout',
      method: 'post',
      response: () => {
        return {
          code: 200,
          msg: '登出成功'
        };
      }
    },
    // 获取用户个人信息
    {
      url: BASE_API + '/system/user/profile',
      methods: 'get',
      response: () => {
        return {
          total: 2,
          code: 200,
          msg: '查询成功',
          data: {
            id: 1,
            username: 'admin',
            nickname: 'Admin',
            phoneNumber: '13456789012',
            sex: '0',
            email: '123@qq.com',
            createTime: '2024-01-01',
            remark: '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。'
          }
        };
      }
    },
    // 修改用户个人信息
    {
      url: BASE_API + '/system/user/profile',
      method: 'put',
      response: () => {
        return {
          code: 200,
          msg: '修改成功'
        };
      }
    },
    // 修改用户密码
    {
      url: BASE_API + '/system/user/profile/updatePwd',
      method: 'put',
      response: () => {
        return {
          code: 200,
          msg: '修改成功'
        };
      }
    }
  ]
);
