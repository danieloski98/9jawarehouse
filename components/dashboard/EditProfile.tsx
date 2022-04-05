import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Image,
  Avatar,
  Spinner,
  Tooltip,
  Textarea,
} from "@chakra-ui/react";
import { FiChevronLeft, FiCamera, FiX, FiHelpCircle } from "react-icons/fi";
import { FaCamera } from 'react-icons/fa'
import { IoMdHelpCircle } from 'react-icons/io'
import Link from "next/link";

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { updateUser } from '../../reducers/User.reducer';
import { ICertificate } from "../../utils/types/certificate";
import { Certificate } from "crypto";
import url from "../../utils/url";
import { IServerReturnObject } from "../../utils/types/serverreturntype";

interface IProps {
  next: Function;
}

export default function EditProfile({ next }: IProps) {
  const [certificates, setCertificates] = React.useState([] as Array<ICertificate>);
  const [profilePic, setProfilePic] = React.useState("");
  const [profileFile, setProfileFile] = React.useState({});
  const [imgs, setImages] = React.useState([] as Array<string>);
  const [imgsFiles, setImgsFiles] = React.useState([] as Array<any>);
  const [loading, setLoading] = React.useState(false);
  const [picked, setPicked] = React.useState(false);
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.UserReducer.user);
  let fileReader = React.useRef(new FileReader).current;
  let fileReader2 = React.useRef(new FileReader).current;
  const picker = document.getElementById('picker1');
  const picker1 = document.getElementById('picker2');

  React.useEffect(() => {
    const certs = [] as Array<ICertificate>;
    const im = [] as string[];
    const files: any[] = [];
    details.certificates.map((item) => {
      const obj = Object.assign({}, item);
      certs.push(obj);
    })
    details.pictures.map((item) => {
      im.push(item);
      files.push(item);
    })
    setProfilePic(details.profile_pic);
    setCertificates(certs);
    setImages(im);
    setImgsFiles(files);
  }, [setCertificates, details.certificates, details.pictures, details.profile_pic]);

    React.useEffect(() => {
    fileReader.addEventListener('load', () => {
        const im = [...imgs, fileReader.result as string];
        setImages(im);
        setPicked(true);
    });

    return () => {
        fileReader.removeEventListener('load', () => {});
    }
    }, [fileReader, imgs])

    React.useEffect(() => {
      fileReader2.addEventListener('load', () => {
          setProfilePic(fileReader2.result as string);
      });

      return () => {
          fileReader2.removeEventListener('load', () => {});
      }
    }, [fileReader2])

  const addCert = () => {
    const dets = [...certificates, {certificate: '', link: '', organization: '', year: ''}];
    setCertificates(dets);
  }

  const changeCert = (index: number, name: 'year' | 'link' | 'organization' | 'certificate', value: string) =>{
    const newObj = [...certificates]
    newObj[index][name] = value;
    setCertificates(newObj);
 }

 const deleteCert = (index: number) => {
     const certs = certificates.filter((item, ind) => ind !== index)
     setCertificates(certs);
 }

 const deleteImgs = (index: number) => {
   const img = [...imgs];
   const files = [...imgsFiles];
   files.splice(index, 1);
   setImgsFiles(files);
   img.splice(index, 1);
   setImages(img);
   console.log(imgsFiles);
   console.log(imgs);
 }

  const pickImages = () => {
  picker?.click();
  }

  const pickPP = () => {
    picker1?.click();
    }

 const filesProcessor = (files: any[]) => {
   const imgs = [...imgsFiles, files[0]];
   setImgsFiles(imgs);
  fileReader.readAsDataURL(files[0]);
  }

  const profileProcessor = (files: any[]) => {
    setProfileFile(files[0]);
    fileReader2.readAsDataURL(files[0]);
   }

   const submit = async () => {
     setLoading(true);
      // submit
      const request = await fetch(`${url}user/certs/${details._id}`, {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ certificates: certificates })
      });
      const json = await request.json() as IServerReturnObject;
      if (json.statusCode !== 200) {
        alert(json.errorMessage);
      }

    if (picked) {
      const formData = new FormData();
      imgsFiles.map((item: File) => {
        if (typeof(item) === 'string') {
          return;
        }
        formData.append('img', item);
      });

      // make request
      const request = await fetch(`${url}user/${details._id}/imagesrecord`, {
        method: 'put',
        body: formData,
      });

      const json = await request.json() as IServerReturnObject;
      if (json.statusCode !== 200) {
        alert(json.errorMessage);
      }

      setLoading(false);
    }

    if (profilePic !== details.profile_pic) {
      const formData = new FormData();
      formData.append('img', profileFile as any);

      const request = await fetch(`${url}user/${details._id}/profilepic`, {
        method: 'put',
        body: formData,
      });

      const json = await request.json() as IServerReturnObject;
      if (json.statusCode !== 200) {
        alert(json.errorMessage);
      }else {
        alert('Changes successful');
        setLoading(false);
      }

    }
    setLoading(false);
    next(1);
   }

  return (
    <div className="w-full h-auto pb-10">
      <input hidden type="file" id="picker1" accept="image/*" onChange={(e) => filesProcessor(e.target.files as any)} />
      <input hidden type="file" id="picker2" accept="image/*" onChange={(e) => profileProcessor(e.target.files as any)} />
      <div className="w-full h-auto bg-white flex flex-col px-10 py-10">
        <div className="flex items-center h-auto">
          <div className="w-6 h-6 rounded-full bg-black flex justify-center items-center">
            <FiChevronLeft
              size={20}
              color="white"
              className="cursor-pointer"
              onClick={() => next(1)}
            />
          </div>
          <p className="text-2xl font-Circular-std-medium text-gray-600 ml-4">Edit Profile</p>
        </div>

        {/* <div className="w-full h-auto bg-white flex flex-col justify-center py-6">
          <p className="text-md font-Cerebri-sans-book">
          To make changes to
          </p>
          <ol className="list-decimal list-inside text-sm font-Circular-std-medium mt-3">
            <li>Business Name</li>
            <li>Business Description</li>
            <li>Services Rendered</li>
            <li>Email</li>
            <li>Social Media Links</li>
          </ol>
          <Link href="/contactus" passHref>
            <button className="w-32 h-10 border-2 border-themeGreen text-xs font-Cerebri-sans-book mt-3">
              Contact Support
            </button>
          </Link>
        </div> */}

        <div className="flex flex-col mt-8">
          <p className="text-sm font-Circular-std-medium text-gray-500 mt-4">
            Add featured images
          </p>

          {/* featured images */}

          <div className="w-auto h-32 overflow-x-auto overflow-y-hidden flex mt-6 flex-nowrap">
            {imgs.map((item, index) => (
              <div className="w-32 min-w-max max-w-md h-full overflow-hidden mr-4 " key={index.toString()}>

                <div
                className="min-w-max w-32 h-full bg-gray-200 flex flex-col justify-center items-center mr-4 z-0 overflow-hidden"
              >
                {/* <FiX size={20} color="red" className="z-30" /> */}
                <Image src={item} alt="picture" className="w-32 h-full z-0 object-cover" />
              </div>

              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.345)' }} className="relative w-32 h-32 z-20 flex flex-col bottom-32">
                  <div className="w-full h-8 flex justify-end p-1">
                    <div onClick={() => deleteImgs(index)} key={index.toString()} className="w-4 h-4 rounded bg-black cursor-pointer">
                      <FiX size={15} color="white" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center pt-4">
                      <FaCamera color="white" size={35} />
                    </div>
                </div>
              
              </div>
            ))}
            {imgs.length < 5 && (
              <div onClick={pickImages} className="w-32 min-w-32 max-w-md h-full overflow-hidden mr-4 bg-gray-200 flex justify-center items-center cursor-pointer">
                <FaCamera size={35} color="grey" />
              </div>
            )}
          </div>

        </div>

        <div className="flex h-auto flex-col mt-12">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <Image src={profilePic} alt="img" className="w-full h-full object-contain" />
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.345)' }} className="relative w-24 h-24 z-20 flex flex-col bottom-24">
                <div className="flex-1 flex justify-center items-center">
                  <FaCamera color="white" size={35} className="cursor-pointer" onClick={pickPP} />
                </div>
            </div>
          </div>
          {/* <Avatar size="xl" src={profilePic} className="cursor-pointer" onClick={pickPP} /> */}
          <p className="font-Circular-std-book text-sm text-gray-500 mt-4">
            Upload Profile Picture
          </p>
        </div>

        {/* business name */}

        <div className="flex flex-col w-full mt-8">
          <label className="font-Circular-std-book text-sm text-gray-600">Business Name</label>
          <div className="flex xl:w-3/5 lg:w-3/4 md:w-full sm:w-full h-12 items-center">
              <Input
                  disabled
                  value={details.business_name}
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  fontSize="sm"
                  className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                />
                <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                  <span>
                    <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                  </span>
                </Tooltip>
          </div>
        </div>

        {/* business Description */}

        <div className="flex flex-col w-full mt-8">
          <label className="font-Circular-std-book text-sm text-gray-600">Business Description</label>
          <div className="flex w-full h-20 items-center">
              <Textarea
                  value={details.business_description}
                  disabled
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  fontSize="sm"
                  className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                />
                <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                  <span>
                    <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                  </span>
                </Tooltip>
          </div>
        </div>

        {/* location details */}

        <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col w-full mt-3">

        <div className="flex flex-1 flex-col w-full xl:pr-5 md:mb-3 sm:mb-3">
          <label className="font-Circular-std-book text-sm text-gray-600">Email Address</label>
          <div className="flex w-full h-12 md:mt-3 sm:mt-3 items-center">
              <Input
                  value={details.email}
                  disabled
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  fontSize="sm"
                  className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                />
                <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                  <span>
                    <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                  </span>
                </Tooltip>
          </div>
        </div>

        <div className="flex flex-1 flex-col w-full md:mb-3 sm:mb-3">
          <label className="font-Circular-std-book text-sm text-gray-600">Phone Number</label>
          <div className="flex w-full h-12 md:mt-3 sm:mt-3 items-center">
              <Input
                  value={details.phone}
                  disabled
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  fontSize="sm"
                  className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                />
                <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                  <span>
                    <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                  </span>
                </Tooltip>
          </div>
        </div>

        </div>

        <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col w-full mt-3">

            <div className="flex flex-1 flex-col w-full xl:pr-5 md:mb-3 sm:mb-3">
              <label className="font-Circular-std-book text-sm text-gray-600">House/business address</label>
              <div className="flex w-full h-12 items-center">
                  <Input
                      value={details.business_address}
                      disabled
                      border="none"
                      bgColor="#F1EEEE"
                      borderRadius={0}
                      fontSize="sm"
                      className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                    />
                    <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                      <span>
                        <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                      </span>
                    </Tooltip>
              </div>
            </div>

            <div className="flex flex-1 flex-col w-full md:mb-3 sm:mb-3">
              <label className="font-Circular-std-book text-sm text-gray-600">State</label>
              <div className="flex w-full h-12 items-center">
                  <Select
                      value={details.state}
                      disabled
                      border="none"
                      bgColor="#F1EEEE"
                      borderRadius={0}
                      fontSize="sm"
                      className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                    >
                      <option value={details.state} selected>{details.state}</option>
                    </Select>
                    <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                      <span>
                        <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                      </span>
                    </Tooltip>
              </div>
            </div>

            </div>


            <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col w-full mt-3">

              <div className="flex flex-1 flex-col w-full xl:pr-5 md:mb-3 sm:mb-3">
                <label className="font-Circular-std-book text-sm text-gray-600">LGA</label>
                <div className="flex w-full h-12 items-center">
                    <Select
                        value={details.lga}
                        disabled
                        border="none"
                        bgColor="#F1EEEE"
                        borderRadius={0}
                        fontSize="sm"
                        className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                      >
                        <option value={details.lga} selected>{details.lga}</option>
                      </Select>
                      <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                        <span>
                          <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                        </span>
                      </Tooltip>
                </div>
              </div>

              <div className="flex flex-1 flex-col w-full md:mb-3 sm:mb-3">
                <label className="font-Circular-std-book text-sm text-gray-600">Country</label>
                <div className="flex w-full h-12 items-center">
                    <Select
                        value={details.country}
                        disabled
                        border="none"
                        bgColor="#F1EEEE"
                        borderRadius={0}
                        fontSize="sm"
                        className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                      >
                        <option value={details.country} selected>{details.country}</option>
                      </Select>
                      <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                        <span>
                          <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                        </span>
                      </Tooltip>
                </div>
              </div>

              </div>

              {/* services */}

              <div className="w-full flex flex-col">

                <div className="flex flex-1 flex-col xl:w-2/4 lg:w-2/4 md:w-full sm:w-full mt-6 xl:pr-2 lg:pr-2 md:mb-3 sm:mb-3">
                  <label className="font-Circular-std-book text-sm text-gray-600">Services</label>
                  <div className="flex w-full h-12 items-center">
                      <Select
                          value={details.country}
                          disabled
                          border="none"
                          bgColor="#F1EEEE"
                          borderRadius={0}
                          fontSize="sm"
                          className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                        >
                          <option value={details.country} selected>{details.country}</option>
                        </Select>
                        <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                          <span>
                            <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                          </span>
                        </Tooltip>
                        
                  </div>
                </div>

                <div className="flex-1 flex w-full xl:flex-row lg:flex-row md:flex-col sm:flex-col">
                  {details.services.map((item, index) => (
                    <div key={index.toString()} className="h-auto p-2 text-xs bg-green-100 text-themeGreen font-Cerebri-sans-book xl:mr-3 flex- items-center md:mb-2 sm:mb-2">
                      {item}
                    </div>
                  ))}
                </div>

              </div>


            



        <p className="mt-6 font-Circular-std-medium text-sm text-gray-500">Certificate</p>

        {certificates.map((items, index) => (
          <div
            key={index.toString()}
            className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500"
          >
            <div className="w-full font-Cerebri-sans-book">
              <label>Certifcate</label>
              <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                  value={items.certificate}
                  onChange={(e) => changeCert(index, 'certificate', e.target.value)}
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  className="bg-gray-100 mt-3 text-sm font-Cerebri-sans-book"
                />
              </div>
            </div>

            <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
              <label>Organisation</label>
              <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                <Input
                  value={items.organization}
                  onChange={(e) => changeCert(index, 'organization', e.target.value)}
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  className="bg-gray-100 mt-3 text-sm font-Cerebri-sans-book"
                />
              </div>
            </div>

            <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
              <label>issued Year</label>
              <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                <Input
                  value={items.year}
                  onChange={(e) => changeCert(index, 'year', e.target.value)}
                  type="date"
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  className="bg-gray-100 mt-3 text-sm font-Cerebri-sans-book"
                />
              </div>
            </div>

            <div className="w-full sm:mt-4 md:mt-4 lg:mt-0 xl:mt-0">
              <label>Link</label>
              <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                <Input
                  value={items.link}
                  onChange={(e) => changeCert(index, 'link', e.target.value)}
                  border="none"
                  bgColor="#F1EEEE"
                  borderRadius={0}
                  className="bg-gray-100 mt-3 text-sm font-Cerebri-sans-book"
                />
              </div>
            </div>

              <div className="flex items-center">
                <FiX size={25} color="red" onClick={() => deleteCert(index)} className="cursor-pointer mt-7" />
              </div>

          </div>
        ))}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4"></div>

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4"></div>
        </div>

        <p onClick={addCert} className="mt-6 font-Circular-std-medium text-sm text-gray-500 cursor-pointer">
          + Add Another Certification
        </p>

        {/* social media */}

        <p className="text-md font-Circular-std-medium mt-8 text-gray-600">Connected Accounts</p>

        <div className="w-full flex flex-col">

            <div className="flex flex-1 flex-col xl:w-2/4 lg:w-2/4 md:w-full sm:w-full mt-6 xl:pr-2 lg:pr-2 md:mb-3 sm:mb-3">
              <label className="font-Circular-std-book text-sm text-gray-600">Instagram</label>
              <div className="flex w-full h-12 items-center">
                  <Input
                      value={details.instagram}
                      disabled
                      border="none"
                      bgColor="#F1EEEE"
                      borderRadius={0}
                      fontSize="sm"
                      className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                    />
                    <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                      <span>
                        <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                      </span>
                    </Tooltip>
                    
              </div>
            </div>

            <div className="flex-1 flex w-full">
             
            </div>

            </div>

            <div className="w-full flex flex-col">

            <div className="flex flex-1 flex-col xl:w-2/4 lg:w-2/4 md:w-full sm:w-full mt-6 xl:pr-2 lg:pr-2 md:mb-3 sm:mb-3">
              <label className="font-Circular-std-book text-sm text-gray-600">Twitter</label>
              <div className="flex w-full h-12 items-center">
                  <Input
                      value={details.twitter}
                      disabled
                      border="none"
                      bgColor="#F1EEEE"
                      borderRadius={0}
                      fontSize="sm"
                      className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                    />
                    <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                      <span>
                        <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                      </span>
                    </Tooltip>
                    
              </div>
            </div>

            <div className="flex-1 flex w-full">
             
            </div>

            </div>

            <div className="w-full flex flex-col">

            <div className="flex flex-1 flex-col xl:w-2/4 lg:w-2/4 md:w-full sm:w-full mt-6 xl:pr-2 lg:pr-2 md:mb-3 sm:mb-3">
              <label className="font-Circular-std-book text-sm text-gray-600">Facebook</label>
              <div className="flex w-full h-12 items-center">
                  <Input
                      value={details.facebook}
                      disabled
                      border="none"
                      bgColor="#F1EEEE"
                      borderRadius={0}
                      fontSize="sm"
                      className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                    />
                    <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                      <span>
                        <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                      </span>
                    </Tooltip>
                    
              </div>
            </div>

            

            <div className="flex-1 flex w-full">
             
            </div>

            </div>

            <div className="w-full flex flex-col">

            <div className="flex flex-1 flex-col xl:w-2/4 lg:w-2/4 md:w-full sm:w-full mt-6 xl:pr-2 lg:pr-2 md:mb-3 sm:mb-3">
              <label className="font-Circular-std-book text-sm text-gray-600">Whatsapp</label>
              <div className="flex w-full h-12 items-center">
                  <Input
                      value={details.whatsapp}
                      disabled
                      border="none"
                      bgColor="#F1EEEE"
                      borderRadius={0}
                      fontSize="sm"
                      className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                    />
                    <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                      <span>
                        <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                      </span>
                    </Tooltip>
                    
              </div>
            </div>

            <div className="flex-1 flex w-full">
             
            </div>

            </div>

            <div className="w-full flex flex-col">

            <div className="flex flex-1 flex-col xl:w-2/4 lg:w-2/4 md:w-full sm:w-full mt-6 xl:pr-2 lg:pr-2 md:mb-3 sm:mb-3">
              <label className="font-Circular-std-book text-sm text-gray-600">Website</label>
              <div className="flex w-full h-12 items-center">
                  <Input
                      value={details.website}
                      disabled
                      border="none"
                      bgColor="#F1EEEE"
                      borderRadius={0}
                      fontSize="sm"
                      className="bg-gray-100 mt-3 font-Cerebri-sans-book"
                    />
                    <Tooltip hasArrow size="lg" fontSize="xs" className="font-Cerebri-sans-book" label="Sorry, you can't update this information at the moment. Reach out to our support for further assistance" placement="top">
                      <span>
                        <FiHelpCircle color="green" size={20} className="cursor-pointer ml-2" />
                      </span>
                    </Tooltip>
                    
              </div>
            </div>

            <div className="flex-1 flex w-full">
             
            </div>

            </div>

            <div className="w-full flex justify-end mt-6">
              <button
                onClick={submit}
                className="w-32 bg-themeGreen h-12 text-sm font-Cerebri-sans-book text-white"
              >
                {loading && <Spinner size="md" color="white" />}
                {!loading && <span>Update</span>}
              </button>
            </div>


      </div>
    </div>
  );
}
