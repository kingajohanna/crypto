import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { Colors, hexToRGBA } from "@theme/Colors";

type StyledTextInputProps = {
    title?: string;
    errorText?: string;
    width?: number;
} & TextInputProps;

const TextInputComponent: React.FC<StyledTextInputProps> = ({ title, placeholder, value, onChangeText, errorText, width, keyboardType }) => {
    return (
        <Container>
            {title && <TitleText>{title}</TitleText>}
            <StyledInput
                placeholderTextColor={hexToRGBA(Colors.cadetBlue, 0.5)}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                width={width}
                keyboardType={keyboardType ? keyboardType : "default"}
            />

            {errorText && <ErrorText>{errorText}</ErrorText>}
        </Container>
    );
};

const Container = styled.View({
    alignItems: "flex-start",
    padding: 8,
});

const TitleText = styled.Text(() => ({
    fontSize: 16,
    color: Colors.cadetBlue,
    marginBottom: 4,
}));

const ErrorText = styled.Text(() => ({
    fontSize: 14,
    fontWeight: 400,
    color: "#ff0000",
}));

const StyledInput = styled.TextInput<Partial<StyledTextInputProps>>(({ width }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gunmetal,
    height: 40,
    width: width ? width : 340,
    borderWidth: 1,
    borderColor: Colors.fluorescentBlue,
    borderRadius: 4,
    color: Colors.cadetBlue,
    paddingHorizontal: 16,
}));

export const TextInput = TextInputComponent;
