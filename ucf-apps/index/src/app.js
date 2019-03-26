import React, { Component } from "react";
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/array';
import 'core-js/es7/array';
import 'core-js/es6/object';
// import logger from "redux-logger";
import mirror, { render,Router } from "mirrorx";
import MainLayout from "layout";
import Routes from './routes'
import 'static/trd/tinper-bee/assets/tinper-bee.css'
import { setCookie } from 'utils/index';
setCookie('portalid',GROBAL_PORTAL_ID)

require('es6-promise').polyfill();

import Intl from 'components/Intl/index.js'

const MiddlewareConfig = [];

// if(__MODE__ == "development") MiddlewareConfig.push(logger);

mirror.defaults({
    historyMode: "hash",
    middlewares: MiddlewareConfig
});



render(<Intl>
    <Router>
        <MainLayout Routes={Routes} />
    </Router>
</Intl>, document.querySelector("#app"));