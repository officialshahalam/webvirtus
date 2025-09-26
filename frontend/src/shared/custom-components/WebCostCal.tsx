import React, { useState } from "react";
import WebRequirementForm from "./WebRequirementForm";
import ShowCost from "./ShowCost";

const WebCostCal = () => {
  const [step, setStep] = useState<"requirement" | "cost">("requirement");
  return (
    <div>
      {step === "requirement" ? (
        <WebRequirementForm setStep={setStep} />
      ) : (
        <ShowCost setStep={setStep} />
      )}
    </div>
  ); 
};

export default WebCostCal;
