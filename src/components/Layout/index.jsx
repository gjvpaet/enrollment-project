import React, { Fragment } from 'react';

import Navbar from './components/Navbar/index.jsx';

import Sidebar from './containers/Sidebar/index.jsx';

const layout = props => (
    <Fragment>
        <Sidebar />
        <div className="main-panel">
            <Navbar {...props} />
            <div class="panel-header panel-header-sm"></div>
            <div className="content">
                <div className="row">{props.children}</div>
            </div>
        </div>
    </Fragment>
);

export default layout;
