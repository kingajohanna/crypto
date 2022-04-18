import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { Colors } from "@theme/Colors";

/*
    component that rendering on mycoins and favourites screeen when the user not logged in, 
*/
export const UserRequiredContent = () => {
    return (
        <Container>
            <Icon name="person" size={32} color={Colors.fluorescentBlue} />
            <Text>Please login or register to use this feature</Text>
        </Container>
    );
};

const Container = styled.View({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
});

const Text = styled.Text({
    fontSize: 24,
    color: Colors.fluorescentBlue,
    textAlign: "center",
});
