import React, { useEffect, useState } from "react";
import CrudFrame from "../../../Components/Crud/CrudFrame";
import DummyPage from "../../../Components/DummyPage";
import { useSelector } from "react-redux";
import { findAllSites } from "../../../DataAccess/Sites";
import { useTranslation } from "react-i18next";
import { FilterControl } from "./FilterControl";
import { findRacksByZoneId } from "../../../DataAccess/Surfaces";

const DynamicApp = ({ app }) => {
  const { user } = useSelector((state) => state.auth.value);
  const [loadingData, setLoadingData] = useState(true);
  const [racks, setRacks] = useState([]);

  const { t } = useTranslation();

  const onFilter = (site, floor) => {
    console.log("onFilter -> ", site, floor);

    const params = {
      token: user.token,
      siteId: site,
      floorId: floor,
    };

    setLoadingData(true);
    findRacksByZoneId(params).then((ret) => {
      setLoadingData(false);
      setRacks(ret);

      console.log("####### LOADING DATA #######", ret);
    });
  };

  const cols = t("crud.site.columns", { returnObjects: true });
  const columns = [{ headerName: cols[0], fieldName: "name" }];

  const ret = (
    <CrudFrame
      app={app}
      columns={columns}
      data={racks}
      pages={1}
      createPage={<DummyPage title={"CREATA SITE"} description={"ABM DE SITIOS"} back={"../"} />}
      updatePage={<DummyPage title={"UPDATE SITE"} description={"ABM DE SITIOS"} back={"../"} />}
      deletePage={<DummyPage title={"DELETE SITE"} description={"ABM DE SITIOS"} back={"../"} />}
      filterControl={<FilterControl onFilter={onFilter} />}
    />
  );

  return ret;
};

export default DynamicApp;
