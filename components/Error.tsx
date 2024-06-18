"use client";

import { useRouter } from "next/navigation";
import { Button, Container, Typography } from "@mui/material";

export default function Error({
  message,
  buttons = { reload: true },
}: {
  message: string;
  buttons?: { reload?: boolean; back?: boolean };
}) {
  const router = useRouter();

  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: 2,
      }}
    >
      <Typography>{message}</Typography>
      {buttons.reload && (
        <Button variant="contained" onClick={() => router.refresh()}>
          Reload
        </Button>
      )}
      {buttons.back && (
        <Button variant="contained" onClick={() => router.back()}>
          Go Back
        </Button>
      )}
    </Container>
  );
}
