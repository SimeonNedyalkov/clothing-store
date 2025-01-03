import { useEffect, useState } from "react";

export default function useForm(initialValue: any, submitCallBack: any) {
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    setValues(initialValue);
  }, [initialValue]);

  const changeHandler = (event: any) => {
    const { name, value } = event.target;
    setValues((prevValues: any) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        return {
          ...prevValues,
          [keys[0]]: {
            ...prevValues[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    submitCallBack(values);
  };

  return { values, changeHandler, submitHandler };
}
