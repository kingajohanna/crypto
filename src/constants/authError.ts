/*
    signup and login errors
*/
export enum authError {
    passwordsMatch = "Passwords do not match, please retype.",
    invalidPassword = "Invalid password. Minimum 6 characters with any latin alphabet, numbers and characters",
    invalidEmail = "The email address is badly formatted.",
    missingData = "Email or password is missing",
    missingEmail = "An email address must be provided",
}
