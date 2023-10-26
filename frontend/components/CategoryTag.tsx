import { Badge, Box } from "@chakra-ui/react";
import React from "react";

const CategoryTag = ({ categoryTag }) => {
  const tags = categoryTag.split(",").map((tag) => tag.trim());

  return (
    <Box>
      {tags.map((tag, index) => (
        <Badge key={index} mr={2} mt={2}>
          {tag}
        </Badge>
      ))}
    </Box>
  );
};

export default CategoryTag;
