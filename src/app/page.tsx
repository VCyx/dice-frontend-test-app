"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { format } from "date-fns";

enum SwitchValue {
  UNDER = "UNDER",
  OVER = "OVER",
}

const sliderMarks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 40,
  },
  {
    value: 60,
  },
  {
    value: 80,
  },
  {
    value: 100,
  },
];

type TableItemType = {
  time: Date;
  guess: {
    type: SwitchValue;
    value: number;
  };
  result: number;
  isCorrectAnswer: boolean;
};

export default function Home() {
  const [switchValue, setSwitchValue] = useState<SwitchValue>(
    SwitchValue.UNDER,
  );
  const [sliderValue, setSliderValue] = useState<number>(20);
  const [tableItems, setTableItems] = useState<TableItemType[]>([]);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);

  const changeSliderValue = (e: Event, value: number | number[]) => {
    setSliderValue(value as number);
  };

  const findIsCorrectAnswer = (
    result: number,
    value: number,
    selection: SwitchValue,
  ) => {
    if (selection === SwitchValue.OVER) {
      return result > value;
    } else {
      return result < value;
    }
  };

  const onSubmit = () => {
    // Math.random() can be predictable, so invalid for lottery. It's here just for fast code writing
    const result = Math.floor(Math.random() * (100 - 2) + 1);

    setIsCorrectAnswer(() =>
      findIsCorrectAnswer(result, sliderValue, switchValue),
    );

    const tableItem: TableItemType = {
      time: new Date(),
      result,
      guess: {
        type: switchValue,
        value: sliderValue,
      },
      isCorrectAnswer: isCorrectAnswer!,
    };

    const prevTableItems = [...tableItems];

    if (tableItems.length >= 10) {
      prevTableItems.pop();
    }

    setTableItems([tableItem, ...prevTableItems]);
  };

  return (
    <Container
      sx={{
        margin: "0 auto",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      maxWidth={"sm"}
      fixed
    >
      <Box
        sx={{
          mt: 2,
          mb: 2.5,
          width: "100%",
          minHeight: 76,
        }}
      >
        {isCorrectAnswer !== null && isCorrectAnswer ? (
          <Alert
            sx={{
              width: "100%",
            }}
            variant={"filled"}
            severity={"success"}
          >
            You won
          </Alert>
        ) : (
          <Alert
            sx={{
              width: "100%",
            }}
            variant={"filled"}
            severity={"error"}
          >
            <AlertTitle>You lost</AlertTitle>
            Number was higher
          </Alert>
        )}
      </Box>

      <Box
        sx={{
          maxWidth: 320,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            mb: 2,
            width: "100%",
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          elevation={0}
        >
          <Typography variant={"h1"}>{sliderValue}</Typography>
        </Paper>

        <FormControl
          sx={{
            mb: 4,
          }}
        >
          <RadioGroup
            defaultValue={switchValue}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormControlLabel
              value={SwitchValue.UNDER}
              control={<Radio color={"secondary"} size={"small"} />}
              label={capitalizeFirstLetter(SwitchValue.UNDER.toLowerCase())}
              labelPlacement="start"
            />
            <FormControlLabel
              value={SwitchValue.OVER}
              control={<Radio color={"secondary"} size={"small"} />}
              label={capitalizeFirstLetter(SwitchValue.OVER.toLowerCase())}
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>

        <Slider
          color={"secondary"}
          size={"small"}
          step={1}
          marks={sliderMarks}
          valueLabelDisplay={"on"}
          value={sliderValue}
          onChange={changeSliderValue}
        />
        <Box
          sx={{
            mb: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant={"body2"} color={"text.secondary"}>
            0
          </Typography>
          <Typography variant={"body2"} color={"text.secondary"}>
            100
          </Typography>
        </Box>

        <Button
          sx={{
            mb: 2,
          }}
          variant={"contained"}
          color={"secondary"}
          size={"large"}
          onClick={() => onSubmit()}
        >
          Play
        </Button>
      </Box>

      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Guess</TableCell>
            <TableCell align="left">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableItems.map((row) => (
            <TableRow key={row.time.getTime()}>
              <TableCell align="left">
                <Typography variant={"body2"}>
                  {format(row.time, "HH:mm:ss")}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant={"body2"}>
                  {capitalizeFirstLetter(row.guess.type.toLowerCase())}{" "}
                  {row.guess.value}
                </Typography>
              </TableCell>

              <TableCell align="left">
                <Typography
                  variant={"body2"}
                  color={row.isCorrectAnswer ? "success.dark" : "error.dark"}
                >
                  {row.result}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
