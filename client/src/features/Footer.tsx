import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import StyledLink from '../assets/sharedComponents/StyledLink';
import routes from '../routes';

const useStyles = makeStyles((theme: Theme) => {
  return {
    main: {
      backgroundColor: '#C4C4C4',
      padding: theme.spacing(5),
    },
    linkBlock: {
      '& > *': {
        marginBottom: theme.spacing(1),
      },
    },
    header: {
      fontWeight: 'bold',
    },
    bottom: {
      marginTop: theme.spacing(4),
    },
  };
});

function Footer() {
  const classes = useStyles();

  return (
    <footer className="Footer">
      <Grid className={classes.main} container>
        <Grid container>
          <Grid item xs={6} sm={8}></Grid>
          <Grid
            className={classes.linkBlock}
            container
            item
            xs={3}
            sm={2}
            direction="column"
            alignItems="flex-start"
            paddingLeft={{ xs: 1, sm: 3 }}
          >
            <Typography className={classes.header} align="left" gutterBottom>
              Get to know us
            </Typography>
            {/* <StyledLink to={routes.AboutUs.path}>About Us</StyledLink> */}
            <StyledLink to={routes.OurStory.path}>Our Story</StyledLink>
            <StyledLink to={routes.HowItWorks.path}>How It works</StyledLink>
            <StyledLink to={routes.ContactUs.path}>Contact Us</StyledLink>
          </Grid>
          <Grid
            className={classes.linkBlock}
            container
            item
            xs={3}
            sm={2}
            direction="column"
            alignItems="flex-start"
            paddingLeft={{ xs: 1, sm: 3 }}
          >
            <Typography className={classes.header} align="left" gutterBottom>
              Resources
            </Typography>
            <StyledLink to={routes.TrustAndSafety.path}>Library</StyledLink>
            <StyledLink to={routes.TrustAndSafety.path}>Trust and Safety</StyledLink>
            <StyledLink to={routes.Help.path}>Help & FAQ</StyledLink>
          </Grid>
        </Grid>
        <Grid
          className={classes.bottom}
          container
          item
          sm={8}
          xs={10}
          justifyContent="space-around"
          paddingTop={{ xs: 1, sm: 3 }}
        >
          {/* TODO Not sure if NEH 2021 is supposed to just be text, or a link.
                    Leaving as text for now, as the name seems like it is changing anyway.*/}
          <span>NEH 2021</span>
          <StyledLink to={routes.TermsOfService.path}>Terms of Service</StyledLink>
          <StyledLink to={routes.PrivacyPolicy.path}>Privacy Policy</StyledLink>
          <StyledLink to={routes.CookiePolicy.path}>Cookie Policy</StyledLink>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
