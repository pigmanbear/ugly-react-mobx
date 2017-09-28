import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppNavigation from '../containers/app-navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {
    fullWhite
} from 'material-ui/styles/colors';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import {
    lightGreenA400,
    lightGreenA700,
    lightGreen500
} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {
    Row,
    Col
} from 'react-bootstrap';






export class Base extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        open: false
            };
            this.handleToggle = this.handleToggle.bind(this);
        }
        static childContextTypes = {
          rebass: React.PropTypes.object
        };

        getChildContext() {
          return {
            rebass: {
              fontSizes: [36, 24, 20, 18, 16, 14, 12],
            }
          };
        }

        componentWillMount() {
            $('body').addClass('layout-h');
        }
        handleToggle() {
            this.setState({open: !this.state.open});
        }
        render() {
                // Animations supported
                //      'rag-fadeIn'
                //      'rag-fadeInUp'
                //      'rag-fadeInDown'
                //      'rag-fadeInRight'
                //      'rag-fadeInLeft'
                //      'rag-fadeInUpBig'
                //      'rag-fadeInDownBig'
                //      'rag-fadeInRightBig'
                //      'rag-fadeInLeftBig'
                //      'rag-zoomBackDown'

                const animationName = 'rag-fadeIn';
                const style = {
                    margin: 12,
                };
                const styles = {
                    appbar: {
                        background: lightGreen500,
                        textAlign: 'left'
                    }
                };
                const iconStyles = {
                    marginRight: 24,
                };

                return (
                        <MuiThemeProvider>
                            <div className="wrapper">          
                                <AppNavigation />
                                <ReactCSSTransitionGroup
                                    component="section"
                                    transitionName={animationName}
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={500}
                                >                                                      
                                    {React.cloneElement(this.props.children, {
                                        key: Math.random()
                                    })}
                                </ReactCSSTransitionGroup>
                                <Drawer open={this.state.open}>
                                    <AppBar style = { styles.appbar}/>
                                </Drawer>    
                            </div>
                        </MuiThemeProvider>
             );
        }
};
