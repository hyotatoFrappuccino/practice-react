import type {FunctionComponent} from 'react';
import styles from './Footer.module.css';


const Footer: FunctionComponent = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.grid}>
                    <div className={styles.div}>
                        <div className={styles.div2}>
                            <div className={styles.socialMediaLinkBase}>
                                <div className={styles.b}>(24341) 강원특별자치도 춘천시 강원대학길 1 강원대학교</div>
                            </div>
                        </div>
                        <div className={styles.div5}>
                            <div className={styles.div6}>
                                <b className={styles.b}>대표전화 033-250-7777</b>
                                <div className={styles.b}>(평일 09시~18시)</div>
                            </div>
                            <div className={styles.socialMediaLinkBase}>
                                <b className={styles.b}>이메일 codeclass@codeclass.net</b>
                            </div>
                        </div>
                    </div>
                    <div className={styles.serviceLink}>
                        <div className={styles.socialMedia}>
                            <div className={styles.socialMediaLinkBase}>
                                <img className={styles.imgInstagramIcon} alt="" />
                            </div>
                            <div className={styles.socialMediaLinkBase}>
                                <img className={styles.imgYoutubeIcon} alt="" />
                            </div>
                            <div className={styles.socialMediaLinkBase}>
                                <img className={styles.imgInstagramIcon} alt="" />
                            </div>
                            <div className={styles.socialMediaLinkBase}>
                                <img className={styles.imgInstagramIcon} alt="" />
                            </div>
                            <div className={styles.socialMediaLinkBase}>
                                <img className={styles.imgInstagramIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <div className={styles.div11}>
                        <div className={styles.button2}>
                            <div className={styles.b}>이용약관</div>
                        </div>
                        <div className={styles.button2}>
                            <b className={styles.b}>개인정보처리방침</b>
                        </div>
                        <div className={styles.button2}>
                            <div className={styles.b}>저작권정책</div>
                        </div>
                    </div>
                    <div className={styles.copyright2}>
                        <div className={styles.b}>© CodeClass. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </div>);
};

export default Footer ;
