import {
  manufacturerType,
  modelListType,
  RepairCategory,
  serviceType,
} from "@/src/constants/Data";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CategoryStep from "./CategoryStep";
import ManufacturerStep from "./ManufacturerStep";
import ModelStep from "./ModelStep";
import ProblemStep from "./ProblemStep";
import ServiceTypeStep from "./ServiceTypeStep";
import SummaryStep from "./SummaryStep";

export default function RepairFlowScreen() {
  const [step, setStep] = useState(0);

  const [repairCategory, setRepairCategory] = useState<RepairCategory>();
  const [serviceType, setServiceType] = useState<serviceType>();
  const [manufacturer, setManufacturer] = useState<manufacturerType>();
  const [model, setModel] = useState<modelListType>();
  const [problems, setProblems] = useState<any[]>([]);

  // Replace this with your actual user ID retrieval logic
  const userId = 256;

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const goNext = () => setStep(step + 1);

  return (
    <View style={styles.container}>
      {step === 0 && (
        <CategoryStep
          onNext={(data: RepairCategory) => {
            setRepairCategory(data);
            goNext();
          }}
        />
      )}

      {step === 1 && (
        <ServiceTypeStep
          repairCategoryId={repairCategory?.id}
          onBack={goBack}
          onNext={(data: serviceType) => {
            setServiceType(data);
            goNext();
          }}
        />
      )}

      {step === 2 && (
        <ManufacturerStep
          repairCategoryId={repairCategory.id}
          onBack={goBack}
          onNext={(data: manufacturerType) => {
            setManufacturer(data);
            goNext();
          }}
        />
      )}

      {step === 3 && (
        <ModelStep
          manufacturerId={manufacturer.id}
          onBack={goBack}
          onNext={(data: modelListType) => {
            setModel(data);
            goNext();
          }}
        />
      )}

      {step === 4 && (
        <ProblemStep
          serviceTypeId={serviceType.id}
          onBack={goBack}
          onNext={(selectedProblems) => {
            setProblems(selectedProblems);
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
          onComplete={() => {
            setStep(0); // Reset flow after completion
            setRepairCategory(undefined);
            setServiceType(undefined);
            setManufacturer(undefined);
            setModel(undefined);
            setProblems([]);
          }}
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
