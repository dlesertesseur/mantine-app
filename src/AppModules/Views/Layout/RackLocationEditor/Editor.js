import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import Footer from "./Footer";
import View2DRef from "../../../../Components/View2dRef";
import { useSelector } from "react-redux";
import { Stack } from "@mantine/core";
import { DIVIDER_HIGHT, PIXEL_METER_RELATION, TOOLBAR_HIGHT, VIEW_HEADER_HIGHT } from "../../../../Constants";
import { savePosAndRots } from "../../../../DataAccess/Surfaces";
import { FilterControl } from "../Controls/FilterControl";
import { findLayoutByFloorId, findRacksByZoneId } from "../../../../DataAccess/Surfaces";
import { t } from "i18next";
import { hideNotification, showNotification } from "@mantine/notifications";
import ViewHeader from "../../ViewHeader";

const Editor = ({ inspectRack, drawCenter = false, refresh, app }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { bodyContainerWidth, bodyContainerHeight } = useSelector((state) => state.app.value);
  const [selectedRack, setSelectedRack] = useState(null);
  const [savingData, setSavingData] = useState(false);
  const [unlockEditStorageStructures, setUnlockEditStorageStructures] = useState(false);
  const [siteId, setSiteId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [layouts, setLayouts] = useState(null);
  const [racks, setRacks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pixelmeterrelation, setPixelmeterrelation] = useState(null);
  const [attrs, setAttrs] = useState();

  useEffect(() => {
    if (selectedRack !== null) {
      selectedRack.rotationy = -Math.round(attrs.rotation);
      selectedRack.positionx = attrs.x / PIXEL_METER_RELATION;
      selectedRack.positionz = attrs.y / PIXEL_METER_RELATION;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attrs]);

  const onActorDblClick = (id) => {
    console.log("### Viewer ### onActorDblClick -> id:" + id);
    //inspectRack(actorId);
  };

  const onSelectActor = (id) => {
    const rack = racks.find((r) => r.id === id);
    setSelectedRack(rack);
  };

  const saveData = () => {
    setSavingData(true);

    showNotification({
      id: "savingData-notification",
      disallowClose: true,
      title: t("message.savingData"),
      message: t("message.savingDataSub"),
      loading: true,
    });

    const params = {
      token: user.token,
      siteId: siteId,
      floorId: floorId,
      racks: racks,
    };

    savePosAndRots(params).then(() => {
      setSavingData(false);
      hideNotification("savingData-notification");
    });
  };

  const refreshData = () => {
    refresh();
  };

  const onOption = (option) => {
    console.log("onOption() ---> " + option);

    if (option === "save") {
      saveData();
    }
    if (option === "refresh") {
      refreshData();
    }
  };

  const loadData = (site, floor) => {
    const params = {
      token: user.token,
      siteId: site.id,
      floorId: floor.id,
    };

    setUnlockEditStorageStructures(false);
    setSelectedRack(null);
    setLoading(true);

    const n = (1.0 / floor.pixelmeterrelation) * PIXEL_METER_RELATION;
    setPixelmeterrelation(n);

    findLayoutByFloorId(params).then((ret) => {
      setLayouts(ret);
      findRacksByZoneId(params).then((ret) => {
        setRacks(ret);
        setLoading(false);
      });
    });
  };

  const updateAttrs = (param) => {
    setAttrs({ ...param });
  };

  return (
    <Stack>
      <ViewHeader app={app} />

      <Stack
        justify="flex-start"
        spacing="0"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
          height: "100%",
          border: "solid 1px" + theme.colors.gray[4],
        })}
      >
        <Toolbar
          onOption={onOption}
          lockMove={unlockEditStorageStructures}
          setLockMove={setUnlockEditStorageStructures}
          disabled={savingData || loading || !racks}
        >
          <FilterControl
            siteId={siteId}
            setSiteId={setSiteId}
            floorId={floorId}
            setFloorId={setFloorId}
            onFilter={loadData}
            loading={loading}
            disabled={savingData}
          />
        </Toolbar>

        <View2DRef
          width={bodyContainerWidth}
          height={bodyContainerHeight - (TOOLBAR_HIGHT * 2 + 4 + VIEW_HEADER_HIGHT + DIVIDER_HIGHT)}
          layouts={layouts}
          pixelMeterRelation={pixelmeterrelation}
          racks={racks}
          onSelect={onSelectActor}
          onDblClick={onActorDblClick}
          enableActorRelocation={true}
          updateAttrs={updateAttrs}
          isLockStage={unlockEditStorageStructures}
        />
        <Footer seletedObject={selectedRack} />
        {console.log("REPAINT ----> Editor " + Date.now())}
      </Stack>
    </Stack>
  );
};

export default Editor;
