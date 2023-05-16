import * as React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    main: {
      height: '100vh',
    },
  };
});
function TermsOfService() {
  const classes = useStyles();
  return <div className={classes.main}>TermsOfService</div>;
}

export default TermsOfService;
