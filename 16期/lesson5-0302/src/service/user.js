// 模拟登录接口
const UserService = {
  login(userInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.name === "小明") {
          resolve({name: "小明"});
        } else {
          reject({msg: "用户名或密码错误"});
        }
      }, 1000);
    });
  }
};

export default UserService;
