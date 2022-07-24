// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// api太多不方便  
// let indexUrl = '/api/index'; 

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	vm.$u.api = {};
	// 此处没有使用传入的params参数,user的数据
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index');

	vm.$u.api.authLogin = params => vm.$u.post('/api/auth/login', params); //登录

	vm.$u.api.userMsg = () => vm.$u.get('/api/user'); //用户消息
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	// vm.$u.api = {
	// 	index
	// }; 

	vm.$u.api.userMsgUpdata = params => vm.$u.put('/api/user', params); //修改用户消息

	//退出登录
	vm.$u.api.userLogout = () => vm.$u.post('/api/auth/logout');

	//获取oss信息
	vm.$u.api.userOss = () => vm.$u.get('/api/auth/oss/token');

	//修改头像
	vm.$u.api.putUserAvatar = (params) => vm.$u.post('/api/user/avatar', params);

	//商品详细信息
	vm.$u.api.goodsDetail = (id) => vm.$u.get(`/api/goods/${id}`);

	//收藏和取消
	vm.$u.api.CollectAndCancel = (id) => vm.$u.post(`/api/collects/goods/${id}`);

	//加入购物车
	vm.$u.api.cartsAdd = (id) => vm.$u.post('/api/carts', id);

	//购物车信息
	vm.$u.api.cartsList = (params) => vm.$u.get('/api/carts', params);

	//商品列表
	vm.$u.api.goodsList = (params = {}) => vm.$u.get(`/api/goods`, params);

	//收藏信息
	vm.$u.api.collection = (page) => vm.$u.get('/api/collects', page);

	//移出购物车 id是7420类型
	// vm.$u.api.moveCart = (id) => vm.$u.delete(`/api/carts`, id);
	vm.$u.api.moveCart = (id) => vm.$u.delete(`/api/carts/${id}`);

	// 注册
	vm.$u.api.authRegister = (params = {}) => vm.$u.post('/api/auth/register', params);

	//改变购物车选中
	vm.$u.api.authRegister = (params) => vm.$u.patch('/api/carts/checked', params);

	vm.$u.api.changeGoodsNum = (params) => vm.$u.put(`/api/carts/${params.id}`, params);
}

export default {
	install
}
