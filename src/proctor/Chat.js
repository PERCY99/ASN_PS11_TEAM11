import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
//import { Button } from 'bootstrap';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: '15px',
        padding:
            theme.spacing(3, 2),
    },

    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicWindow: {
        width: '20%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '80%',
        height: '300px',
        padding: '20px',

    },

    chatBox: {
        width: '90%'
    },

    button: {
        width: '15%'
    }

}))

function Chat(props) {

    const classes = useStyles();

    const [textValue, changeTextValue] = useState('');
    const [allchats, setAllchats] = useState([])

    const sendChatAction = (val) => {

        setAllchats([...allchats, textValue]);
        console.log(allchats);
        console.log(textValue);
        console.log(val);

        axios.post('' , textValue,{
            
        })

    }

    return (
        <div>
            <div>

                <>

                    <Paper className={classes.root}>
                        <Typography variant="h4" component="h4">
                            chat window
                    </Typography>

                        <div className={classes.flex}>

                            <div className={classes.topicWindow}>
                                <List component="nav" aria-label="main mailbox folders">



                                    <ListItem button>

                                        <ListItemText primary="Inbox" />
                                    </ListItem>



                                </List>
                            </div>
                            <div className={classes.chatWindow}>

                                <div className={classes.chatBox}>

                                    {

                                        allchats.map((chat, i) => (
                                            <div className={classes.flex} key={i}>
                                                <Chip label={chat} />
                                            </div>
                                        ))
                                    }
                                </div>


                            </div>



                        </div>

                        <div className={classes.flex} style={{ width: '80%' }}>
                            <TextField
                                label="Text"
                                className={classes.chatBox}
                                value={textValue}
                                onChange={(e) => changeTextValue(e.target.value)}
                            />

                            <Button
                                onClick={() => {
                                    sendChatAction(textValue);
                                    changeTextValue('');
                                }
                                }
                            >
                                send
      </Button>
                        </div>
                    </Paper>

                </>


            </div>
        </div>
    )
}

export default Chat
