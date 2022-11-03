import React, { useEffect, useState } from "react";
import { createStyles, Select } from "@mantine/core";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const SiteSelector = ({ label }) => {
  const { projectSelected, siteSelected } = useSelector((state) => state.auth.value);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    if (projectSelected !== null) {
      const sites = projectSelected?.sites?.map((s) => {
        return { value: s.id, label: s.name };
      });

      setSites(sites);
    }
  }, [projectSelected]);

  const { classes } = useStyles();

  return (
    <Select
      style={{ zIndex: 2 }}
      data={sites}
      label={label}
      classNames={classes}
      value={siteSelected?.id}
    />
  );
};

export default SiteSelector;
