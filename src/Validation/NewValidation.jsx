const NewValidation = (value) => {
  const errors = [];
  const errorMap = {};
  const duplicateElements = [];
  if (!value) {
    errors.push("Input is empty");
    return errors;
  }
  value.forEach((item, index) => {
    const newItem = (item ? item.toString() : "").split(/[ =,]+/);
    if (newItem.length < 2) {
      errors.push(`Line ${index + 1} is missing address or amount`);
    } else {
      const address = /^0x[0-9a-fA-F]{40}$/;
      const addresValid = address.test(newItem[0]);
      const amountValid = /^[0-9]+$/;
      const newAmountValid = amountValid.test(newItem[1]);
      if (!addresValid && !newAmountValid) {
        errors.push(`Line ${index + 1} has an invalid address.and amount`);
      } else {
        if (!addresValid) {
          errors.push(`Line ${index + 1} invalid Etharium address`);
        }
        if (!newAmountValid) {
          errors.push(`Line ${index + 1} wrong amount`);
        }
      }
    }
  });

  value.forEach((item, index) => {
    if (errorMap[item]) {
      // If the item is already in the errors object, add the current index to its indexes array
      errorMap[item].indexes.push(index + 1);
    } else {
      // If the item is not in the errors object, create an object with an indexes array
      errorMap[item] = { indexes: [index + 1] };
    }
  });

  for (const key in errorMap) {
    if (errorMap[key].indexes.length > 1) {
      duplicateElements.push({
        data: key,
        indexes: errorMap[key].indexes,
      });
    }
  }

  return { errors, duplicateElements };
};

export default NewValidation;
