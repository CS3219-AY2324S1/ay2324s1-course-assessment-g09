import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Box,
  Grid,
  GridItem,
  Checkbox,
  Stack,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const categories = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Database",
  "Breadth-First Search",
  "Tree",
  "Matrix",
  "Two Pointers",
  "Bit Manipulation",
  "Binary Tree",
  "Heap (Priority Queue)",
  "Stack",
  "Prefix Sum",
  "Graph",
  "Simulation",
  "Design",
  "Counting",
  "Backtracking",
  "Sliding Window",
  "Union Find",
  "Linked List",
  "Ordered Set",
  "Enumeration",
  "Monotonic Stack",
  "Trie",
  "Recursion",
  "Divide and Conquer",
  "Number Theory",
  "Bitmask",
  "Queue",
  "Binary Search Tree",
  "Memorization",
  "Segment Tree",
  "Geometry",
  "Topological Sort",
  "Binary Indexed Tree",
  "Game Theory",
  "Hash Function",
  "Shortest Path",
  "Combinatorics",
  "Interactive",
  "String Matching",
  "Data Stream",
  "Rolling Hash",
  "Brainteaser",
  "Randomized",
  "Monotonic Queue",
  "Merge Sort",
  "Iterator",
  "Concurrency",
  "Doubly-Linked List",
  "Probability and Statistics",
  "Quickselect",
  "Bucket Sort",
  "Suffix Array",
  "Minimum Spanning Tree",
  "Counting Sort",
  "Shell",
  "Line Sweep",
  "Reservoir Sampling",
  "Strongly Connected Component",
  "Eulerian Circuit",
  "Radix Sort",
  "Rejection Sampling",
  "Biconnected Component",
];
const CategoryCheckbox = ({ handleCheckboxChange, selectedCategory }) => {
  const initialFocusRef = React.useRef();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);
  const handleSearchQueryChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button width="full">Select Category</Button>
      </PopoverTrigger>
      <PopoverContent width="full">
        <PopoverCloseButton />
        <PopoverHeader>
          <Input
            variant="flushed"
            size="sm"
            onChange={handleSearchQueryChange}
            width="70%"
          />
        </PopoverHeader>
        <PopoverBody height="250px" width="275px" overflowY="auto">
          <Stack direction="column">
            {categories
              .filter((cat) => cat.includes(searchQuery))
              .sort()
              .map((category) => (
                <Checkbox
                  size="sm"
                  colorScheme="green"
                  value={category}
                  isChecked={selectedCategory.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                >
                  {category}
                </Checkbox>
              ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCheckbox;
