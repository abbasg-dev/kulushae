import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import BackTo from "components/back-to/back-to.component";
import FetchFrm from "pages/PostAd/fetch-frm/fetch-frm.component";
import { CategoryChildProps } from "interfaces/categories.model";
import { GET_CATEGORY_CHILD_BY_ID } from "api/queries/categories.queries";
import { FETCH_FORM } from "api/queries/form.queries";
type ChildCategoryData = {
  list?: CategoryChildProps;
};
const ChildCategory = ({ list }: ChildCategoryData) => {
  const { t } = useTranslation("common");
  const [subChildCategoryList, setSubChildCategoryList] =
    useState<CategoryChildProps | null>(null);
  const [fetchedFormProperties, setFetchedFormProperties] =
    useState<null>(null);
  const [showFetchedForm, setShowFetchedForm] = useState<boolean>(false);
  const [showSubChildClicked, setShowSubChildClicked] =
    useState<boolean>(false);
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [storedData, setStoredData] = useState<
    {
      [key: string]: string | number | Date;
    }[]
  >([{}]);
  const {
    loading: isLoadingSubChildCategoryList,
    error: errorSubChildCategoryList,
    refetch: refetchChildCategory,
  } = useQuery<CategoryChildProps>(GET_CATEGORY_CHILD_BY_ID, {
    variables: {
      afl: 1,
    },
  });
  const {
    loading: isLoadingFetchForm,
    error: errorFetchForm,
    refetch: refetchFetchForm,
  } = useQuery(FETCH_FORM, {
    variables: {
      afl: 1,
    },
  });
  useEffect(() => {
    if (errorSubChildCategoryList) {
      console.error("Error sub child category:", errorSubChildCategoryList);
    }
  }, [errorSubChildCategoryList]);
  useEffect(() => {
    if (subCategoryId && errorFetchForm) {
      console.error("Error fetch form:", errorFetchForm);
    }
  }, [errorFetchForm]);
  useEffect(() => {
    console.log("loading");
  }, [isLoadingSubChildCategoryList]);
  useEffect(() => {
    if (subCategoryId && isLoadingFetchForm) {
      console.log("loading fetch form");
    }
  }, [isLoadingFetchForm]);
  useEffect(() => {
    const fetchFormData = async (id) => {
      const fetchedForm = await refetchFetchForm({
        categoryId: 21,
        steps:
          activeStep === 0
            ? 1
            : activeStep === 1
            ? 2
            : activeStep === 2
            ? 3
            : "",
      });
      setFetchedFormProperties(fetchedForm?.data);
    };
    if (subCategoryId) {
      fetchFormData(subCategoryId);
    }
  }, [subCategoryId, activeStep]);
  const onChildCategoryClick = async (id, hasChild) => {
    if (list && list?.categories?.length > 0 && hasChild && id) {
      const fetchedData = await refetchChildCategory({
        categoryId: Number(id),
        afl: null,
        showOnScreen: null,
      });
      setSubChildCategoryList(fetchedData?.data);
      setShowSubChildClicked(true);
      setShowFetchedForm(false);
    } else {
      resetList();
      setSubCategoryId(id);
      setShowFetchedForm(true);
    }
  };
  const onBackClick = () => {
    resetList();
    setShowFetchedForm(false);
  };
  const resetList = () => {
    setShowSubChildClicked(false);
    setSubChildCategoryList(null);
    setSubCategoryId("");
  };
  const onSubCategoryClick = (id) => {
    if (id) {
      setShowFetchedForm(true);
      setShowSubChildClicked(false);
      setSubCategoryId(id);
    }
  };
  const updateStoredData = (updatedData, step: number) => {
    console.log("before update");
    console.log(storedData);
    const newStoredData = [...storedData];
    newStoredData[step] = updatedData;
    console.log("after update");
    console.log("new data: ", newStoredData);
    console.log(updatedData);
    console.log(step);
    console.log(activeStep);
    console.log("end update");
    setStoredData([...newStoredData]);
  };
  return (
    <>
      <Box>
        <Box sx={{ textAlign: "-webkit-center" }}>
          {(showSubChildClicked || showFetchedForm) && (
            <BackTo onClickFunc={onBackClick} func="back" />
          )}
        </Box>
        {!showFetchedForm &&
          list?.categories?.map((category, index) => (
            <Box
              key={index}
              display="flex"
              width="100%"
              onClick={() =>
                onChildCategoryClick(category?.id, category?.has_child)
              }
              sx={{ cursor: "pointer" }}
            >
              {!showSubChildClicked && (
                <BackTo
                  title={category?.title}
                  func="next"
                  has_child={category?.has_child}
                />
              )}
            </Box>
          ))}
        {!showFetchedForm &&
          list?.categories?.map((category, index) => (
            <Box display="block" key={index}>
              {showSubChildClicked &&
                category?.has_child &&
                subChildCategoryList?.categories?.map((subCategory) => (
                  <Box
                    key={subCategory?.id}
                    onClick={() => onSubCategoryClick(subCategory?.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <BackTo
                      title={subCategory?.title}
                      func="next"
                      isClicked={showSubChildClicked}
                    />
                  </Box>
                ))}
            </Box>
          ))}
        {showFetchedForm && (
          <FetchFrm
            properties={fetchedFormProperties}
            categoryId={subCategoryId}
            active={activeStep}
            setActive={setActiveStep}
            data={storedData}
            setData={updateStoredData}
          />
        )}
      </Box>
    </>
  );
};
export default ChildCategory;
