(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-parse/libs/trees"],{"18dd":function(t,e,r){"use strict";var i=r("29cb"),s=r.n(i);s.a},"29cb":function(t,e,r){},"3d84":function(t,e,r){"use strict";var i=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=i},5184:function(t,e,r){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t.Parser={};var s=function(){Promise.resolve().then(function(){return resolve(r("6678"))}.bind(null,r)).catch(r.oe)},a=r("ce1b").errorImg,n={components:{trees:s},name:"trees",data:function(){return{ctrl:[],placeholder:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="225"/>',errorImg:a,loadVideo:"undefined"==typeof plus,c:"",s:""}},props:{nodes:Array,lazyLoad:Boolean,loading:String},mounted:function(){for(this.top=this.$parent;"parser"!=this.top.$options.name;this.top=this.top.$parent);this.init()},methods:{init:function(){for(var t,e=this.nodes.length;t=this.nodes[--e];)if("img"==t.name)this.top.imgList.setItem(t.attrs.i,t.attrs["original-src"]||t.attrs.src);else if("video"==t.name||"audio"==t.name){var r;"video"==t.name?r=i.createVideoContext(t.attrs.id,this):this.$refs[t.attrs.id]&&(r=this.$refs[t.attrs.id][0]),r&&(r.id=t.attrs.id,this.top.videoContexts.push(r))}},play:function(t){var e=this.top.videoContexts;if(e.length>1&&this.top.autopause)for(var r=e.length;r--;)e[r].id!=t.currentTarget.dataset.id&&e[r].pause()},imgtap:function(e){var r=e.currentTarget.dataset.attrs;if(!r.ignore){var s=!0,a={id:e.target.id,src:r.src,ignore:function(){return s=!1}};if(t.Parser.onImgtap&&t.Parser.onImgtap(a),this.top.$emit("imgtap",a),s){var n=this.top.imgList,o=n[r.i]?parseInt(r.i):(n=[r.src],0);i.previewImage({current:o,urls:n})}}},loadImg:function(t){var e=t.currentTarget.dataset.i;this.lazyLoad&&!this.ctrl[e]?this.$set(this.ctrl,e,1):this.loading&&2!=this.ctrl[e]&&this.$set(this.ctrl,e,2)},linkpress:function(e){var r=!0,s=e.currentTarget.dataset.attrs;if(s.ignore=function(){return r=!1},t.Parser.onLinkpress&&t.Parser.onLinkpress(s),this.top.$emit("linkpress",s),r){if(s["app-id"])return i.navigateToMiniProgram({appId:s["app-id"],path:s.path});s.href&&("#"==s.href[0]?this.top.useAnchor&&this.top.navigateTo({id:s.href.substring(1)}):0==s.href.indexOf("http")||0==s.href.indexOf("//")?i.setClipboardData({data:s.href,success:function(){return i.showToast({title:"链接已复制"})}}):i.navigateTo({url:s.href,fail:function(){i.switchTab({url:s.href})}}))}},error:function(t){var e=t.currentTarget,r=e.dataset.source,i=e.dataset.i;if("video"==r||"audio"==r){var s=this.ctrl[i]?this.ctrl[i].i+1:1;s<this.nodes[i].attrs.source.length&&this.$set(this.ctrl,i,s),t.detail.__args__&&(t.detail=t.detail.__args__[0])}else a&&"img"==r&&(this.top.imgList.setItem(e.dataset.index,a),this.$set(this.ctrl,i,3));this.top&&this.top.$emit("error",{source:r,target:e,errMsg:t.detail.errMsg})},_loadVideo:function(t){this.$set(this.ctrl,t.target.dataset.i,0)}}};e.default=n}).call(this,r("c8ba"),r("543d")["default"])},6678:function(t,e,r){"use strict";r.r(e);var i=r("93ca"),s=r("c081");for(var a in s)"default"!==a&&function(t){r.d(e,t,(function(){return s[t]}))}(a);r("18dd");var n,o=r("f0c5"),c=r("3d84"),u=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],n);"function"===typeof c["a"]&&Object(c["a"])(u),e["default"]=u.exports},"93ca":function(t,e,r){"use strict";var i;r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return i}));var s=function(){var t=this,e=t.$createElement;t._self._c},a=[]},c081:function(t,e,r){"use strict";r.r(e);var i=r("5184"),s=r.n(i);for(var a in i)"default"!==a&&function(t){r.d(e,t,(function(){return i[t]}))}(a);e["default"]=s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-parse/libs/trees-create-component',
    {
        'uview-ui/components/u-parse/libs/trees-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6678"))
        })
    },
    [['uview-ui/components/u-parse/libs/trees-create-component']]
]);
