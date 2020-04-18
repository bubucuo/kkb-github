import React from "react";
import _Form from "./Form";
import useForm from "./useForm";
import Field from "./Field";

const Form = React.forwardRef(_Form);
Form.useForm = useForm;
Form.Field = Field;

export {useForm, Field};

export default Form;
