export const getApiDomain = (awsEnv: string) => {
  if (awsEnv === 'Dev') {
    return import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN_DEV;
  } else if (awsEnv === 'Staging') {
    return import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN_STAGING;
  } else if (awsEnv === 'Production') {
    return import.meta.env.VITE_APP_BACKOFFICE_API_DOMAIN_PRODUCTION;
  } else {
    throw `Can not find the API Domain. AWS Env = ${awsEnv}`;
  }
};

export const getAwsEnvs = () => {
  return import.meta.env.VITE_APP_AWS_ENVIRONMENTS.split(',');
};

export const getAwsDefaultEnv = () => {
  return getAwsEnvs()[0];
};
