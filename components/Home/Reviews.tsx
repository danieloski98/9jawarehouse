import React from 'react';
import { Divider } from '@chakra-ui/react'

// images
import Guy from '../../public/images/guy2.svg';
import Girl from '../../public/images/girl1.svg';
import Image from 'next/image';

interface ICard {
    image: string;
    name?: string;
    position?: string;
    writeup?: string;
}

const Card = ({name, image, position}: ICard) => {
    return(
        <div className="w-64 xl:h-auto lg:h-64 md:h-auto sm:h-auto mb-10 flex- flex-col">
            <Image src={image} alt="man" className="w-full h-24 " />
            <p className="text-themeGreen font-Circular-std-book text-md mt-6">
            My relationship with Cara & CompuVision keeps on growing. The projects get larger and more technical every year.
            </p>

            <Divider size="lg" className="mt-4 mb-4" />
            <p className="text-themeGreen text-sm font-Circular-std-medium">{name || 'Akunna Akeem-omosanya'}</p>
            <p className="text-gray-500 text-xs font-Circular-std-medium">CO- founder / Ajakaiye LLC</p>

        </div>
    )
}

export default function Reviews() {
  return (
    <div className="w-full xl:px-32 lg:px-32 md:text-center sm:text-center xl:pb-10 lg:py-10 h-auto">
        <p className="text-3xl font-Circular-std-medium text-themeGreen">What they are saying</p>

        <div className="w-full xl:mt-20 lg:mt-20 md:mt-6 sm:mt-6 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xl:justify-between lg:justify-between md:justify-center sm:justify-center xl:items-start lg:items-start md:items-center sm:items-center pb-10">
            <Card image={Girl} name="Akunna Akeem-omosanya" />
            <Card image={Guy} />
            <Card image={Girl} />
        </div>
    </div>
  );
}
