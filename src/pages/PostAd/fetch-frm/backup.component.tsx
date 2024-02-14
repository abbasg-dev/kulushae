import { ReactNode, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone";
import {
  Stepper,
  Step,
  StepLabel,
  Switch,
  Typography,
  Stack,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { Box } from "@mui/system";
import FormBox from "components/form-box/form-box.component";
import CustomTelInput from "components/tel-input/tel-Input.component";
import ControlledButton from "components/button/button.component";
import ControlledSelect from "components/select/select.component";
import BasicDatePicker from "components/date-picker/date-picker.component";
import CustomDropzoneDialog from "components/custom-dropzone-dialog/custom-dropzone-dialog.component";
import MultipleSelect from "components/multiple-select/multiple-select.component";
import UseRadioGroup from "components/use-radio-group/use-radio-group.component";
import FormInput from "components/form-input/form-input.component";
import { FetchFormProps } from "interfaces/mui-components.model";
import { Amenities, FetchFrmData } from "interfaces/post-ad.model";
import { FETCH_AMENITIES } from "api/queries/form.queries";
export type CustomFetchFrm = {
  properties?: { fetchForm?: FetchFormProps[][] } | null | undefined;
  categoryId?: string;
  active?: number;
  setActive?: () => void;
  setData?: (data: { [key: string]: string | number | Date }) => void;
  data?: {
    [key: string]: string | number | Date;
  };
};
const FetchFrm = (props) => {
  const { t } = useTranslation("common");
  const { properties, categoryId, active, setActive, setData } = props;
  console.log("data1: ", properties);
  const [selectedStatus, setSelectedStatus] = useState<string | null>("true");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [savedFormData, setSavedFormData] = useState<FetchFrmData | null>(null);
  const imageSchema = yup.object().shape({
    url: active === 0 && yup.string().required("URL is required"),
    alt: active === 0 && yup.string().required("Alt text is required"),
    format:
      active === 0 &&
      yup
        .string()
        .matches(/(jpeg|jpg|png|gif)$/, "Invalid image format")
        .required("Image format is required"),
  });
  const arrayImageSchema =
    active === 0 &&
    yup
      .array()
      .of(imageSchema)
      .test("at-least-one-image", "At least one image is required", (value) => {
        return value && value.length > 0;
      });
  const testShape = {
    title: active === 0 && yup.string().required(),
    contact_number:
      active === 0 &&
      yup
        .string()
        .nullable()
        .test(
          "is-valid-phone",
          t("authentication.login.invalid_no_phone"),
          (value) => {
            if (value === null || value === "") {
              return true;
            }
            try {
              const phoneUtil =
                require("google-libphonenumber").PhoneNumberUtil.getInstance();
              const number = phoneUtil.parseAndKeepRawInput(value, "");
              return phoneUtil.isValidNumber(number);
            } catch (error) {
              return false;
            }
          }
        )
        .required(t("authentication.login.phone_no_required")),
    price:
      active === 0 &&
      yup
        .string()
        .required("Price is required")
        .test("is-double", "Price must be a valid double", (value) => {
          return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
        }),
    description:
      active === 0 && yup.string().required("Description is required"),
    images: arrayImageSchema,
    url_360:
      active === 0 &&
      yup.string().url("Must be a valid URL").required("URL 360 is required"),
    youtube_url:
      active === 0 &&
      yup
        .string()
        .url("Must be a valid URL")
        .required("Youtube URL is required"),
    annual_community_fee:
      active === 0 &&
      yup
        .string()
        .required("Annual Community Fee is required")
        .test(
          "is-double",
          "Annual Community Fee must be a valid double",
          (value) => {
            return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
          }
        ),
    furnished: active === 0 && yup.boolean().required("Furnished is required"),
    size:
      active === 0 &&
      yup
        .string()
        .required("Size is required")
        .test(
          "is-float",
          "Size must be a valid floating-point number",
          (value) => {
            return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
          }
        ),
    total_closing_fee:
      active === 0 &&
      yup
        .string()
        .required("Total Closing Fee is required")
        .test(
          "is-double",
          "Total Closing Fee must be a valid double",
          (value) => {
            return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
          }
        ),
    bedrooms: active === 0 && yup.string().required("Bedrooms is required"),
    bathrooms: active === 0 && yup.string().required("Bathrooms is required"),
    developer: active === 0 && yup.string().required("Developer is required"),
    ready_by:
      active === 0 &&
      yup
        .date()
        .required("Ready by is required")
        .test("is-valid-date", "Invalid Date", (value) => {
          return value instanceof Date && !isNaN(value.getTime());
        }),
    reference_number:
      active === 1 && yup.string().required("Reference Number is required"),
    buyer_transfer_fee:
      active === 1 &&
      yup
        .string()
        .required("Buyer Transfer Fee is required")
        .test("is-double", "Price must be a valid double", (value) => {
          return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
        }),
    seller_transfer_fee:
      active === 1 &&
      yup
        .string()
        .required("Seller Transfer Fee is required")
        .test("is-double", "Price must be a valid double", (value) => {
          return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
        }),
    maintenance_fee:
      active === 1 &&
      yup
        .string()
        .required("Maintenance Fee is required")
        .test("is-double", "Price must be a valid double", (value) => {
          return /^[+-]?([0-9]*[.])?[0-9]+$/.test(value);
        }),
    amenities:
      active === 0
        ? yup.mixed().nullable()
        : yup.array().of(yup.string()).nullable(),
  };
  const fetchFrmSchema1 = yup.object().shape(testShape);
  const fetchFrmSchema = useMemo(() => {
    const schema = {};
    properties?.fetchForm?.forEach((row) => {
      row
        .map((item) => ({
          ...item,
          field_extras: JSON.parse(item.field_extras),
        }))
        .forEach((item) => {
          console.log("item: ", item.field_extras);
          let validator;
          if (item.field_request_type === "BOOLEAN") {
            validator = yup.boolean();
          } else if (item.field_type === "date") {
            validator = yup.date();
          } else if (item.field_type === "file") {
            validator = yup.array();
          } else {
            validator = yup.string();
          }
          if (item.field_validation === "required") {
            validator = validator.required(
              `${item.field_extras.title} Field is required.`
            );
          }
          schema[item.field_name] = validator;
        });
    });
    const fetchSchema = yup.object().shape(schema);
    console.log("custom schema: ", schema);
    console.log("test shape: ", testShape);
    console.log(fetchSchema);
    console.log("schema1: ", fetchFrmSchema1);
    return {
      resolver: yupResolver<yup.AnyObjectSchema>(fetchSchema),
      defaultValues: {},
    };
  }, [properties]);
  console.log("schema: ", fetchFrmSchema);
  const fetchFrmMethods = useForm<FetchFrmData>(fetchFrmSchema);

  const {
    loading: isLoadingAmenities,
    error: errorLoadingAmenities,
    data: amenitiesList,
  } = useQuery<Amenities>(FETCH_AMENITIES, {
    variables: {
      showOnScreen: 1,
    },
  });
  useEffect(() => {
    if (errorLoadingAmenities) {
      console.log("error: ", errorLoadingAmenities);
    }
  }, [errorLoadingAmenities]);
  useEffect(() => {
    console.log("loading");
  }, [isLoadingAmenities]);
  const fetchFrmData = useMemo(() => {
    return {
      resolver: yupResolver<yup.AnyObjectSchema>(fetchFrmSchema1),
      defaultValues: {
        title: "",
        contact_number: "",
        price: "",
        description: "",
        images: [],
        url_360: "",
        youtube_url: "",
        annual_community_fee: "",
        furnished: false,
        size: "",
        total_closing_fee: "",
        bedrooms: "",
        bathrooms: "",
        developer: "",
        ready_by: new Date(),
        reference_number: "",
        buyer_transfer_fee: "",
        seller_transfer_fee: "",
        maintenance_fee: "",
        occupancy_status: selectedStatus,
        amenities: active === 0 ? null : active === 1 ? [] : null,
      },
    };
  }, [fetchFrmSchema1]);
  const fetchFrmMethods1 = useForm<FetchFrmData>(fetchFrmData);
  const {
    control,
    formState: { errors },
  } = fetchFrmMethods;
  const onSubmitFetchFrm: SubmitHandler<FetchFrmData> = async (data) => {
    console.log(data);
  };
  const handleNext = async () => {
    console.log(control);
    try {
      console.log("Before trigger");
      await fetchFrmMethods.trigger();
      console.log("After trigger");
      if (Object.keys(fetchFrmMethods.formState.errors).length === 0) {
        const formData = fetchFrmMethods.getValues();
        setSavedFormData((formData) => ({
          ...formData,
          reference_number: "",
          buyer_transfer_fee: "",
          seller_transfer_fee: "",
          maintenance_fee: "",
          occupancy_status: selectedStatus,
          amenities: [],
        }));
        fetchFrmMethods.reset({
          title: "",
          contact_number: "",
          price: "",
          description: "",
          images: [],
          url_360: "",
          youtube_url: "",
          annual_community_fee: "",
          furnished: false,
          size: "",
          total_closing_fee: "",
          bedrooms: "",
          bathrooms: "",
          developer: "",
          ready_by: new Date(),
          reference_number: "",
          buyer_transfer_fee: "",
          seller_transfer_fee: "",
          maintenance_fee: "",
          occupancy_status: selectedStatus,
          amenities: active === 0 ? null : active === 1 ? [] : null,
        });
        setActive((prevStep) => Math.min(Number(prevStep) + 1, totalSteps - 1));
      } else {
        console.log("Form has errors:", fetchFrmMethods.formState.errors);
      }
    } catch (error) {
      console.error("Error during handleNext:", error);
    }
  };
  const handleBack = () => {
    if (savedFormData) {
      fetchFrmMethods.reset(savedFormData);
    }
    setActive((prevStep) => Math.max(Number(prevStep) - 1, 0));
  };
  const handleSubmit = () => {
    fetchFrmMethods.handleSubmit(onSubmitFetchFrm)();
  };
  if (!properties || !properties?.fetchForm) {
    return null;
  }
  const { fetchForm } = properties;
  const flatten = (arr: any[]): any[] => {
    if (!Array.isArray(arr)) {
      return [arr];
    }
    return arr?.reduce((flat, toFlatten) => {
      return flat?.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  };
  const flattenedData = flatten(fetchForm);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const totalSteps = flattenedData.reduce((maxStep, formData) => {
    const innerData = JSON.parse(formData?.field_extras);
    return innerData?.next_step
      ? Math.max(maxStep, innerData?.next_step)
      : maxStep;
  }, 0);
  const onOccupancyStatusChange = (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    const value = typeof event === "string" ? event : event.target.value;
    setSelectedStatus(value || null);
  };
  const handleSelectChange = (options: string[]) => {
    setSelectedOptions(options);
  };
  const renderCommonFormInput = (
    formData: FetchFormProps,
    innerData: any,
    indexKey?: number
  ) => (
    <Box key={indexKey}>
      <Controller
        control={control}
        name={formData?.field_name as keyof FetchFrmData}
        rules={{
          required:
            formData?.field_validation === "required"
              ? true
              : formData?.field_validation === "optional"
              ? false
              : null,
        }}
        render={({ field, fieldState }) => (
          <>
            <FormInput
              required
              fullWidth
              placeholder={innerData?.title}
              id={formData?.field_id}
              type={
                formData?.field_type === "text"
                  ? "text"
                  : formData?.field_type === "price" ||
                    formData?.field_type === "float"
                  ? "number"
                  : ""
              }
              {...field}
              sx={{
                position: innerData?.position ? "relative" : "unset",
                textAlign: innerData?.alignment ? "left" : "unset",
                order: formData?.field_order ? formData?.field_order : "unset",
                width: formData?.field_size
                  ? `${formData?.field_size}%`
                  : "unset",
                border: fieldState?.error
                  ? "1px solid red"
                  : "1px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "4px",
                margin: "8px 0",
              }}
              onChange={(e) => {
                field.onChange(e);
                fetchFrmMethods.trigger(formData?.field_name);
              }}
            />
            {fieldState?.error && (
              <Typography color="red">
                {fieldState?.error.message as ReactNode}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
  const renderCommonSelect = (
    formData: FetchFormProps,
    innerData: any,
    indexKey?: number
  ) => (
    <Box key={indexKey}>
      <Controller
        name={formData?.field_name as keyof FetchFrmData}
        control={control}
        rules={{
          required: formData?.field_validation === "required" ? true : false,
        }}
        render={({ field, fieldState }) => (
          <>
            <ControlledSelect
              style={{
                position: innerData?.position ? "relative" : "unset",
                textAlign: innerData?.alignment ? "left" : "unset",
                order: formData?.field_order ? formData?.field_order : "unset",
                width: formData?.field_size
                  ? `${formData?.field_size}%`
                  : "unset",
              }}
              label={innerData?.title}
              data={innerData?.options}
              value={field.value}
              handleChange={(e) => {
                field.onChange(e);
                fetchFrmMethods.trigger(formData?.field_name);
              }}
              {...field}
            />
            {fieldState?.error && (
              <Typography color="red">
                {fieldState?.error.message as ReactNode}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
  const renderDatePicker = (
    formData: FetchFormProps,
    innerData: any,
    indexKey?: number
  ) => (
    <Box key={indexKey}>
      <Controller
        name={formData?.field_name as keyof FetchFrmData}
        control={control}
        defaultValue={new Date()}
        render={({ field, fieldState }) => (
          <>
            <BasicDatePicker label={innerData?.title} {...field} />
            {fieldState?.error && (
              <Typography color="red">
                {fieldState?.error.message as ReactNode}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
  const renderSwitchComponent = (
    formData: FetchFormProps,
    innerData: any,
    indexKey?: number
  ) => (
    <Box key={indexKey}>
      <Controller
        name="furnished"
        control={control}
        render={({ field }) => (
          <Switch
            {...label}
            required={formData?.field_validation === "required" ? true : false}
            id={formData?.field_id}
            title={innerData?.title}
            style={{
              position: innerData?.position ? "relative" : "unset",
              textAlign: innerData?.alignment ? "left" : "unset",
              order: formData?.field_order ? formData?.field_order : "unset",
              width: formData?.field_size
                ? `${formData?.field_size}%`
                : "unset",
            }}
            name={formData?.field_name as keyof FetchFrmData}
            onChange={(e) => {
              field.onChange(e);
              fetchFrmMethods.trigger("furnished");
            }}
          />
        )}
      />
    </Box>
  );
  const renderBackBtn = () => (
    <ControlledButton
      value="Back"
      disabled={active === 0}
      callBackFunc={handleBack}
    />
  );
  const renderActionButton = (
    formData: FetchFormProps,
    innerData: any,
    indexKey?: number
  ) => (
    <Box key={indexKey}>
      {setButtonAction("next_step", innerData, formData)}
      {setButtonAction("submit", innerData, formData)}
    </Box>
  );
  function setButtonAction(
    buttonAction: string,
    innerData: any,
    formData: FetchFormProps
  ) {
    const buttons = innerData?.button_action === buttonAction && (
      <ControlledButton
        customStyle={{
          position: innerData?.position ? "relative" : "unset",
          textAlign: innerData?.alignment ? "left" : "unset",
          order: formData?.field_order ? formData?.field_order : "unset",
          width: formData?.field_size ? `${formData?.field_size}%` : "unset",
        }}
        btnId={formData?.field_id}
        value={innerData?.title}
        name={formData?.field_name as keyof FetchFrmData}
        loadingButtonProps={{
          type:
            buttonAction === "submit"
              ? "submit"
              : buttonAction === "next_step"
              ? "button"
              : "reset",
          fullWidth: true,
          sx: { py: "0.8rem", mt: "1rem" },
        }}
        callBackFunc={buttonAction === "next_step" ? handleNext : undefined}
      />
    );
    return buttons;
  }
  function renderFields(
    fieldOne: string,
    renderFunction: (
      formData: FetchFormProps,
      innerData: any,
      index: number
    ) => JSX.Element,
    fieldTwo?: string
  ) {
    const fields = flattenedData
      .filter(
        (formData) =>
          formData?.field_name === fieldOne || formData?.field_name === fieldTwo
      )
      .map((formData: FetchFormProps, index: number) => {
        const innerData = JSON.parse(formData?.field_extras);
        return (
          <Box display={"flex"} key={index}>
            {renderFunction(formData, innerData, index)}
          </Box>
        );
      });

    return fields;
  }
  const totalClosingFeeAndSizeFields = renderFields(
    "total_closing_fee",
    renderCommonFormInput,
    "size"
  );
  const bedroomsAndBathroomsSelect = renderFields(
    "bedrooms",
    renderCommonSelect,
    "bathrooms"
  );
  const developerField = renderFields("developer", renderCommonFormInput);
  const readyByField = renderFields("ready_by", renderDatePicker);
  const communityFeeField = renderFields(
    "annual_community_fee",
    renderCommonFormInput
  );
  const furnishedField = renderFields("furnished", renderSwitchComponent);
  const nextBtn = renderFields("next", renderActionButton);
  const submitBtn = renderFields("submit", renderActionButton);
  const otherFields = flattenedData
    .filter(
      (formData) =>
        formData?.field_name !== "total_closing_fee" &&
        formData?.field_name !== "size" &&
        formData?.field_name !== "bedrooms" &&
        formData?.field_name !== "bathrooms" &&
        formData?.field_name !== "developer" &&
        formData?.field_name !== "ready_by" &&
        formData?.field_name !== "annual_community_fee" &&
        formData?.field_name !== "furnished" &&
        formData?.field_name !== "next" &&
        formData?.field_name !== "submit"
    )
    .map((formData: FetchFormProps, index: number) => {
      const {
        field_extras,
        field_id,
        field_name,
        field_order,
        field_size,
        field_validation,
        field_type,
      } = formData || {};
      const innerData = JSON.parse(field_extras);
      switch (field_type) {
        case "text":
        case "price":
        case "float":
          return renderCommonFormInput(formData, innerData, index);
        case "phone":
          return (
            <Box key={index}>
              <Controller
                name={field_name as keyof FetchFrmData}
                control={control}
                rules={{
                  required: field_validation === "required" ? true : false,
                }}
                render={({ field: { value, onChange }, fieldState }) => (
                  <>
                    <CustomTelInput
                      id={field_id}
                      label={innerData?.title}
                      style={{
                        position: innerData?.position ? "relative" : "unset",
                        textAlign: innerData?.alignment ? "left" : "unset",
                        order: field_order ? field_order : "unset",
                        width: field_size ? `${field_size}%` : "unset",
                        borderRadius: "4px !important",
                      }}
                      onChange={(e) => {
                        onChange(e);
                        fetchFrmMethods.trigger(field_name);
                      }}
                      value={value}
                      error={
                        errors[field_name] ? errors[field_name]?.message : ""
                      }
                    />
                    {fieldState?.error && (
                      <Typography color="red">
                        {fieldState?.error.message as ReactNode}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Box>
          );
        case "textview":
          return (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
              key={index}
            >
              <Controller
                name={field_name as keyof FetchFrmData}
                control={control}
                rules={{
                  required: field_validation === "required" ? true : false,
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextareaAutosize
                      id={field_id}
                      title={innerData?.title}
                      style={{
                        position: innerData?.position ? "relative" : "unset",
                        textAlign: innerData?.alignment ? "left" : "unset",
                        order: field_order ? field_order : "unset",
                        width: field_size ? `${field_size}%` : "unset",
                        borderRadius: "4px !important",
                        border: fieldState?.error
                          ? "1px solid red"
                          : "1px solid rgba(0, 0, 0, 0.20)",
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        fetchFrmMethods.trigger(field_name);
                      }}
                      minRows={3}
                      placeholder=""
                    />
                    {fieldState?.error && (
                      <Typography color="red">
                        {fieldState?.error.message as ReactNode}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Stack>
          );
        case "file":
          return (
            <Box key={index}>
              <Controller
                name={field_name as keyof FetchFrmData}
                control={control}
                defaultValue={[]}
                render={({ field, fieldState }) => (
                  <>
                    <CustomDropzoneDialog
                      title={innerData?.title}
                      onFilesChange={(newFiles: File[]) => {
                        const formattedFiles = newFiles.map((file) => ({
                          url: URL.createObjectURL(file),
                          alt: "Default Alt Text",
                          format: file.type.split("/")[1],
                        }));
                        field.onChange(formattedFiles);
                        fetchFrmMethods.trigger(field_name);
                      }}
                    />
                    {fieldState?.error && (
                      <Typography color="red" style={{ order: 1 }}>
                        {fieldState?.error.message as ReactNode}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Box>
          );
        case "switch":
          return renderSwitchComponent(formData, innerData, index);
        case "dropdown":
          return renderCommonSelect(formData, innerData, index);
        case "date":
          return renderDatePicker(formData, innerData, index);
        case "selection_popup":
          console.log("field name: ", field_name);
          return (
            <Box key={index}>
              <Controller
                name={field_name as keyof FetchFrmData}
                control={control}
                defaultValue={[]}
                render={({ fieldState }) => (
                  <>
                    <MultipleSelect
                      data={amenitiesList?.amenities}
                      option={selectedOptions}
                      setOption={(options: string[]) => {
                        handleSelectChange(options);
                        fetchFrmMethods.trigger(field_name);
                      }}
                      label="Select Options"
                    />
                    {fieldState?.error && (
                      <Typography color="red">
                        {fieldState?.error.message as ReactNode}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Box>
          );
        case "radio":
          return (
            <Box key={index}>
              <UseRadioGroup
                data={innerData?.options}
                handleChange={onOccupancyStatusChange}
                selectedValue={selectedStatus}
              />
            </Box>
          );
        case "button":
          return renderActionButton(formData, innerData, index);
        default:
          return null;
      }
    }) as JSX.Element[];
  console.log("options: ", selectedOptions);
  console.log("data: ", savedFormData);
  return (
    <Box>
      <Stepper activeStep={Number(active)} alternativeLabel>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          return (
            <Step key={`Step${stepNumber}`}>
              <StepLabel>{`Step ${stepNumber}`}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <FormBox
        onSubmit={active === fetchForm.length - 1 ? handleSubmit : handleNext}
        initialValues={{
          title: "",
          contact_number: "",
          price: "",
          description: "",
          images: [],
          url_360: "",
          youtube_url: "",
          annual_community_fee: "",
          furnished: false,
          size: "",
          total_closing_fee: "",
          bedrooms: "",
          bathrooms: "",
          developer: "",
          ready_by: new Date(),
          reference_number: "",
          buyer_transfer_fee: "",
          seller_transfer_fee: "",
          maintenance_fee: "",
          occupancy_status: selectedStatus,
          amenities: active === 0 ? null : active === 1 ? [] : null,
        }}
        sx={{ display: "grid" }}
        methods={fetchFrmMethods}
      >
        {otherFields}
        <Box display="flex">{totalClosingFeeAndSizeFields}</Box>
        <Box display="flex">{bedroomsAndBathroomsSelect}</Box>
        <Box display="flex">
          {developerField}
          {readyByField}
        </Box>
        {communityFeeField}
        {furnishedField}
        <Box display="flex">
          {renderBackBtn()}
          {nextBtn}
          {submitBtn}
        </Box>
      </FormBox>
    </Box>
  );
};
export default FetchFrm;
