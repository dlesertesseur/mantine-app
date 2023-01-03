import React, { useEffect, useState } from "react";
import CrudFrame from "../../../Components/Crud/CrudFrame";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CreatePage } from "./CreatePage";
import { UpdatePage } from "./UpdatePage";
import { DeletePage } from "./DeletePage";
import { findAllProducts, findAllProductsByPage } from "../../../Features/Product";

const DynamicApp = ({ app }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { selectedRow, refreshData, page, itemsByPage, error, products} = useSelector((state) => state.product.value);

  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [loadGrid, setLoadGrid] = useState(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const parameters = {
      token: user.token,
    };
    dispatch(findAllProducts(parameters));

  }, [dispatch, user]);

  const onLoadGrid = () => {
    setLoadGrid(Date.now())
  }

  const cols = t("crud.product.columns", { returnObjects: true });
  const columns = [
    { headerName: cols[0], fieldName: "sku", align: "right" },
    { headerName: cols[1], fieldName: "ean", align: "right" },
    { headerName: cols[2], fieldName: "description", align: "left" },
    { headerName: cols[3], fieldName: "brand", align: "left" },
    { headerName: cols[4], fieldName: "statuc", align: "left" },
  ];

  const ret =
    rows ? (
      <CrudFrame
        app={app}
        columns={columns}
        data={rows}
        rowSelected={rowId}
        setRowSelected={setRowId}
        enableCreateButton={true}
        createPage={<CreatePage user={user} back={"../"} onLoadGrid={onLoadGrid}/>}
        updatePage={
          <UpdatePage user={user} back={"../"} rowId={rowId} onLoadGrid={onLoadGrid}/>
        }
        deletePage={
          <DeletePage user={user} back={"../"} rowId={rowId} onLoadGrid={onLoadGrid}/>
        }
      />
    ) : null;

  return ret;
};

export default DynamicApp;
