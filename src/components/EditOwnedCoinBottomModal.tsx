import React from "react";
import { PressableProps } from "react-native";
import styled from "styled-components/native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors, hexToRGBA } from "@theme/Colors";
import { TextInput } from "@components/InputField";
import { getModalHeight } from "@utils/BottomModalHeight";
import { Button } from "@components/Button";

type BottomModalProps = {
    reference: React.MutableRefObject<RBSheet>;
    setPurchasedHoldings: React.Dispatch<React.SetStateAction<string>>;
    setPurchasedTotalCost: React.Dispatch<React.SetStateAction<string>>;
    setSoldHoldings: React.Dispatch<React.SetStateAction<string>>;
    setSoldTotalCost: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
    onCancel: () => void;
} & PressableProps;

/*
    bottommodal for editing owned coin
*/
export const EditOwnedCoinBottomModal: React.FC<BottomModalProps> = (props) => {
    return (
        <RBSheet
            ref={props.reference}
            closeOnPressMask={true}
            onClose={() => {
                props.reference.current.close();
                props.onCancel();
            }}
            closeDuration={180}
            openDuration={180}
            height={getModalHeight(0.55)}
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
                <Title>Edit coin</Title>
                <RowContainer>
                    <Text>Purchased holdings</Text>
                    <TextInput onChangeText={props.setPurchasedHoldings} placeholder="holdings" width={120} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <RowContainer>
                    <Text>Total cost</Text>
                    <TextInput onChangeText={props.setPurchasedTotalCost} placeholder="cost" width={120} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <RowContainer>
                    <Text>Sold holdings</Text>
                    <TextInput onChangeText={props.setSoldHoldings} placeholder="holdings" width={120} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <RowContainer>
                    <Text>Total cost</Text>
                    <TextInput onChangeText={props.setSoldTotalCost} placeholder="cost" width={120} keyboardType="numeric" returnKeyType="done" />
                </RowContainer>
                <ButtonContainer>
                    <Button title="Cancel" onPress={() => props.onCancel()} />
                    <Button title="Save" onPress={() => props.onSave()} />
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
