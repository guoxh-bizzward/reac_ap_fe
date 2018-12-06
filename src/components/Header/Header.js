import React,{Component} from "react";
import cookie from "react-cookie";
import {Navbar,Menu,Badge,Tile,Icon,Tooltip} from 'tinper-bee';
import {FormattedMessage, FormattedDate, FormattedNumber} from 'react-intl';
import mirror, { connect,actions } from 'mirrorx';
import UserMenus from 'components/UserMenu/UserMenu';
import Tenant from 'components/Tenant/Tenant';
import * as api from "../../pages/index/service";
import { subscribe } from  'components/EventBus/Eventbus';

import { processData } from "utils";
const Header = Navbar.Header;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const NavItem = Navbar.NavItem;
const Brand = Navbar.Brand;
const Collapse = Navbar.Collapse;
const Toggle = Navbar.Toggle;
const Nav = Navbar.Nav;


class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded:false,
            openKeys:[],
            curentOpenKeys: [],
            maxed:false,
            unreadMsg:0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    async componentDidMount(){

        // 调用 loadUserMenuList 请求数据
        let res = processData(await api.loadUnReadMsg());
        this.setState({
            unreadMsg:res.unReadNum>99?'99+':res.unReadNum
        })

        let info  = processData(await api.getWebPushInfo());
    
        let {webpuship,webpushport} =info.webpush;
        var userId = cookie.load('userId');
        var userkey = cookie.load('tenantid')  === ""? "null" : cookie.load('tenantid')
        subscribe(webpuship,webpushport,{
                    "identity": "server1001",
                    "appid": "",
                    "userkey": userkey.concat("_", userId)
                },(err, jsonMsg)=>{

                    var Tcount = 0;
                    if (jsonMsg.message && JSON.parse(jsonMsg.message)[userkey.concat("_", userId)]) {
                        Tcount = JSON.parse(jsonMsg.message)[userkey.concat("_", userId)];
                        this.setState({
                            unreadMsg:Tcount>99?'99+':Tcount
                        })
                    }

                })


    }
    onToggle(value) {
        //this.setState({expanded: value});
        let {expanded,openKeys,curentOpenKeys} = this.props;

        var v = expanded;

        if (v) {
            var keys = openKeys;
            actions.app.updateState({ expanded: !v, openKeys: [], curentOpenKeys: keys });
        } else {
            var _keys = curentOpenKeys;
            actions.app.updateState({ expanded: !v, openKeys: _keys, curentOpenKeys: _keys });
        }
    }
    showMenu(e) {
        let {userMenu} = this.props;
        actions.app.updateState()
    }
    handleClick(e,reload) {
        //判断是否点击子菜单,1:当前子菜单，2:2级别子菜单。。。
        let {menus,current} = this.props;

        let self = this;

        // var data  = (e.keyPath.length==1)?{
        //     current: e.key,
        //     openKeys: [],
        //     submenuSelected:'',
        //     curentOpenKeys:[],
        //     userMenu:false
        // }:{
        //     current: e.key
        // };

        function getDOm() {
            let tar = e.target;
            if(tar.getAttribute('value')){
                return tar;
            }
            else if(tar.parentElement.getAttribute('value')){
                tar.parentElement
            }
            else {
                return tar.parentElement.parentElement
            }
        }

        let tar = getDOm();


        if(!tar){
            return false;
        }

        let value = tar.getAttribute('value');


        let data = {
            current: value,
            showNotice:0,
            reload:0
        };

        if(typeof value == 'undefined'||value==null){
            return false;
        }

        if(value=='logout'){
            return false;
        }


        let dom = tar;
        let title = dom.getAttribute('name');
        let router =  dom.getAttribute('href');



        let options = {
            title:title,
            router:router,
            id:value
        };


        let menu = menus;


        //点击已经选中的节点时
        if(value==current){
            var url = location.hash;
            //window.router.dispatch('on', url.replace('#',''));
        }
        else {
            if(typeof dom!="undefined"&&dom.getAttribute('target')=='_blank'){
                return false;
            }
            else {
                var menuObj = JSON.parse(JSON.stringify(menu));


                if(menuObj.length==11&&JSON.stringify(menu).indexOf('"id":"'+options.id+'"')==-1&&menu.length!=0) {
                    actions.app.updateState({
                        showNotice:1
                    });
                    return false;
                }
                else if(JSON.stringify(menu).indexOf('"id":"'+options.id+'"')!=-1){
                    data = {
                        current: value,
                        showNotice:0,
                        reload:reload?1:0,
                        currentRouter:reload?decodeURIComponent(decodeURIComponent(router.replace('#\/ifr\/',''))):''
                    };
                }
                actions.app.updateState(data);
            }
        }
        this.createTab(options);
    }
    createTab (options,value) {


        var self = this;
        var {menus} = this.props;

        if(!window.sessionStorage){
            alert('This browser does NOT support sessionStorage');
            return false;
        }


        var menu = menus;


        if(JSON.stringify(menu).indexOf('"id":"'+options.id+'"')!=-1&&menu.length!=0){
            return false;
        }


        var menuObj = JSON.parse(JSON.stringify(menu));



        if(menuObj.length==11) {
            return false;
        }

        menuObj[menuObj.length] = options;


        sessionStorage['tabs'] = JSON.stringify(menuObj);

        sessionStorage['current'] = JSON.stringify({
            current:options.id
        });

        actions.app.updateState({
            menus:menuObj,
            current:options.id
        });


    }
    formmaterUrl(item) {
        var uri = " ";
        if (item.urltype === 'url') {
            var target=item.openview=="newpage"?"_blank":"";
            if(target){
                // uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.location));
                uri = item.location;
            }else{
                uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
            }
            return  uri;
        } else if (item.urltype === 'plugin') {
            uri = item.id ? ('#/' + item.id) : "#/index_plugin";

            uri = `${GROBAL_HTTP_CTX}/`+encodeURIComponent(encodeURIComponent('index-view.html'+uri));
            return  uri;
        } else if (item.urltype === 'view') {
            uri = item.location;
            uri= uri.replace("#", "/");

            if(uri[0]=='/'){
                uri = "/sidebar"+uri;
            }else{
                uri = "/sidebar/"+uri;
            }
            // window.addRouter(uri);
            // return  "#"+uri;

            return `${GROBAL_HTTP_CTX}/`+'index-view.html#'+uri;
        }else if(item.urltype == undefined){
            item.location = '404';
            return  '#/ifr/' + encodeURIComponent(encodeURIComponent(item.location));
        }
        else {
            return item.location;
        }
    }

    handleDefault(e,isDefault) {
        isDefault = (isDefault=="_blank")?false:true;
        if(window.isOpenTab&&isDefault){
            //dom.href = 'javascript:;'
            e.preventDefault();
        }
    }
    maxfunc(e){
        let de  = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
        this.setState({
            maxed:true
        })
    }
    minifunc(e){
        let de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
        this.setState({
            maxed:false
        })
    }
    render (){
        let self = this;

        let {unreadMsg,maxed} = self.state;
        let {expanded,menus,intl} = this.props;

        var UserMenuObj = {
            formmaterUrl:self.formmaterUrl,
            handleClick:self.handleClick,
            handleDefault:self.handleDefault,
            intl:intl
        };




        return (
            <Navbar fluid={true} className={"portal-navbar "+(expanded?"expanded":"")} expanded={expanded} onToggle={this.onToggle.bind(this)}>
                <Brand>
                    <a href="javascript:;">
                        <img src={require(`static/images/logo_${cookie.load('u_locale')||'zh_CN'}.svg`)} className="portal-logo" />
                    </a>
                </Brand>
                {cookie.load('loginChannel') ==='yht'?<Nav  className="portal-nav" onClick={self.handleClick.bind(this)}>
                    <Tenant {...UserMenuObj} />
                </Nav>:""}
                <Nav pullRight className="portal-nav" onClick={self.handleClick.bind(this)}>
                    <NavItem>
                        {!maxed?
                            <a id="maxBox"  onClick={(e)=>self.maxfunc(e)} data-ref="taskcenter" name={intl.formatMessage({id: 'tabs.header.max'})} title={intl.formatMessage({id: 'tabs.header.max'})}  className="navbar-avatar" titlekey={intl.formatMessage({id: 'tabs.header.max'})} >
                                <div className="u-badge">
                                    <i className="iconfont icon-max"></i>
                                </div>
                            </a>:
                            <a id="maxBox"  onClick={(e)=>self.minifunc(e)} data-ref="taskcenter" name={intl.formatMessage({id: 'tabs.header.max'})} title={intl.formatMessage({id: 'tabs.header.max'})}  className="navbar-avatar" titlekey={intl.formatMessage({id: 'tabs.header.max'})} >
                                <div className="u-badge">
                                    <i className="iconfont icon-mini"></i>
                                </div>
                            </a>
                    }
                    </NavItem>
                    <NavItem>
                        <a id="taskCenterBox" value="taskcenter" onClick={(e)=>self.handleDefault(e)} data-ref="taskcenter" name={intl.formatMessage({id: 'tabs.header.task'})} title={intl.formatMessage({id: 'tabs.header.task'})} href={`${GROBAL_HTTP_CTX}/index-view.html#/taskcenter`} className="navbar-avatar" titlekey={intl.formatMessage({id: 'tabs.header.task'})} >
                            <div className="u-badge">
                                <i className="pap pap-task"></i>
                            </div>
                        </a>
                    </NavItem>
                    <NavItem>

                        <a id="messageCount" value="msgCenter" onClick={(e)=>self.handleDefault(e)} data-ref="msgCenter" name={intl.formatMessage({id: 'tabs.header.message'})} title={intl.formatMessage({id: 'tabs.header.message'})} href={`${GROBAL_HTTP_CTX}/index-view.html#/msgCenter`} className="navbar-avatar" titlekey={intl.formatMessage({id: 'tabs.header.message'})}>
                            <div className="u-badge" data-badge={unreadMsg}>
                                <i className="pap pap-massage"></i>
                            </div>
                        </a>
                    </NavItem>

                    <UserMenus {...UserMenuObj}  />
                </Nav>


            </Navbar>
        )
    }
}
export default  App;