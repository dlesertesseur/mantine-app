import React, { useEffect, useState } from "react";
import CrudFrame from "../../../Components/Crud/CrudFrame";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CreatePage } from "./CreatePage";
import { UpdatePage } from "./UpdatePage";
import { DeletePage } from "./DeletePage";
import { findAllProducts, setSelectedRowId } from "../../../Features/Product";

const DynamicApp = ({ app }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { products, selectedRowId, refreshData } = useSelector((state) => state.product.value);

  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const parameters = {
      token: user.token,
    };
    dispatch(findAllProducts(parameters));
  }, [dispatch, user, refreshData]);

  // useEffect(() => {
  //   setActivePage(page);
  //   navigate(page);
  // }, [navigate, page]);

  // useEffect(() => {
  //   console.log("Product :: navigate(" + activePage + ")");
  //   navigate(activePage);
  // }, [activePage, navigate]);

  useEffect(() => {
    const ret = products?.map((p) => {
      const r = {
        id: p.id,
        sku: p.sku,
        ean: p.ean,
        description: p.description,
        brand: p.brand.name,
        brandId: p.brand.id,
        countryName: p.countryOfOrigin.name,
        countryId: p.countryOfOrigin.id,
        status: p.status,
      };
      return r;
    });

    setRows(ret);
  }, [products]);

  // const onLoadGrid = () => {
  //   setLoadGrid(Date.now());
  // };

  const cols = t("crud.product.columns", { returnObjects: true });
  const columns = [
    { headerName: cols[0], fieldName: "sku", align: "right" },
    { headerName: cols[1], fieldName: "ean", align: "right" },
    { headerName: cols[2], fieldName: "description", align: "left" },
    { headerName: cols[3], fieldName: "brand", align: "left" },
    { headerName: cols[4], fieldName: "countryName", align: "left" },
    { headerName: cols[5], fieldName: "status", align: "left" },
  ];

  const ret = rows ? (
    <CrudFrame
      app={app}
      columns={columns}
      data={rows}
      rowSelected={selectedRowId}
      setRowSelected={(id) => {
        dispatch(setSelectedRowId(id));
      }}
      enableCreateButton={true}
      createPage={<CreatePage />}
      updatePage={<UpdatePage />}
      deletePage={<DeletePage />}
    />
  ) : null;

  return ret;
};

export default DynamicApp;
