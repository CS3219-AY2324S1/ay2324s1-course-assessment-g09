import { Box, Select } from "@chakra-ui/react";
import React from 'react';

interface MySelectProps {
  selectedDifficulty: string;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean; // Add a loading prop
}

const MySelect: React.FC<MySelectProps> = ({ selectedDifficulty, setSelectedDifficulty, onChange, loading }) => {
  return (
    <Box w="250px">
      <Select 
        placeholder="Select Difficulty" 
        value={selectedDifficulty} 
        onChange={onChange} 
        disabled={loading}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </Select>
    </Box>
  );
};

export default MySelect;
