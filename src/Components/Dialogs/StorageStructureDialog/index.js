import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { findRackById } from "../../../DataAccess/Surfaces";
import { Dialog, Group } from "@mantine/core";

const StorageStructureDialog = ({ open, setOpen, storageStructure }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth.value);

  const [loadingData, setLoadingData] = useState(true);
  const [rack, setRack] = useState(null);

  useEffect(() => {
    const params = {
      token: user.token,
      id: storageStructure.id,
    };

    findRackById(params).then((ret) => {
      setLoadingData(false);
      setRack(ret);
    });

    console.log("StorageStructureDialog::useEffect");
  }, [storageStructure, user]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog fullScreen={false} fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose}>
      {/* <DialogTitle>{t("dialog.storageStructure.title") + " " + storageStructure.name}</DialogTitle>
      <DialogContent>
        <Group display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {loadingData ? (
            <CircularProgress sx={{ marginTop: 10 }} />
          ) : (
            <StorageStructureView
              dimensions={{ width: 1000, height: 600 }}
              rack={rack}
              pixelMeterRelation={150.0}
              showCenterPoint={false}
            />
          )}
        </Group>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          {t("button.close")}
        </Button>
      </DialogActions>

      {console.log("REPAINT ----> StorageStructureDialog " + Date.now())} */}
    </Dialog>
  );
};

export default StorageStructureDialog;
