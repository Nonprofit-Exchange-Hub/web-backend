import * as React from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  TextField,
} from '@mui/material';

import type { Theme } from '@mui/material/styles';

import { placeholderImg } from '../assets/temp';
import EmailInput from '../components/Users/Auth/EmailInput';
import FacebookAuthBtn from '../components/Users/Auth/FacebookAuthBtn';
import GoogleAuthBtn from '../components/Users/Auth/GoogleAuthBtn';
import PasswordInput from '../components/Users/Auth/PasswordInput';
import StyledLink from '../components/StyledLink';
import TextDivider from '../components/TextDivider';
import routes from '../routes/routes';
import { APP_API_BASE_URL } from '../configs';

const useStyles = makeStyles((theme: Theme) => ({
  sideImg: {
    backgroundImage: `url("${placeholderImg}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  signUpContainer: {
    margin: theme.spacing(5),
  },
  button: {
    borderRadius: 0,
    height: 62,
    textTransform: 'none',
    backgroundColor: '#C4C4C4',
    color: 'white',
  },
  header: {
    fontWeight: 'bold',
    paddingBottom: '40px',
  },
  input: {
    height: 44,
    border: '1px solid #C4C4C4',
    borderRadius: 10,
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  chip: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    height: 44,
  },
}));

interface UserSignupData {
  firstName: string;
  last_name: string;
  email: string;
  password: string;
  accept_terms?: boolean;
  email_notification_opt_out?: boolean;
}

const initialFormData: UserSignupData = {
  firstName: '',
  last_name: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
};

const interests = [
  'Animal Care & Services',
  'Poverty',
  'Housing & Homeless',
  'Youth & Children',
  'Disaster Relief',
  'Health Care & Welness',
  'Environment & Sustainability',
  'Sports & Recreation',
  'Seniors',
  'Religion, Faith & Spirituality',
  'Civic Engagement',
  'LGTBQIA+',
  'Civil Rights & Advocacy',
  'Military & Veterans',
  'Social Justice',
  'Education & Literacy',
  'Arts & Culture',
];

function SignupCitizen() {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>('');
  const [formData, setFormData] = React.useState(initialFormData);

  const steps = [
    { label: 'Basic Information' },
    { label: 'Personal Information' },
    { label: 'Interests' },
    { label: 'Profile' },
  ];

  const makeChips = () => {
    return interests.map((interest) => {
      return (
        <Chip
          className={classes.chip}
          label={interest}
          variant="outlined"
          onClick={() => console.log(interest)}
        />
      );
    });
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked }: { name: string; value: string; checked: boolean } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: name === 'accept_terms' ? checked : value,
      [name]: name === 'email_notification_opt_out' ? checked : value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    // Backend doesn't need accept_terms. If a user is signed up they have agreed to the terms
    delete formData.accept_terms;
    const res = await fetch(`${APP_API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.status === 409) {
      setEmailError(data.message);
    } else {
      history.push('/');
    }
  };

  // handleNext and handleBack are also in SignUpUserAndNonProfit, refactor later
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="SignupCitizen">
      <Grid container>
        <Grid item xs={12} sx={{ height: '60px' }} />
        <Grid className={classes.sideImg} item xs={3} />
        <Grid item xs={1} />
        <Grid container className={classes.signUpContainer} item direction="column" xs={7}>
          <Grid container spacing={0} justifyContent="center" sx={{ marginY: '20px' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>

          <form onSubmit={handleSubmit}>
            {/* PAGE ONE ###########################################################*/}
            {activeStep === 0 && (
              <>
                <Typography
                  className={classes.header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                  gutterBottom
                >
                  Let's get started
                </Typography>
                <Grid container item>
                  <GoogleAuthBtn>Sign Up with Google</GoogleAuthBtn>
                  <FacebookAuthBtn>Sign Up With Facebook</FacebookAuthBtn>
                </Grid>
                <TextDivider>or</TextDivider>
                <Grid container item xs={12}>
                  <Grid item xs={5}>
                    <FormControl>
                      <label className={classes.label} htmlFor="firstName">
                        First Name
                      </label>
                      <Input
                        className={classes.input}
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        placeholder="Jane"
                        fullWidth
                        value={formData.firstName}
                        onChange={handleChange}
                        disableUnderline
                        required
                      />
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={2} /> */}
                  <Grid item xs={7}>
                    <FormControl fullWidth>
                      <label className={classes.label} htmlFor="last_name">
                        Last Name
                      </label>
                      <Input
                        className={classes.input}
                        type="text"
                        id="last_name"
                        name="last_name"
                        autoComplete="family-name"
                        placeholder="Individual"
                        fullWidth
                        value={formData.last_name}
                        onChange={handleChange}
                        disableUnderline
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container />
                <EmailInput
                  value={formData.email}
                  placeholder="jane@citizen.com"
                  onChange={handleChange}
                  showStartAdornment={true}
                  error={emailError}
                />
                <PasswordInput
                  value={formData.password}
                  onChange={handleChange}
                  showStartAdornment={true}
                />
                <FormControlLabel
                  style={{
                    textAlign: 'left',
                    display: 'block',
                  }}
                  control={
                    <Checkbox
                      color="primary"
                      checked={formData.accept_terms}
                      onChange={handleChange}
                      name="accept_terms"
                      inputProps={{ 'aria-label': 'accept_terms_checkbox' }}
                    />
                  }
                  label={
                    <label>
                      Accept the{' '}
                      <StyledLink to={routes.TermsOfService.path} target="_blank">
                        Terms of Service
                      </StyledLink>
                    </label>
                  }
                />
                <FormControlLabel
                  style={{ textAlign: 'left', display: 'block' }}
                  control={
                    <Checkbox
                      color="primary"
                      checked={formData.email_notification_opt_out}
                      onChange={handleChange}
                      name="email_notification_opt_out"
                      inputProps={{ 'aria-label': 'email_notification_opt_out_checkbox' }}
                    />
                  }
                  label={'Opt Out Of Email Notifications'}
                />
                <Typography
                  component="p"
                  align="left"
                  gutterBottom
                  sx={{ fontSize: '15px', color: '#404040', margin: '16px 0' }}
                >
                  Already have an account? <StyledLink to={routes.Login.path}>Log In</StyledLink>
                </Typography>
              </>
            )}

            {/* PAGE TWO ######################################################## */}
            {activeStep === 1 && (
              <>
                <Typography
                  className={classes.header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                  gutterBottom
                >
                  Tell us about yourself
                </Typography>
                <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
                  Personal Information
                </Typography>
                <Typography>You can always update this information later as needed.</Typography>
                <Grid xs={12} sx={{ height: '50px' }} />
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12}>
                    <label className={classes.label}>Where are you located?</label>
                  </Grid>
                  <Grid item xs={6}>
                    {/* Pull locations from an api probably */}
                    <Select className={classes.input} placeholder="city" fullWidth>
                      <MenuItem value={'Seattle'}>Seattle</MenuItem>
                      <MenuItem value={'Nashville'}>Nashville</MenuItem>
                      <MenuItem value={'New York'}>New York</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select className={classes.input} placeholder="state" fullWidth>
                      <MenuItem value={'Washington'}>Washington</MenuItem>
                      <MenuItem value={'Tennessee'}>Tennessee</MenuItem>
                      <MenuItem value={'New York'}>New York</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <Select className={classes.input} placeholder="zip" fullWidth>
                      <MenuItem value={'12345'}>12345</MenuItem>
                      <MenuItem value={'23456'}>23456</MenuItem>
                      <MenuItem value={'34567'}>34567</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </>
            )}

            {/* PAGE THREE ######################################################## */}
            {activeStep === 2 && (
              <>
                <Typography
                  className={classes.header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                  gutterBottom
                >
                  Tell us about your interests
                </Typography>
                <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
                  Your Interests
                </Typography>
                <Typography>Please select one or more interest.</Typography>
                <Grid xs={12} sx={{ height: '50px' }} />
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12}>
                    <label className={classes.label}>
                      What type on nonprofits are you interested in?
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    {makeChips()}
                  </Grid>
                </Grid>
              </>
            )}
            {/* PAGE FOUR ######################################################## */}
            {activeStep === 3 && (
              <>
                <Typography
                  className={classes.header}
                  variant="h4"
                  fontSize="58px"
                  component="h1"
                  align="left"
                  gutterBottom
                >
                  Upload your profile icon
                </Typography>
                <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
                  Your Profile
                </Typography>
                <Typography>
                  You can update this information later in the settings of your account.
                </Typography>
                <Grid item xs={12} sx={{ height: '50px' }} />
                <Grid container item xs={12} alignItems="center">
                  <Grid item xs={3}>
                    <Avatar sx={{ bgcolor: 'gray', width: 110, height: 110 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <input accept="image/*" hidden id="upload-file" type="file" />
                    <label htmlFor="upload-file">
                      <Button className={classes.button} component="span">
                        Upload
                      </Button>
                    </label>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ height: '50px' }} />
                <Typography className={classes.label} sx={{ fontWeight: 'bold' }}>
                  About Yourself
                </Typography>
                <Grid item xs={10}>
                  <TextField multiline rows={4} fullWidth placeholder="Tell us about yourself..." />
                </Grid>
              </>
            )}

            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ mt: 2, mb: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 auto 1' }} />
                  {activeStep === 0 && (
                    <Button color="primary" variant="contained" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                  {activeStep === 1 && (
                    <Button color="primary" variant="contained" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                  {activeStep === 2 && (
                    <Button color="primary" variant="contained" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                  {activeStep === 3 && (
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={!formData.accept_terms}
                    >
                      Sign Up
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
            {/* Placeholder for loading  - waiting on UI/UX response as to what they want. */}
            {isLoading && <Typography>Loading</Typography>}
          </form>
        </Grid>
        <Grid item xs={12} sx={{ height: '65px' }} />
      </Grid>
    </div>
  );
}

export default SignupCitizen;
