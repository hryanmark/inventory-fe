import instance from './instance';

export const getAllBrands = () => {
    return instance.get('/brand');  
}
