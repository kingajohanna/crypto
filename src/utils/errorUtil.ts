/**
 * format firebase auth error messages
 */
export const errorToMessage = (error: Error) => {
    return error.toString().split("] ", 2)[1];
};
