import React from "react";
import LanguageSelector from "./LanguageSelector";
import { Group, ActionIcon, useMantineColorScheme, Title } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import UserButton from "./UserButton";
import { useTranslation } from "react-i18next";

export default function CustomHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { t } = useTranslation();
  return (
    <Group position="apart" align={"center"} sx={{ width: "100%" }}>
      <Group>
        {/* <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
          <Image
            radius="xs"
            src="/images/connexa_logo.jpeg"
            alt="logo"
          />
        </div> */}

        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          {t("main.title")}
        </Title>

      </Group>
      <Group>
        <UserButton />
        <LanguageSelector />
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={36}>
          {colorScheme === "dark" ? <IconSun size={16} /> : <IconMoonStars size={16} />}
        </ActionIcon>
      </Group>
    </Group>
  );
}
