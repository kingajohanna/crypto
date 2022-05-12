import React, { useState } from "react";
import { PressableProps } from "react-native";
import styled from "styled-components/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors, hexToRGBA } from "@theme/Colors";
import { TextInput } from "@components/InputField";
import { Autocomplete } from "@components/Autocomplete";
import { Button } from "@components/Button";
import { KeyValue } from "@constants/DataTypes";
import { getModalHeight } from "@utils/BottomModalHeight";
import { ErrorText } from "@components/ErrorText";

type BottomModalProps = {
    reference: React.MutableRefObject<RBSheet>;
    setCoinName: React.Dispatch<React.SetStateAction<string>>;
    setHoldings: React.Dispatch<React.SetStateAction<string>>;
    setTotalCost: React.Dispatch<React.SetStateAction<string>>;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
    data: KeyValue[];
    currency: KeyValue[];
    error: string;
    onSave: () => void;
    onCancel: () => void;
} & PressableProps;

/**
 *    Bottom modal for adding a purchased coin to the users owned coins
 */
export const NewOwnedCoinBottomModal: React.FC<BottomModalProps> = ({ reference, setCoinName, setCurrency, setHoldings, setTotalCost, data, currency, onSave, onCancel, error }) => {
    return (
        <RBSheet
            ref={reference}
            closeOnPressMask={true}
            closeDuration={180}
            openDuration={180}
            height={getModalHeight(0.55)}
            onClose={onCancel}
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
                {error.length !== 0 && <ErrorText>{error}</ErrorText>}
                <Title>Add coin</Title>
                <RowContainer style={{ zIndex: 2 }}>
                    <Text>Purchased crypto coin</Text>
                    <Autocomplete onChangeText={setCoinName} data={data} placeholder="crypto coin" width={130} />
                </RowContainer>
                <RowContainer>
                    <Text>Purchased holdings</Text>
                    <TextInput onChangeText={setHoldings} placeholder="holdings" width={130} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <RowContainer>
                    <Text>Total cost</Text>
                    <TextInput onChangeText={setTotalCost} placeholder="cost" width={130} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <RowContainer style={{ zIndex: 1 }}>
                    <Text>Currency</Text>
                    <Autocomplete onChangeText={setCurrency} data={currency} placeholder="crypto coin" width={130} />
                </RowContainer>
                <ButtonContainer>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            reference.current.close();
                            onCancel();
                        }}
                    />
                    <Button title="Save" onPress={() => onSave()} />
                </ButtonContainer>
            </Container>
        </RBSheet>
    );
};

const Container = styled.View({
    padding: 16,
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
