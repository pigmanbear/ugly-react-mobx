import React from 'react';
import AppBar from 'material-ui/AppBar';
import {
    lightGreenA400,
    lightGreenA700,
    lightGreen500
} from 'material-ui/styles/colors';
import { AppNavigation } from '../app-navigation';
import state from '../../../stores/mobxstores';
import {observer} from  'mobx-react';
import Drawer from 'material-ui/Drawer';





const styles = {
    appbar: {
        background: lightGreen500,
        textAlign: 'left'
    },
    drawer: {
        background: lightGreen500
    }

};


const AppDrawer = observer(['state'],({state}) => {


return(
    <Drawer open={state.drawerState}>
        <AppNavigation /> 
    </Drawer>
)
});
export default AppDrawer;