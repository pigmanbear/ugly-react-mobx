import React from 'react';
import AppNavigation from '../containers/app-navigation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Grid} from 'reflexbox';
import AppBar from 'material-ui/AppBar';
import {
    lightGreenA400,
    lightGreenA700,
    lightGreen500
} from 'material-ui/styles/colors';
import state from '../../stores/mobxstores';
import {observer} from  'mobx-react';
import {inject} from 'mobx';
import Drawer from 'material-ui/Drawer';

@observer(['state'])
export class App extends React.Component {

render() {
    const styles = {
      appbar: {
        background: lightGreen500,
        textAlign: 'left'
      },
      drawer: {
        background: lightGreen500
      }

    };
        let childElement = <div className="unwrap">{this.props.children}</div>;
        // unwrapped pages
        if (this.props.unwrap) {
            childElement = <div className="unwrap">{this.props.children}</div>;
        }

        return (
        <div>
            <Grid col={12}>
                {childElement}
            </Grid>
               <Drawer open={state.drawerState}>
        <AppNavigation /> 
    </Drawer>
        </div>
        );
    }
  };

