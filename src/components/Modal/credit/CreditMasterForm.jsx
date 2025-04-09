import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../services/account/account.context";
import { toast } from "react-toastify";
import InputField from "../InputField";
import PasswordField from "../PasswordField";
import { AuthContext } from "../../../services/auth/auth.context";
import LoadingSpinner from "../../LoadingSpinner";


const CreditMasterForm = ({ onSubmit }) => {
  const {  loading, walletTransactionStatus, setWalletTransactionStatus  } = useContext(AccountContext);


  const [formData, setFormData] = useState({
    balance: "",
    remark: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (walletTransactionStatus) {
      if (walletTransactionStatus.success) {
        toast.success(walletTransactionStatus.message || "Transaction successful!");
      } else {
        toast.error(walletTransactionStatus.message || "Transaction failed!");
      }

      // Reset transaction status after showing toast
      setTimeout(() => {
        setWalletTransactionStatus(null);
      }, 1000);
    }
  }, [walletTransactionStatus, setWalletTransactionStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.balance) newErrors.balance = "Balance is required.";
    if (!formData.remark) newErrors.remark = "Remark is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransaction = async (transactionType) => {
    if (!validate()) return;

    const payload = {

   
      transaction_amount: parseFloat(formData.balance),
      mode: "Manual",
      transaction_type: transactionType,
      transaction_details: formData.remark,
    };
    onSubmit(payload);
  
  };

  return (
    <div className="relative">
      {loading && (
       <LoadingSpinner />
      )}

      <form className={`space-y-4 ${loading ? "pointer-events-none opacity-50" : ""}`}>
        <InputField
          label="Balance"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          error={errors.balance}
          required={true}
        />
        <InputField
          label="Remark"
          name="remark"
          value={formData.remark}
          onChange={handleChange}
          error={errors.remark}
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

<div className="flex  justify-end gap-1">
  <button
    type="button"
    onClick={() => handleTransaction("betdebit")}
    className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded transition w-full sm:w-auto"
    disabled={loading}
  >
    Withdraw
  </button>
  <button
    type="button"
    onClick={() => handleTransaction("credit")}
    className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded transition w-full sm:w-auto"
    disabled={loading}
  >
    Deposit
  </button>
</div>
      </form>
    </div>
  );
};

export default CreditMasterForm;
