type CognitoAttribute = {
  [key: string]: string;
};

export const getAllowedServices = (cognitoAttributes: CognitoAttribute) => {
  if ('custom:allowed_services' in cognitoAttributes) {
    const allowed_service: string = cognitoAttributes['custom:allowed_services'];
    return allowed_service.split(',');
  } else {
    return [];
  }
};
