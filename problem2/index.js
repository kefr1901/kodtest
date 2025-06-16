/*
roblem 2
A crane operator will rearrange crates based on carefully planned steps.
A\er the crates are rearranged, the desired crates will be at the top of each stack.
You are given a drawing of the star]ng stacks of crates and the rearrangement procedure 
(your input). For example:
 [D] 
[N] [C] 
[Z] [M] [P]
1 2 3 
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the 
bo^om, and crate N is on top. Stack 2 contains three crates; from bo^om to top, they are 
crates M, C, and D. Finally, stack 3 contains a single crate, P.
Then, the rearrangement procedure is given. In each step of the procedure, a quan]ty of 
crates is moved from one stack to a different stack. In the first step of the above 
rearrangement procedure, one crate is moved from stack 2 to stack 1, resul]ng in this 
configura]on:
[D] 
[N] [C] 
[Z] [M] [P]
1 2 3 
In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at 
a =me, so the first crate to be moved (D) ends up below the second and third crates:
 [Z]
 [N]
 [C] [D]
 [M] [P]
1 2 3
Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at 
a =me, crate C ends up below crate M:
 [Z]
 [N]
[M] [D]
[C] [P]
1 2 3
Finally, one crate is moved from stack 1 to stack 2:
 [Z]
 [N]
 [D]
[C] [M] [P]
1 2 3
You want to know which crate will end up on top of each stack; in this example, the top 
crates are C in stack 1, M in stack 2, and Z in stack 3. Then you should combine these 
together, in the example you get CMZ.
A@er the rearrangement procedure completes, what crate ends up on top of each stack?

*/

const fs = require('fs'); // Import module to read files
const path = require('path'); // Import module to work with file paths

const findStacks = (stackPart) => {
  const stackLines = stackPart.split('\n'); // Split into lines
  const stackNumber = stackLines.pop(); // The last line containsnumbers 
  const stackCount = stackNumber.trim().split(/\s+/).length; // Count how many stacks there are

  const stacks = Array.from({ length: stackCount }, () => []); // Create empty arrays for each stack

  for (const line of stackLines.reverse()) { // Go through the stack lines from bottom to top
    for (let i = 0; i < stackCount; i++) {
      const char = line[i * 4 + 1]; // Pick the character that may be a crate label (position is always i*4 + 1)
      if (/[A-Z]/.test(char)) { // Check if it's a letter (crate)
        stacks[i].push(char); // Add it to the correct stack
      }
    }
  }

  return stacks; // Return the stacks as an array of arrays
}

const processMoves = (stacks, movePart) => {
  // Calcualate moves
  const moves = movePart.trim().split('\n').map(line => { // Split and parse each move instruction
    const match = line.match(/move (\d+) from (\d+) to (\d+)/); // Extract numbers from instruction
    return {
      quantity: Number(match[1]), 
      from: Number(match[2]), 
      to: Number(match[3]), 
    };
  });

  // Create the moves
  for (const { quantity, from, to } of moves) { 
    for (let i = 0; i < quantity; i++) { //Loop through every move
      const crate = stacks[from - 1].pop(); // Remove the top crate 
      stacks[to - 1].push(crate); // Place it on top of the destination stack
    }
  }
}


const inputPath = path.join(__dirname, 'input.txt'); 
const inputFile = fs.readFileSync(inputPath, 'utf8'); 

const [stackPart, movePart] = inputFile.split('\n\n'); // Split the input into two parts

const stacks = findStacks(stackPart); 
processMoves(stacks, movePart); // Execute the move instructions

const topCrates = stacks.map(stack => { 
  if (stack.length === 0) return ''; // If the stack is empty, return empty string
  return stack[stack.length - 1]; // Return the top crate
});

const result = topCrates.join('');

console.log(result); // TLFGBZHCN