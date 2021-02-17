import React, { useState } from "react";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import Box from "../../components/Box";
import MotionWrapper from "../../components/MotionWrapper";
import Upload from "./Upload";
import Download from "./Download";

const components = [
  { id: "Upload", component: Upload },
  { id: "Download", component: Download },
];

function FileSharing() {
  const [selectPage, setSelectPage] = useState("");

  const Component = components.find((c) => c.id === selectPage)?.component;

  return (
    <MotionWrapper
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -400, opacity: 0 }}
      transition={{
        duration: 0.5,
        damping: 12,
        stiffness: 100,
      }}
    >
      <Box
        elevation={2}
        p="1rem"
        width={["98vw", "95vw", "90vw"]}
        minHeight="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <AnimateSharedLayout>
          <Stack
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            spacing="2rem"
          >
            <Text textAlign="center" fontSize="1.5rem">
              Conun IPFS Network
            </Text>
            <HStack justifyContent="space-around">
              {components.map((c) => (
                <motion.div key={c.id} layoutId={c.id}>
                  <Button
                    _focus={{ outline: "none" }}
                    type="button"
                    onClick={() => setSelectPage(c.id)}
                    colorScheme={c.id === "Upload" ? "blue" : "green"}
                  >
                    {c.id}
                  </Button>
                </motion.div>
              ))}
            </HStack>
          </Stack>

          <AnimatePresence>
            {selectPage && <Component onClose={() => setSelectPage("")} />}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Box>
    </MotionWrapper>
  );
}

export default FileSharing;
