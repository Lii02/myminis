import { Dispatch, SetStateAction } from 'react';

interface BackendResponse {
	status: boolean;
	message: string;
	data: string;
}

interface GenericStateProp<T> {
	value: T;
	setValue: Dispatch<SetStateAction<T>>;
}

interface ModalFormProps {
	form: GenericStateProp<number>;
	modal: GenericStateProp<boolean>;
}

export { type BackendResponse, type GenericStateProp, type ModalFormProps };
