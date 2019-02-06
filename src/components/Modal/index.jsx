import React from 'react';

const modal = props => (
    <div
        role="dialog"
        tabIndex="-1"
        id={props.modalId}
        aria-hidden="true"
        className="modal fade"
        aria-labelledby="myLargeModalLabel"
    >
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.modalTitle}</h5>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        data-dismiss="modal"
                        onClick={props.closeModal}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id={props.formId}>{props.children}</form>
            </div>
        </div>
    </div>
);

export default modal;
