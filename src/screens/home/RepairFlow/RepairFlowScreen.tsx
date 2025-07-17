import { Routes } from "@/src/utils/Routes";
import { useState } from "react";
import { View } from "react-native";
import CategoryStep from "./CategoryStep";
import ManufacturerStep from "./ManufacturerStep";
import ModelStep from "./ModelStep";
import ProblemStep from "./ProblemStep";
import ServiceTypeStep from "./ServiceTypeStep";
import SummaryStep from "./SummaryStep";

const RepairFlowScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };
  const handleSubmit = () => {
    console.log(">>>>>>");

    navigation.navigate(Routes.ScheduleServiceScreen);
  };
  const steps = [
    <CategoryStep key="category" onNext={handleNext} />,
    <ServiceTypeStep key="service" onNext={handleNext} onBack={handlePrev} />,
    <ManufacturerStep
      key="manufacturer"
      onNext={handleNext}
      onBack={handlePrev}
    />,
    <ModelStep key="model" onNext={handleNext} onBack={handlePrev} />,
    <ProblemStep key="problem" onNext={handleNext} onBack={handlePrev} />,
    <SummaryStep
      key="summary"
      data={formData}
      onNext={() => {}}
      onBack={handlePrev}
      onSubmit={handleSubmit}
    />,
  ];

  return <View style={{ flex: 1 }}>{steps[step]}</View>;
};

export default RepairFlowScreen;
