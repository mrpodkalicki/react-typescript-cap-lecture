import React, {FC} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";

let countOfCall = 0;

export const spinnerShow = (callBack: (arg: number) => void) => {
    countOfCall++
    callBack(countOfCall)
}

export const spinnerHide = (callBack: (arg: number) => void) => {
    setTimeout(() => {
        countOfCall--
        callBack(countOfCall)
    }, 500)
}

export const AppSpinner: FC = () => {
    return (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress disableShrink />
        </Box>
    )
};

