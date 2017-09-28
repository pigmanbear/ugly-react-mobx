import React from 'react';
import { animations } from '../../modules/animations';
import { Grid, Row, Col, Panel, PageHeader } from 'react-bootstrap';
import { App } from '../layouts/app';


export class Animation extends React.Component {
    componentDidMount() {
        animations();
    }
    render() {
        return (
<App>
                <h3>Animations
                    <small>animo is a powerful little tool that makes managing CSS animations extremely easy.</small>
                </h3>
                <Row>
                    <Col md={ 2 }>      
                        <Panel id="panel-anim-bounce" header="bounce">        
                            <a href="#" data-animate="" data-target="#panel-anim-bounce" data-play="bounce">
                                <em className="fa fa-play fa-2x"></em>
                            </a>
                        </Panel>
                    </Col>
                </Row>
                 <h4 className="page-header">Trigger Animations on Scroll</h4>
                <Row>
                    <Col md={ 4 }>
                        { /* START panel */ }
                        <Panel data-animate="" data-play="bounceIn" data-offset="1000" header="bounceIn" id="first1">
                            <code>animate</code>
                            <code>data-play="bounceIn"</code>
                            <code>data-offset="0"</code>
                        </Panel>
                        { /* END panel */ }
                    </Col>
                    <Col md={ 4 }>
                        { /* START panel */ }
                        <Panel data-animate="" data-play="fadeInDown" data-offset="3000" header="fadeInDown" id="second2">
                            <code>animate</code>
                            <code>data-play="fadeInDown"</code>
                            <code>data-offset="0"</code>
                        </Panel>
                        { /* END panel */ }
                    </Col>
                    <Col md={ 4 }>
                        { /* START panel */ }
                        <Panel data-animate="" data-play="fadeInLeftBig" data-offset="5000" data-delay="1000" header="fadeInLeftBig" id="third3">
                            <code>animate</code>
                            <code>data-play="fadeInLeftBig"</code>
                            <code>data-offset="0"</code>
                            <code>data-delay="1000"</code>
                        </Panel>
                        { /* END panel */ }
                    </Col>
                </Row>
</App>
            );
    }

}

