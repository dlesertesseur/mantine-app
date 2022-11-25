import React from "react";
import SortedTable from "./SortedTable";
import { Divider, Stack, Text } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { findTranslatedField } from "../../Util";
import { useTranslation } from "react-i18next";
import uuid from "react-uuid";

const CrudFrame = ({
  app,
  data,
  columns,
  rowSelected,
  setRowSelected,
  enableCreateButton,
  createPage,
  updatePage,
  deletePage,
  relationshipPages,
  filterControl = null,
  loading = false,
}) => {
  const { i18n } = useTranslation();

  return (
    <Stack
      justify="stretch"
      spacing="xs"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        height: "100%",
        width: "100%",
      })}
    >
      <Stack
        spacing={0}
        align={"flex-start"}
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          height: "48px",
        })}
      >
        <Text size="xl" weight={700}>
          {findTranslatedField(i18n.language, app, "name")}
        </Text>
        <Text size="xs" color="dimmed">
          {findTranslatedField(i18n.language, app, "description")}
        </Text>
      </Stack>
      <Divider />
      <Stack
        justify="flex-start"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          height: "550px",
        })}
      >
        <Routes>
          <Route
            path="/"
            element={
              <SortedTable
                data={data}
                columns={columns}
                filterControl={filterControl}
                loading={loading}
                enableCreateButton={enableCreateButton}
                rowSelected={rowSelected}
                setRowSelected={setRowSelected}
                relationship={relationshipPages}
              />
            }
          />
          <Route path="/create" element={createPage} />
          <Route path="/update" element={updatePage} />
          <Route path="/delete" element={deletePage} />

          {relationshipPages?.map((r) => (
            <Route key={uuid()} path={r.path} element={r.element} />
          ))}
        </Routes>
      </Stack>

      {/* <Group
        position="center"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        })}
      >
        <Pagination total={2}/>
      </Group> */}
    </Stack>
  );
};

export default CrudFrame;
