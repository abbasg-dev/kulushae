import { ButtonProps } from "@mui/material";
import { CSSProperties } from "@mui/styles";
import { Theme } from '@mui/material/styles';
import { ReactNode } from "react";
export class BtnProps {
    value?: string | ReactNode;
    customButton?: React.ComponentType<ButtonProps>;
    customStyle?: CSSProperties;
    callBackFunc?: () => void;
    disabled?: boolean;
    btnId?: string;
    name?: string;
}
export class InputFieldProps {
    value?: string;
    setValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    hideBottomBorder?: boolean;
    width?: number | string;
    setBorderColor?: string;
}
export class SelectedItem {
    value?: string;
    name?: string;
};
export class SelectProps {
    data?: SelectedItem[];
    type?: string;
    handleChange?: (value: string, name: string) => void;
    value?: string;
    label?: string;
    style?: CSSProperties;
};
export class SelectItem {
    text?: string;
    name?: string;
    value?: string;
}
export class ScrollProps { children: React.ReactNode };
export class CustomBtnProps {
    key?: number;
    title?: string;
    name?: string;
    logo?: JSX.Element;
    theme?: Theme;
    btnStyle?: CSSProperties;
}
export interface FieldExtras {
    title?: string;
    position?: string;
    alignment?: string;
}
export type FieldNameType<T = string> = T;
export interface FetchFormProps {
    category_id?: number;
    field_extras?: string;
    field_id?: string;
    field_name?: FieldNameType;
    field_order?: number;
    field_request_type?: string;
    field_size?: number;
    field_type?: string;
    field_validation?: string;
    id?: string;
    steps?: number;
    __typename?: string;
}
export interface FormResponse {
    data?: {
        fetchForm?: FetchFormProps[][];
    };
}