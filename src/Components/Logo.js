import React from "react";
import { Group, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const Logo = () => {
  const { t } = useTranslation();

  return (
    <Group position="center" mb={"xl"}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {t("main.title")}
      </Title>{" "}
    </Group>
  );
};

export default Logo;
