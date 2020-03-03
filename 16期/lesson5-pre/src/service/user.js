// 模拟登录接口
export const UserService = {
  login(userInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.name === "小明") {
          resolve({id: 123, name: "omg原来是小明"});
        } else {
          reject({msg: "用户名或密码错误"});
        }
      }, 1000);
    });
  }
};
