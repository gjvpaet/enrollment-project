import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { push } from 'react-router-redux';

class Sidebar extends Component {
    render() {
        let { location } = this.props;

        return (
            <div className="sidebar" data-color="orange">
                <div className="logo">
                    <a href="#" className="simple-text logo-mini">
                        AU
                    </a>
                    <a href="#" className="simple-text logo-normal">
                        Enrollment System
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <div className="nav">
                        <li className={location.pathname === '/enrollments' ? 'active' : ''}>
                            <Link to="/enrollments">
                                <i className="now-ui-icons design_app" />
                                <p>Enrollments</p>
                            </Link>
                        </li>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        location: state.router.location
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redirect: path => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
