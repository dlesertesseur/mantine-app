import React from "react";
import { IconHeartbeat } from "@tabler/icons";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { TOOLBAR_HIGHT } from "../../../../Constants";
import { useTranslation } from "react-i18next";

const Toolbar = ({ onOption = null }) => {
  const { t } = useTranslation();

  const handleOption = (option) => {
    if (onOption) {
      onOption(option);
    }
  };
  return (
    <Group
      px={"xs"}
      spacing={"xs"}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1],
        height: TOOLBAR_HIGHT + "px",
      })}
    >
      <Tooltip multiline width={200} label={t("tooltip.operatorsStatus")} position="bottom" withArrow>
        <ActionIcon variant="filled" color={"blue"}>
          <IconHeartbeat
            size={20}
            onClick={(event) => {
              handleOption("operatorsStatus");
            }}
          />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default Toolbar;
