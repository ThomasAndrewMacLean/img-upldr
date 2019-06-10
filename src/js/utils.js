export const baseUrl =
location.host.includes('127.0.0.1') || location.host.includes('localhost')
  ? 'http://localhost:3000/'
  : 'https://afh7v9mdo0.execute-api.eu-west-1.amazonaws.com/latest/';
