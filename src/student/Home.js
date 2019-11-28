import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import axios from "axios";
//import  {ListOfQuestions} from "../handlers/listOfQuestion"
import {
    Link as LinkReact
  } from "react-router-dom";
import {QuestionsContext} from '../context/Questions';
import { Fab } from '@material-ui/core';
import validateToken from '../service/Validator';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  item: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(2),
    margin: 10
  }
}));
export default function Challenge() {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [name, setName] = React.useState();
  const [array,setArray] = React.useState([]);
  const labelRef = React.useRef(null);
  const  { setArr,num, setNum }  = useContext(QuestionsContext);
  const [number,setNumber] = React.useState();
  //const [num,setNum] = React.useState();

const listofQuestions = (num,array) => {
  if(validateToken()){
    if (validateToken()) {
      axios.post("http://18.217.82.179:8080/question/challenge/"+num, {tags:array}, {
        headers: {
          "Authorization" : "Bearer "+localStorage.getItem("token")
        }
      }).then(r=>{
    let list = []
    if(r.lenght !== 0){
      for(let elements of r.data){      
        list.push(elements)
      }
    }
    setArr(list)
    setArray(list)
    console.log(r);
  })
  }

} }

 

  React.useEffect(() => {
    setLabelWidth(labelRef.current.offsetWidth);

  },[]);

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  const handleButton = () => {
    setArray(array.concat(name));
  }

  const handleNext = () => {
    listofQuestions(num,array);
  };

  const handleNumber = ({target}) => {
    setNumber(target.value);
  }

  const handleClick = () =>{
    setNum(number);
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Challenge
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Quickly build a challenge in the topic you want to practice! Write down the topic below and we'll generate a challenge with the questions that best fit for you.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
        <Grid item xs>
            <FormControl className={classes.formControl} variant="outlined">
                <InputLabel ref={labelRef} htmlFor="component-outlined">
                    Tags
                </InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    value={name || ''}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                />
            </FormControl>
        </Grid>
        <Grid item xs>
            <Button href="#" color="primary" variant="outlined" onClick={handleButton}>
            Add
          </Button>
          </Grid>
          <Grid item xs>
            <FormControl className={classes.formControl} variant="outlined">
                <InputLabel ref={labelRef} htmlFor="component-outlined">
                    Number of Questions
                </InputLabel>
                <OutlinedInput
                    id="component-outlined2"
                    value={number || ''}
                    onChange={handleNumber}
                    labelWidth={labelWidth}
                />
            </FormControl>
        </Grid>
        <Grid item xs>
            <Button href="#" color="primary" variant="outlined" onClick={handleClick}>
            Add
          </Button>
          </Grid>
        </Grid>
        
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={5} justify="center" alignItems="center" direction="row">
      <Grid item xs={12}>
        {
          array.map( (tag,index) => (
            <Button variant="contained" className={classes.item} key={index} 
              name = {index}
              onClick={ () => {
                let copy = [...array]
                copy.splice(index,1);
                setArray(copy);
              }}
            >{tag}</Button> //click -> delete tag
          ))
        }
      </Grid>
      </Grid>
      <center>
      <Grid item xs={12}>
      <Fab variant="extended">
        {num}
        </Fab>
      </Grid>
      </center>
      </Container>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <LinkReact to="student/challenge">
      <center>
      <Button variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}>
          Go
      </Button>
      </center>
      </LinkReact>
      </Container>
    </React.Fragment>
  );
}