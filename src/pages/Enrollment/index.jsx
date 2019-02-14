import moment from 'moment';
import { values } from 'lodash';
import jparam from 'jquery-param';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { ChildButton } from 'react-mfb';
import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners';

import 'react-mfb/mfb.css';
import 'react-tippy/dist/tippy.css';
import 'react-table/react-table.css';

import { setEnrollment, fetchEnrollments, deleteEnrollment } from '../../store/actions';

import EnrollmentModal from './container/EnrollmentModal/index.jsx';

import FAB from '../../components/FAB/index.jsx';
import Card from '../../components/Card/index.jsx';
import Layout from '../../components/Layout/index.jsx';

import HttpService from '../../services/HttpService';

const httpService = new HttpService();

const userData = JSON.parse(localStorage.getItem('userData'));

class Enrollment extends Component {
    constructor(props) {
        super(props);

        ['addEnrollment', 'getEnrollments'].map(
            fn => (this[fn] = this[fn].bind(this))
        );
    }

    async componentDidMount() {
        this.getEnrollments();
    }

    async getEnrollments() {
        let { fetchEnrollments } = this.props;

        try {
            let result = await httpService.getAllData('enrollments', jparam({}));

            result.list = result.list.map(data => {
                data.CreatedDate = moment(data.CreatedAt).format(
                    'MMMM Do YYYY, h:mm a'
                );
                data.UpdatedDate = moment(data.UpdatedAt).format(
                    'MMMM Do YYYY, h:mm a'
                );

                return data;
            });

            fetchEnrollments(result.list);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    getColumns() {
        return [
            {
                Header: 'Student',
                Cell: props => <div className="text-center">{`${props.original.Student.FirstName} ${props.original.Student.LastName}`}</div>,
                Filter: () => {}
            },
            {
                Header: 'High School',
                accessor: 'HighSchool',
                Cell: props => <div className="text-center">{props.value}</div>,
                Filter: () => {}
            },
            {
                Header: 'School Classification',
                accessor: 'SchoolClassification',
                Cell: props => <div className="text-center">{props.value}</div>,
                Filter: () => {}
            },
            {
                Header: 'School Location',
                accessor: 'SchoolLocation',
                Cell: props => <div className="text-center">{props.value}</div>,
                Filter: () => {}
            },
            {
                Header: 'Preferred Strand',
                accessor: 'PreferredStrand',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Created At',
                accessor: 'CreatedDate',
                minWidth: 200,
                filterMethod: (filter, row) => {
                    let value = filter.value.toLowerCase();
                    let createdDate = row._original[filter.id].toLowerCase();

                    return createdDate.includes(value) ? row : '';
                },
                Cell: props => (
                    <div className="text-center">
                        {props.original.CreatedDate}
                    </div>
                )
            },
            {
                Header: 'Updated At',
                accessor: 'UpdatedDate',
                minWidth: 200,
                filterMethod: (filter, row) => {
                    let value = filter.value.toLowerCase();
                    let updatedDate = row._original[filter.id].toLowerCase();

                    return updatedDate.includes(value) ? row : '';
                },
                Cell: props => (
                    <div className="text-center">
                        {props.original.UpdatedDate}
                    </div>
                )
            },
            {
                Header: 'Actions',
                Cell: props => {
                    return (
                        <div className="text-center">
                            <Tooltip
                                title="Delete"
                                position="bottom"
                                animation="scale"
                            >
                                <button
                                    className="btn btn-danger btn-fab btn-icon btn-round"
                                    onClick={e =>
                                        this.deleteEnrollment(props.original.Id)
                                    }
                                >
                                    <i className="now-ui-icons ui-1_simple-remove" />
                                </button>
                            </Tooltip>
                        </div>
                    );
                },
                Filter: () => {}
            }
        ];
    }

    addEnrollment(event) {
        this.props.setEnrollment({ formAction: 'POST' });
        $('#enrollments-modal').modal('show');
        $('#enrollment-form').validator();
    }

    deleteEnrollment(id) {
        alertify.confirm(
            'Warning',
            'Are you sure you want to delete this?',
            async () => {
                try {
                    let { data, fetchEnrollments } = this.props;

                    let result = await httpService.deleteData(id, 'enrollments');

                    let newData = data.filter(d => d.Id !== id);
                    fetchEnrollments(newData);

                    alertify.success('Successfully deleted data.');
                } catch (error) {
                    console.log('error: ', error);
                    alertify.error('Oops, something went wrong.');
                }
            },
            () => {}
        );
    }

    render() {
        let columns = this.getColumns();
        let { data, fetchLoading } = this.props;

        return (
            <Layout
                title="Enrollments"
                userName={`${userData.FirstName} ${userData.LastName}`}
            >
                <div className="col-md-12">
                    <Card cardTitle="Enrollments Table">
                        <ReactTable
                            filterable
                            data={data}
                            columns={columns}
                            defaultPageSize={10}
                            loading={fetchLoading}
                            ref={r => (this.reactTable = r)}
                            className="-striped -highlight"
                            loadingText={
                                <div style={{ display: 'inline-block' }}>
                                    <SemipolarSpinner
                                        color="black"
                                        size={100}
                                    />
                                </div>
                            }
                        />
                    </Card>
                    <FAB
                        position="br"
                        method="hover"
                        effect="slidein-spring"
                        mainBtnStyle={{ color: 'white' }}
                        mainBtnIconActive="now-ui-icons ui-1_simple-remove"
                        mainBtnIconResting="now-ui-icons design_bullet-list-67"
                    >
                        <ChildButton
                            label="Add Enrollment"
                            onClick={this.addEnrollment}
                            style={{ color: 'white' }}
                            icon="now-ui-icons ui-1_simple-add"
                        />
                    </FAB>
                </div>
                <EnrollmentModal />
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: values(state.enrollments.data),
        fetchLoading: state.enrollments.fetchLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setEnrollment: data => dispatch(setEnrollment(data)),
        deleteEnrollment: id => dispatch(deleteEnrollment(id)),
        fetchEnrollments: data => dispatch(fetchEnrollments(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Enrollment);
