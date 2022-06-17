import dynamic from 'next/dynamic'
const DynamicWithNoSSR = dynamic(() =>  import('../../../components/reupload/index'), {
  ssr: false
});

export default DynamicWithNoSSR;