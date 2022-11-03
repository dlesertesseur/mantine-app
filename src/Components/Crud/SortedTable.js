import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Button,
  Stack,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  selectedRow: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.blue[3],
  },
  th: {
    padding: "0 !important",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.blue[0],
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.blue[1],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  header: {
    position: "sticky",
    top: -1,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query)));
}

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function SortedTable({ data, columns, filterControl = null }) {
  const { classes, cx } = useStyles();
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [rowSelected, setRowSelected] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setRowSelected(null);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
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
        {columns.map((f) => (
          <td key={f.fieldName}>{row[f.fieldName]}</td>
        ))}
      </tr>
    );

    return ret;
  });

  return (
    <Stack>
      <Group position="apart">
        <Group spacing="xs">
          <Button
            onClick={() => {
              navigate("./create");
            }}
          >
            {t("label.crud.create")}
          </Button>
          <Button
            onClick={() => {
              navigate("./update");
            }}
            disabled={!rowSelected ? true : false}
          >
            {t("label.crud.update")}
          </Button>
          <Button
            onClick={() => {
              navigate("./delete");
            }}
            disabled={!rowSelected ? true : false}
          >
            {t("label.crud.delete")}
          </Button>

          {filterControl !== null ? filterControl : null}
        </Group>
        <Group grow>
          <TextInput
            placeholder={t("placeholder.search")}
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
        </Group>
      </Group>

      <ScrollArea sx={{ height: 700 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table
          horizontalSpacing="xs"
          verticalSpacing="xs"
          striped
          highlightOnHover
          withBorder
          withColumnBorders
          //sx={{ tableLayout: "fixed", minWidth: 700 }}
        >
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              {columns.map((h, index) => (
                <Th
                  key={index}
                  sorted={sortBy === h.fieldName}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(h.fieldName)}
                >
                  {h.headerName}
                </Th>
              ))}
            </tr>
          </thead>
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
    </Stack>
  );
}
