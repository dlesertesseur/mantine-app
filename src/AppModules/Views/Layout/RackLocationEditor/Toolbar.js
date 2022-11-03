import React from "react";
import { IconRefresh, IconDeviceFloppy } from "@tabler/icons";
import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import { TOOLBAR_HIGHT } from "../../../../Constants";
import { useTranslation } from "react-i18next";
import LockAction from "../../../../Components/LockAction";

const Toolbar = ({ onOption = null, lockMove, setLockMove }) => {
  const { t } = useTranslation();

  const handleOption = (option) => {
    if (onOption) {
      onOption(option);
    }
  };
  return (
    <Group
      position="apart"
      px={0}
      spacing={"xs"}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1],
        height: TOOLBAR_HIGHT + "px",
      })}
    >
      <Group px={"xs"} spacing={"xs"}>
        <Tooltip label={t("button.save")} position="bottom" withArrow>
          <ActionIcon variant="filled" color={"blue"}>
            <IconDeviceFloppy
              size={20}
              onClick={(event) => {
                handleOption("save");
              }}
            />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t("button.refresh")} position="bottom" withArrow>
          <ActionIcon variant="filled" color={"blue"}>
            <IconRefresh
              size={20}
              onClick={(event) => {
                handleOption("refresh");
              }}
            />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Group px={"xs"} spacing={"xs"}>
        <LockAction checked={lockMove} setChecked={setLockMove} toolTip={t("tooltip.lockMove")} />
      </Group>
    </Group>
  );
};

export default Toolbar;
