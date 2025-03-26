import { Dispatch, SetStateAction } from 'react';

interface GenericStateProp<T> {
	value: T;
	setValue: Dispatch<SetStateAction<T>>;
}

export { type GenericStateProp };
