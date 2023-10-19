import React, { useState } from "react";
import NewValidation from "../Validation/NewValidation";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
const Dazp = () => {
  const [value, setValue] = useState([]);
  const [errors, setErrors] = useState({});
  const handleChangeInput = (e) => {
    const name = e.target.value;
    const lineArray = name.split("\n");
    setValue(lineArray);
  };
  const handleClickError = () => {
    const newError = [...new Set(value)];
    if (newError) {
      setValue(newError);
    }
  };

  const handleBalanceError = () => {
    if (Array.isArray(value)) {
      // Initialize an object to store unique addresses and their total amounts
      const addressMap = {};
      const separatorsMap = {};
      // Process each line and update the object
      value.forEach((line) => {
        const [address, amount] = line.split(/[\s=, ]+/); // Split the line by space, equals sign, or comma
        const cleanedAddress = address.trim();
        const cleanedAmount = parseInt(amount);

        if (!isNaN(cleanedAmount)) {
          if (addressMap[cleanedAddress]) {
            // If the address is already in the object, add the amount
            addressMap[cleanedAddress] += cleanedAmount;
          } else {
            // If the address is not in the object, add it with the initial amount
            addressMap[cleanedAddress] = cleanedAmount;
            // Store the original separator for this address
            separatorsMap[cleanedAddress] = line.match(/[\s=,]+/)[0];
          }
        }
      });

      // Create the output data in the desired format
      let outputData = "";
      for (const address in addressMap) {
        if (outputData) {
          outputData += "\n";
        }
        outputData += `${address}${separatorsMap[address]}${addressMap[address]}`;
      }
      const dataArray = outputData.split("\n");

      const individualArray = dataArray.map((data) => [data]);
      setValue(individualArray);
    } else {
      console.error("value  is not iterable");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(NewValidation(value));
  };
  return (
    <>
      <div className="new-textarea d-grid justify-content-center bg-secondary">
        <form onSubmit={handleSubmit}>
          <div className="top-textarea">
            <div className="d-flex text-white justify-content-between">
              <p>Address With Amount</p>
              <p>Upload File</p>
            </div>
            <div className="vertical-line d-flex p-4 bg-dark">
              <div className="editor-seprator">
                {value.map((_, index) => (
                  <div style={{ color: "white" }} key={index}>
                    {index + 1}
                  </div>
                ))}
              </div>
              <textarea
                className="bg-dark  text-white new-line border border-0 no-focus-outline p-2"
                name=""
                id="yourTextareaId"
                value={value.join("\n")}
                cols="100"
                rows="10"
                onChange={(e) => handleChangeInput(e)}
              ></textarea>
            </div>
          </div>
          <div className="d-grid">
            <div>
              {errors?.errors?.length > 0 ||
              errors?.duplicateElements?.length > 0 ? (
                <div className="d-flex justify-content-end align-items-center mt-3">
                  <button
                    className="new-error border border-0 no-focus-outline p-2"
                    onClick={handleClickError}
                  >
                    keep the first one
                  </button>
                  <p className="new-para mt-2 mx-2">|</p>
                  <button
                    className="new-error border border-0 no-focus-outline p-2"
                    onClick={handleBalanceError}
                  >
                    Combine Balance
                  </button>
                </div>
              ) : null}

              <div>
                {errors?.errors?.length > 0 ||
                errors?.duplicateElements?.length > 0 ? (
                  <div
                    style={{
                      border: "1px solid red",
                      color: "red",
                      padding: "15px 30px",
                      borderRadius: "10px",
                      marginTop: "1rem",
                    }}
                  >
                    <div className="d-flex gap-lg-2">
                      <div>
                        <ErrorOutlineOutlinedIcon />
                      </div>
                      <div>
                        {errors?.errors?.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                        {errors?.duplicateElements?.map((error, index) => (
                          <div className="new-set-data" key={index}>
                            <p>
                              {error.data} duplicate in Line:
                              {error.indexes.join(", ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="new-button btn  mb-3 rounded-pill border-0 p-2 mt-md-5"
            >
              <p className=" next-para"> Next</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dazp;
