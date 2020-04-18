import React, {useRef} from "react";
class FormStore {
  constructor() {
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }

  setCallbacks = callback => {
    this.callbacks = {...this.callbacks, ...callback};
  };

  registerFiled = entity => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  getFieldValue = name => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return this.store;
  };

  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    };
    // 让Field进行更新
    this.fieldEntities.forEach(entity => {
      entity.onStoreChange();
    });
  };

  validate = () => {
    let err = [];
    this.fieldEntities.forEach(entity => {
      let {name, rules} = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      if (rule && rule.required & (value === undefined || value === "")) {
        err.push({
          [name]: rule.message,
          value
        });
      }
    });
    return err;
  };

  submit = () => {
    const {onFinish, onFinishFailed} = this.callbacks;
    // 校验
    let err = this.validate();
    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else if (err.length > 0) {
      onFinishFailed(err);
    }
  };
  getForm = () => {
    return {
      setCallbacks: this.setCallbacks,
      submit: this.submit,
      registerFiled: this.registerFiled,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue
    };
  };
}

// 自定义hook
export default function useForm(form) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
