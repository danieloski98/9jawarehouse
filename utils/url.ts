const local = 'http://localhost:8000/';
const live = 'https://naijawarehouse.herokuapp.com/'
const digitalOcean = 'https://www.api.9jawarehouse.com/'
const url = process.env.NEXT_PUBLIC_ENV === 'development' ? live : digitalOcean;
export default url;