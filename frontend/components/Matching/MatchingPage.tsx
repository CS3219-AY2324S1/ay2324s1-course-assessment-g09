// components/MatchingPage.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { Button, Spinner, useToast } from '@chakra-ui/react'
import MySelect from './SelectDifficulty';
import SelectUser from './SelectUser';

// components/MatchingPage.tsx
// ... (imports and other code)

const MatchingPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [displayedDifficulty, setDisplayedDifficulty] = useState<string>('');
  
  const [selectedUserID, setSelectedUserID] = useState<number>(0);
  const [displayedUser, setDisplayedUser] = useState<number>(0);
  
  const [matchedUser, setMatchedUser] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0); // Initial timer value in seconds
  let timerInterval: NodeJS.Timeout | undefined;
  const toast = useToast();

  useEffect(() => {
    if (loading) {
      // Update the timer every second
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      // Clear the timer if loading is finished
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval); // Cleanup interval on unmount or when loading is finished
    };
  }, [loading]);

  const handleButtonClick = async () => {
    // Update when the button is clicked
    setDisplayedDifficulty(selectedDifficulty);
    setDisplayedUser(selectedUserID);
    setMatchedUser(null);
    setErrorMessage(null);

    // Start / Reset the timer to 0 when the button is clicked
    setTimer(0);

    if (selectedDifficulty && selectedUserID) {
      // Set loading state to true when the button is clicked
      setLoading(true);

      // Clear the loading state after 30 seconds (simulated delay)
      // setTimeout(() => {
      //   setLoading(false); // Set loading state to false after 3 seconds
      // }, 3000); // 3 seconds in milliseconds
      
      try {
        // Call the API route to perform matching
        const response = await fetch('/api/match', {
          method: 'POST',
          body: JSON.stringify({ difficulty: selectedDifficulty, userId: selectedUserID }), // Include user ID in the request
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Update the matched user state with the received data
            setMatchedUser(data.matchedUser);
          } else {
            // Handle the case where the API indicates no match was found or Error
            setMatchedUser(data.message);
            const toastTitle = `No match found for user ${selectedUserID}`;
            if (data.message == "No match found") {
              toast({
                title: toastTitle,
                description: 'Retry by clicking the Match button.',
                status: 'info',
                duration: 3000, // Duration for the toast message (in milliseconds)
                isClosable: true, // Allow the user to close the toast
              });
            }
          }
        } else {
          // Handle other response status codes (e.g., 500 for server error)
          setErrorMessage('An error occurred');
        }
      } catch (error) {
        // Handle network or other errors
        setErrorMessage('An error occurred while fetching data');
      } finally {
        // Set loading state to false after the request is completed
        setLoading(false);
      }
    } 
    
    // Display a toast message for no difficulty or user selected
    else {
      toast({
        title: 'No Difficulty or User Selected',
        description: 'Please select a difficulty & user before clicking the Match button.',
        status: 'error',
        duration: 1000, // Duration for the toast message (in milliseconds)
        isClosable: true, // Allow the user to close the toast
      });
    }
  };

  const handleSelectChangeDifficulty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleSelectChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserID(parseInt(event.target.value));
  };

  return (
    <div>
      <SelectUser
        selectedUserID={selectedUserID}
        setSelectedUserID={setSelectedUserID}
        onChange={handleSelectChangeUser}
        loading={loading} // Disable the select while loading
        data-name="user" // Pass name as a regular HTML attribute
      />
      <MySelect
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        onChange={handleSelectChangeDifficulty}
        loading={loading} // Disable the select while loading
        data-name="difficulty" // Pass name as a regular HTML attribute
      />
      <Button colorScheme='blue' variant='solid' onClick={handleButtonClick} isDisabled={loading}>Match</Button>
      <hr style={{ height: '50%' }} /> {/* Use JSX for the hr element */}
      <h1>Selected Difficulty: {displayedDifficulty  || 'None'}</h1>
      <h1>Selected User: {displayedUser || 'None'}</h1>
      <h2>Matching Status: </h2>
      <h1>Matched User: {matchedUser || 'None'}</h1>
      <h1>Error Message: {errorMessage|| 'None'}</h1>
      <p>Time Elapsed: {timer} seconds</p> {/* Always display the "Time Elapsed" label */}
      {loading && (
        <div>
          <Spinner size="md" color="blue" mt={2} /> {/* Display spinner when loading */}
        </div>
      )}
    </div>
  );
};

export default MatchingPage;
