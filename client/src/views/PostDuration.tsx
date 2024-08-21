import React, { useState } from 'react';
import { FormControl, Select, MenuItem, Typography, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { format, add, differenceInDays } from 'date-fns';

const calculateFormattedDate = (weeks: number) => {
  const currentDate = new Date();
  const targetDate = add(currentDate, { weeks });
  const formattedDate = format(targetDate, 'MMM dd, yyyy');
  const daysRemaining = differenceInDays(targetDate, currentDate);

  return `${formattedDate} (${daysRemaining} days)`;
};

const PostDuration: React.FC = () => {
  const [selectedWeeks, setSelectedWeeks] = useState<number>(3);
  const [formattedDate, setFormattedDate] = useState<string>(calculateFormattedDate(3));

  const handleChange = (event: SelectChangeEvent<number>) => {
    const weeks = event.target.value as number;
    setSelectedWeeks(weeks);
    setFormattedDate(calculateFormattedDate(weeks));
  };

  return (
    <Box sx={{ width: 300, margin: '0 auto' }}>
      <Typography variant="h6" component="div">
        Expiration Date
      </Typography>
      <hr />
      <FormControl fullWidth margin="normal">
        <Select
          id="duration-select"
          value={selectedWeeks}
          onChange={handleChange}
          displayEmpty
          renderValue={() => formattedDate}
        >
          <MenuItem value={1}>1 week</MenuItem>
          <MenuItem value={2}>2 weeks</MenuItem>
          <MenuItem value={3}>3 weeks</MenuItem>
          <MenuItem value={4}>1 month</MenuItem>
          <MenuItem value={8}>2 months</MenuItem>
          <MenuItem value={12}>3 months</MenuItem>
          <MenuItem value={16}>4 months</MenuItem>
          <MenuItem value={20}>5 months</MenuItem>
          <MenuItem value={24}>6 months</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="body2" color="textSecondary">
        Note: If you would like to later extend the duration of your post after it is published, you
        can do so by viewing the active post and selecting "Edit Expiration Date".
      </Typography>
    </Box>
  );
};

export default PostDuration;
