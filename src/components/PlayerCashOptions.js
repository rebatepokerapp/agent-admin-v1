import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { signIn } from "../redux/AgentDucks";
import {useDispatch, useSelector} from 'react-redux'

import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid white',
    padding: '10px 15px',
    marginBottom: '10px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  inputtextarea: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: '1px',
    border: '1px solid white',
    padding: '2px 2px',
    marginBottom: '10px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#000000',
    backgroundColor: '#FF9A00',
    fontWeight: '700',
  },
  submitopt: {
    margin: theme.spacing(3, 0, 2),
    color: '#000000',
    backgroundColor: '#FF9A00',
    fontWeight: '700',
    marginLeft: 5
  },
}));

function PlayerEditForm (props) {
  const classes = useStyles();

  const {register, errors, handleSubmit} =  useForm();

  const dispatch = useDispatch();

  const error = useSelector(store => store.agent.error);

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(signIn(data));
    e.target.reset();
  }

  const showError = () => (
    <Alert severity="warning" style={{display: error ? '': 'none'}}>
      <AlertTitle>Warning</AlertTitle>
        {error} — <strong>check it out!</strong>
    </Alert>
  )

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Add/Deduct Chips
        </Typography>
         
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <input name="chips" className={classes.input} ref={register} placeholder='Chips'/>
          <TextField 
            className={classes.inputtextarea}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="note"
            name="note"
            autoFocus
            label="Note"
            size='small'
            multiline
            rows='4'
            inputRef={
              register({
                required: {value: true, message:'Require field'}
              })
            }
          />          
          <span className="text-danger text-small d-block mb-2">
            {errors?.password?.message}
          </span>
          <div>
            <Button
              type="submit"            
              variant="contained"
              className={classes.submitopt}
            >
              Add
            </Button>            
          </div>
          
        </form>
        {showError()}
      </div>
    </Container>
  );
}

export default withRouter(PlayerEditForm);