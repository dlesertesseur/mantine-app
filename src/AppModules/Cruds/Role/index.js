import React, { useEffect, useState } from "react";
import CrudFrame from "../../../Components/Crud/CrudFrame";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CreatePage } from "./CreatePage";
import { UpdatePage } from "./UpdatePage";
import { DeletePage } from "./DeletePage";
import { findAllRoles } from "../../../DataAccess/Roles";
import { findAllContext } from "../../../DataAccess/Context";

const DynamicApp = ({ app }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [loadGrid, setLoadGrid] = useState(null);
  const [contexts, setContexts] = useState(null);

  useEffect(() => {
    const params = {
      token: user.token,
    };
    findAllRoles(params).then((ret) => {
      const data = ret.map((m) => {
        const row = { id: m.id, name: m.name, context: m.context.name };
        return(row);
      });
      setRows(data);
    });
  }, [user, loadGrid]);

  const onLoadGrid = () => {
    setLoadGrid(Date.now());
  };

  useEffect(() => {
    const params = {
      token: user.token,
    };
    findAllContext(params).then((ret) => {
      setContexts(ret);
    });
  }, [user]);

  const cols = t("crud.role.columns", { returnObjects: true });
  const columns = [
    { headerName: cols[0], fieldName: "name", align: "left" },
    { headerName: cols[1], fieldName: "context", align: "left" },
  ];

  const ret =
    rows.length > 0 ? (
      <CrudFrame
        app={app}
        columns={columns}
        data={rows}
        rowSelected={rowId}
        setRowSelected={setRowId}
        enableCreateButton={true}
        createPage={<CreatePage user={user} back={"../"} onLoadGrid={onLoadGrid} contexts={contexts}/>}
        updatePage={<UpdatePage user={user} back={"../"} rowId={rowId} onLoadGrid={onLoadGrid} contexts={contexts}/>}
        deletePage={<DeletePage user={user} back={"../"} rowId={rowId} onLoadGrid={onLoadGrid} contexts={contexts}/>}
      />
    ) : null;

  return ret;
};

export default DynamicApp;
