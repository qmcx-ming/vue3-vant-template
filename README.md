<p align="center">
	<img width="80px" alt="logo" src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Vue3-Vant-Template</h1>
<h4 align="center">
基于Vue3+Vant4的移动端H5模板【没有TS😋】
</h4>

## 使用

```sh
# 安装依赖
npm install

# 运行
npm run dev

# 打包
npm run build

# 预览
npm run preview
```

## 说明文档

### 1、路由配置

在 `src\pages.js`中配置，使用方式与vue-router无异，具体可以参考，`pages`数组中的元素。

```js
const pages = [
  ...,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面没有找到🐳'
    }
  }
];
```

### 2、settings.js

> 位置：`src\settings.js`

参数说明如下

```js
export default {
  /**
   * 网页标题
   */
  title: import.meta.env.VITE_APP_TITLE,
  /**
   * 免登录白名单
   * @description 可以根据自己的需求，配置白名单
   */
  whiteList: [
    '/login',
    '/404',
    '/home',
    '/mine',
  ],
  /**
   * Token key
   * @description 浏览器缓存中token的key
   */
  tokenKey: 'vue3-vant-token',
  /**
   * 请求头token是否拼接 'Bearer '
   * @type {boolean}
   */
  isTokenBearer: false,
  /**
   * 是否开启页面标题拼接
   * @type {boolean}
   * @description 如果开启，则页面标题会自动拼接为：xxx | xxx
   */
  isPageTitleJoining: false,
  /**
   * 是否开启WebHashHistory模式
   * @type {boolean}
   * @description 因为github pages使用history模式的话，刷新页面会有404的错误，所以使用hash模式
   */
  isHashHistory: true
}
```



## 效果图

<table>
	<tr>
		<td>
			<img src="assets/image-20240605212046767.png" alt="登录" />
		</td>
		<td>
			<img src="assets/image-20240605212221877.png" alt="主页" />
		</td>
	</tr>
	<tr>
		<td>
			<img src="assets/image-20240605212304027.png" alt="我的" />
		</td>
		<td>
            <img src="assets/image-20240605212437089.png" alt="修改密码" />
    	</td>
  	</tr>
    <tr>
		<td>
			<img src="assets/image-20240605212529831.png" alt="个人资料-我的信息" />
		</td>
		<td>
            <img src="assets/image-20240605212642275.png" alt="个人资料-编辑信息" />
    	</td>
  	</tr>
</table>


## 鸣谢
- [Vue3 h5 template](https://github.com/yulimchen/vue3-h5-template)
- [RuoYi-Vue3](https://github.com/yangzongzhuan/RuoYi-Vue3)
- [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
