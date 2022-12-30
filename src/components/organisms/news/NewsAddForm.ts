// Formバリデーションを定義
import * as yup from 'yup';
import { InferType } from 'yup';

export const regFormSchema = yup.object({
  title: yup.string().required('Title is required.'),
  content: yup.string().required('Content is required.'),
  publicationDate: yup
    .string()
    .matches(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, 'Publication date must match "yyyy-MM-dd HH:mm"'),
  endDate: yup.string().matches(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/, {
    message: 'End date must match "yyyy-MM-dd HH:mm"',
    excludeEmptyString: true,
  }),
});

export type RegFormSchema = InferType<typeof regFormSchema>;
