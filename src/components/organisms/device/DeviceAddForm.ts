// Formバリデーションを定義
import * as yup from 'yup';
import { InferType } from 'yup';

export const deviceSchemaBase = {
  imei: yup.string().required('IMEI is required.'),
  serialNo: yup.string().required('Serial No is required.'),
};

export const deviceFormSchema = yup.object(deviceSchemaBase);
export type DeviceFormType = InferType<typeof deviceFormSchema>;
