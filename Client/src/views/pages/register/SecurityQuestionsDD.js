import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SECURITY_QUESTIONS from '../../../graphql/securityQus.graphql';
import { useQuery } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    width: 490,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

export default function SecurityQuestions() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  const { loading, error, data }  = useQuery(SECURITY_QUESTIONS);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      
    </div>
  );
}
