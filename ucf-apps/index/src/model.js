import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import { processData, getCookie ,setCookie} from "utils";
import {loginInitI18n} from 'utils/i18n.iuap';
import cookie from "react-cookie";


export default {
    // 确定 Store 中的数据模型作用域
    name: "app",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        current: '',//单选选中的key
        openKeys: [],//菜单打开的key
        currentRouter:'',//当前的路由地址
        menu: [],//侧边栏菜单
        expanded: false,//是否展开
        firstUrl: '',
        curentOpenKeys: [],//菜单当前打开的key
        submenuSelected: '',//子菜单选中的key
        isOpenTab: true,//是否是多页签打开
        menus:[],//显示的多页签
        tabNum:0,//多页签数量
        showNotice:0,//是否显示多页签限制的通知
        curNum:0,//当前页签的数量
        num:0,
        clientHeight:document.body.clientHeight,
        reload:0,
        sideBarShow: false,
        tabsMore: false,
        showHeader: true,
        maxed:false,
        // sideShowPosition: '',
        leftExpanded: false,
        langList: [],// 多语列表
        langCode: getCookie('u_locale') || 'zh_CN', // 当前语种
        headerTheme: 'light',
        headerBgImg:'',
        headerBgColor:'',
        // themeObj:{
        //   headerTheme: 'light',
        //   headerBgImg:'',
        //   headerBgColor:'',
        //   sideShowPosition:'',
        //   headerCenterImg:'',
        //   leftSideTheme:'light',
        //   leftSideBgColor:'green',
        //   leftSideBgImg:''
        // },
        themeObj:{
          headerTheme: '',
          headerBgImg:'',
          headerBgColor:'',
          sideShowPosition:'',
          headerCenterImg:'',
          leftSideTheme:'',
          leftSideBgColor:'red',
          leftSideBgImg:'',
          tabNum: 10
        },
        // themeObj:{
        //   headerTheme:
        // }


    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }

    },
    effects: {
        async themeRequest() {
          // let themeObj = getState().app.themeObj;
          // let {themeObj} = this.props;
          let getLocal = cookie.load('u_locale')||'zh_CN';
          let headerCenterDefaultImg ='';
          let defaultBgImg ='';
          let obj1 = {
              headerTheme: 'light',
              headerBgImg:'',
              headerBgColor:'',
              sideShowPosition:'',
              headerCenterImg:'',
              leftSideTheme:'light',
              leftSideBgColor:'',
              leftSideBgImg:'',
              tabNum: 10
            }
          if(obj1.headerTheme === '') {
            obj1.headerTheme = 'light';
          }
          if(obj1.headerTheme === 'dark') {
            if(getLocal === 'zh_CN') {
              headerCenterDefaultImg = 'images/index/logo_light_CN.svg';
            } else if (getLocal === 'en_US') {
              headerCenterDefaultImg = 'images/index/logo_light_US.svg';
            } else {
              headerCenterDefaultImg = 'images/index/logo_light_TW.svg';
            }
            if(!obj1.headerBgImg && !obj1.headerBgColor) {
              defaultBgImg = 'images/index/dark_bg_img.jpg';
            }
            let defaultSideBgImg = '';
            if(!obj1.leftSideBgImg && !obj1.leftSideBgColor) {
              defaultSideBgImg = 'images/index/dark_bg_img.jpg';
            }
            let obj2 = {};
            if(obj1.leftSideTheme === '') {
              obj1.leftSideTheme = 'light';
            }
            if(obj1.leftSideTheme === 'dark') {
              let obj2 = {
                leftSideTheme: obj1.leftSideTheme? obj1.leftSideTheme :'dark',
                leftSideBgImg: obj1.leftSideBgImg? obj1.leftSideBgImg : defaultSideBgImg,
                leftSideBgColor: obj1.leftSideBgColor? obj1.leftSideBgColor : 'red',
              }
            }
            if(obj1.leftSideTheme === 'light') {
              let obj2 = {
                leftSideTheme: obj1.leftSideTheme? obj1.leftSideTheme :'light',
                leftSideBgImg: obj1.leftSideBgImg? obj1.leftSideBgImg : defaultSideBgImg,
                leftSideBgColor: obj1.leftSideBgColor? obj1.leftSideBgColor : 'red',
              }
              }
              obj1 = Object.assign(obj1,obj2);
            let obj = {
              headerTheme: obj1.headerTheme? obj1.headerTheme :'dark',
              headerBgImg: obj1.headerBgImg? obj1.headerBgImg : defaultBgImg,
              headerBgColor: obj1.headerBgColor? obj1.headerBgColor : '#242D48',
              sideShowPosition: obj1.sideShowPosition? obj1.sideShowPosition:'',
              headerCenterImg: obj1.headerCenterImg? obj1.headerCenterImg: headerCenterDefaultImg,
            }
            actions.app.updateState({
              themeObj: Object.assign(obj1,obj)
            })

          }
          if(obj1.headerTheme === 'light') {
            let defaultBgImg ='';
            if(getLocal === 'zh_CN') {
              headerCenterDefaultImg = 'images/index/logo_zh_CN.svg';
            } else if (getLocal === 'en_US') {
              headerCenterDefaultImg = 'images/index/logo_en_US.svg';
            } else {
              headerCenterDefaultImg = 'images/index/logo_zh_TW.svg';
            }
            if(!obj1.headerBgImg && !obj1.headerBgColor) {
              defaultBgImg = 'images/index/bg_topbar.jpg'
            }
            let defaultSideBgImg = '';
            if(!obj1.leftSideBgImg && !obj1.leftSideBgColor) {
              defaultSideBgImg = 'images/index/dark_bg_img.jpg';
            }
            let obj2 = {};
            if(obj1.leftSideTheme === '') {
              obj1.leftSideTheme = 'light';
            }
            if(obj1.leftSideTheme === 'dark') {
              let obj2 = {
                leftSideTheme: obj1.leftSideTheme? obj1.leftSideTheme :'dark',
                leftSideBgImg: obj1.leftSideBgImg? obj1.leftSideBgImg : defaultSideBgImg,
                leftSideBgColor: obj1.leftSideBgColor? obj1.leftSideBgColor : 'red',
              }
            }
            if(obj1.leftSideTheme === 'light') {
              let obj2 = {
                leftSideTheme: obj1.leftSideTheme? obj1.leftSideTheme :'light',
                leftSideBgImg: obj1.leftSideBgImg? obj1.leftSideBgImg : defaultSideBgImg,
                leftSideBgColor: obj1.leftSideBgColor? obj1.leftSideBgColor : 'red',
              }
              }
              obj1 = Object.assign(obj1,obj2);
            let obj = {
              headerTheme: obj1.headerTheme? obj1.headerTheme :'light',
              headerBgImg: obj1.headerBgImg? obj1.headerBgImg : defaultBgImg,
              headerBgColor: obj1.headerBgColor? obj1.headerBgColor : '#fff',
              sideShowPosition: obj1.sideShowPosition? obj1.sideShowPosition:'',
              headerCenterImg: obj1.headerCenterImg? obj1.headerCenterImg: headerCenterDefaultImg
            }
            actions.app.updateState({
              themeObj:Object.assign(obj1,obj)
            })
          }
          // let flagVal = localStorage.getItem('themeVal');
          // let defaultBgImg ='';
          // if(flagVal === '1'){
          //   let obj1 = {
          //     headerTheme: 'dark',
          //     headerBgImg:'',
          //     headerBgColor:'',
          //     sideShowPosition:'left',
          //     headerCenterImg:'',
          //     leftSideTheme:'dark',
          //     leftSideBgColor:'',
          //     leftSideBgImg:'',
          //     tabNum: 10
          //   }
          //   if(obj1.headerTheme === ''){
          //     obj1.headerTheme = 'light';
          //   }
          //   let getLocal = cookie.load('u_locale')||'zh_CN';
          //   let headerCenterDefaultImg;
          //   if(getLocal === 'zh_CN') {
          //       headerCenterDefaultImg = 'images/index/logo_light_CN.svg';
          //     } else if (getLocal === 'en_US') {
          //       headerCenterDefaultImg = 'images/index/logo_light_US.svg';
          //     } else {
          //       headerCenterDefaultImg = 'images/index/logo_light_TW.svg';
          //     }
          //     if(!obj1.headerBgImg && !obj1.headerBgColor) {
          //       defaultBgImg = 'images/index/dark_bg_img.jpg'
          //     }
          //     let defaultSideBgImg = '';
          //     if(!obj1.leftSideBgImg && !obj1.leftSideBgColor) {
          //       defaultSideBgImg = 'images/index/dark_bg_img.jpg';
          //     }
          //     let obj2 = {};
          //     if(obj1.leftSideTheme === 'dark') {
          //       let obj2 = {
          //         leftSideTheme: obj1.leftSideTheme? obj1.leftSideTheme :'dark',
          //         leftSideBgImg: obj1.leftSideBgImg? obj1.leftSideBgImg : defaultSideBgImg,
          //         leftSideBgColor: obj1.leftSideBgColor? obj1.leftSideBgColor : 'red',
          //       }
          //     }
          //     if(obj1.leftSideTheme === 'light') {
          //       let obj2 = {
          //         leftSideTheme: obj1.leftSideTheme? obj1.leftSideTheme :'light',
          //         leftSideBgImg: obj1.leftSideBgImg? obj1.leftSideBgImg : defaultSideBgImg,
          //         leftSideBgColor: obj1.leftSideBgColor? obj1.leftSideBgColor : 'red',
          //       }
          //       }
          //       obj1 = Object.assign(obj1,obj2);
          //       let obj = {
          //         headerTheme: obj1.headerTheme? obj1.headerTheme :'dark',
          //         headerBgImg: obj1.headerBgImg? obj1.headerBgImg : defaultBgImg,
          //         headerBgColor: obj1.headerBgColor? obj1.headerBgColor : '#242D48',
          //         sideShowPosition: obj1.sideShowPosition? obj1.sideShowPosition:'',
          //         headerCenterImg: obj1.headerCenterImg? obj1.headerCenterImg: headerCenterDefaultImg,
          //       }
          //     actions.app.updateState({
          //       themeObj: Object.assign(obj1,obj)
          //     })
          // }else if(flagVal === '2'){
          //   let themeObj = {
          //     headerTheme: 'light',
          //     headerBgImg:'',
          //     headerBgColor:'',
          //     sideShowPosition:'left',
          //     headerCenterImg:'',
          //     leftSideTheme:'dark',
          //     leftSideBgColor:'#093E91',
          //     leftSideBgImg:'',
          //     tabNum:10
          //   }
          //   if(themeObj.headerTheme === ''){
          //     themeObj.headerTheme = 'light';
          //   }
          //   let getLocal = cookie.load('u_locale')||'zh_CN';
          //   let defaultBgImg ='';
          //   let headerCenterDefaultImg = '';
          //     if(getLocal === 'zh_CN') {
          //       headerCenterDefaultImg = 'images/index/logo_zh_CN.svg';
          //     } else if (getLocal === 'en_US') {
          //       headerCenterDefaultImg = 'images/index/logo_en_US.svg';
          //     } else {
          //       headerCenterDefaultImg = 'images/index/logo_zh_TW.svg';
          //     }
          //     if(!themeObj.headerBgImg && !themeObj.headerBgColor) {
          //       defaultBgImg = 'images/index/bg_topbar.jpg'
          //     }
          //     let defaultSideBgImg = '';
          //     if(!themeObj.leftSideBgImg && !themeObj.leftSideBgColor) {
          //       defaultSideBgImg = '';
          //     }
          //     let obj2 = {};
          //     if(themeObj.leftSideTheme === 'dark') {
          //       let obj2 = {
          //         leftSideTheme: themeObj.leftSideTheme? themeObj.leftSideTheme :'dark',
          //         leftSideBgImg: themeObj.leftSideBgImg? themeObj.leftSideBgImg : defaultSideBgImg,
          //         leftSideBgColor: themeObj.leftSideBgColor? themeObj.leftSideBgColor : 'red',
          //       }
          //     }
          //     if(themeObj.leftSideTheme === 'light') {
          //       let obj2 = {
          //         leftSideTheme: themeObj.leftSideTheme? themeObj.leftSideTheme :'light',
          //         leftSideBgImg: themeObj.leftSideBgImg? themeObj.leftSideBgImg : defaultSideBgImg,
          //         leftSideBgColor: themeObj.leftSideBgColor? themeObj.leftSideBgColor : 'red',
          //       }
          //       }
          //       themeObj = Object.assign(themeObj,obj2);
          //     let obj = {
          //       headerTheme: themeObj.headerTheme? themeObj.headerTheme :'light',
          //       headerBgImg: themeObj.headerBgImg? themeObj.headerBgImg : defaultBgImg,
          //       headerBgColor: themeObj.headerBgColor? themeObj.headerBgColor : '#fff',
          //       sideShowPosition: themeObj.sideShowPosition? themeObj.sideShowPosition:'',
          //       headerCenterImg: themeObj.headerCenterImg? themeObj.headerCenterImg: headerCenterDefaultImg
          //     }
          //     actions.app.updateState({
          //       themeObj:Object.assign(themeObj,obj)
          //     })
          //   } else if(flagVal === '0'){
          //     let themeObj = {
          //       headerTheme: 'dark',
          //       headerBgImg:'',
          //       headerBgColor:'',
          //       sideShowPosition:'left',
          //       headerCenterImg:'',
          //       leftSideTheme:'dark',
          //       leftSideBgColor:'#093E91',
          //       leftSideBgImg:''
          //     }
          //     let getLocal = cookie.load('u_locale')||'zh_CN';
          //     let defaultBgImg ='';
          //     let headerCenterDefaultImg = '';
          //       if(getLocal === 'zh_CN') {
          //         headerCenterDefaultImg = 'images/index/ZX-logo.png';
          //       } else if (getLocal === 'en_US') {
          //         headerCenterDefaultImg = 'images/index/ZX-logo.png';
          //       } else {
          //         headerCenterDefaultImg = 'images/index/ZX-logo.png';
          //       }
          //       if(!themeObj.headerBgImg && !themeObj.headerBgColor) {
          //         defaultBgImg = 'images/index/ZX.jpg'
          //       }
          //       let obj = {
          //         headerTheme: themeObj.headerTheme? themeObj.headerTheme :'dark',
          //         headerBgImg: themeObj.headerBgImg? themeObj.headerBgImg : defaultBgImg,
          //         headerBgColor: themeObj.headerBgColor? themeObj.headerBgColor : '#093E91',
          //         sideShowPosition: themeObj.sideShowPosition? themeObj.sideShowPosition:'',
          //         headerCenterImg: themeObj.headerCenterImg? themeObj.headerCenterImg: headerCenterDefaultImg
          //       }
          //       actions.app.updateState({
          //         themeObj:Object.assign(themeObj,obj)
          //       })
          //   }
        },
        /**
         * 加载菜单数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标

            // 调用 getList 请求数据
            let res = processData(await api.getList());
            let data ;
            if(!res || !res.data){
                data = [{
                    "location" : "pages/default/index.js",
                    "name" : "首页",
                    "menustatus" : "Y",
                    "children" : null,
                    "icon" : "iconfont icon-C-home",
                    "openview" : "curnpage",
                    "menuId" : "M0000000000002",
                    "urltype" : "plugin",
                    "id" : "index",
                    "isDefault" : null,
                    "licenseControlFlag" : 0
                }]
            }else{
                data = res.data;
            }
            actions.app.updateState({
                menu: data,
                num:data?data.length:0
            });

            return data;
        },


        /**
         * 加载用户菜单数据
         * @param {*} param
         * @param {*} getState
         */
        async loadUserMenuList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标

            // 调用 loadUserMenuList 请求数据
            let res = processData(await api.loadUserMenuList());

            actions.app.updateState({
                userMenus: res.data,
            });

            return res.data;
        },
        /**
         * 加载未读消息
         * @param {*} param
         * @param {*} getState
         */
        async loadUnReadMsg(param, getState) {
            // 正在加载数据，显示加载 Loading 图标

            // 调用 loadUserMenuList 请求数据
            let res = processData(await api.loadUnReadMsg());


            return res.data;
        },
        /**
         * 获取消息推送配置
         * @param {*} param
         * @param {*} getState
         */
        async getWebPushInfo(param, getState) {
            // 正在加载数据，显示加载 Loading 图标

            // 调用 loadUserMenuList 请求数据
            let res = processData(await api.getWebPushInfo());


            return res.data;
        },

        /**
         * 获取语种列表
         */
        async getLanguageList() {
            let res = processData(await api.getLanguageList());
            let langList = [];
            let language_source = []
            if (res && res.status == 1) {
                let  arr = res.data;
                for (var i = 0; i < arr.length; i++) {
                    var obj = {
                        code: arr[i].prelocale == null ? "zh_CN" : arr[i].prelocale.replace(/-/,'_'),
                        name: arr[i].pageshow
                    }
                    var languageObj = {
                        value: arr[i].prelocale == null ? "zh_CN" : arr[i].prelocale.replace(/-/,'_'),
                        name: arr[i].pageshow,
                        serial: arr[i].serialid,
                        isDefault:(arr[i].i18nDefault != null && arr[i].i18nDefault == "1") ? true : false
                    }
                    langList.push(obj);
                    language_source.push(languageObj);
                }
            }
            loginInitI18n(language_source)
            actions.app.updateState({
                langList: langList,
            });
        },


        /**
         * 切换语种
         * @param {*} newLocaleValue
         */
        async setLocaleParam(newLocaleValue) {
            if (newLocaleValue && newLocaleValue.length > 0) {
                let res = processData(await api.setLocaleParam(newLocaleValue));
                if(res){
                    let id = getCookie('_A_P_userId');
                    let userRes = processData(await api.getUserById(id));
                    if(userRes){
                        let userName = userRes.data.name;
                        if(res.data !== 1){
                            userName = userRes.data['name' + res.data]
                        }
                        setCookie('_A_P_userName',userName);
                        window.location.reload(true);
                    }
                }
            }
        }
    }
};
