import React from "react";
import { Image, PressableProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

import { Colors } from "@theme/Colors";

enum ButtonVariant {
    google = "google",
    apple = "apple",
    facebook = "facebook",
    email = "email",
    logout = "logout",
    delete = "delete",
}

type ButtonProps = {
    variant: ButtonVariant;
} & PressableProps;

const ButtonComponent: React.FC<ButtonProps> = ({ variant, onPress }) => {
    return (
        <ButtonContainer variant={variant} onPress={onPress}>
            <IconContainer>{socialIcon(variant)}</IconContainer>
            <Text variant={variant}>{socialText(variant)}</Text>
        </ButtonContainer>
    );
};

const socialText = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.google:
            return "Continue with Google";
        case ButtonVariant.apple:
            return "Continue with Apple";
        case ButtonVariant.facebook:
            return "Continue with facebook";
        case ButtonVariant.logout:
            return "Tap to logout";
        case ButtonVariant.delete:
            return "Tap to delete account";
        case ButtonVariant.email:
        default:
            return "Continue with email";
    }
};

const socialIcon = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.google:
            return <Image style={{ width: 24, height: 24 }} source={require("@assets/googleLogo.png")} />;
        case ButtonVariant.apple:
            return <Icon name="logo-apple" size={24} color={Colors.white} />;
        case ButtonVariant.facebook:
            return <Icon name="logo-facebook" size={24} color={Colors.white} />;
        case ButtonVariant.logout:
            return <Icon name="log-out" size={24} color={Colors.fluorescentBlue} />;
        case ButtonVariant.delete:
            return <Icon name="person-remove" size={24} color={Colors.fluorescentBlue} />;
        case ButtonVariant.email:
        default:
            return <Icon name="mail" size={24} color={Colors.fluorescentBlue} />;
    }
};

const backgroundColor = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.facebook:
            return Colors.facebookBlue;
        case ButtonVariant.google:
            return Colors.white;
        case ButtonVariant.apple:
            return Colors.black;
        case ButtonVariant.logout:
        case ButtonVariant.delete:
        case ButtonVariant.email:
        default:
            return Colors.gunmetal;
    }
};

const fontColor = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.google:
            return Colors.gray;
        case ButtonVariant.apple:
        case ButtonVariant.facebook:
            return Colors.white;
        case ButtonVariant.email:
        case ButtonVariant.logout:
        case ButtonVariant.delete:
        default:
            return Colors.fluorescentBlue;
    }
};

const IconContainer = styled.View({
    marginRight: 15,
    alignItems: "center",
});

const Text = styled.Text<ButtonProps>((props: ButtonProps) => ({
    fontSize: 18,
    lineHeight: "24px",
    color: fontColor(props.variant),
}));

const ButtonContainer = styled.Pressable<ButtonProps>((props: ButtonProps) => ({
    marginTop: 12,
    paddingHorizontal: 15,
    backgroundColor: backgroundColor(props.variant),
    width: 342,
    height: 54,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    borderColor: Colors.cadetBlue,
    borderWidth: props.variant !== ButtonVariant.facebook && props.variant !== ButtonVariant.google ? 2 : 0,
}));

const Google = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.google,
}))({});
const Apple = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.apple,
}))({});
const Facebook = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.facebook,
}))({});
const Email = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.email,
}))({});
const Logout = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.logout,
}))({});
const Delete = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.delete,
}))({});

export const AccountButton = {
    Google: Google,
    Apple: Apple,
    Facebook: Facebook,
    Email: Email,
    Logout: Logout,
    Delete: Delete,
};
