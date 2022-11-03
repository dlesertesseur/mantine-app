import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findAllSites } from "../../../DataAccess/Sites";
import CrudFrame from "../../../Components/Crud/CrudFrame";
import DummyPage from "../../../Components/DummyPage";
import { useTranslation } from "react-i18next";

const DynamicApp = ({ app }) => {
  const { user } = useSelector((state) => state.auth.value);
  const [sites, setSites] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    const params = {
      token: user.token,
    };
    findAllSites(params).then((ret) => {
      setSites(ret);
    });
  }, [user]);

  const cols = t("crud.site.columns", { returnObjects: true });
  const columns = [
    { headerName: cols[0], fieldName: "name" },
    { headerName: cols[1], fieldName: "address" },
    { headerName: cols[2], fieldName: "phone" },
    { headerName: cols[3], fieldName: "contextName" },
  ];

  const ret =
    sites.length > 0 ? (
      <CrudFrame
        app={app}
        columns={columns}
        data={sites}
        pages={1}
        createPage={<DummyPage title={"CREATA SITE"} description={"ABM DE SITIOS"} back={"../"} />}
        updatePage={<DummyPage title={"UPDATE SITE"} description={"ABM DE SITIOS"} back={"../"} />}
        deletePage={<DummyPage title={"DELETE SITE"} description={"ABM DE SITIOS"} back={"../"} />}
      />
    ) : null;

  return ret;
};

export default DynamicApp;
