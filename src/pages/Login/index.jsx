import React, { Component } from 'react';

import HttpService from '../../services/HttpService';

const httpService = new HttpService();

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        ['submit', 'handleChange'].map(fn => (this[fn] = this[fn].bind(this)));
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async submit(event) {
        event.preventDefault();

        let { email, password } = this.state;

        try {
            let result = await httpService.authenticate(email, password);

            localStorage.setItem('token', result.token);
            localStorage.setItem('userData', JSON.stringify(result.user));
            alertify.success(result.message);

            location.href = `${siteUrl}enrollments`;
        } catch (error) {
            console.log('error: ', error);
            alertify.error('Oops, something went wrong.');
        }
    }

    render() {
        let { email, password } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col align-self-start" />
                    <div
                        className="col-md-6 align-self-center d-flex justify-content-center align-items-center"
                        style={{ height: '100vh' }}
                    >
                        <div className="card card-nav-tabs text-center">
                            <div className="card-header card-header-primary">
                                <h2>Login</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.submit}>
                                    <div className="form-group">
                                        <label htmlFor="emailAddress">
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={email}
                                            id="emailAddress"
                                            className="form-control"
                                            onChange={this.handleChange}
                                            placeholder="Enter Email Address"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            className="form-control"
                                            placeholder="Enter Password"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <button className="btn btn-primary btn-round">
                                        Log in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col align-self-end" />
                </div>
            </div>
        );
    }
}

export default Login;
