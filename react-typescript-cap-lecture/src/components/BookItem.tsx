import React, {MouseEvent} from 'react';
import {Button, Checkbox, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export interface Props {
    id: number,
    title: string,
    authors?: string
    url: string,
    checkedBoxes: number[],
    onClickCheckbox: (arg: number) => void
}

export const BookItem = ({id, title, authors, url, checkedBoxes, onClickCheckbox}: Props) => {
    const classes = useStyles();

    return (
        <ListItem button onClick={() => onClickCheckbox(id)}>
            <ListItemText className={classes.number} primary={`${id + 1}.`}/>
            <ListItemIcon  className={classes.checkbox}>
                <Checkbox
                    edge="start"
                    checked={checkedBoxes.indexOf(id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': '' + `checkbox-list-label-${id}` }}
                />
            </ListItemIcon>
            <ListItemText primary={`${authors ? authors + ' - ' : ''} ${title} `} />
            <Button onClick={(e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()} variant="contained" color="primary"  href={url} target="_blank">
                More
            </Button>
        </ListItem>
    )
};

const useStyles = makeStyles(() => ({
    number: {
      flex: 'none',
        marginRight: '5px'
    },
    checkbox: {
        minWidth: '10px'
    }
}));