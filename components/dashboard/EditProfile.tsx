import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Image,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { FiChevronLeft, FiCamera, FiX } from "react-icons/fi";
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
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.UserReducer.user);
  let fileReader = React.useRef(new FileReader).current;
  let fileReader2 = React.useRef(new FileReader).current;
  const picker = document.getElementById('picker1');
  const picker1 = document.getElementById('picker2');

  React.useEffect(() => {
    const certs = [] as Array<ICertificate>;
    const im = [] as string[];
    details.certificates.map((item) => {
      const obj = Object.assign({}, item);
      certs.push(obj);
    })
    details.pictures.map((item) => {
      im.push(item);
    })
    setProfilePic(details.profile_pic);
    setCertificates(certs);
    setImages(im);
  }, [setCertificates, details.certificates, details.pictures, details.profile_pic]);

    React.useEffect(() => {
    fileReader.addEventListener('load', () => {
        const im = [...imgs, fileReader.result as string];
        setImages(im);
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
    if (certificates.length !== details.certificates.length) {
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
    } 
    if (imgsFiles.length > 0) {
      const formData = new FormData();
      imgsFiles.map((item: File) => {
        formData.append('img', item);
      });

      // make request
      const request = await fetch(`${url}user/${details._id}/images`, {
        method: 'put',
        body: formData,
      });

      const json = await request.json() as IServerReturnObject;
      if (json.statusCode !== 200) {
        alert(json.errorMessage);
      }
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
   }

  return (
    <div className="w-full h-auto pb-10">
      <input hidden type="file" id="picker1" accept="image/*" onChange={(e) => filesProcessor(e.target.files as any)} />
      <input hidden type="file" id="picker2" accept="image/*" onChange={(e) => profileProcessor(e.target.files as any)} />
      <div className="w-full h-auto bg-white flex flex-col p-6">
        <div className="flex items-center h-auto">
          <FiChevronLeft
            size={30}
            color="grey"
            className="cursor-pointer"
            onClick={() => next(1)}
          />
          <p className="text-2xl font-Circular-std-medium text-gray-600 ml-4">Edit Profile</p>
        </div>

        <div className="w-full h-auto bg-white flex flex-col justify-center py-6">
          <p className="text-md font-Circular-std-book">
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
            <button className="w-32 h-10 border-2 border-themeGreen text-xs font-Circular-std-book mt-3">
              Contact Support
            </button>
          </Link>
        </div>

        <div className="flex flex-col mt-8">
          <p className="text-sm font-Circular-std-medium text-gray-500 mt-4">
            Add featured images
          </p>
          <div className="w-auto h-24 overflow-x-auto overflow-y-hidden flex mt-6 flex-nowrap">
            {imgs.map((item, index) => (
              <div className="w-24 min-w-lg max-w-md h-full overflow-hidden mr-4 rounded-md" key={index.toString()}>
                <div
                className="min-w-max h-full bg-gray-200 flex flex-col justify-center items-center mr-4 "
              >
                <FiX size={20} color="red" className="z-30" />
                <Image src={item} alt="picture" />
              </div>
              </div>
            ))}
            {details.pictures.length < 5 && (
              <div onClick={pickImages} className="w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
                <FiCamera size={35} color="grey" />
              </div>
            )}
          </div>
        </div>

        <div className="flex h-auto flex-col mt-12">
          <Avatar size="xl" src={profilePic} className="cursor-pointer" onClick={pickPP} />
          <p className="font-Circular-std-medium text-sm text-gray-500 mt-4">
            Upload Profile Picture
          </p>
        </div>

        <p className="mt-6 font-Circular-std-medium text-sm text-gray-500">Certificate</p>

        {certificates.map((items, index) => (
          <div
            key={index.toString()}
            className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500"
          >
            <div className="w-full font-Circular-std-book">
              <label>Certifcate</label>
              <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                <Input
                  value={items.certificate}
                  onChange={(e) => changeCert(index, 'certificate', e.target.value)}
                  border="none"
                  bgColor="whitesmoke"
                  borderRadius={0}
                  className="bg-gray-100 mt-3"
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
                  bgColor="whitesmoke"
                  borderRadius={0}
                  className="bg-gray-100 mt-3"
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
                  bgColor="whitesmoke"
                  borderRadius={0}
                  className="bg-gray-100 mt-3"
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
                  bgColor="whitesmoke"
                  borderRadius={0}
                  className="bg-gray-100 mt-3"
                />
              </div>
            </div>

            {certificates.length > 1 && (
              <div className="flex items-center">
                <FiX size={25} color="red" onClick={() => deleteCert(index)} className="cursor-pointer mt-7" />
              </div>
            )}
          </div>
        ))}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4"></div>

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4"></div>
        </div>

        <p onClick={addCert} className="mt-6 font-Circular-std-medium text-sm text-gray-500 cursor-pointer">
          + Add Another Certification
        </p>

        <div className="w-full flex justify-end mt-6">
          <button
            onClick={submit}
            className="w-32 bg-themeGreen h-12 text-sm font-Circular-std-book text-white"
          >
            {loading && <Spinner size="md" color="white" />}
            {!loading && <span>Continue</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
