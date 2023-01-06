import React from "react";
import CategoryPage from "./CategoryPage";
import ProductsListPage from "./ProductsListPage";
import { useTranslation } from "react-i18next";
import { Divider, Stack, Text } from "@mantine/core";
import { findTranslatedField } from "../../../Util";
import { Route, Routes } from "react-router-dom";

const DynamicApp = ({ app }) => {
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

      <Routes>
        <Route path="/categoryPage" element={<CategoryPage />} />
        <Route path="/addProducts" element={<ProductsListPage />} />
      </Routes>
    </Stack>
  );
};

export default DynamicApp;
