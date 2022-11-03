import { createStyles, Text, Group, Image, Paper } from "@mantine/core";
import { IconPhoneCall } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function OrganizationInfo({ image, title, description, phone }) {
  const { classes } = useStyles();
  return (
    <Paper p="xs" withBorder>
      <Image src={image} />
      <Group noWrap>
        <div>
          <Text size="xs" sx={{ textTransform: "uppercase" }} weight={700} color="dimmed">
            {title}
          </Text>

          <Text size="xs" weight={500} className={classes.name}>
            {description}
          </Text>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {phone}
            </Text>
          </Group>
        </div>
      </Group>
    </Paper>
  );
}
