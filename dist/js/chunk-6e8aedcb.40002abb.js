(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e8aedcb"],{2532:function(t,e,s){"use strict";var a=s("23e7"),r=s("e330"),n=s("5a34"),o=s("1d80"),i=s("577e"),c=s("ab13"),l=r("".indexOf);a({target:"String",proto:!0,forced:!c("includes")},{includes:function(t){return!!~l(i(o(this)),i(n(t)),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,e,s){var a=s("861d"),r=s("c6b6"),n=s("b622"),o=n("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==r(t))}},"45fc":function(t,e,s){"use strict";var a=s("23e7"),r=s("b727").some,n=s("a640"),o=n("some");a({target:"Array",proto:!0,forced:!o},{some:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},"5a34":function(t,e,s){var a=s("da84"),r=s("44e7"),n=a.TypeError;t.exports=function(t){if(r(t))throw n("The method doesn't accept regular expressions");return t}},"5da9":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"personal-wrap d-flex flex-column"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-md-7"},[0!==t.posts.length?s("div",{staticClass:"personal-card card mb-4"},[s("div",{staticClass:"card-header d-flex align-items-center p-0 border-bottom-0"},[s("div",{staticClass:"border-end"},[s("img",{staticClass:"head-pic",attrs:{src:""===t.user.photo?t.getPictureUrl("noAvatar.jpeg"):t.user.photo}})]),s("div",{staticClass:"ms-3"},[s("h6",[t._v(t._s(t.user.name))]),s("small",[t._v(t._s(t.user.followers&&t.user.followers.length)+" 人追蹤")])]),[t.user._id!==t.userInfo.userId?s("button",{staticClass:"btn btn-secondary ms-auto me-3 py-1",class:{"btn-secondary":!t.isFollowing,"btn-light":t.isFollowing},attrs:{type:"button"},on:{click:function(e){return t.toggleFollowing()}}},[s("Spinner",{attrs:{isSpinnerLoading:t.isSpinnerLoading}}),t.isFollowing?s("span",{staticClass:"ml-3"},[t._v("取消追蹤")]):s("span",{staticClass:"ml-3"},[t._v("追蹤")])],1):t._e()]],2)]):t._e(),0!==t.posts.length?s("div",{staticClass:"row mb-3"},[s("div",{staticClass:"col-4"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.query.sort,expression:"query.sort"}],staticClass:"form-control form-select rounded-0",attrs:{name:"type"},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.query,"sort",e.target.multiple?s:s[0])},function(e){return t.getPersonalPosts()}]}},[s("option",{attrs:{value:"desc"}},[t._v("最新貼文")]),s("option",{attrs:{value:"asc"}},[t._v("最舊貼文")])])]),s("div",{staticClass:"col-8"},[s("div",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.query.keyword,expression:"query.keyword",modifiers:{trim:!0}}],staticClass:"form-control rounded-0",attrs:{type:"text",placeholder:"搜尋貼文","aria-describedby":"search"},domProps:{value:t.query.keyword},on:{change:function(e){return t.getPersonalPosts()},input:function(e){e.target.composing||t.$set(t.query,"keyword",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t._m(0)])])]):t._e(),0===t.posts.length?[t._m(1)]:t._l(t.posts,(function(e){return s("div",{key:e._id,staticClass:"rounded-card card mb-3"},[e.user._id===t.userInfo.userId?s("div",{staticClass:"dropdown"},[t._m(2,!0),s("ul",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenu2"}},[s("li",[s("button",{staticClass:"dropdown-item",attrs:{type:"button","data-bs-toggle":"modal","data-bs-target":"#editPostModal"},on:{click:function(s){return t.getPost(e._id)}}},[t._v(" 編輯貼文 ")])]),s("li",[s("button",{staticClass:"dropdown-item",attrs:{type:"button"},on:{click:function(s){return t.onDeletePost(e._id)}}},[t._v(" 刪除貼文 ")])])])]):t._e(),s("div",{staticClass:"card-header bg-transparent pt-3 border-0"},[s("div",{staticClass:"d-flex align-items-center"},[""===e.user.photo?s("img",{staticClass:"headshot rounded-circle",attrs:{src:t.getPictureUrl("noAvatar.jpeg")}}):s("img",{staticClass:"headshot rounded-circle",attrs:{src:e.user.photo}}),s("div",{staticClass:"d-flex flex-column ms-3"},[s("a",{staticClass:"fw-bold",attrs:{href:"javascript:void(0)"},on:{click:function(s){return t.$router.push("/metawall/user/"+e.user._id)}}},[t._v(t._s(e.user.name))]),s("small",{staticClass:"text-black-50"},[t._v(t._s(t._f("moment")(new Date(e.createdAt),"YYYY/M/DD HH:mm")))])])])]),s("div",{staticClass:"card-body"},[s("p",{staticClass:"mb-3",domProps:{innerHTML:t._s(e.content)}}),e.image?s("img",{staticClass:"w-100 mb-3 content-image",attrs:{src:e.image}}):t._e(),s("Spinner",{attrs:{isSpinnerLoading:t.isLikeLoading}}),e.likes.length>0?s("a",{staticClass:"text-decoration-none",attrs:{href:"javascript:void(0)"},on:{click:function(s){return t.togglePostLike(e._id,e.likes)}}},[s("i",{staticClass:"bi bi-hand-thumbs-up text-primary fs-5"}),t._v(" "+t._s(e.likes&&e.likes.length)+" ")]):s("a",{staticClass:"text-decoration-none text-black-50",attrs:{href:"javascript:void(0)"},on:{click:function(s){return t.togglePostLike(e._id,e.likes)}}},[s("i",{staticClass:"bi bi-hand-thumbs-up fs-5"}),t._v(" 成為第一個按讚的朋友 ")]),s("div",{staticClass:"d-flex align-items-center mt-3"},[s("img",{staticClass:"headshot rounded-circle me-2",attrs:{src:""===t.userInfo.photo?t.getPictureUrl("noAvatar.jpeg"):t.userInfo.photo}}),s("div",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.comment,expression:"post.comment"}],staticClass:"form-control rounded-0",attrs:{type:"text",placeholder:"留言...","aria-describedby":"search"},domProps:{value:e.comment},on:{input:function(s){s.target.composing||t.$set(e,"comment",s.target.value)}}}),s("button",{staticClass:"btn btn-primary shadow-none rounded-0 px-4",attrs:{type:"button"},on:{click:function(s){return t.onCreateComment(e._id,e.comment)}}},[t._v(" 留言 ")])])]),e.comments.length>0?s("ul",{staticClass:"mt-3"},t._l(e.comments,(function(a){return s("li",{key:a._id,staticClass:"mb-3"},[s("div",{staticClass:"message-card card border-0"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"d-flex"},[s("img",{staticClass:"headshot rounded-circle",attrs:{src:""===a.user.photo?t.getPictureUrl("noAvatar.jpeg"):a.user.photo}}),s("div",{staticClass:"d-flex flex-column ms-3 pt-2"},[s("a",{staticClass:"fw-bold",attrs:{href:"#"}},[t._v(t._s(a.user.name))]),a.user._id===t.userInfo.userId?s("a",{staticClass:"position-absolute",staticStyle:{top:"10%",right:"5%"},attrs:{href:"javascript:void(0)"},on:{click:function(s){return t.onDeleteComment(e._id,a._id)}}},[s("i",{staticClass:"bi bi-trash3"})]):t._e(),s("small",{staticClass:"text-black-50"},[t._v(t._s(t._f("moment")(a.createdAt,"YYYY/M/DD HH:mm")))]),s("p",{staticClass:"mt-2"},[t._v(" "+t._s(a.comment)+" ")])])])])])])})),0):t._e()],1)])}))],2),s("div",{staticClass:"col-12 col-md-5 d-none d-md-block"},[s("Sidebar")],1),s("div",{staticClass:"d-md-none"},[s("SidebarSm")],1)]),s("div",{ref:"editPostModal",staticClass:"modal fade",attrs:{id:"editPostModal","data-bs-backdrop":"static","data-bs-keyboard":"false","aria-labelledby":"editPostModal",tabindex:"-1","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-lg"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title",attrs:{id:"staticBackdropLabel"}},[t._v(" 編輯貼文 ")]),s("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"modal","aria-label":"Close"},on:{click:function(e){return t.initPost()}}})]),s("div",{staticClass:"modal-body"},[s("div",{staticClass:"card-body p-4"},[t.post?s("div",{staticClass:"mb-3"},[s("label",{staticClass:"form-label",attrs:{for:"content"}},[t._v("貼文內容")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.post.content,expression:"post.content"}],staticClass:"form-control rounded-0",attrs:{rows:"3",id:"content",placeholder:"輸入您的貼文內容"},domProps:{value:t.post.content},on:{input:function(e){e.target.composing||t.$set(t.post,"content",e.target.value)}}})]):t._e(),s("input",{ref:"uploadImage",staticClass:"d-none",attrs:{type:"file",accept:"image/png, image/jpeg"},on:{change:function(e){return t.previewPicture()}}}),s("button",{staticClass:"btn bg-black text-white shadow-none py-1 mb-3",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.$refs.uploadImage.click()}}},[t._v(" 上傳圖片 ")]),t.previewUrl?s("img",{staticClass:"border rounded border-dark w-100",attrs:{src:t.previewUrl}}):t._e(),t.errorMessage?s("div",{staticClass:"text-danger text-center d-block mt-3"},[s("small",{staticClass:"d-block"},[t._v(" "+t._s(t.errorMessage)+" ")])]):t._e()])]),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-bs-dismiss":"modal"},on:{click:function(e){return t.initPost()}}},[t._v(" 取消 ")]),s("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-bs-dismiss":"modal"},on:{click:function(e){return t.onEditPost(t.post._id)}}},[t._v(" 編輯貼文 ")])])])])]),s("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}})],1)},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"btn btn-primary shadow-none rounded-0 px-3 py-0 fs-5",attrs:{type:"button"}},[s("i",{staticClass:"bi bi-search"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rounded-card card"},[s("div",{staticClass:"card-header bg-transparent border-bottom"},[s("span",{staticClass:"browser-icon bg-danger rounded-circle d-inline-block me-2"}),s("span",{staticClass:"browser-icon bg-secondary rounded-circle d-inline-block me-2"}),s("span",{staticClass:"browser-icon bg-success rounded-circle d-inline-block"})]),s("div",{staticClass:"card-body"},[s("p",{staticClass:"text-black-50 text-center py-3"},[t._v(" 該用戶尚無貼文！ ")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a",{staticClass:"position-absolute",staticStyle:{top:"15px",right:"15px"},attrs:{d:"dropdownMenu2","data-bs-toggle":"dropdown","aria-expanded":"false",href:"javascript:void(0)"}},[s("i",{staticClass:"bi bi-three-dots-vertical"})])}],n=s("1da1"),o=(s("96cf"),s("d3b7"),s("3ca3"),s("ddb0"),s("4e82"),s("45fc"),s("caad"),s("2532"),s("2f62")),i={name:"Following",components:{Sidebar:function(){return s.e("chunk-133dbb7b").then(s.bind(null,"5ea5"))},SidebarSm:function(){return s.e("chunk-70b44a3f").then(s.bind(null,"7441"))},Spinner:function(){return s.e("chunk-2d0ab115").then(s.bind(null,"1462"))}},computed:Object(o["c"])(["userInfo"]),data:function(){return{isLoading:!1,isSpinnerLoading:!1,isLikeLoading:!1,isFollowing:!1,query:{sort:"desc",keyword:""},user:{name:"",photo:"",follower:""},posts:[],post:{},errorMessage:"",postId:"",userId:"",uploadImg:null,previewUrl:null}},watch:{"$route.params.id":{handler:function(t){this.userId=this.$route.params.id,this.getPersonalPosts()},deep:!0,immediate:!0}},created:function(){this.getPersonalPosts()},methods:{getPersonalPosts:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.isLoading=!0,e.next=4,t.$api.getPersonalPosts(t.userId,{keyword:t.query.keyword,sort:t.query.sort});case 4:s=e.sent,t.posts=s.data.posts,t.user=s.data.userInfo,t.user.followers.length>0&&(t.isFollowing=t.user.followers.some((function(e){return e.user===t.userInfo.userId}))),t.isLoading=!1,e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](0),t.isLoading=!1,t.$toasted.show(e.t0.message);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})))()},onEditPost:function(t){this.editPost(t),this.getPersonalPosts()},onDeletePost:function(t){this.deletePost(t),this.getPersonalPosts()},onCreateComment:function(t,e){this.createComment(t,e),this.getPersonalPosts()},onDeleteComment:function(t,e){this.deleteComment(t,e),this.getPersonalPosts()},togglePostLike:function(t,e){var s=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r,n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,r=e.includes(s.userInfo.userId),s.isLikeLoading=!0,r){a.next=11;break}return a.next=6,s.$api.createPostLike(t);case 6:if(n=a.sent,n&&"success"===n.status){a.next=9;break}throw n.message;case 9:a.next=16;break;case 11:return a.next=13,s.$api.deletePostLike(t);case 13:if(o=a.sent,o&&"success"===o.status){a.next=16;break}throw o.message;case 16:s.isLikeLoading=!1,s.getPersonalPosts(),a.next=24;break;case 20:a.prev=20,a.t0=a["catch"](0),s.isLikeLoading=!1,s.$toasted.show(a.t0.message);case 24:case"end":return a.stop()}}),a,null,[[0,20]])})))()},toggleFollowing:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,t.isSpinnerLoading=!0,t.isFollowing){e.next=7;break}return e.next=5,t.$api.createFollwingUser(t.user._id);case 5:e.next=9;break;case 7:return e.next=9,t.$api.deleteFollwingUser(t.user._id);case 9:t.isSpinnerLoading=!1,t.getPersonalPosts(),e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](0),t.isSpinnerLoading=!1,t.$toasted.show(e.t0.message);case 17:case"end":return e.stop()}}),e,null,[[0,13]])})))()}}},c=i,l=(s("7723"),s("2877")),d=Object(l["a"])(c,a,r,!1,null,"30093a31",null);e["default"]=d.exports},7723:function(t,e,s){"use strict";s("c8c7")},ab13:function(t,e,s){var a=s("b622"),r=a("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(s){try{return e[r]=!1,"/./"[t](e)}catch(a){}}return!1}},c8c7:function(t,e,s){},caad:function(t,e,s){"use strict";var a=s("23e7"),r=s("4d64").includes,n=s("44d2");a({target:"Array",proto:!0},{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n("includes")}}]);
//# sourceMappingURL=chunk-6e8aedcb.40002abb.js.map