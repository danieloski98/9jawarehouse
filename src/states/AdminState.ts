import {atom} from 'recoil';
import { IAdmin } from '../types/Admin.Type';

const admin: IAdmin = {
    _id: '',
    fullname: '',
    email: '',
    password: '',
    permissions: [],
    picture: '',
    type: 0,
    created_at: '',
};

export const AdminState = atom({
    key: 'AdminState',
    default: admin
});