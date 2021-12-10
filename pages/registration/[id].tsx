import dynamic from 'next/dynamic'
const DynamicWithNoSSR = dynamic(() =>  import('../../components/completereg/index'), {
  ssr: false
});

export default DynamicWithNoSSR;