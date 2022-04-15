import React, { useState } from "react";
import { Button, TextInputProps, View } from "react-native";
import styled from "styled-components/native";
import { Colors, hexToRGBA } from "@theme/Colors";
import { List, Menu, Provider } from "react-native-paper";
import { KeyValue } from "@constants/DataTypes";
import { ScrollView } from "react-native-gesture-handler";

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
                    <ScrollView style={{ position: "absolute", borderColor: Colors.cadetBlue, borderWidth: 1, borderRadius: 5, maxHeight: 230 }}>
                        {filteredData.map((word, i) => (
                            <Menu.Item
                                key={i}
                                onPress={() => {
                                    onChangeText!(word.id);
                                    setValue(word.name);
                                    setMenuVisible(false);
                                }}
                                style={{ backgroundColor: Colors.gunmetal, height: 40, width: 150 }}
                                titleStyle={{ color: Colors.fluorescentBlue }}
                                title={word.name}
                            />
                        ))}
                    </ScrollView>
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
    width: 150,
    height: 16,
    backgroundColor: Colors.gunmetal,
});

const StyledInput = styled.TextInput<Partial<AutocompleteProps>>(({ width }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gunmetal,
    height: 40,
    width: width ? width : 150,
    borderWidth: 1,
    borderColor: Colors.fluorescentBlue,
    borderRadius: 4,
    color: Colors.cadetBlue,
    paddingHorizontal: 16,
}));
