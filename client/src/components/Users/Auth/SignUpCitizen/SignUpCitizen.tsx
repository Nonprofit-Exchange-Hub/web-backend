import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useMutation } from 'react-query';

import { UserSignupData } from './types/UserSignupData';
import SvgSignUpContactInfoStep from './assets/SvgSignUpContactInfoStep';
import SvgSignUpLocationStep from './assets/SvgSignUpLocationStep';
import SvgSignUpInterestsStep from './assets/SvgSignUpInterestsStep';
import SvgSignUpProfileStep from './assets/SvgSignUpProfileStep';
import SvgSignUpFinishedStep from './assets/SvgSignUpFinishedStep';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

import Endpoints from './apis/backend';
import { AxiosError } from 'axios';

const imgHeight = '569px';
const imgWidth = '256px';

const initialFormData: UserSignupData = {
  firstName: '',
  lastName: '',
  city: '',
  interests: [],
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTerms: false,
  email_notification_opt_out: false,
  state: '',
  zipCode: '',
  bio: '',
};

function SignupCitizen() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState(initialFormData);
  const [user, setUser] = useState<UserSignupData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const registerUserMutation = useMutation({
    mutationFn: Endpoints.userRegister,
    onSuccess: (user) => {
      // @ts-ignore
      setUser(user);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },
    onError: (error: AxiosError) => {
      console.log('WE HAVE AN ERROR', { error });
      setErrorMsg(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    registerUserMutation.mutate(formData);
  };

  const handleNext = (newFormData: {}) => {
    setFormData((currFormData) => ({
      ...currFormData,
      ...newFormData,
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'left'}
      sx={{
        marginTop: '134px',
        marginBottom: '160px',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#FFC958',
          borderRadius: '0 20px 20px 0',
          maxHeight: '690px',
          maxWidth: '446px',
          padding: '19px 60px 120px 130px',
        }}
      >
        {activeStep === 0 && <SvgSignUpContactInfoStep height={imgHeight} width={imgWidth} />}
        {activeStep === 1 && <SvgSignUpLocationStep height={imgHeight} width={imgWidth} />}
        {activeStep === 2 && <SvgSignUpInterestsStep height={imgHeight} width={imgWidth} />}
        {activeStep === 3 && <SvgSignUpProfileStep height={imgHeight} width={imgWidth} />}
        {activeStep === 4 && <SvgSignUpFinishedStep height={imgHeight} width={imgWidth} />}
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'690px'}
          justifyContent={'center'}
          sx={{ marginLeft: '84px', marginBottom: '78px', marginRight: '130px' }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            {/* Placeholder for loading and error - waiting on UI/UX response as to what they want. */}
            {registerUserMutation.isLoading && <Typography>Creating new account ...</Typography>}
            {registerUserMutation.isError && (
              <Typography>
                Oops! Something went wrong. Please try again!
                <br />
                {errorMsg}
              </Typography>
            )}
            {!registerUserMutation.isLoading && !registerUserMutation.isError && (
              <Box>
                {/* PAGE ONE ###########################################################*/}
                {activeStep === 0 && <StepOne initData={formData} handleNext={handleNext} />}

                {/* PAGE TWO ######################################################## */}
                {activeStep === 1 && (
                  <StepTwo initData={formData} handleBack={handleBack} handleNext={handleNext} />
                )}

                {/* PAGE THREE ######################################################## */}
                {activeStep === 2 && (
                  <StepThree initData={formData} handleBack={handleBack} handleNext={handleNext} />
                )}

                {/* PAGE FOUR ######################################################## */}
                {activeStep === 3 && (
                  <StepFour initData={formData} handleBack={handleBack} handleNext={handleNext} />
                )}

                {/* PAGE FIVE ######################################################## */}
                {/* SHOWN WHEN SIGNUP DONE ######################################################## */}
                {activeStep === 4 && <StepFive user={user} />}
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupCitizen;
