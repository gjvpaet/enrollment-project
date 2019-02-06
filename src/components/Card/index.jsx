import React from 'react';

const card = props => (
    <div className="card">
        <div className="card-header">
            <h4 className="card-title">{props.cardTitle}</h4>
        </div>
        <div className="card-body">{props.children}</div>
    </div>
);

export default card;