import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { invertTree } from "utils/invertTree";

function convertNull(value: unknown) {
  if (value === null) {
    return "null";
  }
  return value;
}

export default function Page() {
  const [testData, setTestData] = useState("");
  const [testResult, setTestResult] = useState("");
  const case1 = [5, 3, 8, 1, 7, 2, 6];
  const case2 = [5, 3, 8, 1, 7, 2, 6, 100, 3, -1];

  function getTestResult() {
    const data = testData.split(",");
    const hasError = data.find((value) => isNaN(Number(value)));
    if (hasError) {
      setTestResult("Input value contains non-number value");
      return;
    }
    const inputValues = data.map((value) => Number(value));
    const result = invertTree(inputValues);

    setTestResult(result.map(convertNull).join(", "));
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col gap-4">
        <Box className="border rounded border-neutral-400 p-4">
          <Typography variant="h5">Case 1</Typography>
          <Typography variant="body1">Input: {case1.join(", ")}</Typography>
          <Typography variant="body1">
            Output: {invertTree(case1).join(", ")}
          </Typography>
        </Box>
        <Box className="border rounded border-neutral-400 p-4">
          <Typography variant="h5">Case 2</Typography>
          <Typography variant="body1">Input: {case2.join(", ")}</Typography>
          <Typography variant="body1">
            Output: {invertTree(case2).map(convertNull).join(", ")}
          </Typography>
        </Box>
        <Box className="flex flex-col border rounded border-neutral-400 p-4 gap-4">
          <Typography variant="h4">Try it!</Typography>
          <TextField
            placeholder="5, 3, 8, 1, 7, 2, 6"
            label="Input"
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
          />
          <Button
            variant="outlined"
            disabled={!testData}
            onClick={getTestResult}
          >
            Show result
          </Button>
          <Typography variant="body1">
            Output: {testResult}
          </Typography>
        </Box>
      </div>
      <Link to="/" className="mt-4">
        <Button>Back to previous page</Button>
      </Link>
    </div>
  );
}
