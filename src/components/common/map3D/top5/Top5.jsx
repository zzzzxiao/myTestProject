import React from 'react';
import Classnames from 'classnames';
import styles from './top5.scss';
import { overtopOmit } from 'utils/util';
const Top5 = ({ data, title, showTrend = true, type }) => {
    return <div className={Classnames(styles.top5, { [styles.mini]: type })}>
        <p className={styles.date}>{title}</p>
        <h2 className={styles.title}>TOP5</h2>
        <div className={styles.content}>
            <table>
                <tbody>
                    {
                        data.map((item, index) => {
                            let keyIndex = `top5${index}`;
                            return (
                                <tr key={keyIndex}>
                                    <td width={showTrend ? '45%' : '70%'} className={styles.city} title={item.name}><span>{overtopOmit(4, item.name, true)}</span></td>
                                    <td className={styles.num}>
                                        <span>{item.value}</span> 
                                        {showTrend && <em className={Classnames([styles.trend], [styles[item.order]])}></em>}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>;
};

export default Top5;