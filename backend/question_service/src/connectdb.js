const mg = require('mongoose');

// Connect to MongoDB.
const connectToDB = () => {
  const log_success = () => console.log(`QuestionManager's MongoDB running on port ${process.env.DB_PORT}.`);   
  const handle_error = (err) => {
    console.log(`Error connecting to DB. Exiting. ${err}`);
    process.exit(1); //Connection retry logic is in Docker compose.
  };

  mg.connect(process.env.DB_SERVER, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(log_success)
    .catch(handle_error);
};

// Make Question Schema
const createQnModel = () => {
  const qnSchema = new mg.Schema({
    qn_num: { //"Primary Key"
        type: Number,
        unique: true, // Enforce uniqueness for customId
        required: true, // Ensure it's required, NOT NULL
      },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: [{
        type: String,
        required: true,
        validate: cat => Category.includes(cat),
    }],
    complexity: {
        type: String,
        enum: Complexity,
        required: true,
    }
  });
  return mg.model('question', qnSchema);
};

const Category = ["Array", "String", "Hash Table", "Dynamic Programming", "Math", "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database", "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Bit Manipulation", "Binary Tree", "Heap (Priority Queue)", "Stack", "Prefix Sum", "Graph", "Simulation", "Design", "Counting", "Backtracking", "Sliding Window", "Union Find", "Linked List", "Ordered Set", "Enumeration", "Monotonic Stack", "Trie", "Recursion", "Divide and Conquer", "Number Theory", "Bitmask", "Queue", "Binary Search Tree", "Memoization", "Segment Tree", "Geometry", "Topological Sort", "Binary Indexed Tree", "Game Theory", "Hash Function", "Shortest Path", "Combinatorics", "Interactive", "String Matching", "Data Stream", "Rolling Hash", "Brainteaser", "Randomized", "Monotonic Queue", "Merge Sort", "Iterator", "Concurrency", "Doubly-Linked List", "Probability and Statistics", "Quickselect", "Bucket Sort", "Suffix Array", "Minimum Spanning Tree", "Counting Sort", "Shell", "Line Sweep", "Reservoir Sampling", "Strongly Connected Component", "Eulerian Circuit", "Radix Sort", "Rejection Sampling", "Biconnected Component"];
const Complexity = ['Easy', 'Medium', 'Hard'];

connectToDB();
const Question = createQnModel();
const Attributes = Question.schema.paths;

module.exports = {
    Question,
    Attributes,
    Category,
    Complexity
};