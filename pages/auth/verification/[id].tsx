import dynamic from 'next/dynamic'
const DynamicWithNoSSR = dynamic(() =>  import('../../../components/verification/index'), {
  ssr: false
});

export default DynamicWithNoSSR;