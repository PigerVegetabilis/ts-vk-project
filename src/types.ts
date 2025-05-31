import * as Yup from 'yup';

export interface FormField{
    name: string;
    label: string;
    type?: string;
    validation?: Yup.AnySchema;
}

