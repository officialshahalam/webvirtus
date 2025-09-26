import React, { useState } from "react";

import MobileRequirementForm from "./MobileRequirementForm";
import ShowCost from "./ShowCost";

const MobileCostCal = () => {
  const [step, setStep] = useState<"requirement" | "cost">("requirement");

  return (
    <div>
      {step === "requirement" ? (
        <MobileRequirementForm setStep={setStep} />
      ) : (
        <ShowCost setStep={setStep} />
      )}
    </div>
  );
};

export default MobileCostCal;