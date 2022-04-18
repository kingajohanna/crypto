import React, { useState } from "react";
import { TextInputProps, ScrollView } from "react-native";
import { Menu } from "react-native-paper";
import styled from "styled-components/native";
import { Colors, hexToRGBA } from "@theme/Colors";
import { KeyValue } from "@constants/DataTypes";

type AutocompleteProps = {
    width?: number;
    data: KeyValue[];
} & TextInputProps;

/*
    textinput with scrollable suggestion
*/
export const Autocomplete: React.FC<AutocompleteProps> = ({ data, placeholder, onChangeText, width }) => {
    const [value, setValue] = useState("");
    const [menuVisible, setMenuVisible] = useState(false);
    const [filteredData, setFilteredData] = useState<KeyValue[]>(data);

    const filterData = (text: string) => {
        return data.filter((item) => item.name.toLowerCase().startsWith(text.toLowerCase()));
    };

    return (
        <Container>
            <StyledInput
                width={width}
                placeholderTextColor={hexToRGBA(Colors.cadetBlue, 0.5)}
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => {
                    if (text.length > 0) {
                        setFilteredData(filterData(text));
                    } else if (text.length === 0) {
                        setFilteredData([]);
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
                    <ScrollView style={{ position: "absolute", borderColor: Colors.cadetBlue, borderWidth: 1, borderRadius: 5, maxHeight: 230, backgroundColor: Colors.gunmetal }}>
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

const SearchContainer = styled.View({
    flexDirection: "column",
    width: 150,
    height: 16,
    backgroundColor: Colors.gunmetal,
});

export const StyledInput = styled.TextInput<Partial<AutocompleteProps>>(({ width }) => ({
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
