import { Formik, Form, Field } from "formik";
import { TextField, Button, Stack, CircularProgress } from '@mui/material';
import * as Yup from 'yup';

interface FormProps{
    fields:{
        name: string;
        label: string;
        type?: string;
        validation?: Yup.AnySchema;
    }[];
    onSubmit: (values: any) => Promise<void>;
}

export default function CreateRecordForm({ fields, onSubmit }: FormProps){
    const validationSchema = Yup.object().shape(
        fields.reduce((acc, field) => {
        if (field.validation){
            acc[field.name] = field.validation;
        }
        return acc;
    }, {} as Record<string, Yup.AnySchema>)
    );
    
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as Record<string, any>);

    return(
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {resetForm}) => {
                await onSubmit(values);
                resetForm();
            }}
        >
            {({isSubmitting, errors, touched}) => (
                <Form>
                    <Stack spacing={2} sx={{mb: 3}}>
                        {fields.map((field) => (
                            <Field
                                key = {field.name}
                                as = {TextField}
                                name = {field.name}
                                label = {field.label}
                                type = {field.type || 'text'}
                                fullWidth
                                variant = 'outlined'
                                error = {touched[field.name] && !!errors[field.name]}
                                helperText = {touched[field.name] && errors[field.name]}
                                InputProps= {{
                                    sx: {
                                        backgroundColor: "white"
                                    }
                                }}
                            />
                        ))}
                    </Stack>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        sx={{mb: 2}}
                    >
                        {isSubmitting?(
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Create record'
                        )}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}