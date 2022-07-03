const local = 'http://localhost:8000/';
const live = 'https://naijawarehouse.herokuapp.com/'
const digitalOcean = process.env.NEXT_PUBLIC_TEST === 'true' ? 'https://test-api.9jawarehouse.com/' : 'https://www.api.9jawarehouse.com/'
const url = process.env.NEXT_PUBLIC_ENV === 'development' ? local : digitalOcean;
export default url;