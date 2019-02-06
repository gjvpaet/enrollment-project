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

import { setBook, fetchBooks, deleteBook } from '../../store/actions';

import BookModal from './container/BookModal/index.jsx';

import FAB from '../../components/FAB/index.jsx';
import Card from '../../components/Card/index.jsx';
import Layout from '../../components/Layout/index.jsx';

import HttpService from '../../services/HttpService';

const httpService = new HttpService();

const userData = JSON.parse(localStorage.getItem('userData'));

class Books extends Component {
    constructor(props) {
        super(props);

        ['addBook', 'getBooks'].map(
            fn => (this[fn] = this[fn].bind(this))
        );
    }

    async componentDidMount() {
        this.getBooks();
    }

    async getBooks() {
        let { fetchBooks } = this.props;

        try {
            let result = await httpService.getAllData('books', jparam({}));

            result.list = result.list.map(data => {
                data.CreatedDate = moment(data.CreatedAt).format(
                    'MMMM Do YYYY, h:mm a'
                );
                data.UpdatedDate = moment(data.UpdatedAt).format(
                    'MMMM Do YYYY, h:mm a'
                );

                return data;
            });

            fetchBooks(result.list);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    getColumns() {
        return [
            {
                Header: 'Author',
                accessor: 'Author',
                minWidth: 200,
                filterMethod: (filter, row) => {
                    let value = filter.value.toLowerCase();
                    let name = row[filter.id].toLowerCase();

                    return name.includes(value) ? row : '';
                },
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Title',
                accessor: 'Title',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Publisher',
                accessor: 'Publisher',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Place of Publication',
                accessor: 'PlaceOfPublication',
                minWidth: 200,
                filterMethod: (filter, row) => {
                    let value = filter.value.toLowerCase();
                    let unit = row[filter.id].toLowerCase();

                    return unit.includes(value) ? row : '';
                },
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Date of Publication',
                accessor: 'DateOfPublication',
                minWidth: 200,
                filterMethod: (filter, row) => {
                    let value = filter.value.toLowerCase();
                    let invRef = row[filter.id].toLowerCase();

                    return invRef.includes(value) ? row : '';
                },
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
                    if (userData.UserType === 'Professor') {
                        return (
                            <div className="text-center">
                                <Tooltip
                                    title="Edit"
                                    position="left"
                                    animation="scale"
                                >
                                    <button
                                        className="btn btn-primary btn-fab btn-icon btn-round"
                                        onClick={e =>
                                            this.editBook(e, props.original)
                                        }
                                    >
                                        <i className="now-ui-icons design-2_ruler-pencil" />
                                    </button>
                                </Tooltip>
                                &nbsp;
                                <Tooltip
                                    title="Delete"
                                    position="bottom"
                                    animation="scale"
                                >
                                    <button
                                        className="btn btn-danger btn-fab btn-icon btn-round"
                                        onClick={e =>
                                            this.deleteBook(props.original.Id)
                                        }
                                    >
                                        <i className="now-ui-icons ui-1_simple-remove" />
                                    </button>
                                </Tooltip>
                            </div>
                        );
                    }

                    return null;
                },
                Filter: () => {}
            }
        ];
    }

    addBook(event) {
        this.props.setBook({ formAction: 'POST' });
        $('#books-modal').modal('show');
        $('#book-form').validator();
    }

    editBook(event, book) {
        this.props.setBook({
            formAction: 'PUT',
            selected: {
                ...book
            }
        });

        $('#books-modal').modal('show');
        $('#book-form').validator();
    }

    deleteBook(id) {
        alertify.confirm(
            'Warning',
            'Are you sure you want to delete this?',
            async () => {
                try {
                    let { data, fetchBooks } = this.props;

                    let result = await httpService.deleteData(id, 'books');

                    let newData = data.filter(d => d.Id !== id);
                    fetchBooks(newData);

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
                title="Books"
                userName={`${userData.FirstName} ${userData.LastName}`}
            >
                <div className="col-md-12">
                    <Card cardTitle="Books Table">
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
                    {userData.UserType === 'Professor' && 
                        <FAB
                            position="br"
                            method="hover"
                            effect="slidein-spring"
                            mainBtnStyle={{ color: 'white' }}
                            mainBtnIconActive="now-ui-icons ui-1_simple-remove"
                            mainBtnIconResting="now-ui-icons design_bullet-list-67"
                        >
                            <ChildButton
                                label="Add Book"
                                onClick={this.addBook}
                                style={{ color: 'white' }}
                                icon="now-ui-icons ui-1_simple-add"
                            />
                        </FAB>
                    }
                </div>
                <BookModal />
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: values(state.books.data),
        fetchLoading: state.books.fetchLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setBook: data => dispatch(setBook(data)),
        deleteBook: id => dispatch(deleteBook(id)),
        fetchBooks: data => dispatch(fetchBooks(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Books);
