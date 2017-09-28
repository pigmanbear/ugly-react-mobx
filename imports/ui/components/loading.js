import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { lightGreenA400, fullWhite, blue100, indigo200, amber400, purple500, lightBlue500, grey50, grey100} from 'material-ui/styles/colors';


const style = {
    padding: 10,
    margin: 5,
};

export const Loading = () => (
<div>
    <CircularProgress style={style} size={80} thickness={8} color={lightGreenA400}/>
</div>

);


