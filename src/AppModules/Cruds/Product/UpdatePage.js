import ResponceNotification from "../../../Modal/ResponceNotification";
import {
  TextInput,
  Title,
  Container,
  Button,
  Group,
  LoadingOverlay,
  Select,
  ScrollArea,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  clearError,
  findAllCountries,
  findAllImagesByProductId,
  findProductById,
  setActivePage,
  update,
  uploadImage,
} from "../../../Features/Product";
import { useDispatch, useSelector } from "react-redux";
import { findAllBrands } from "../../../Features/Brand";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconX, IconPhoto } from "@tabler/icons";
import { Carousel } from "@mantine/carousel";
import ImageCard from "../../../Components/ImageCard";
import { API } from "../../../Constants";

export function UpdatePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useMantineTheme();

  const { user, projectSelected } = useSelector((state) => state.auth.value);
  const { brands } = useSelector((state) => state.brand.value);
  const { countries, error, errorCode, errorMessage, creating, selectedRowId, product, images } = useSelector(
    (state) => state.product.value
  );

  useEffect(() => {
    const parameters = {
      token: user.token,
    };
    dispatch(findAllBrands(parameters));
    dispatch(findAllCountries(parameters));
  }, [dispatch, user]);

  useEffect(() => {
    if (selectedRowId) {
      const params = {
        token: user.token,
        id: selectedRowId,
      };
      dispatch(findProductById(params));
    }
  }, [dispatch, selectedRowId, user]);

  useEffect(() => {
    if (product) {
      form.setFieldValue("sku", product.sku);
      form.setFieldValue("ean", product.ean);
      form.setFieldValue("description", product.description);
      form.setFieldValue("brand", product.brand.id);
      form.setFieldValue("countryOfOrigin", product.countryOfOrigin.id);

      const params = {
        token: user.token,
        id: product.id,
      };
      dispatch(findAllImagesByProductId(params));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const form = useForm({
    initialValues: {
      sku: "",
      ean: "",
      description: "",
      brand: "",
      countryOfOrigin: "",
    },

    validate: {
      sku: (val) => (val ? null : t("validation.required")),
      ean: (val) => (val ? null : t("validation.required")),
      description: (val) => (val ? null : t("validation.required")),
      brand: (val) => (val ? null : t("validation.required")),
      countryOfOrigin: (val) => (val ? null : t("validation.required")),
    },
  });

  const createTextField = (field) => {
    const ret = (
      <TextInput
        label={t("crud.product.label." + field)}
        placeholder={
          t("crud.product.placeholder." + field).startsWith("crud.") ? "" : t("crud.product.placeholder." + field)
        }
        {...form.getInputProps(field)}
      />
    );

    return ret;
  };

  const createSelectField = (field, data) => {
    const list = data?.map((c) => {
      return { value: c.id, label: c.name };
    });
    const ret = (
      <Select label={t("crud.product.label." + field)} data={list ? list : []} {...form.getInputProps(field)} />
    );

    return ret;
  };

  const onUpdate = (values) => {
    const params = {
      id: product.id,
      token: user.token,
      sku: values.sku,
      ean: values.ean,
      description: values.description,
      brand: values.brand,
      price: 0,
      currency: "PESO",
      status: "Activo",
      projectId: projectSelected.id,
      countryOfOrigin: values.countryOfOrigin,
      measurementTypeIdForContent: "Q",
      measurementUnitIdForContent: "UNIDADES",
      measurementTypeIdForSale: "Q",
      measurementUnitIdForSale: "UNIDADES",
      measurementTypeIdForPrice: "Q",
      measurementUnitIdForPrice: "UNIDADES",
    };

    dispatch(update(params));
  };

  const onClose = () => {
    dispatch(clearError());
  };

  const uploadFiles = (files) => {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", file.type);

    const params = {
      token: user.token,
      id: product.id,
      data: formData,
    };

    dispatch(uploadImage(params));
  };

  const onDelete = () => {};

  return (
    <Container size={"xl"} sx={{ width: "100%" }}>
      {error ? (
        <ResponceNotification opened={error} onClose={onClose} code={errorCode} title={error} text={errorMessage} />
      ) : null}

      <LoadingOverlay overlayOpacity={0.5} visible={creating} />
      <Container size={"sm"}>
        <Title
          mb={"lg"}
          order={2}
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          })}
        >
          {t("crud.product.title.update")}
        </Title>

        <form
          onSubmit={form.onSubmit((values) => {
            onUpdate(values);
          })}
        >
          <ScrollArea>
            <Group mb={"md"}>{createTextField("sku")}</Group>
            <Group mb={"md"}>{createTextField("ean")}</Group>
            <Group grow mb={"md"}>
              {createTextField("description")}
            </Group>
            <Group mb={"md"}>{createSelectField("brand", brands)}</Group>
            <Group mb={"md"}>{createSelectField("countryOfOrigin", countries)}</Group>

            {images ? (
              <Group grow mb="mb">
                <Carousel slideSize="70%" height={300} slideGap="md">
                  {images.map((img) => {
                    console.log(API.productImages.baseUrl + img.path);

                    return (
                      <Carousel.Slide key={img.path}>
                        <ImageCard
                          src={API.productImages.baseUrl + img.path}
                          alt={img.name}
                          name={img.name}
                          imageId={img.id}
                          onDelete={onDelete}
                        />
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
              </Group>
            ) : null}

            <Group grow mb="lg">
              <Dropzone
                onDrop={(files) => uploadFiles(files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
                  <Dropzone.Accept>
                    <IconUpload
                      size={50}
                      stroke={1.5}
                      color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={50} stroke={1.5} color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      {t("label.dropZone")}
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      {t("label.dropZoneSub")}
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            </Group>

            <Group position="right" mt="xl" mb="xs">
              <Button
                onClick={(event) => {
                  dispatch(setActivePage("./"));
                }}
              >
                {t("button.cancel")}
              </Button>
              <Button type="submit">{t("button.accept")}</Button>
            </Group>
          </ScrollArea>
        </form>
      </Container>
    </Container>
  );
}
