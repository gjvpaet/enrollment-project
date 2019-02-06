import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { HalfCircleSpinner } from 'react-epic-spinners';

import 'rc-calendar/assets/index.css';

import {
    setBook,
    addBook,
    updateBook,
    setSelectedBook
} from '../../../../store/actions';

import Modal from '../../../../components/Modal/index.jsx';

import HttpService from '../../../../services/HttpService';

const httpService = new HttpService();

class BookModal extends Component {
    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        $('#book-form')
            .validator(this.props.selected ? 'validate' : 'update')
            .on('submit', e => this.submit(e));   
    }

    handleChange(field, value) {
        this.props.setSelectedBook({ field, value });
    }

    closeModal() {
        this.props.setBook({ formAction: 'POST', selected: null });
        $('#book-form').validator('destroy');
    }

    async submit(event) {
        event.preventDefault();

        let {
            formAction,
            selected,
            addBook,
            setBook,
            updateBook
        } = this.props;

        let {
            Id = '',
            Author = '',
            Title = '',
            Publisher = '',
            PlaceOfPublication = '',
            DateOfPublication = ''
        } = selected || {};

        setBook({ formLoading: true });

        let data = {
            Author,
            Title,
            Publisher,
            PlaceOfPublication,
            DateOfPublication
        };

        switch (formAction) {
            case 'POST':
                try {
                    let { content, message } = await httpService.insertData(data, 'books');

                    content.CreatedDate = moment(content.CreatedAt).format('MMMM Do YYYY, h:mm a');
                    content.UpdatedDate = moment(content.UpdatedAt).format('MMMM Do YYYY, h:mm a');

                    addBook(content);
                    setBook({ formLoading: false });

                    alertify.success(message);
                    $('#books-modal').modal('hide');
                } catch (error) {
                    console.log('error: ', error);
                    alertify.error('Oops, something went wrong.');
                }
                break;
            case 'PUT':
                try {
                    let { content, message } = await httpService.updateData(
                        data,
                        Id,
                        'books'
                    );

                    content.CreatedDate = moment(content.CreatedAt).format('MMMM Do YYYY, h:mm a');
                    content.UpdatedDate = moment(content.UpdatedAt).format('MMMM Do YYYY, h:mm a');

                    updateBook(content);
                    setBook({ formLoading: false });

                    alertify.success(message);
                    $('#books-modal').modal('hide');
                } catch (error) {
                    console.log('error: ', error);
                    alertify.error('Oops, something went wrong.');
                }
                break;
            default:
                break;
        }
    }

    render() {
        let { selected, formAction, formLoading } = this.props;

        let {
            Author = '',
            Title = '',
            Publisher = '',
            PlaceOfPublication = '',
            DateOfPublication = ''
        } = selected || {};

        return (
            <Modal
                formId="book-form"
                modalId="books-modal"
                modalTitle="Add New Book"
                closeModal={this.closeModal}
            >
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="Author">
                                    Author{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="Author"
                                    name="Author"
                                    value={Author}
                                    className="form-control"
                                    placeholder="Enter Book Author"
                                    onChange={e =>
                                        this.handleChange(
                                            'Author',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="Title">
                                    Title{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="Title"
                                    name="Title"
                                    value={Title}
                                    className="form-control"
                                    placeholder="Enter Book Title"
                                    onChange={e =>
                                        this.handleChange(
                                            'Title',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="Publisher">
                                    Publisher{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="Publisher"
                                    name="Publisher"
                                    value={Publisher}
                                    className="form-control"
                                    placeholder="Enter Book Publisher"
                                    onChange={e =>
                                        this.handleChange(
                                            'Publisher',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="PlaceOfPublication">
                                    Place of Publication{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="PlaceOfPublication"
                                    name="PlaceOfPublication"
                                    value={PlaceOfPublication}
                                    className="form-control"
                                    placeholder="Enter Book Place of Publication"
                                    onChange={e =>
                                        this.handleChange(
                                            'PlaceOfPublication',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="DateOfPublication">
                                    Date of Publication{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="DateOfPublication"
                                    name="DateOfPublication"
                                    value={DateOfPublication}
                                    className="form-control"
                                    placeholder="Enter Book Place of Publication"
                                    onChange={e =>
                                        this.handleChange(
                                            'DateOfPublication',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button
                        type="button"
                        data-dismiss="modal"
                        onClick={this.closeModal}
                        className="btn btn-default btn-round"
                    >
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary btn-round">
                        {formLoading ? (
                            <HalfCircleSpinner size={20} color="black" />
                        ) : (
                            'Save'
                        )}
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        selected: state.books.selected,
        formAction: state.books.formAction,
        formLoading: state.books.formLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBook: data => dispatch(addBook(data)),
        setBook: data => dispatch(setBook(data)),
        updateBook: data => dispatch(updateBook(data)),
        setSelectedBook: data => dispatch(setSelectedBook(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookModal);