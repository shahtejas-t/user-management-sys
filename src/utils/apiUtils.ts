// src/utils/apiUtils.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export async function get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
        const response = await axios.get(url, config);
        return response;
    } catch (error) {
        handleRequestError(error as AxiosError);
        throw error;
    }
}

export function handleRequestError(error: AxiosError): void {
    if (error.response) {
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
    } else if (error.request) {
        console.error('No response received from server');
    } else {
        console.error('Error setting up request:', error.message);
    }
}
