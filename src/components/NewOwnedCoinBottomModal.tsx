import React from "react";
import { Dimensions, Platform, PressableProps } from "react-native";
import styled from "styled-components/native";
import RBSheet from "react-native-raw-bottom-sheet";

import { Colors, hexToRGBA } from "@theme/Colors";
import { TextInput } from "@components/InputField";
import { Autocomplete } from "@components/Autocomplete";
import { Button } from "@components/Button";
import { KeyValue } from "@constants/DataTypes";
import { NAVBARHEIGHT } from "@constants/androidHelper";

const { height: SIZE } = Dimensions.get("window");

type BottomModalProps = {
    reference: React.MutableRefObject<RBSheet>;
    setCoinName: React.Dispatch<React.SetStateAction<string>>;
    setHoldings: React.Dispatch<React.SetStateAction<string>>;
    setTotalCost: React.Dispatch<React.SetStateAction<string>>;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
    data: KeyValue[];
    currency: KeyValue[];
    onSave: () => void;
    onCancel: () => void;
} & PressableProps;

export const NewOwnedCoinBottomModal: React.FC<BottomModalProps> = ({ reference, setCoinName, setCurrency, setHoldings, setTotalCost, data, currency, onSave, onCancel }) => {
    return (
        <RBSheet
            ref={reference}
            closeOnPressMask={true}
            closeDuration={180}
            openDuration={180}
            height={Platform.OS === "ios" ? SIZE * 0.55 : SIZE * 0.55 + NAVBARHEIGHT}
            customStyles={{
                container: {
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: Colors.gunmetal,
                },
                wrapper: {
                    backgroundColor: hexToRGBA(Colors.richBlack, 0.5),
                },
                draggableIcon: {
                    backgroundColor: Colors.cadetBlue,
                },
            }}
        >
            <Container>
                <Title>Add coin</Title>
                <RowContainer>
                    <Text>Purchased crypto coin</Text>
                    <Autocomplete onChangeText={setCoinName} data={data} placeholder="crypto coin" />
                </RowContainer>
                <RowContainer>
                    <Text>Purchased holdings</Text>
                    <TextInput onChangeText={setHoldings} placeholder="holdings" width={120} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <RowContainer>
                    <Text>Total cost</Text>
                    <TextInput onChangeText={setTotalCost} placeholder="cost" width={120} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <RowContainer>
                    <Text>Currency</Text>
                    <Autocomplete onChangeText={setCurrency} data={currency} placeholder="crypto coin" />
                </RowContainer>
                <ButtonContainer>
                    <Button title="Cancel" onPress={() => onCancel()} />
                    <Button title="Save" onPress={() => onSave()} />
                </ButtonContainer>
            </Container>
        </RBSheet>
    );
};

const Container = styled.View({
    padding: 18,
});
const RowContainer = styled.Pressable({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
});

const Title = styled.Text({
    color: Colors.silverSand,
    fontSize: 24,
    alignSelf: "center",
});

const Text = styled.Text({
    color: Colors.silverSand,
    fontSize: 18,
});

const ButtonContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
});
