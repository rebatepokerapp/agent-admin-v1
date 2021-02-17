import React from 'react';
import {deleteAgentMessage} from '../redux/AgentDucks';
import {useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';;


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'green'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  classbutton: {
    color: 'red'
  }
}));

const PlayerProfileInfoDlg = ({id}) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteMessage = () => {
    let data = {
      messageId: id,
    };
    dispatch(deleteAgentMessage(data));
  }

  return (
    <>
      <Tooltip title="Delete Message" aria-label="profileinfo">
        <IconButton className={classes.classbutton} aria-label="profileinfo" onClick={() => deleteMessage()}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>      
    </>
  )
}

export default PlayerProfileInfoDlg
