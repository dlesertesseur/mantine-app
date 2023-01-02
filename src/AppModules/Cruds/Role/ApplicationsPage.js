import ResponceNotification from "../../../Modal/ResponceNotification";
import CheckTable from "../../../Components/Crud/CheckTable";
import { Title, LoadingOverlay, Button, Stack, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findAllApplications,
  findAllApplicationsByRoleId,
  findRoleById,
} from "../../../Features/Role";


export function ApplicationsPage({ rowId }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.value);
  const {
    applications,
    applicationsByRole,
    selectedRole,
    error,
    errorMessage,
  } = useSelector((state) => state.role.value);

  const [rowSelected, setRowSelected] = useState(null);

  const cols = t("crud.application.columns", { returnObjects: true });
  const columns = [
    { headerName: cols[1], fieldName: "name", align: "left" },
    { headerName: cols[2], fieldName: "description", align: "left" },
  ];

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const params = {
      token: user.token,
      id: rowId,
    };
    dispatch(findRoleById(params));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowId, user]);

  useEffect(() => {
    if (selectedRole) {
      const params = { token: user.token };
      dispatch(findAllApplications(params));
    }
  }, [dispatch, user, selectedRole]);

  useEffect(() => {
    if (selectedRole && applications) {
      const params = { token: user.token, roleId: selectedRole.id };
      dispatch(findAllApplicationsByRoleId(params));
    }
  }, [dispatch, user, applications, selectedRole]);

  return (
    <Stack
      justify="stretch"
      spacing="xs"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        height: "100%",
        width: "100%",
      })}
    >
      <ResponceNotification
        opened={error}
        onClose={onClose}
        code={errorMessage}
        title={t("status.error")}
        text={errorMessage}
      />
      <LoadingOverlay
        overlayOpacity={0.5}
        visible={
          !(applications && selectedRole && applicationsByRole) && !error
        }
      />

      <Title
        mb={"lg"}
        order={2}
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 700,
        })}
      >
        {t("crud.role.title.assignApps") + " : " + selectedRole?.name}
      </Title>

      <CheckTable
        data={applications}
        checkedIds={applicationsByRole.map((role) => role.id)}
        columns={columns}
        loading={false}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        height={400}
      />

      <Group position="right" mt="xs" mb="xs" width="100%">
        <Button
          onClick={(event) => {
            navigate(-1);
          }}
        >
          {t("button.close")}
        </Button>
      </Group>
    </Stack>
  );
}
