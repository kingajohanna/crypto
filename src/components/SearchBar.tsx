import React from "react";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors, hexToRGBA } from "@theme/Colors";

type StyledTextInputProps = {} & TextInputProps;

/*
    searchbar
*/
export const Searchbar: React.FC<StyledTextInputProps> = ({ placeholder, value, onChangeText }) => {
    return (
        <Container>
            <Icon name="search-outline" size={24} color={Colors.fluorescentBlue} />
            <StyledInput placeholderTextColor={hexToRGBA(Colors.cadetBlue, 0.5)} placeholder={placeholder} value={value} onChangeText={onChangeText} />
        </Container>
    );
};

const Container = styled.View({
    height: 40,
    width: 340,
    paddingLeft: 16,
    flexDirection: "row",
    backgroundColor: Colors.gunmetal,
    borderWidth: 1,
    borderColor: Colors.fluorescentBlue,
    borderRadius: 15,

    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 8,
});

const StyledInput = styled.TextInput({
    paddingLeft: 12,
    color: Colors.cadetBlue,
});
