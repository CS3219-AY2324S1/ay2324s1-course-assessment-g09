import {
    Avatar,
    Divider,
    VStack,
    WrapItem,
    Text,
    HStack,
    Button,
    Badge,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    CircularProgress,
    CircularProgressLabel,
    Box,
    Center,
    Grid,
    GridItem,
    Heading,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  
  const IP_ADDRESS = process.env.NEXT_PUBLIC_IP_ADDRESS;
  
  const assignment5Success = ({ colorMode, userMode, userEmail }) => {
    return (
      <>
      <Heading>Assignment 5 - Successful Match</Heading>  
      {/* console.log("Entered Matched Session": )       */}
      </>
    );
  };
  
  export default assignment5Success;
  
  