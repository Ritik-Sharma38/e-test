/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { dark, light } from "../styles/theme";

const EInput = ({
  type,
  inputMode,
  name = type,
  label = name,
  value,
  onChange,
  placeholder = label,
  leftIcon,
  rightIcon,
  isFullWidth,
  error,
  isInvalid,
  isDisabled,
  isReadOnly,
  isRequired,
  autoComplete,
  maxCharacters,
  isAutoFocus,
  ...rest
}) => {
  const borderColor = useColorModeValue("#f0f0f0", "#2E2E2E");
  const errorBorderColor = useColorModeValue("red.e200", "red.e200");
  const focusBorderColor = useColorModeValue("#733D47", "#BF9B9B");
  const hoverBorderColor = useColorModeValue("#733D47", "#BF9B9B");
  const placeHolderColor = useColorModeValue("#D1D1D1", "#414141");
  const textColor = useColorModeValue("#111111", "#FFFFFF");
  const labelColor = useColorModeValue("#717171", "#C1C1C1");
  const labelBGColor = useColorModeValue("#FFFFFF", "#000000");
  const iconLeftColor = useColorModeValue("#D1D1D1", "#414141");
  const iconRightColor = useColorModeValue("#D1D1D1", "#B1B1B1");

  const [passwordVisible, setPasswordVisible] = useState(false);
  let handleToggle = e => {
    e.preventDefault();
  };
  switch (type) {
    case "text":
      inputMode = inputMode || "text";
      break;

    case "password":
      handleToggle = e => {
        e.preventDefault();
        setPasswordVisible(visibility => !visibility);
      };
      rightIcon = passwordVisible ? <ViewOffIcon /> : <ViewIcon />;
      break;

    case "email":
      inputMode = inputMode || "email";
      break;

    case "tel":
      inputMode = inputMode || "tel";
      break;

    case "url":
      inputMode = inputMode || "url";
      break;

    case "textarea":
      break;
    default:
      inputMode = "text";
      break;
  }

  return (
    <Box position={"relative"} mt={2}>
      {label && (
        <FormLabel
          position={"absolute"}
          top={"-1px"}
          left={"12px"}
          h="20px"
          display={"block"}
          fontSize={"14px"}
          fontWeight={500}
          color={labelColor}
          borderRadius={"5px"}
          mr={"auto"}
          px={"7px"}
          bg={labelBGColor}
          zIndex={2}
        >
          {label}
        </FormLabel>
      )}
      {type === "textarea" && maxCharacters && (
        <FormLabel
          position={"absolute"}
          top={"-8px"}
          right={"12px"}
          display={"block"}
          fontSize={"12px"}
          fontWeight={500}
          color={labelColor}
          borderRadius={"5px"}
          mr={"auto"}
          px={"7px"}
          bg={labelBGColor}
          zIndex={2}
        >
          {maxCharacters}
        </FormLabel>
      )}
      <InputGroup w={isFullWidth ? "full" : "302px"} maxW={"full"}>
        {leftIcon && (
          <InputLeftElement
            pointerEvents="none"
            color={iconLeftColor}
            h={"52px"}
            mt={"2px"}
            ml={1}
          >
            {leftIcon}
          </InputLeftElement>
        )}

        {type === "textarea" ? (
          <Textarea
            resize={"none"}
            name={name}
            w={isFullWidth ? "full" : "302px"}
            maxW={"full"}
            _focus={{ borderColor: focusBorderColor, borderWidth: "2px" }}
            _hover={{ borderColor: hoverBorderColor }}
            _invalid={{ borderColor: errorBorderColor, borderWidth: "1.5px" }}
            _placeholder={{
              color: placeHolderColor,
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
            _disabled={{ borderColor: borderColor }}
            autoComplete={autoComplete}
            border={"1.5px solid"}
            borderColor={focusBorderColor}
            borderRadius={"10px"}
            bg={"transparent"}
            color={textColor}
            fontSize={"16px"}
            fontWeight={400}
            inputMode={inputMode}
            isDisabled={isDisabled}
            isInvalid={isInvalid || error}
            isRequired={isRequired}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          ></Textarea>
        ) : (
          <Input
            name={name}
            type={
              type !== "password" ? type : passwordVisible ? "text" : "password"
            }
            w={isFullWidth ? "full" : "302px"}
            maxW={"full"}
            h={"52px"}
            _focus={{ borderColor: focusBorderColor, borderWidth: "2px" }}
            _hover={{ borderColor: hoverBorderColor }}
            _invalid={{ borderColor: errorBorderColor, borderWidth: "1.5px" }}
            _placeholder={{
              color: placeHolderColor,
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
            _disabled={{ borderColor: borderColor }}
            autoComplete={autoComplete}
            border={"1.5px solid"}
            borderColor={focusBorderColor}
            borderRadius={"10px"}
            bg={"transparent"}
            color={textColor}
            fontSize={"16px"}
            autoFocus={isAutoFocus}
            fontWeight={400}
            inputMode={inputMode}
            isDisabled={isDisabled}
            isInvalid={isInvalid || error}
            isRequired={isRequired}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}
        {rightIcon && (
          <InputRightElement
            h={"52px"}
            color={iconRightColor}
            onClick={handleToggle}
          >
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
      {error && (
        <Text
          mt={"10px"}
          fontSize={"14px"}
          lineHeight={"17px"}
          fontWeight={"300"}
          color={errorBorderColor}
        >
          {error}
        </Text>
      )}
    </Box>
  );
};

export default EInput;
