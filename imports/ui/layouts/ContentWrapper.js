import React from 'react';

export class ContentWrapper extends React.Component {

    render() {

        var childElement = this.props.children;

        // unwrapped pages
        if (this.props.unwrap) {
            childElement = <div className="unwrap">{this.props.children}</div>;
        }

        return (
            <div className="content-wrapper">
                {childElement}
            </div>
        );
    }

}


