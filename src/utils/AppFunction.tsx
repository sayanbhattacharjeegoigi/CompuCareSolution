import { Box, useToast } from "native-base";

export const toastMessage = (msg: string) => {
  const toast = useToast();
  toast.show({
    render: () => {
      return (
        <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
          {msg}
        </Box>
      );
    },
  });

  return;
};

export default class Helper {
  static isEmailValid(email: string) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !reg.test(email); // Returns true if email is valid (no match)
  }
}
