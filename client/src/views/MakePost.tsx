import React, { useState } from 'react';
import { Grid, Typography, Card, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const MakePost = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const history = useHistory();

  const handleCardClick = (id: string) => {
    setSelected(id);
  };

  const handleNextClick = () => {
    if (step === 1 && selected) {
      if (selected === 'goods' || selected === 'skills') {
        setStep(2);
        setSelected(null);
      }
    } else if (step === 2 && selected) {
      if (selected === 'need') {
        history.push('/share-a-need');
      } else if (selected === 'offer') {
        history.push('/make-an-offer');
      }
    }
  };

  const handleBackClick = () => {
    if (step === 2) {
      setStep(1);
      setSelected(null);
    }
  };

  const styles = {
    card: (isSelected: boolean) => ({
      display: 'flex',
      flexDirection: 'column' as const,
      height: '550px',
      width: '520px',
      margin: '10px',
      position: 'relative' as const,
      cursor: 'pointer',
      transition: 'opacity 0.3s ease-in-out',
      opacity: isSelected ? 0.8 : 1,
    }),
    image: {
      height: '70%',
      backgroundColor: '#ffc958',
    },
    textContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '30%',
    },
    overlay: (isSelected: boolean) => ({
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      transition: 'background-color 0.3s ease-in-out',
      pointerEvents: 'none' as const,
    }),
    button: (isDisabled: boolean) => ({
      marginTop: '30px',
      marginBottom: '10px !important',
      color: isDisabled ? 'white' : 'black',
      backgroundColor: isDisabled ? 'lightgrey' : 'white',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      alignSelf: 'flex-end',
      cursor: isDisabled ? 'default' : 'pointer',
      '&:hover': {
        backgroundColor: isDisabled ? 'lightgrey' : 'lightgrey',
      },
    }),
    backButton: {
      marginTop: '30px',
      marginBottom: '10px !important',
      color: 'black',
      backgroundColor: 'white',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      alignSelf: 'flex-start',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'lightgrey',
      },
    },
    title: {
      color: 'rgb(85, 26, 139)',
      fontSize: '4.2em',
      transition: 'all 0.3s ease-in-out',
    },
    text: {
      fontSize: '1.9em !important',
      fontWeight: 'bold',
      transition: 'font-size 0.3s ease-in-out, color 0.3s ease-in-out',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: step === 1 ? 'flex-end' : 'space-between',
      width: '50%', // Changed to 50% to ensure correct alignment
      marginTop: '20px',
    },
  };

  const title = step === 1 ? 'What is your post for?' : 'What would you like to do?';
  const cards =
    step === 1
      ? [
          { id: 'goods', text: 'Goods' },
          { id: 'skills', text: 'Skills' },
        ]
      : [
          { id: 'need', text: 'Share a Need' },
          { id: 'offer', text: 'Make an Offer' },
        ];

  return (
    <Grid container direction="column" alignItems="center">
      <Typography variant="h4" sx={styles.title}>
        {title}
      </Typography>
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '20px' }}>
        {cards.map((card) => (
          <Grid item key={card.id} onClick={() => handleCardClick(card.id)}>
            <Card sx={styles.card(selected === card.id)}>
              <div style={styles.image}></div>
              <div style={styles.textContainer}>
                <Typography align="center" sx={styles.text}>
                  {card.text}
                </Typography>
              </div>
              <div style={styles.overlay(selected === card.id)}></div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={styles.buttonContainer}>
        {step === 2 && (
          <Button variant="contained" sx={styles.backButton} onClick={handleBackClick}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          sx={styles.button(!selected)}
          disabled={!selected}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default MakePost;
