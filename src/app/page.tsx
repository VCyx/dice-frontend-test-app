import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Container
      sx={{
        margin: "0 auto",
        width: "100%",
        height: "100%",
      }}
      maxWidth={"sm"}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>
    </Container>
  );
}
