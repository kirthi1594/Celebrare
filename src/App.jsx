import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

function TextAnimation() {
  const [fontFamilySelected, setFontFamilySelected] = useState("arial");
  const [fontSize, setFontSize] = useState(16);
  const [addTextColor, setAddTextColor] = useState("black");
  const [colorInput, setColorInput] = useState("");
  const [textArr, setTextArr] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [colorsArr, setColorsArr] = useState([
    "red",
    "blue",
    "green",
    "yellow",
    "pink",
    "cyan",
    "skyblue",
  ]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleFontFamilyChange = (e) => {
    setFontFamilySelected(e.target.value);
    addToHistory();
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize((prevSize) => prevSize - 1);
      addToHistory();
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 50) {
      setFontSize((prevSize) => prevSize + 1);
      addToHistory();
    }
  };

  const isValidColor = (color) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== "";
  };

  const handleChangeColor = () => {
    setAddTextColor(colorInput);
    setColorInput("");
    if (colorsArr.includes(colorInput.toLocaleLowerCase())) {
      alert("This color is already present! Please enter a different color.");
    } else if (isValidColor(colorInput)) {
      setColorsArr((prevColors) => [...prevColors, colorInput]);
      addToHistory();
    } else {
      alert("Invalid color");
    }
  };

  const handleAddingText = () => {
    setTextArr((prevText) => [...prevText, textInput]);
    setTextInput("");
    addToHistory();
  };

  const addToHistory = () => {
    const currentState = {
      fontFamilySelected,
      fontSize,
      addTextColor,
      textArr,
      colorsArr,
    };
    const newHistory = [...history.slice(0, historyIndex + 1), currentState];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setFontFamilySelected(previousState.fontFamilySelected);
      setFontSize(previousState.fontSize);
      setAddTextColor(previousState.addTextColor);
      setTextArr(previousState.textArr);
      setColorsArr(previousState.colorsArr);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setFontFamilySelected(nextState.fontFamilySelected);
      setFontSize(nextState.fontSize);
      setAddTextColor(nextState.addTextColor);
      setTextArr(nextState.textArr);
      setColorsArr(nextState.colorsArr);
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <Box p={10}>
      <Flex gap={10}>
        <Box border={"2px dashed blue"} p={5}>
          <Text
            fontSize={fontSize}
            fontFamily={fontFamilySelected}
            color={addTextColor}
          >
            {textArr.length > 0 ? (
              textArr.map((el, i) => <Text key={i}>{el}</Text>)
            ) : (
              <Text>This is Animated Content</Text>
            )}
          </Text>
        </Box>
        <SimpleGrid gap={5}>
          <Select
            onChange={handleFontFamilyChange}
            _hover={{ cursor: "pointer" }}
          >
            <option value="arial">arial</option>
            <option value="cursive">cursive </option>
            <option value="fantasy">fantasy </option>
            <option value="monospace">monospace </option>
            <option value="revert">revert </option>
            <option value="Helvetica">Helvetica </option>
            <option value="serif">serif </option>
          </Select>
          <Flex gap={5} fontSize={30} background={"gray.200"} p={2}>
            <Button onClick={decreaseFontSize} variant="ghost">
              -
            </Button>
            <Text>{fontSize}</Text>
            <Button onClick={increaseFontSize} variant="ghost">
              +
            </Button>
          </Flex>
          <Input
            placeholder="Enter Color"
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
          <Button onClick={handleChangeColor} isDisabled={!colorInput}>
            Add Color
          </Button>
          <SimpleGrid columns={5} gap={3} cursor={"pointer"}>
            {colorsArr.map((el, i) => (
              <Box key={i}>
                <Box
                  p={5}
                  bgColor={el}
                  border={`2px solid ${el}`}
                  width={"10px"}
                  height={"10px"}
                  borderRadius={"full"}
                  onClick={() => setAddTextColor(el)}
                ></Box>
              </Box>
            ))}
          </SimpleGrid>
        </SimpleGrid>
        <Flex gap={3}>
          <Input
            type="text"
            placeholder="Enter Any Text"
            onChange={(e) => setTextInput(e.target.value)}
            value={textInput}
          />
          <Button px={6} onClick={handleAddingText} isDisabled={!textInput}>
            Add Text
          </Button>
        </Flex>
      </Flex>
      <Flex mt={5} gap={5}>
        <Button onClick={undo} isDisabled={historyIndex <= 0}>
          Undo
        </Button>
        <Button onClick={redo} isDisabled={historyIndex >= history.length - 1}>
          Redo
        </Button>
      </Flex>
    </Box>
  );
}

export default TextAnimation;
