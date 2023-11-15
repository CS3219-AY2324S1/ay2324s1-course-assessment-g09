import { Button, HStack } from "@chakra-ui/react";
import axios from "axios";
import router from "next/router";

const LogoutButton = () => {
  const handleLogout = async () => {
    axios
      .post(`/auth_service/userauth/signout`, {}, { withCredentials: true })
      .then((response) => {
        // if (response.statusText === "OK") {
        router.push("/signin");
        window.sessionStorage.removeItem("login");
        // }
      })
      .catch((error) => {
        console.log("signout", error);
      });
  };
  return (
    <HStack>
      <Button
        colorScheme="red"
        onClick={handleLogout}
        mx={4}
        my={1}
        height="40px"
      >
        Logout
      </Button>
    </HStack>
  );
};

export default LogoutButton;
