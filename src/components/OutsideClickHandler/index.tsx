import React from "react";

import { default as Wrapper } from "react-outside-click-handler";

interface OutsideClickHandlerProps {
  children: React.ReactNode;
  onClickOutside: () => void;
}

function OutsideClickHandler({
  children,
  onClickOutside,
}: OutsideClickHandlerProps) {
  return <Wrapper onOutsideClick={onClickOutside}>{children}</Wrapper>;
}

export default OutsideClickHandler;
