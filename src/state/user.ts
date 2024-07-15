import { createGlobalState } from ".";

type userState = {
    name: string;
    isSignedIn: boolean;
}

/* Sample data to be stored and display on ui  */
export const useUserState = createGlobalState<userState>('user', {
    name: 'izhar',
    isSignedIn: true,
})
