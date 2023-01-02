import React, { useEffect, useState } from "react";
import CrudFrame from "../../../Components/Crud/CrudFrame";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CreatePage } from "./CreatePage";
import { UpdatePage } from "./UpdatePage";
import { DeletePage } from "./DeletePage";
import { findAllContexts, findAllRoles } from "../../../Features/Role";
import { ApplicationsPage } from "./ApplicationsPage";

const DynamicApp = (param) => {
  const { app } = param;
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth.value);
  const { action, roles } = useSelector((state) => state.role.value);

  const [rowId, setRowId] = useState(null);
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      token: user.token,
    };

    dispatch(findAllRoles(params));
  }, [user, action, dispatch]);

  useEffect(() => {
    const params = {
      token: user.token,
    };
    dispatch(findAllContexts(params));
  }, [dispatch, user]);

  useEffect(() => {
    const r = roles?.map((m) => {
      const row = { id: m.id, name: m.name, context: m.context.name };
      return row;
    });
    setRows(r);
  }, [roles]);

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
        createPage={<CreatePage />}
        updatePage={<UpdatePage rowId={rowId} />}
        deletePage={<DeletePage rowId={rowId} />}
        relationshipPages={[
          {
            path: "/applications",
            key: "crud.role.label.applications",
            element: <ApplicationsPage rowId={rowId} />,
          },
        ]}
      />
    ) : null;

  return ret;
};

export default DynamicApp;
