(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-auth-register"],{"0547":function(t,r,e){"use strict";e.r(r);var a=e("7e00"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(r,t,(function(){return a[t]}))}(o);r["default"]=n.a},"2d3a":function(t,r,e){"use strict";var a=e("3076"),n=e.n(a);n.a},3076:function(t,r,e){var a=e("b304");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("39742e86",a,!0,{sourceMap:!1,shadowMode:!1})},"7b9a":function(t,r,e){"use strict";e.r(r);var a=e("f885"),n=e("0547");for(var o in n)"default"!==o&&function(t){e.d(r,t,(function(){return n[t]}))}(o);e("2d3a");var u,s=e("f0c5"),i=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"4540c2b0",null,!1,a["a"],u);r["default"]=i.exports},"7e00":function(t,r,e){"use strict";var a=e("4ea4");Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0,e("96cf");var n=a(e("1da1")),o={data:function(){var t=this;return{form:{name:"",email:"",password:"",password_confirmation:""},formRule:{name:[{required:!0,message:"请输入昵称",trigger:["change","blur"]}],email:[{required:!0,message:"请输入邮箱",trigger:["change","blur"]},{validator:function(r,e,a){return t.$u.test.email(e)},message:"邮箱格式不正确",trigger:["change","blur"]}],password:[{required:!0,message:"请输入密码",trigger:["change","blur"]}],password_confirmation:[{required:!0,message:"请输入确认密码",trigger:["change","blur"]},{validator:function(r,e,a){return t.form.password===e},message:"确认密码和密码不一致",trigger:["change","blur"]}]}}},onReady:function(){this.$refs.uForm.setRules(this.formRule)},methods:{register:function(){var t=this;this.$refs.uForm.validate(function(){var r=(0,n.default)(regeneratorRuntime.mark((function r(e){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e){r.next=2;break}return r.abrupt("return",!1);case 2:t.$u.api.authRegister(t.form),t.$u.route({type:"reLaunch",url:"pages/auth/login"}),t.$u.toast("注册成功");case 5:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}())}}};r.default=o},b304:function(t,r,e){var a=e("24fb");r=a(!1),r.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.wrap[data-v-4540c2b0]{font-size:%?28?%}.wrap .ubutton[data-v-4540c2b0]{background-color:#d4237a!important}.wrap .content[data-v-4540c2b0]{width:%?600?%;margin:%?80?% auto 0}.wrap .content .title[data-v-4540c2b0]{text-align:left;font-size:%?60?%;font-weight:500;margin-bottom:%?40?%}.wrap .content uni-input[data-v-4540c2b0]{text-align:left;margin-bottom:%?10?%;padding-bottom:%?6?%}.wrap .content .tips[data-v-4540c2b0]{color:#909399;margin-bottom:%?60?%;margin-top:%?8?%}.wrap .content .getCaptcha[data-v-4540c2b0]{background-color:#2979ff;color:#fff;border:none;font-size:%?30?%;padding:%?12?% 0}.wrap .content .getCaptcha[data-v-4540c2b0]::after{border:none}',""]),t.exports=r},f885:function(t,r,e){"use strict";e.d(r,"b",(function(){return n})),e.d(r,"c",(function(){return o})),e.d(r,"a",(function(){return a}));var a={uForm:e("a5a0").default,uFormItem:e("7ced").default,uInput:e("a720").default,uButton:e("894b").default},n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("v-uni-view",{staticClass:"wrap u-p-20"},[e("u-form",{ref:"uForm",attrs:{model:t.form,rules:t.formRule,"error-type":["message"],"label-width":"160"}},[e("u-form-item",{attrs:{label:"昵称",prop:"name"}},[e("u-input",{attrs:{placeholder:"请输入昵称"},model:{value:t.form.name,callback:function(r){t.$set(t.form,"name",r)},expression:"form.name"}})],1),e("u-form-item",{attrs:{label:"邮箱",prop:"email"}},[e("u-input",{attrs:{placeholder:"请输入邮箱"},model:{value:t.form.email,callback:function(r){t.$set(t.form,"email",r)},expression:"form.email"}})],1),e("u-form-item",{attrs:{label:"密码",prop:"password"}},[e("u-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.form.password,callback:function(r){t.$set(t.form,"password",r)},expression:"form.password"}})],1),e("u-form-item",{attrs:{label:"确认密码",prop:"password_confirmation"}},[e("u-input",{attrs:{type:"password",placeholder:"请输入确认密码"},model:{value:t.form.password_confirmation,callback:function(r){t.$set(t.form,"password_confirmation",r)},expression:"form.password_confirmation"}})],1)],1),e("u-button",{staticClass:"u-m-t-30 ubutton",attrs:{type:"primary"},on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.register.apply(void 0,arguments)}}},[t._v("注册")])],1)},o=[]}}]);