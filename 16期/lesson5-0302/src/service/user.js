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

// 获取更多信息
export const MoreUserService = {
  getMoreUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.id === 123) {
          resolve({money: "100"});
        } else {
          reject({msg: "获取详细信息错误"});
        }
      }, 1000);
    });
  }
};
