import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { GlobalStyles } from '@mui/system';

// Function to convert hex color to RGB
const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

const steps = [
  {
    label: 'Basic Information',
    description: 'Include a title, item category, description of item and search tags.',
  },
  {
    label: 'Details',
    description: 'Consists of photos, quality desired and condition of items',
  },
  {
    label: 'Delivery',
    description: 'Selection of the desired delivery method, data, and location',
  },
  {
    label: 'Post information',
    description: 'Includes post type and duration of the post.',
  },
];

export default function ShareaNeed() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [title, setTitle] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('Search a Category');
  const [description, setDescription] = React.useState<string>('');
  const [searchTag, setSearchTag] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>([]); // Specify tags as string array

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAddTag = () => {
    if (searchTag && !tags.includes(searchTag)) {
      setTags((prevTags) => [...prevTags, searchTag]);
      setSearchTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => () => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', width: '100vw', overflowY: 'auto' }}>
      <GlobalStyles
        styles={{
          '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
          body: { backgroundColor: 'white' },
        }}
      />

      <Grid
        container
        spacing={2}
        sx={{
          height: '100%',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '24px',
          overflowY: 'auto',
        }}
      >
        <Grid item xs={12} md={4}>
          <Box sx={{ width: '100%', maxWidth: 400, height: '100%', mx: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CardMedia
                component="div"
                sx={{
                  height: 500,
                  width: 350,
                  backgroundColor: 'rgb(255, 201, 96)',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                  mb: 2,
                }}
              />
              <Box sx={{ mt: 2, width: '100%' }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                      {activeStep === index && (
                        <StepContent>
                          <Typography>{step.description}</Typography>
                        </StepContent>
                      )}
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you're finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              padding: 2,
              maxWidth: '900px',
              mx: 'auto',
              overflowY: 'auto',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                width: '100%',
                color: `rgba(${hexToRgb('674E67')}, 1)`,
                mb: 1,
                fontFamily: 'Poppins',
                fontSize: 58,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Share a Need
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#323232',
                fontFamily: 'Poppins',
                fontWeight: 'semibold',
                fontSize: '22px',
                mb: 1,
              }}
            >
              Basic Information
            </Typography>

            {/* Input fields */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap' }}>
              <Box sx={{ mr: 1, width: { xs: '100%', md: '480px' }, position: 'relative' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mb: 1 }}>Title*</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="What type of goods do you need?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  inputProps={{ maxLength: 25 }}
                  sx={{ height: '44px', fontFamily: 'Poppins', fontSize: '16px' }}
                />
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '12px',
                    right: '10px',
                    fontSize: '14px',
                    color: 'gray',
                  }}
                >
                  {`${title.length}/25`}
                </Typography>
              </Box>

              <Box sx={{ width: { xs: '100%', md: '280px' }, mt: { xs: 2, md: 0 } }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mb: 1 }}>
                  Category
                </Typography>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ fontFamily: 'Poppins', fontSize: '16px' }}
                  >
                    <MenuItem value="Search a Category" disabled>
                      Search a Category
                    </MenuItem>
                    <MenuItem value="Animals">Animals</MenuItem>
                    <MenuItem value="Business Strategy">Business Strategy</MenuItem>
                    <MenuItem value="Community Outreach">Community Outreach</MenuItem>
                    <MenuItem value="Conservation">Conservation</MenuItem>
                    <MenuItem value="Construction">Construction</MenuItem>
                    <MenuItem value="Counseling">Counseling</MenuItem>
                    <MenuItem value="Data Analytics">Data Analytics</MenuItem>
                    <MenuItem value="Design & Media">Design & Media</MenuItem>
                    <MenuItem value="Environmental">Environmental</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                    <MenuItem value="Management">Management</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    <MenuItem value="Software & Tech">Software & Tech</MenuItem>
                    <MenuItem value="Sport & Recreation">Sport & Recreation</MenuItem>
                    <MenuItem value="Teaching">Teaching</MenuItem>
                    <MenuItem value="Youth & Children">Youth & Children</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mb: 1 }}>
                Description*
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Provide a brief description of your needs."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{ maxLength: 2600 }} // Set the character limit
                  sx={{ height: '80px', fontFamily: 'Poppins', fontSize: '16px' }}
                />
                <Typography
                  sx={{
                    position: 'absolute',
                    bottom: '80px', // Adjust position to be inside the box
                    right: '10px',
                    fontSize: '14px',
                    color: 'gray',
                  }}
                >
                  {`${description.length}/2600`}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '16px', mb: 1 }}>
                Search Tags
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add a search tag"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTag();
                    e.preventDefault(); // Prevent form submission
                  }
                }}
                sx={{ height: '44px', fontFamily: 'Poppins', fontSize: '16px' }}
              />

              {/* Transparent container for chips */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  mt: 2, // Margin-top to give space below the input
                  padding: 2,
                  width: '699px',
                  height: '108px',
                  backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background
                  border: '1px solid white',
                  overflowY: 'auto',
                }}
              >
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={handleDeleteTag(tag)}
                    sx={{
                      fontFamily: 'Poppins',
                      margin: '4px',
                      color: 'black',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light black background
                      border: '1px solid black', // Black border
                      '& .MuiChip-deleteIcon': {
                        color: 'black',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Buttons with updated styles */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
