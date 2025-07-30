import LoaderIndicator from "@/src/component/common/LoaderIndicator";
import {
  manufacturerType,
  modelListType,
  problemListType,
  RepairCategory,
  serviceType,
} from "@/src/constants/Data";
import { submitServiceRequest } from "@/src/redux/slice/serviceRequestSlice";
import { RootState } from "@/src/redux/store/Store";
import { Routes } from "@/src/utils/Routes";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import CategoryStep from "./CategoryStep";
import ManufacturerStep from "./ManufacturerStep";
import ModelStep from "./ModelStep";
import ProblemStep from "./ProblemStep";
import ServiceTypeStep from "./ServiceTypeStep";
import SummaryStep from "./SummaryStep";

export default function RepairFlowScreen() {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const navigation = useNavigation();

  const { loading, requestId, message, error, serviceTypeId } = useSelector(
    (state: any) => state.serviceRequest
  );
  const [step, setStep] = useState(0);

  const [repairCategory, setRepairCategory] = useState<RepairCategory>();
  const [serviceType, setServiceType] = useState<serviceType>();
  const [manufacturer, setManufacturer] = useState<manufacturerType>();
  const [model, setModel] = useState<modelListType>();
  const [problems, setProblems] = useState<problemListType[]>([]);

  // Replace this with your actual user ID retrieval logic
  const userId = user?.userId;

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const goNext = () => setStep(step + 1);

  const onSubmit = () => {
    let payload = {
      repair_category_id: repairCategory?.id,
      maufacturer_id: manufacturer?.id,
      model_id: model?.id,
      service_type_id: serviceType?.id,
      repair_issue_id: problems.map((problem) => problem.id),
      userId: userId,
    };
    console.log("Payload for submission:", payload);
    dispatch(submitServiceRequest(payload));
  };
  useEffect(() => {
    if (requestId && message && !loading && !error) {
      navigation.navigate(Routes.ScheduleServiceScreen);
    }
  }, [requestId, message, loading, error]);
  return (
    <View style={styles.container}>
      <LoaderIndicator isLoading={loading} />

      {step === 0 && (
        <CategoryStep
          onNext={(data: RepairCategory) => {
            setRepairCategory(data);
            goNext();
          }}
        />
      )}

      {repairCategory && step === 1 && (
        <ManufacturerStep
          repairCategoryId={repairCategory.id ?? 0}
          onBack={goBack}
          onNext={(data: manufacturerType) => {
            setManufacturer(data);
            goNext();
          }}
        />
      )}

      {manufacturer && step === 2 && (
        <ModelStep
          manufacturerId={manufacturer.id ?? 0}
          onBack={goBack}
          onNext={(data: modelListType) => {
            setModel(data);
            goNext();
          }}
        />
      )}
      {step === 3 && (
        <ServiceTypeStep
          repairCategoryId={repairCategory?.id ?? 0}
          onBack={goBack}
          onNext={(data: serviceType) => {
            setServiceType(data);
            goNext();
          }}
        />
      )}
      {serviceType && step === 4 && (
        <ProblemStep
          serviceTypeId={serviceType.id ?? 0}
          onBack={goBack}
          onNext={(data) => {
            setProblems(data);
            goNext();
          }}
        />
      )}

      {step === 5 && (
        <SummaryStep
          finalData={{
            repairCategory,
            serviceType,
            manufacturer,
            model,
            problems,
            userId,
          }}
          onBack={goBack}
          onSubmit={onSubmit}
          // onComplete={() => {
          //   setStep(0); // Reset flow after completion
          //   setRepairCategory(undefined);
          //   setServiceType(undefined);
          //   setManufacturer(undefined);
          //   setModel(undefined);
          //   setProblems([]);
          // }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
