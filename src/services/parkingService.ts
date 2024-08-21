import axios from 'axios';

const baseUrl = 'https://parking-lot-to-pfz.herokuapp.com';

export const registerParkingService = async (plate: string) => {
    return axios.post(`${baseUrl}/parking`, {
        plate,
    }, {
        headers: {
          'Content-Type': 'application/json',
        },
    }).then(response => response.data);
};

export const registerPaymentParkingService = async (plate: string) => {
    return axios.post(`${baseUrl}/parking/${plate}/pay`, {
        headers: {
          'Content-Type': 'application/json',
        },
    }).then(response => response.data);
};

export const registerExitParkingService = async (plate: string) => {
    return axios.post(`${baseUrl}/parking/${plate}/out`, {
        headers: {
          'Content-Type': 'application/json',
        },
    }).then(response => response.data);
};

export const getHistoryParkingService = async (plate: string) => {
    return axios.get(`${baseUrl}/parking/${plate}`, {
        headers: {
          'Content-Type': 'application/json',
        },
    }).then(response => response.data);
};
