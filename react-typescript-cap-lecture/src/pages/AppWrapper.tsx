import React, {createContext, FC} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from 'react-router-dom';
import {UiUrl} from "./utils/uiUrl";

const drawerWidth = 240;
const favoriteBooksKeyLocalStorage = 'favoriteBooks';
export const LocalStorageContext = createContext('');

export const AppWrapper: FC = ({children}) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Books App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button key={1} onClick={() => {history.push('/search')}}>
                        <ListItemIcon><SearchIcon /></ListItemIcon>
                        <ListItemText primary={UiUrl.SEARCH.label} />
                    </ListItem>
                    <ListItem button key={2} onClick={() => {history.push('/')}}>
                        <ListItemIcon><FavoriteIcon /></ListItemIcon>
                        <ListItemText primary={UiUrl.FAVORITE.label} />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <LocalStorageContext.Provider value={favoriteBooksKeyLocalStorage}>
                    {children}
                </LocalStorageContext.Provider>
            </main>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(12, 4 , 4, 4)
        },
    }),
);


