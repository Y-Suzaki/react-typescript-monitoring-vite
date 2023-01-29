// Formバリデーションを定義
import * as yup from 'yup';
import { InferType } from 'yup';

export const otaSchemaBase = {
  otaType: yup.string().required('Type is required.').oneOf(['apk', 'image']),
  name: yup.string().required('Name is required.').oneOf(['test']),
  versionNumber: yup.number().typeError('Version Number must be number.'),
  versionName: yup.string().required('Version Name is required.'),
  originalVersionNumber: yup
    .number()
    .typeError('Version Number must be number.')
    .nullable()
    .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
    .test('ImageOnlyRequired.', 'In case of "Diff Image", Version Number is required.', function (value) {
      return !(this.parent.otaType === 'image' && value === null);
    }),
  uploadFile: yup.mixed().test('required', 'File is required', (file) => file && file[0]),
};

export const otaFormSchema = yup.object(otaSchemaBase);
export type OtaFormType = InferType<typeof otaFormSchema>;
