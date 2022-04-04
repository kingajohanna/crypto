import React from "react";
import styled from "styled-components/native";
import { Button } from "@components/Button";

type ModalProps = {
    errorText?: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    primaryButtonOnPress: Function;
    secondaryButtonOnPress: Function;
};

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

const ErrorText = styled.Text({
    paddingLeft: 24,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 400,
    color: "#ff0000",
});
