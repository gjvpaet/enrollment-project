import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { HalfCircleSpinner } from 'react-epic-spinners';
import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';

import 'rc-calendar/assets/index.css';

import {
    setEnrollment,
    addEnrollment,
    setSelectedEnrollment
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
        $('#enrollment-form')
            .validator(this.props.selected ? 'validate' : 'update')
            .on('submit', e => this.submit(e));   
    }

    handleChange(field, value) {
        this.props.setSelectedEnrollment({ field, value });
    }

    closeModal() {
        this.props.setEnrollment({ formAction: 'POST', selected: null });
        $('#enrollment-form').validator('destroy');
    }

    async submit(event) {
        event.preventDefault();

        let {
            formAction,
            selected,
            addEnrollment,
            setEnrollment
        } = this.props;

        let {
            HighSchool = '',
            SchoolClassification = '',
            SchoolLocation = '',
            PreferredStrand = '',
            StudentFirstName = '',
            StudentLastName = '',
            StudentAge = '',
            StudentGender = '',
            StudentMobileNo = '',
            ParentFirstName = '',
            ParentLastName = '',
            ParentMobileNo = ''
        } = selected || {};

        setEnrollment({ formLoading: true });

        let data = {
            HighSchool,
            SchoolClassification,
            SchoolLocation,
            PreferredStrand,
            StudentFirstName,
            StudentLastName,
            StudentAge,
            StudentGender,
            StudentMobileNo,
            ParentFirstName,
            ParentLastName,
            ParentMobileNo
        };

        try {
            let { content, message } = await httpService.insertData(data, 'enrollments');

            content.CreatedDate = moment(content.CreatedAt).format('MMMM Do YYYY, h:mm a');
            content.UpdatedDate = moment(content.UpdatedAt).format('MMMM Do YYYY, h:mm a');

            addEnrollment(content);
            setEnrollment({ formLoading: false });

            alertify.success(message);
            $('#enrollments-modal').modal('hide');
        } catch (error) {
            console.log('error: ', error);
            alertify.error('Oops, something went wrong.');
        }
    }

    printPdf() {
        const domElement = document.getElementById('modal-body');
        
        html2canvas(domElement).then(canvas => {
            const img = canvas.toDataURL('image/png');
            
            const pdf = new jsPdf();
            pdf.addImage(img, 'JPEG', 0, 0);
            pdf.save('enrollment-form.pdf');
        });
    }

    render() {
        let { selected, formAction, formLoading } = this.props;

        let {
            HighSchool = '',
            SchoolClassification = '',
            SchoolLocation = '',
            PreferredStrand = '',
            StudentFirstName = '',
            StudentLastName = '',
            StudentAge = '',
            StudentGender = '',
            StudentMobileNo = '',
            ParentFirstName = '',
            ParentLastName = '',
            ParentMobileNo = ''
        } = selected || {};

        return (
            <Modal
                formId="enrollment-form"
                modalId="enrollments-modal"
                modalTitle="Add New Enrollment"
                closeModal={this.closeModal}
            >
                <div className="modal-body" id="modal-body">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="StudentFirstName">
                                    Student First Name{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="StudentFirstName"
                                    name="StudentFirstName"
                                    value={StudentFirstName}
                                    className="form-control"
                                    placeholder="Enter Student First Name"
                                    onChange={e =>
                                        this.handleChange(
                                            'StudentFirstName',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="StudentLastName">
                                    Student Last Name{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="StudentLastName"
                                    name="StudentLastName"
                                    value={StudentLastName}
                                    className="form-control"
                                    placeholder="Enter Student Last Name"
                                    onChange={e =>
                                        this.handleChange(
                                            'StudentLastName',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="StudentGender">
                                    Student Gender{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <div className="form-check form-check-radio">
                                    <label className="form-check-label">
                                        <input 
                                            required
                                            type="radio"
                                            id="StudentGender1"
                                            name="StudentGender"
                                            value="Male"
                                            checked={StudentGender === 'Male'}
                                            className="form-check-input"
                                            onChange={e =>
                                                this.handleChange(
                                                    'StudentGender',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        Male
                                        <span className="form-check-sign"></span>
                                    </label>
                                </div>
                                <div className="form-check form-check-radio">
                                    <label className="form-check-label">
                                        <input 
                                            required
                                            type="radio"
                                            id="StudentGender2"
                                            name="StudentGender"
                                            value="Female"
                                            checked={StudentGender === 'Female'}
                                            className="form-check-input"
                                            onChange={e =>
                                                this.handleChange(
                                                    'StudentGender',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        Female
                                        <span className="form-check-sign"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="StudentAge">
                                    Age{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="StudentAge"
                                    name="StudentAge"
                                    value={StudentAge}
                                    className="form-control"
                                    placeholder="Enter Student Age"
                                    onChange={e =>
                                        this.handleChange(
                                            'StudentAge',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="StudentMobileNo">
                                    Student Mobile Number{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="StudentMobileNo"
                                    name="StudentMobileNo"
                                    value={StudentMobileNo}
                                    className="form-control"
                                    placeholder="Enter Student Mobile Number"
                                    onChange={e =>
                                        this.handleChange(
                                            'StudentMobileNo',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="ParentFirstName">
                                    Parent First Name{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="ParentFirstName"
                                    name="ParentFirstName"
                                    value={ParentFirstName}
                                    className="form-control"
                                    placeholder="Enter Parent First Name"
                                    onChange={e =>
                                        this.handleChange(
                                            'ParentFirstName',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="ParentLastName">
                                    Parent Last Name{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="ParentLastName"
                                    name="ParentLastName"
                                    value={ParentLastName}
                                    className="form-control"
                                    placeholder="Enter Parent Last Name"
                                    onChange={e =>
                                        this.handleChange(
                                            'ParentLastName',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="ParentMobileNo">
                                    Parent Mobile Number{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="ParentMobileNo"
                                    name="ParentMobileNo"
                                    value={ParentMobileNo}
                                    className="form-control"
                                    placeholder="Enter Parent Mobile Number"
                                    onChange={e =>
                                        this.handleChange(
                                            'ParentMobileNo',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="HighSchool">
                                    High School{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="HighSchool"
                                    name="HighSchool"
                                    value={HighSchool}
                                    className="form-control"
                                    placeholder="Enter High School"
                                    onChange={e =>
                                        this.handleChange(
                                            'HighSchool',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="SchoolLocation">
                                    School Location{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input 
                                    required
                                    type="text"
                                    id="SchoolLocation"
                                    name="SchoolLocation"
                                    value={SchoolLocation}
                                    className="form-control"
                                    placeholder="Enter School Location"
                                    onChange={e =>
                                        this.handleChange(
                                            'SchoolLocation',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="SchoolClassification">
                                    School Classification{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <div className="form-check form-check-radio">
                                    <label className="form-check-label">
                                        <input 
                                            required
                                            type="radio"
                                            id="SchoolClassification1"
                                            name="SchoolClassification"
                                            value="Public"
                                            checked={SchoolClassification === 'Public'}
                                            className="form-check-input"
                                            onChange={e =>
                                                this.handleChange(
                                                    'SchoolClassification',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        Public
                                        <span className="form-check-sign"></span>
                                    </label>
                                </div>
                                <div className="form-check form-check-radio">
                                    <label className="form-check-label">
                                        <input 
                                            required
                                            type="radio"
                                            id="SchoolClassification2"
                                            name="SchoolClassification"
                                            value="Private"
                                            checked={SchoolClassification === 'Private'}
                                            className="form-check-input"
                                            onChange={e =>
                                                this.handleChange(
                                                    'SchoolClassification',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        Private
                                        <span className="form-check-sign"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="form-group has-feedback">
                                <label htmlFor="PreferredStrand">
                                    Preferred Strand{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <div className="form-check form-check-radio">
                                    <label className="form-check-label">
                                        <input 
                                            required
                                            type="radio"
                                            id="PreferredStrand1"
                                            name="PreferredStrand"
                                            value="STEM"
                                            checked={PreferredStrand === 'STEM'}
                                            className="form-check-input"
                                            onChange={e =>
                                                this.handleChange(
                                                    'PreferredStrand',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        STEM
                                        <span className="form-check-sign"></span>
                                    </label>
                                </div>
                                <div className="form-check form-check-radio">
                                    <label className="form-check-label">
                                        <input 
                                            required
                                            type="radio"
                                            id="PreferredStrand2"
                                            name="PreferredStrand"
                                            value="ABM"
                                            checked={SchoolClassification === 'ABM'}
                                            className="form-check-input"
                                            onChange={e =>
                                                this.handleChange(
                                                    'PreferredStrand',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        ABM
                                        <span className="form-check-sign"></span>
                                    </label>
                                </div>
                                <div className="form-check form-check-radio">
                                    <label className="form-check-label">
                                        <input 
                                            required
                                            type="radio"
                                            id="PreferredStrand2"
                                            name="PreferredStrand"
                                            value="GAS"
                                            checked={SchoolClassification === 'GAS'}
                                            className="form-check-input"
                                            onChange={e =>
                                                this.handleChange(
                                                    'PreferredStrand',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        GAS
                                        <span className="form-check-sign"></span>
                                    </label>
                                </div>
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
                    <button
                        type="button"
                        data-dismiss="modal"
                        onClick={this.printPdf}
                        className="btn btn-default btn-round"
                    >
                        Print Enrollment Form
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
        selected: state.enrollments.selected,
        formAction: state.enrollments.formAction,
        formLoading: state.enrollments.formLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addEnrollment: data => dispatch(addEnrollment(data)),
        setEnrollment: data => dispatch(setEnrollment(data)),
        setSelectedEnrollment: data => dispatch(setSelectedEnrollment(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookModal);