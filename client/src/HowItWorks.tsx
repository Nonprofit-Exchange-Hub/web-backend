import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';
import QuestionList from './QuestionList';
import { BulletGrid, InstructionGrid } from './DisplayGrids';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";

const nonprofitInstructionList = [
    {
        title: "1. Post your Need.",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/nonprofit/600',
    },
    {
        title: "2. Connect with donors.",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/nonprofit/600',
    },
    {
        title: "3. Accomplish Goal.",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/nonprofit/600',
    },
];
const citizenInstructionList = [
    {
        title: "1. Post your donation",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/picsum/600',
    },
    {
        title: "2. Connect with nonprofits",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/picsum/600',
    },
    {
        title: "3. Make a difference",
        body: loremIpsum,
        image: 'https://picsum.photos/seed/picsum/600',
    },
];

const nonprofitBulletList = {
    title: "Whatever your nonprofit goal, we're here to help.",
    list: [
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
    ],
};
const citizenBulletList = {
    title: "We're helping you make a difference in your community.",
    list: [
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
        loremIpsum.slice(0,97),
    ],
};

const nonprofitQuestions = [
    {question: 'Can we post for volunteer help?', answer: loremIpsum.slice(0,150)},
    {question: 'Can we keep working with a person we exchanged with?', answer: loremIpsum.slice(0,150)},
    {question: 'How do we see what has been donated previously?', answer: loremIpsum.slice(0,150)},
];
const citizenQuestions = [
    {question: 'Can I offer to volunteer?', answer: loremIpsum.slice(0,150)},
    {question: 'Can I keep working with a nonprofit I exchanged with?', answer: loremIpsum.slice(0,150)},
];

const useStyles = makeStyles((theme: Theme) => ({
    questionSection: {
        width: '100%',
        padding: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    greySection: {
        backgroundColor: '#C4C4C4',
    },
    columns: {
        display: 'flex',
    },
    titleBox: {
        height: 200,
        backgroundColor: '#C4C4C4',
    },
    tabs: {
        margin: 'auto',
        padding: '0',
        borderBottom: '1px solid #C4C4C4',
        '& .MuiContainer-root': {
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
    tabMenuLink: {
        padding: '20px',
        paddingBottom: '0!important',
    },
    button: {
        fontSize: '2rem',
        margin: '20px 0 0 0',
        borderBottom: '11px solid #FFFFFF',
    },
    hidden: {
        display: 'none',
    },
    selected: {
        borderBottom: `11px solid ${theme.palette.primary.main}`,
    },
    questions: {
        alignSelf: 'flex-end',
        width: '100%',
        maxWidth: '700px',
    },
}));

function HowItWorks() {
    const classes = useStyles();

    type Tab = 'nonprofit' | 'citizen';

    const [ tabSelected, setTabSelected ] = React.useState<Tab>("nonprofit");

    const handleClickTab = (tabName: Tab) => {
        setTabSelected(tabName);
    };

    return (
        <>
            <Box className={`${classes.titleBox}`}>
            </Box>

            <Box className={`${classes.tabs}`}>
                <Container>
                    <Grid container justify='space-between'>
                        <Grid container item sm={6} xs={12}
                            onClick={() => handleClickTab("nonprofit")}
                            className={classes.tabMenuLink}
                        >
                            <h3 className={`${classes.button} ${tabSelected === "nonprofit" ? classes.selected : ''}`}
                            >I'm on a nonprofit team</h3>
                        </Grid>
                        <Grid container item sm={6} xs={12}
                            onClick={() => handleClickTab("citizen")}
                            className={classes.tabMenuLink}
                        >
                            <h3 className={`${classes.button} ${tabSelected === "citizen" ? classes.selected : ''}`}
                            >I'm a citizen</h3>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container>
                <InstructionGrid instructionList={ tabSelected === "nonprofit" ? nonprofitInstructionList : citizenInstructionList }></InstructionGrid>
            </Container>

            <Box className={`${classes.greySection}`}>
                <Container>
                    <Typography variant="h3" component="h3" align="center">
                        { tabSelected === "nonprofit" ? nonprofitBulletList.title : citizenBulletList.title }
                    </Typography>
                    <BulletGrid list={tabSelected === "nonprofit"? nonprofitBulletList.list : citizenBulletList.list}></BulletGrid>
                </Container>
            </Box>

            <Container>
                <Box className={`${classes.questionSection}`}>
                    <Typography variant="h3" component="h3" align="left">
                        Still have questions?
                    </Typography>
                    <Box className={classes.questions}>
                        <QuestionList questionList={tabSelected === "nonprofit" ? nonprofitQuestions : citizenQuestions}></QuestionList>
                    </Box>
                </Box>
            </Container>

        </>
    );
}



export default HowItWorks;
