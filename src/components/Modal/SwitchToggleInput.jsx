import ToggleSwitch from "../ToggleSwipeSwitch";

export const SwitchToggleInput = ({ label, isToggled, setIsToggled, error }) => {
    return (
      <div className="mb-[6px] text-right flex flex-wrap -mt-0 -mr-3 -ml-3 md:flex-row md:items-center">
        {/* Label Section */}
        <label className="font-bold text-[12px] mt-[5px] md:w-[41.6667%] md:flex-none">
          {label} <span className="text-red-500">*</span>
        </label>
  
        {/* Input Section */}
        <div className="w-full md:w-[58.3333%]">
          <ToggleSwitch isChecked={isToggled} 
          setIsChecked={() => setIsToggled(!isToggled)} />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    );
  };
  
  export default SwitchToggleInput;
  