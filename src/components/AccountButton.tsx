import React from "react";
import { Image, PressableProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import { Colors } from "@theme/Colors";

enum ButtonVariant {
    google = "google",
    emailLogIn = "emailLogIn",
    emailSignIn = "emailSignIn",
    logout = "logout",
    delete = "delete",
}

type ButtonProps = {
    variant: ButtonVariant;
} & PressableProps;

/**
 * Account buttons, like login os account delete button
 */
const ButtonComponent: React.FC<ButtonProps> = ({ variant, onPress }) => {
    return (
        <ButtonContainer variant={variant} onPress={onPress}>
            <IconContainer>{socialIcon(variant)}</IconContainer>
            <Text variant={variant}>{socialText(variant)}</Text>
        </ButtonContainer>
    );
};

/**
 *
 * @param variant of the button
 * @returns the button's text
 */
const socialText = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.google:
            return "Continue with Google";
        case ButtonVariant.logout:
            return "Tap to logout";
        case ButtonVariant.delete:
            return "Tap to delete account";
        case ButtonVariant.emailLogIn:
            return "Login with email";
        case ButtonVariant.emailSignIn:
        default:
            return "Register with email";
    }
};

/**
 *
 * @param variant of the button
 * @returns icon of the buttons
 */
const socialIcon = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.google:
            return <Image style={{ width: 24, height: 24 }} source={require("@assets/googleLogo.png")} />;
        case ButtonVariant.logout:
            return <Icon name="log-out" size={24} color={Colors.fluorescentBlue} />;
        case ButtonVariant.delete:
            return <Icon name="person-remove" size={24} color={Colors.fluorescentBlue} />;
        case ButtonVariant.emailLogIn:
        case ButtonVariant.emailSignIn:
        default:
            return <Icon name="mail" size={24} color={Colors.fluorescentBlue} />;
    }
};

/**
 *
 * @param variant of the button
 * @returns the background color of the button
 */
const backgroundColor = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.google:
            return Colors.white;
        case ButtonVariant.logout:
        case ButtonVariant.delete:
        case ButtonVariant.emailLogIn:
        case ButtonVariant.emailSignIn:
        default:
            return Colors.gunmetal;
    }
};

/**
 *
 * @param variant of the button
 * @returns the font color of the button
 */
const fontColor = (variant: ButtonVariant) => {
    switch (variant) {
        case ButtonVariant.google:
            return Colors.gray;
        case ButtonVariant.emailLogIn:
        case ButtonVariant.emailSignIn:
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
    borderWidth: props.variant === ButtonVariant.google ? 0 : 2,
}));

/**
 * creating the different button variants
 */
const Google = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.google,
}))({});
const EmailSignIn = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.emailSignIn,
}))({});
const EmailLogIn = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.emailLogIn,
}))({});
const Logout = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.logout,
}))({});
const Delete = styled(ButtonComponent).attrs(() => ({
    variant: ButtonVariant.delete,
}))({});

/**
 * export the differrent button variants
 */
export const AccountButton = {
    Google: Google,
    EmailLogIn: EmailLogIn,
    EmailSignIn: EmailSignIn,
    Logout: Logout,
    Delete: Delete,
};

/**
 * jest needs this for testing
 */
AccountButton.EmailLogIn.displayName = "EmailLogIn";
