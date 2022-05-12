import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import { Colors, hexToRGBA } from "@theme/Colors";

type StyledTextInputProps = {
    title?: string;
    width?: number;
    isSecret?: boolean;
} & TextInputProps;

/**
 *   basic inputfield with custom title placeholder
 */
export const TextInput: React.FC<StyledTextInputProps> = ({ title, placeholder, value, onChangeText, width, keyboardType, isSecret }) => {
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
                secureTextEntry={isSecret ? true : false}
                autoCapitalize="none"
            />
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
