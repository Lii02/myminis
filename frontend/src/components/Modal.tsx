'use client';
import styles from '@/styles/modal.module.css';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

function Modal(props: ModalProps) {
	if (!props.isOpen) return null;

	return createPortal(
		<div className={styles.ModalOverlay} onClick={props.onClose}>
			<div className={styles.Modal} onClick={(e) => e.stopPropagation()}>
				<button className='CloseButton' onClick={props.onClose}>
					<MdClose />
				</button>
				{props.children}
			</div>
		</div>,
		document.body,
	);
}

export { type ModalProps, Modal };
