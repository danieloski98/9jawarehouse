import dynamic from 'next/dynamic'
const DynamicWithNoSSR = dynamic(() =>  import('../../../components/dashboard/business/index'), {
    ssr: false
});

export default DynamicWithNoSSR;