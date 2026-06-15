import { useState, type FunctionComponent } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

type Props = {
    onSearchChange: (query: string) => void;
};

const Header: FunctionComponent<Props> = ({ onSearchChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMain = location.pathname === '/';
    const isProblems = location.pathname === '/' || location.pathname.startsWith('/problems');
    const isStatus = location.pathname === '/status';
    const isLectures = location.pathname.startsWith('/lectures');
    const isBoard = location.pathname.startsWith('/board');
    const isGroups = location.pathname.startsWith('/groups');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleSearchToggle = () => {
        if (isSearchOpen) {
            setIsSearchOpen(false);
            setInputValue('');
            onSearchChange('');
        } else {
            setIsSearchOpen(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (isMain) onSearchChange(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isMain && inputValue.trim()) {
            navigate(`/?q=${encodeURIComponent(inputValue.trim())}`);
        }
    };

    return (
        <div className={styles.headertemplate}>
            <div className={styles.topPc}>
                <div className={styles.header}>
                    <div className={styles.utilityGroup}>
                        <div className={styles.misloganH48}>
                            <div className={styles.mi} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                                <img className={styles.favicon11} src="/logo.png" alt="CodeClass 로고" />
                                <div className={styles.codeclass}>CodeClass</div>
                            </div>
                        </div>
                        <div className={styles.utilityMedium}>
                            {!isSearchOpen && (
                                <div className={styles.baseHeaderUtilityMenu} style={{ cursor: 'pointer' }} onClick={handleSearchToggle}>
                                    <Search size={20} />
                                    <b className={styles.div}>문제 검색</b>
                                </div>
                            )}
                            {isSearchOpen && (
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder="문제 번호 또는 제목 검색..."
                                        className={styles.searchInput}
                                        style={{ paddingRight: '36px' }}
                                    />
                                    <X
                                        size={20}
                                        style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
                                        onClick={handleSearchToggle}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.baseGnb1depth}>
                    <div className={styles.gnbLeft}>
                        <div className={isProblems ? styles.baseGnb1depthAtomic : styles.baseGnb1depthAtomic2} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                            <b className={styles.div}>문제</b>
                        </div>
                        <div className={isStatus ? styles.baseGnb1depthAtomic : styles.baseGnb1depthAtomic2} style={{ cursor: 'pointer' }} onClick={() => navigate('/status')}>
                            <b className={styles.div}>채점 현황</b>
                        </div>
                        <div className={isBoard ? styles.baseGnb1depthAtomic : styles.baseGnb1depthAtomic2} style={{ cursor: 'pointer' }} onClick={() => navigate('/board')}>
                            <b className={styles.div}>게시판</b>
                        </div>
                        <div className={isLectures ? styles.baseGnb1depthAtomic : styles.baseGnb1depthAtomic2} style={{ cursor: 'pointer' }} onClick={() => navigate('/lectures')}>
                            <b className={styles.div}>강의</b>
                        </div>
                        <div className={isGroups ? styles.baseGnb1depthAtomic : styles.baseGnb1depthAtomic2} style={{ cursor: 'pointer' }} onClick={() => navigate('/groups')}>
                            <b className={styles.div}>그룹</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Header ;
