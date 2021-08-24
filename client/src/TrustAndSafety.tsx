import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core/';

import SmallDisplayCard from './SmallDisplayCard';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";

const useStyles = makeStyles((theme: Theme) => ({
    titleBox: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guidelinesContainer: {
        backgroundColor: '#EBEBEB',
        overflow: 'hidden',
        '& .MuiGrid-container': {
            marginTop: '10px',
        },
    },
    guidelinesContent: {
        position: 'relative',
        zIndex: 10,
    },
    guidelinesBGWrapper: {
        position: 'relative',
        width: '100%',
        height: '0',
        zIndex: 2,
        '& svg': {
            position: 'absolute',
            top: '-300px',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '300px',
            fill: '#F8F8F8',
        },
    },
    imagePlaceholder: {
        width: '168px',
        height: '168px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
    trustTitle: {
        fontWeight: 'bold',
        fontSize: '1.4rem',
        marginBottom: '7px',
        marginTop: '50px',
    },
    trustText: {
        fontSize: '1.4rem',
        textAlign: 'left',
        paddingBottom: '50px',
    },
}));

function TrustAndSafety() {
    const classes = useStyles();

    return (
        <>
            <Box className={`${classes.titleBox}`}>
                <Container>
                    <Typography variant="h3" component="h3" align="center">
                        Trust, Safety, & Privacy
                    </Typography>
                    <Typography variant="body1" component="div">
                        {loremIpsum}
                    </Typography>
                </Container>
            </Box>
            <Box className={`${classes.guidelinesContainer}`}>
                <Container>
                    <Box className={`${classes.guidelinesContent}`}>
                        <Typography variant="h3" component="h3" align="center">
                            Our Community Guidelines
                        </Typography>
                        <Typography variant="body1" component="div">
                            {loremIpsum}
                        </Typography>
                        <Grid container direction="row" alignContent="space-between" spacing={2}>
                            <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                                <SmallDisplayCard
                                    headerText="Trust"
                                    bodyText={loremIpsum.slice(0,56)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                                <SmallDisplayCard
                                    headerText="Safety"
                                    bodyText={loremIpsum.slice(0,56)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                                <SmallDisplayCard
                                    headerText="Privacy"
                                    bodyText={loremIpsum.slice(0,56)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Box className={classes.guidelinesBGWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="0,100 100,0 100,100"/>
                    </svg>
                </Box>
            </Box>
            <Container>
                <Typography variant="h3" component="h3" align="center">
                    Why was NEH created?
                </Typography>
                <Typography variant="body1" component="div">
                    {loremIpsum}
                    {loremIpsum}
                </Typography>
            </Container>
            <Container>
                <Typography variant="h3" component="h3" align="center">
                    Trust
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            No Scams
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            {loremIpsum.slice(0,50)}.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            Always be honest
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            {loremIpsum.slice(0,50)}.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} container direction="column" alignItems="center">
                        <Box className={classes.imagePlaceholder}></Box>
                        <Typography className={classes.trustTitle} variant="body1" component="div">
                            No misrepresentation
                        </Typography>
                        <Typography className={classes.trustText} variant="body1" component="div">
                            {loremIpsum.slice(0,50)}.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default TrustAndSafety;
