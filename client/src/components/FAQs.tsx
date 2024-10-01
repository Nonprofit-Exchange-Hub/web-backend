import { makeStyles } from 'tss-react/mui';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import QuestionList from './QuestionList';
import FAQsImage from '../assets/sign-up-finished-step.svg';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.';

const faqQuestions = [
  { question: 'Can someone pick up the item?', answer: loremIpsum.slice(0, 150) },
  { question: 'Can I collect items on the site?', answer: loremIpsum.slice(0, 150) },
  { question: 'Is this platform free?', answer: loremIpsum.slice(0, 150) },
  { question: 'Other questions about this service?', answer: loremIpsum.slice(0, 150) },
];

const useStyles = makeStyles()(() => ({
  faqs: {
    display: 'flex',
    height: 'auto',
    overflow: 'auto',
  },
  faqsVisual: {
    width: '33%',
    maxHeight: '651px',
    background: '#FFC958',
    borderRadius: '0px 20px 20px 0px',
    position: 'relative',
    padding: '58px 64px 117px 130px',
  },
  faqsImage: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
  faqsInfo: {
    width: '67%',
    paddingLeft: '80px',
    paddingRight: '130px',
    paddingTop: '40px',
  },
  faqsHeader: {
    paddingBottom: '30px',
  },
  faqsSubheader: {
    paddingBottom: '20px',
    color: '#6E6E6E',
  },
  faqsQuestions: {
    paddingTop: '20px',
  },
}));

function FAQs() {
  const { classes } = useStyles();

  return (
    <div className={classes.faqs}>
      <div className={classes.faqsVisual}>
        <img src={FAQsImage} alt="FAQs" className={classes.faqsImage} />
      </div>
      <div className={classes.faqsInfo}>
        <Typography variant="h4" component="h4">
          FAQs
        </Typography>
        <Typography className={classes.faqsSubheader}>
          Frequently asked questions by our community
        </Typography>
        <QuestionList questionList={faqQuestions}></QuestionList>
        <Button
          variant="outlined"
          sx={{
            mt: '60px',
            mb: '101px',
            borderRadius: '10px',
            color: '#323232',
            fontWeight: 'bold',
            borderColor: '#323232',
          }}
        >
          View More
        </Button>
      </div>
    </div>
  );
}

export default FAQs;
