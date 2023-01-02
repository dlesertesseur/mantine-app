import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Text,
  LoadingOverlay,
  Checkbox,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// const useStyles = createStyles((theme) => ({
//   selectedRow: {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.blue[3],
//   },
//   th: {
//     padding: "0 !important",
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.blue[0],
//   },

//   control: {
//     width: "100%",
//     padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

//     "&:hover": {
//       backgroundColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[6]
//           : theme.colors.blue[1],
//     },
//   },

//   icon: {
//     width: 21,
//     height: 21,
//     borderRadius: 21,
//   },

//   header: {
//     position: "sticky",
//     top: -1,
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//     transition: "box-shadow 150ms ease",

//     "&::after": {
//       content: '""',
//       position: "absolute",
//       left: 0,
//       right: 0,
//       bottom: 0,
//       borderBottom: `1px solid ${
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[3]
//           : theme.colors.gray[2]
//       }`,
//     },
//   },

//   scrolled: {
//     boxShadow: theme.shadows.sm,
//   },
// }));

export default function CheckTable({
  data,
  columns,
  loading = false,
  rowSelected,
  setRowSelected,
  checkedIds,
  height,
}) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [sortedData, setSortedData] = useState(data);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const formatData = (data, format) => {
    let ret = data;

    if (format) {
      switch (format) {
        case "round":
          ret = Math.round(data * 100) / 100;
          break;
        case "bool":
          ret = data ? t("label.true") : t("label.false");
          break;

        default:
          break;
      }
    }
    return ret;
  };

  const rows = sortedData.map((row) => {
    const ret = (
      <tr
        key={row.id}
        onClick={() => {
          setRowSelected(row.id);
        }}
        style={{ backgroundColor: row.id === rowSelected ? "#74C0FC" : "" }}
      >
        <td key={"check"} align={"center"}>
          <Checkbox
            align={"center"}
            checked={checkedIds?.includes(row.id)}
            onChange={(event) => console.log("check app ----> ", row.id)}
          />
        </td>
        {columns.map((f) => (
          <td key={f.fieldName} align={f.align ? f.align : "center"}>
            {formatData(row[f.fieldName], f.format)}
          </td>
        ))}
      </tr>
    );

    return ret;
  });

  return (
    <ScrollArea
      sx={{ height: height }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <Table
        horizontalSpacing="xs"
        verticalSpacing="xs"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(columns).length}>
                <Text weight={500} align="center">
                  {t("label.noData")}
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
