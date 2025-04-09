import React, { useContext, useState } from "react";
import InputField from "../InputField";
import PasswordField from "../PasswordField";
import SelectField from "../SelectField";
import SwitchToggleInput from "../SwitchToggleInput";
import { AuthContext } from "../../../services/auth/auth.context";


const getUserOptions = (userType) => {
  const options = {
    0: [
      { label: "User", value: "1" },
      { label: "Agent", value: "2" },
      { label: "Master", value: "3" },
      { label: "Super Master", value: "4" },
      { label: "Mini Admin", value: "5" },
    ],
    1: [],
    2: [{ label: "User", value: "1" }],
    3: [
      { label: "User", value: "1" },
      { label: "Agent", value: "2" },
    ],
    4: [
      { label: "User", value: "1" },
      { label: "Agent", value: "2" },
      { label: "Master", value: "3" },
    ],
    5: [
      { label: "User", value: "1" },
      { label: "Agent", value: "2" },
      { label: "Master", value: "3" },
      { label: "Super Master", value: "4" },
    ],
  };

  return options[userType] || [];
};


const AddMasterForm = ({ onSubmit }) => {
  const { user } = useContext(AuthContext);
  const optionsArray = getUserOptions(user?.user_type);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    
    userType: "",
    commission: "",
    openingBalance: "",
    creditReference: "",
    mobileNumber: "",
    partnership: "",
    password: "",
    confirmPassword: "",
    rollingCommission: false,
    rollingCommissionValue: {
      fancy: "0",
      matka: "0",
      casino: "0",
      binary: "0",
      sportbook: "0",
      bookmaker: "0",
      virtualSports: "0",
    },
    agentRollingCommission: false,
    agentRollingCommissionValue: {
      fancy: "0",
      matka: "0",
      casino: "0",
      binary: "0",
      sportbook: "0",
      bookmaker: "0",
      virtualSports: "0",
    },
    masterPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange - name: ${name}, value: ${value}`);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRollingCommissionInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rollingCommissionValue: {
        ...prev.rollingCommissionValue,
        [name]: value,
      },
    }));
  };

  const handleAgentRollingCommissionInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      agentRollingCommissionValue: {
        ...prev.agentRollingCommissionValue,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.commission) newErrors.commission = "Commission is required.";
    if (!formData.openingBalance)
      newErrors.openingBalance = "Opening Balance is required.";
    if (!formData.creditReference)
      newErrors.creditReference = "Credit Reference is required.";
    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile Number is required.";
    if (!formData.partnership)
      newErrors.partnership = "Partnership is required.";
    if (!formData.password) newErrors.password = "User Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.masterPassword)
      newErrors.masterPassword = "Master Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    console.log("Submitting Form..."); 
    if (validate()) {
        console.log("Validation Passed:", formData); 
        if (onSubmit) {
           await  onSubmit(formData);
        } else {
            console.error("onSubmit function is missing!");
        }
    } else {
        console.error("Validation Failed:", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <InputField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required={true}
      />
     

        <SelectField
          label="User Type"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          options={optionsArray}
        />
      
      <InputField
        label="Commission"
        name="commission"
        value={formData.commission}
        onChange={handleChange}
        error={errors.commission}
        required={true}
      />
      <InputField
        label="Opening Balance"
        name="openingBalance"
        value={formData.openingBalance}
        onChange={handleChange}
        error={errors.openingBalance}
        required={true}
      />
      <InputField
        label="Credit Reference"
        name="creditReference"
        value={formData.creditReference}
        onChange={handleChange}
        error={errors.creditReference}
        required={true}
      />
      <InputField
        label="Mobile No."
        name="mobileNumber"
        value={formData.mobileNumber}
        onChange={handleChange}
        error={errors.mobileNumber}
        required={true}
      />
      <InputField
        label="Partnership"
        name="partnership"
        value={formData.partnership}
        onChange={handleChange}
        error={errors.partnership}
        required={true}
      />

      <PasswordField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required={true}
      />
      <PasswordField
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required={true}
      />

      {/* Rolling Commission Toggle */}
      <SwitchToggleInput
        label="Rolling Commission"
        isToggled={formData.rollingCommission}
        setIsToggled={(newState) => {
            console.log("Toggle clicked, new state:", newState);
            setFormData((prev) => ({ ...prev, rollingCommission: newState }));
          }} 
      />
      {formData.rollingCommission && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData.rollingCommissionValue).map(
            ([key, value]) => (
              <InputField
                key={key}
                label={key}
                name={key}
                value={value}
                onChange={handleRollingCommissionInputChange}
              />
            )
          )}
        </div>
      )}
      {/* Agent Rolling Commission Toggle */}
      {(user.user_type > 2 || user.user_type == 0 ) && <SwitchToggleInput
        label="Agent Rolling Commission"
        isToggled={formData.agentRollingCommission}
        setIsToggled={(newState) =>
          setFormData((prev) => ({ ...prev, agentRollingCommission: newState }))
        }
      />}
      {formData.agentRollingCommission && (
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData.agentRollingCommissionValue).map(
            ([key, value]) => (
              <InputField
                key={key}
                label={key}
                name={key}
                value={value}
                onChange={handleAgentRollingCommissionInputChange}
              />
            )
          )}
        </div>
      )}

      <div className="w-[90%] h-[2px] bg-gray-400"></div>

      <PasswordField
        label="Master Password"
        name="masterPassword"
        value={formData.masterPassword}
        onChange={handleChange}
        error={errors.masterPassword}
      />

      <div className="mt-6 flex justify-center items-center">
        <button
          type="submit"
          className="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white py-2 px-4 rounded text-sm transition-colors"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default AddMasterForm;