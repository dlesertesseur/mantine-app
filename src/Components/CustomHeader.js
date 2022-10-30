import React from "react";
import LanguageSelector from "./LanguageSelector";
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  Avatar,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

export default function CustomHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="apart" align={"center"} sx={{ width: "100%" }}>
      <Group>{/* <Logo colorScheme={colorScheme} /> */}</Group>
      <Group>
        <Avatar color="cyan" radius="xl">
          MK
        </Avatar>
        <LanguageSelector />
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={36}
        >
          {colorScheme === "dark" ? (
            <IconSun size={16} />
          ) : (
            <IconMoonStars size={16} />
          )}
        </ActionIcon>
      </Group>
    </Group>
  );
}
