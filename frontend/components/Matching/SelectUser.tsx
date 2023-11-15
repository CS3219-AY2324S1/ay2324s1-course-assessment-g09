import { Box, Select } from "@chakra-ui/react";
import React from 'react';

interface MySelectProps {
  selectedUserID: number;
  setSelectedUserID: React.Dispatch<React.SetStateAction<number>>;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean; // Add a loading prop
}

const SelectUser: React.FC<MySelectProps> = ({ selectedUserID, setSelectedUserID, onChange, loading }) => {
  return (
    <Box w="250px">
      <Select 
        placeholder="Select User ID" 
        value={selectedUserID} 
        onChange={onChange} 
        disabled={loading}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </Select>
    </Box>
  );
};

export default SelectUser;
