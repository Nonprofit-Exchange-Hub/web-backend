import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';

import SmallDisplayCard from './SmallDisplayCard';
import { GridImages } from './DisplayGrids';

import type { Theme } from '@material-ui/core/styles';

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis placerat et, at vel tristique. Ac, gravida in quam gravida. Vel pretium nunc cursus donec enim. Sapien facilisis mauris justo, augue pharetra. Dignissim euismod fermentum sit gravida ut.";

const bios: { name: string, image: string}[] = [
    { name: 'Bob', image: '../blank-bio-pic.png' },
    { name: 'Kathy', image: '../blank-bio-pic.png' },
    { name: 'Fred', image: '../blank-bio-pic.png' },
    { name: 'Alice', image: '../blank-bio-pic.png' },
    { name: 'Zachary', image: '../blank-bio-pic.png' },
    { name: 'Emily', image: '../blank-bio-pic.png' },
    { name: 'Albert', image: '../blank-bio-pic.png' },
    { name: 'Zoe', image: '../blank-bio-pic.png' },
];
const orgs: { name: string, image: string}[] = [
    { name: 'Google', image: '' },
    { name: 'Twitter', image: '' },
    { name: 'Facebook', image: '' },
    { name: 'Chrome', image: '' },
    { name: 'Amazon', image: '' },
    { name: 'UnOrg', image: '' },
    { name: 'Nonprofit', image: '' },
    { name: 'GiveCycle', image: '' },
];
const missionStatements = [
    { row: 1, title: 'Mission Statement', text: loremIpsum.slice(0,97) },
    { row: 2, title: 'Vision Statement', text: loremIpsum.slice(0,97) },
    { row: 3, title: 'Values', text: loremIpsum.slice(0,97) },
];
const wideImage = '../small-images/island-orange.jpg';
const smallImages = [
    '../small-images/green-forest.jpg',
    '../small-images/lake-forest.jpg',
    '../small-images/green-forest.jpg',
    '../small-images/lake-forest.jpg',
    '../small-images/green-forest.jpg',
    '../small-images/lake-forest.jpg',
    '../small-images/green-forest.jpg',
    '../small-images/lake-forest.jpg',
    '../small-images/green-forest.jpg',
];

const useStyles = makeStyles((theme: Theme) => ({
    titleBox: {
        height: 600,
        margin: 'auto',
    },
    whyContainer: {
        backgroundColor: '#EBEBEB',
    },
    centerHorizontally:  {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    whyImagePlaceholder: {
        width: '100%',
        maxWidth: '474px',
        height: '300px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
    },
    biosImagePlaceholder: {
        width: '168px',
        height: '168px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
        '& img': {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        },
    },
    biosContainer: {
        '& $MuiTypography-body1': {
            marginBottom: '20px',
        },
    },
    biosImagesContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    biosItem: {
        padding: '15px',
    },
    trustContainer: {
        backgroundColor: '#EBEBEB',
    },
    trustContent: {
        position: 'relative',
        zIndex: 10,
    },
    trustImage: {
        width: '90%',
        height: '389px',
        border: '1px solid black',
        backgroundColor: '#C4C4C4',
        margin: '40px auto 20px auto',
    },
    buttonRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingTop: '30px',
        paddingBottom: '10px',
        '& > div': {
            margin: '10px',
        }
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
    orgContent: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '20px',
    },
    orgImage: {
        width: '60px',
        height: '60px',
        border: '1px solid black',
        backgroundColor: '#000000',
        borderRadius: '50%',
        margin: '30px 80px 30px 80px',
    },
    titleText: {
        fontSize: '1.3rem',
        marginTop: '6px',
    },
}));

function AboutUs() {
    
    const classes = useStyles();

    return (
        <>
            {/* // Add this back in when we have a header image
            <Box className={`${classes.titleBox} ${classes.mainPageSection}`}>
            </Box> */}
            <Box className={`${classes.whyContainer}`}>
                <Container>
                    <Typography variant="h3" component="h3" align="left">
                        Why was NEH created?
                    </Typography>
                    <Grid container spacing={5} alignItems='center'>
                        <Grid item xs={12} sm={6} md={8}>
                            <Typography variant="body1" component="div">
                                {loremIpsum}
                                {loremIpsum}
                            </Typography>
                        </Grid>
                        <Grid item xs sm>
                            <Box className={classes.whyImagePlaceholder}></Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container>
                <Typography variant="h3" component="h3" align="center">
                    Org mission & values
                </Typography>
                <Typography variant="body1" component="div">
                    {loremIpsum}
                </Typography>
                <GridImages
                    missionStatements={missionStatements}
                    wideImage={wideImage}
                    smallImages={smallImages}
                ></GridImages>
            </Container>
            <Container className={`${classes.biosContainer}`}>
                <Typography variant="h3" component="h3" align="center">
                    Who we are (bios)
                </Typography>
                <Typography variant="body1" component="div">
                    {loremIpsum}
                </Typography>
                <Box className={`${classes.biosImagesContainer}`}>
                    {bios.map((person) => {
                        return (
                            <Box className={`${classes.biosItem}`}>
                                <Box className={classes.biosImagePlaceholder}>
                                    <img src={`${person.image}`} alt={`Bio pic for ${person.name}`} />
                                </Box>
                                <Typography className={classes.titleText} variant="body1" component="div">
                                    {person.name}
                                </Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Container>
            <Box className={`${classes.trustContainer}`}>
                <Container>
                    <Box className={`${classes.trustContent}`}>
                        <Typography variant="h3" component="h3" align="center">
                            Trust, Safety, & Privacy
                        </Typography>
                        <Typography variant="body1" component="div">
                            {loremIpsum}
                        </Typography>
                        <Box className={`${classes.trustImage}`}></Box>
                        <Box className={`${classes.buttonRow}`}>
                            <SmallDisplayCard
                                headerText="Trust"
                                bodyText={loremIpsum.slice(0,56)}
                            />
                            <SmallDisplayCard
                                headerText="Safety"
                                bodyText={loremIpsum.slice(0,56)}
                            />
                            <SmallDisplayCard
                                headerText="Privacy"
                                bodyText={loremIpsum.slice(0,56)}
                            />
                        </Box>
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
                    Partnerships w/ organizations
                </Typography>
                <Typography variant="body1" component="div">
                    {loremIpsum}
                </Typography>
                <Box className={`${classes.orgContent}`}>
                    {orgs.map((value) => {
                        return (
                            <Box className={classes.orgImage}></Box>
                        )
                    })}
                    
                </Box>
            </Container>
        </>
    );
}

export default AboutUs;
