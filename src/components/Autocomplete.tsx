import React, { useState } from "react";
import { TextInputProps, View } from "react-native";
import styled from "styled-components/native";
import { Colors, hexToRGBA } from "@theme/Colors";
import { List, Menu } from "react-native-paper";
import { KeyValue } from "@constants/DataTypes";

type AutocompleteProps = {
    title?: string;
    errorText?: string;
    width?: number;
    data: KeyValue[];
} & TextInputProps;

export const Autocomplete: React.FC<AutocompleteProps> = ({ data, title, placeholder, onChangeText, errorText, width }) => {
    const [value, setValue] = useState("");
    const [menuVisible, setMenuVisible] = useState(false);
    const [filteredData, setFilteredData] = useState<KeyValue[] | null>(null);

    const filterData = (text: string) => {
        return data.filter((item) => item.name.toLowerCase().startsWith(text.toLowerCase()));
    };

    return (
        <Container>
            {title && <TitleText>{title}</TitleText>}
            <StyledInput
                width={width}
                placeholderTextColor={hexToRGBA(Colors.cadetBlue, 0.5)}
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => {
                    if (text.length > 0) {
                        setFilteredData(filterData(text));
                    } else if (text.length === 0) {
                        setFilteredData(null);
                    }
                    setMenuVisible(true);
                    setValue(text);
                }}
                onFocus={() => {
                    setMenuVisible(true);
                }}
                onBlur={() => setMenuVisible(false)}
            />

            {menuVisible && filteredData && (
                <SearchContainer>
                    {filteredData.slice(0, 1).map((word, i) => (
                        <Menu.Item
                            key={i}
                            onPress={() => {
                                onChangeText!(word.id);
                                setValue(word.name);
                                setMenuVisible(false);
                            }}
                            titleStyle={{ color: Colors.fluorescentBlue, height: 30 }}
                            title={word.name}
                        />
                    ))}
                </SearchContainer>
            )}
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

const SearchContainer = styled.View({
    flexDirection: "column",
    width: 120,
    height: 16,
    backgroundColor: Colors.gunmetal,
});

const StyledInput = styled.TextInput<Partial<AutocompleteProps>>(({ width }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gunmetal,
    height: 40,
    width: 120,
    borderWidth: 1,
    borderColor: Colors.fluorescentBlue,
    borderRadius: 4,
    color: Colors.cadetBlue,
    paddingHorizontal: 16,
}));
