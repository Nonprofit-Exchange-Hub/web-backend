import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import type { Theme } from '@material-ui/core/styles';

// SUB-COMPONENT BulletGrid

const bulletStyles = makeStyles<Theme, BulletProps> ((theme: Theme) => ({
    grid: {
        marginTop: '30px',
    },
    square: {
        width: '100px',
        height: '100px',
        backgroundColor: 'white',
        marginRight: '20px',
    },
}));

type BulletProps = {
    list: string[],
};

function BulletGrid(props: BulletProps) {
    const classes = bulletStyles(props);

    return (
        <Grid container justify='space-between'>

            {props.list.map((listItem) => {
                return (
                    <Grid container item md={6} xs={12} className={classes.grid}>
                        <Grid item>
                            <Box className={classes.square}></Box>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="body1" component="div" align="left">
                                {listItem}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            })}


        </Grid>
    );
};

export default BulletGrid;