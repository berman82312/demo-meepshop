import { Button, Typography } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Typography variant="h2">Demo</Typography>
        <Link to="/frontend">
          <Button fullWidth variant="outlined">Frontend</Button>
        </Link>
        <Link to="/backend">
          <Button fullWidth variant="outlined">Backend</Button>
        </Link>
        <Link to="/backend-api">
          <Button fullWidth variant="outlined">API Demo</Button>
        </Link>
      </div>
    </div>
  );
}