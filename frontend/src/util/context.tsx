'use client';
import { createContext, useContext, useState } from 'react';
import { User } from './user';

interface GlobalState {
	user: User | null;
	signIn: (user: any) => void;
	signOut: () => void;
}

const context = createContext<any>(null);

function GlobalStateProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [user, setUser] = useState<User | null>(null);

	const signIn = (user: User) => {
		setUser(user);
	};

	const signOut = () => {
		setUser(null);
	};

	return <context.Provider value={{ user, signIn, signOut }}>{children}</context.Provider>;
}

function useGlobalContext(): GlobalState {
	return useContext(context);
}

export { type GlobalState, GlobalStateProvider, useGlobalContext };
