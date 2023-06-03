import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';

type HowItWorksCardsProps = {
  instructionList: { title: string; body: string; image: string; buttonText: string }[];
};

function HowItWorksCards(props: HowItWorksCardsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0px',
        justifyContent: 'center',
        alignItems: 'top',
        '@media (max-width: 1111px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 600px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      {props.instructionList.map((instructions, i) => {
        return (
          <Box
            sx={{
              textAlign: 'center',
              mb: '20px',
              backgroundColor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'top' }}>
              <img src={instructions.image} alt="How It Works" width="100%" />
            </Box>
            <Box
              sx={{
                marginX: '15px',
                minHeight: '180px',
                '@media (max-width: 1611px)': {
                  marginX: '10px',
                  minHeight: '230px',
                  mt: '0px',
                  mb: '10px',
                },
                '@media (max-width: 1111px)': {
                  marginX: '10px',
                  minHeight: '200px',
                  mt: '0px',
                  mb: '10px',
                },
                '@media (max-width: 600px)': {
                  marginX: '0px',
                  minHeight: '80px',
                  mt: '0px',
                  mb: '0px',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  '@media (max-width: 1411px)': {
                    minHeight: '90px',
                    mt: '0px',
                    mb: '10px',
                  },
                  '@media (max-width: 600px)': {
                    minHeight: '50px',
                    mt: '0px',
                    mb: '0px',
                  },
                }}
              >
                {instructions.title}
              </Typography>
              <Typography variant="body1">{instructions.body}</Typography>
            </Box>
            {/* reminder - make button template */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'bottom',
                '@media (max-width: 1111px)': {
                  mt: '10px',
                  mb: '20px',
                },
                '@media (max-width: 600px)': {
                  mt: '20px',
                  mb: '10px',
                },
              }}
            >
              <Button
                sx={{
                  padding: '0.4rem 1rem 0.4rem 1rem',
                  border: '1px solid #323232',
                  borderRadius: '8px',
                  color: '#323232',
                  fontWeight: '900',
                  fontSize: '1rem',
                }}
              >
                {instructions.buttonText}
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default HowItWorksCards;
