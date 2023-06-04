import * as React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles<Theme, GridProps>((theme: Theme) => ({
  missionContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 132px)',
    gridTemplateRows: 'auto',
    columnGap: '20px',
    rowGap: '20px',
    margin: '30px 0 10px 0',
    maxWidth: '1200px',
  },
  '@media screen and (max-width: 1100px)': {
    missionContent: {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
  },
  '@media screen and (max-width: 820px)': {
    missionContent: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      columnGap: '15px',
      rowGap: '15px',
    },
  },
  '@media screen and (max-width: 520px)': {
    missionContent: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
}));

type GridProps = {
  missionStatements: { row: number; title: string; text: string }[];
  wideImage: string;
  smallImages: string[];
};

function GridImages(props: GridProps): JSX.Element {
  const classes = useStyles(props);

  return (
    <Box className={`${classes.missionContent}`}>
      <GridImage src={props.wideImage} isWide={true} />
      {props.smallImages.map((src, idx) => (
        <GridImage key={`${src}${idx}`} src={src} isWide={false} />
      ))}
      {props.missionStatements.map((statementItem) => {
        return (
          <MissionStatement
            key={statementItem.row}
            row={String(statementItem.row)}
            title={statementItem.title}
            text={statementItem.text}
          />
        );
      })}
    </Box>
  );
}

// SUB-COMPONENT GridImage

const imageStyles = makeStyles<Theme, ImageProps>({
  gridImage: {
    width: '100%',
    height: '109px',
    border: '1px solid black',
    backgroundColor: '#C4C4C4',
    backgroundImage: (props) => `url(${props.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  wideImage: {
    gridColumn: '1 / span 3',
    gridRow: '2 / span 1',
  },
  '@media screen and (max-width: 820px)': {
    wideImage: {
      gridRow: 'auto / span 1',
    },
  },
});

type ImageProps = {
  src: string;
  isWide: boolean;
};

function GridImage(props: ImageProps): JSX.Element {
  const classes = imageStyles(props);

  let wideClass = props.isWide === true ? classes.wideImage : '';

  return <Box className={`${classes.gridImage} ${wideClass}`}></Box>;
}

// SUB-COMPONENT MissionStatement

const missionStyles = makeStyles<Theme, MissionProps>({
  missionText: {
    gridColumn: '5 / span 3',
    gridRow: (props) => `${props.row} / span 1`,
    textAlign: 'left',
    fontSize: '1.4rem',
  },
  '@media screen and (max-width: 1100px)': {
    missionText: {
      gridColumn: '4 / span 3',
    },
  },
  '@media screen and (max-width: 820px)': {
    missionText: {
      gridColumn: '1 / span 4',
      gridRow: 'auto / span 1',
    },
  },
  '@media screen and (max-width: 520px)': {
    missionText: {
      gridColumn: '1 / span 3',
    },
  },
  missionTitle: {
    fontWeight: 'bold',
    fontSize: '1.4rem',
  },
});

type MissionProps = {
  row: string;
  title: string;
  text: string;
};

function MissionStatement(props: MissionProps): JSX.Element {
  const classes = missionStyles(props);

  return (
    <Box className={`${classes.missionText}`}>
      <Typography className={`${classes.missionTitle}`} variant="body1" component="div">
        {props.title}
      </Typography>
      {props.text}
    </Box>
  );
}

export default GridImages;
