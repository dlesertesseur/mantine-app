import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  // Footer,
  //Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import CustomHeader from "./CustomHeader";
import CustomNavbar from "./CustomNavbar";
// import CustomFooter from "./CustomFooter";
import CustomBody from "./CustomBody";

export default function CustomAppShell() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <CustomNavbar />
        </Navbar>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //    <CustomFooter/>
      //   </Footer>
      // }
      header={
        <Header height={60} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%"}}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <CustomHeader/>
          </div>
        </Header>
      }
    >
      <CustomBody />
    </AppShell>
  );
}
