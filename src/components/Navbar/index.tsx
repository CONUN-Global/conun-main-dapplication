import React from "react";
import { HStack } from "@chakra-ui/react";

import UserBox from "../UserBox";
import Link from "../Chakra/Link";
import Icon from "../Chakra/Icon";

import { ReactComponent as Menu } from "../../assets/icons/menu.svg";

function Navbar() {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      position="absolute"
      top="0"
      padding="0.5rem 1rem"
      boxShadow="0 2px 4px 0 rgba(0,0,0,0.15)"
      bgColor="#f4f4f4"
    >
      <Link to="/home">
        <Icon height={6} width={6} icon={Menu} fill="#3E5265" />
      </Link>
      <UserBox />
    </HStack>
  );
}

export default Navbar;
