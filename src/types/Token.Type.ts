import {atom} from 'recoil';

const token: string = '';

export const TokenState = atom({
    key: 'TokenState',
    default: token,
});