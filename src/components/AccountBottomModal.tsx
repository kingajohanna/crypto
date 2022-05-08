import React from "react";
import styled from "styled-components/native";
import { Button } from "@components/Button";
import { ErrorText } from "@components/ErrorText";

type ModalProps = {
    errorText?: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    primaryButtonOnPress: Function;
    secondaryButtonOnPress: Function;
};

/*
    bottom modal, with optional error text for the Account screen
*/
export const AccountBottomModal: React.FC<ModalProps> = ({ errorText, children, primaryButtonText, secondaryButtonText, primaryButtonOnPress, secondaryButtonOnPress }) => {
    return (
        <Container>
            {!!errorText && <ErrorText>{errorText}</ErrorText>}
            <ChildContainer>{children}</ChildContainer>
            <ButtonContainer>
                <Button title={secondaryButtonText} onPress={() => secondaryButtonOnPress()} />
                <Button title={primaryButtonText} onPress={() => primaryButtonOnPress()} />
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.View({
    paddingTop: 24,
});

const ChildContainer = styled.View({
    alignItems: "center",
    paddingBottom: 16,
});

const ButtonContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
});
