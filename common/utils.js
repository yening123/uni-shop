const install = (Vue, vm) => {
  vm.$u.utils = {};

  vm.$u.utils.ifLogin = () => {
    const token = vm.vuex_token;
    if (!token) {
      //获取来自哪个页面，然后跳转回去
      const currentPage = getCurrentPages().pop(); //数组栈信息
      const backPath = currentPage.route;
      const options = currentPage.options; //{id:1, sales:2}


      const optionsKeys = Object.keys(options);  // ['id', 'sales']
      let params = "";
      if (optionsKeys.length !== 0) {
        params = optionsKeys.reduce((pre, item) => {
          return pre + item + '=' + options[item] + '&'
        }, '?').slice(0, -1); //slice(到第二个参数但没有第二个参数)  0到-1不不包括-1 即0到倒数第二个
      }
      // console.log(params);
      //将上一级目录保存 login时取出 
      uni.setStorageSync('back_path', backPath + params) //传一个带参数的路径

      vm.$u.toast("请先登录");
      setTimeout(() => {
        vm.$u.route({
          type: "redirect",
          url: 'pages/auth/login',
        })
      }, 2000);
      return false;
    }
    return true;
  };

  vm.$u.utils.getUserInfo = async (params) => {
    //拿到user的数据
    const userInfo = await vm.$u.api.userMsg(params);
    vm.$u.vuex('vuex_user', userInfo);
  },

    vm.$u.utils.isAndroid = () => {
      try {
        const res = uni.getSystemInfoSync();
        console.log(res.platform);
      } catch (e) {

      }
    }
}

export default {
  install
}
