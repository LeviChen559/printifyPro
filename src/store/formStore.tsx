import { iLabelInfo } from "@/type/labelType";
type LabelField = keyof iLabelInfo;

type Action =
  | { type: "SET_FIELD"; field: LabelField; value: string | number }
  | { type: "RESET"; payload: iLabelInfo };

export const reducer = (state: iLabelInfo, action: Action): iLabelInfo => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { ...action.payload };
    default:
      return state;
  }
};

export const handleUpdate = (
  field: LabelField,
  dispatch: React.Dispatch<Action>,
  currentValue: string 
) => (value: string  | ((prev: string ) => string )) => {
  if (typeof value === "function") {
    const newValue = value(currentValue);
    dispatch({ type: "SET_FIELD", field, value: newValue });
  } else {
    dispatch({ type: "SET_FIELD", field, value });
  }
};

export const handleNumberUpdate = (
  field: LabelField,
  dispatch: React.Dispatch<Action>,
  currentValue: number 
) => (value: number | ((prev: number) => number)) => {
  if (typeof value === "function") {
    const newValue = value(currentValue);
    dispatch({ type: "SET_FIELD", field, value: newValue });
  } else {
    dispatch({ type: "SET_FIELD", field, value });
  }
};