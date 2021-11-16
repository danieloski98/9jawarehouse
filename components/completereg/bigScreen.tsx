import React from 'react';
import { Progress } from '@chakra-ui/react'
import PersonalInfo from './PersonalInfo';
import BusinessInfo from './businessScreen';
import SocialMediaInfo from './socialMedia';

const ACTIVE = 'w-8 h-8 rounded-full bg-themeGreen text-white text-sm flex justify-center items-center';
const INACTIVE = 'w-8 h-8 rounded-full bg-green-200 text-green-600 text-sm flex justify-center items-center';

export default function BigScreen() {
    const [step, setStep] = React.useState(1);
    const [progress, setProgress] = React.useState(33);

    const move = (val: number) => {
        if (val === 1) {
            setProgress(33)
            setStep(val);
        }
        if (val === 2) {
            setProgress(66)
            setStep(val);
        }
        if (val === 3) {
            setProgress(100)
            setStep(val);
        }
    }

    const switcher = () => {
        switch(step) {
            case 1: {
                return <PersonalInfo next={move} />
            }
            case 2: {
                return <BusinessInfo next={move} />
            }
            case 3: {
                return <SocialMediaInfo next={move} />
            }
        }
    }

    const heading = () => {
        switch(step) {
            case 1: {
                return 'Personal Information'
            }
            case 2: {
                return 'Business Information'
            }
            case 3: {
                return 'Social Media Information'
            }
        }
    }
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">

        <div className="xl:flex lg:flex md:hidden sm:hidden justify-center">

            <div className="flex items-center">
                <div className={step >= 1 ? ACTIVE:INACTIVE}>1</div>
                <p className="ml-4 font-semibold text-sm text-gray-500">Personnal Information</p>
            </div>

            <div className="flex ml-6 items-center">
                <div className={step >= 2 ? ACTIVE:INACTIVE}>2</div>
                <p className="ml-4 font-semibold text-sm text-gray-500">Business Information</p>
            </div>

            <div className="flex ml-6 items-center">
                <div className={step >= 3 ? ACTIVE:INACTIVE}>3</div>
                <p className="ml-4 font-semibold text-sm text-gray-500">Social Media</p>
            </div>

        </div>

         {/* small screen tabs */}

         <div className="xl:hidden lg:hidden md:flex sm:flex justify-center">
             <div className="flex items-center">
                <div className={ACTIVE}>{step}</div>
                <p className="ml-4 font-semibold text-sm text-gray-500">{heading()}</p>
            </div>
         </div>


        <div className="xl:w-3/4 lg:w-3/4 md:w-full sm:w-full h-auto bg-white mt-6 flex flex-col">
            <Progress value={progress} colorScheme="teal" />
            <div className="flex-1  xl:p-10 lg:p-10 md:p-5 sm:p-5">
                {switcher()}
            </div>
        </div>
    </div>
  );
}
