import { useEffect, type FunctionComponent } from 'react';
import styles from './Toast.module.css';

type Props = {
    message: string;
    onClose: () => void;
};

const Toast: FunctionComponent<Props> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return <div className={styles.toast}>{message}</div>;
};

export default Toast;
