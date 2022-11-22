import React, { useEffect } from "react";
import {
  IconDeviceFloppy,
  IconEditOff,
  IconPolygon,
  IconAdjustments,
  IconAdjustmentsOff,
  IconRulerMeasure,
  IconRuler3,
  IconCheck,
} from "@tabler/icons";
import { ActionIcon, Button, Divider, Group, Indicator, NumberInput, Switch, Tooltip } from "@mantine/core";
import { TOOLBAR_HIGHT } from "../../../../Constants";
import { useTranslation } from "react-i18next";
import { ImageSelctor } from "../Controls/ImageSelctor";

const Toolbar = ({
  onOption = null,
  children,
  editing,
  disabled = false,
  newParts = 0,
  imageSelected,
  adjustImage,
  setAdjustImage,
  showMeasurementPoints,
  setShowMeasurementPoints,
  distanceInMeters,
  setDistanceInMeters,
  defineRelationship,
  imageList
}) => {
  const { t } = useTranslation();

  const handleOption = (option, params) => {

    console.log("############", option, params);

    if (onOption) {
      onOption(option, params);
    }
  };

  const imageControls = () => {
    return (
      <Tooltip multiline width={200} label={t("label.adjustImage")} position="bottom" withArrow>
        <Switch
          radius={"lg"}
          size="lg"
          onLabel={<IconAdjustments size={18} />}
          offLabel={<IconAdjustmentsOff size={18} />}
          checked={adjustImage}
          onChange={(event) => setAdjustImage(event.currentTarget.checked)}
          disabled={disabled}
        />
      </Tooltip>
    );
  };

  const measurementControls = () => {
    return (
      <Group>
        <Indicator offset={2} size={12} position={"top-end"} color={"red"} withBorder dot={defineRelationship} inline >
          <Switch
            radius={"lg"}
            size="lg"
            onLabel={<IconRulerMeasure size={18} />}
            offLabel={<IconRuler3 size={18} />}
            checked={showMeasurementPoints}
            onChange={(event) => setShowMeasurementPoints(event.currentTarget.checked)}
            disabled={disabled}
          />
        </Indicator>
        {showMeasurementPoints ? (
          <>
            <NumberInput
              size="xs"
              value={distanceInMeters}
              onChange={setDistanceInMeters}
              sx={{ width: 60 }}
              precision={2}
              min={-1}
              step={0.05}
            />

            <ActionIcon
              color="blue"
              variant="filled"
              onClick={(event) => {
                handleOption("calculatePixelMeterRelation");
              }}
            >
              <IconCheck size={18} />
            </ActionIcon>

            <Divider orientation="vertical" />
          </>
        ) : null}
      </Group>
    );
  };

  return (
    <Group
      spacing={"xs"}
      position="apart"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[1],
        height: TOOLBAR_HIGHT + "px",
      })}
    >
      <Group px={"xs"} spacing={"xs"}>
        <Button
          leftIcon={<IconDeviceFloppy size={22} />}
          color="blue"
          size="xs"
          disabled={disabled ? true : editing}
          onClick={(event) => {
            handleOption("save");
          }}
        >
          {t("button.save")}
        </Button>

        <Divider orientation="vertical" />

        <Button
          leftIcon={<IconEditOff size={22} />}
          color="blue"
          size="xs"
          disabled={disabled ? true : !editing}
          onClick={(event) => {
            handleOption("finishEditing");
          }}
        >
          {t("button.finishEditing")}
        </Button>

        <Indicator offset={8} size={12} position="top-end" color="red" withBorder dot={newParts > 0}>
          <Button
            leftIcon={<IconPolygon size={22} />}
            color="blue"
            size="xs"
            disabled={disabled ? true : editing}
            onClick={(event) => {
              handleOption("addPart");
            }}
          >
            {t("button.addPart")}
          </Button>
        </Indicator>

        <Divider orientation="vertical" />

        <ImageSelctor imageList={imageList} disabled={disabled} loadImage={handleOption} />
        {imageSelected ? imageControls() : null}

        <Divider orientation="vertical" />

        {imageSelected ? measurementControls() : null}
      </Group>
      <Group px={"xs"} spacing={"xs"}>
        {children}
      </Group>
    </Group>
  );
};

export default Toolbar;
