import zh_CN from '../Language/zh_CN';
import en_US from '../Language/en_US.js';


const lang = function (_data) {
    if (_data) {
        if (_data.indexOf('zh') === -1) {
            return en_US;
        } else {
            return zh_CN;
        }
    }
    switch (localStorage.getItem('language')) {
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        default:
            return zh_CN;
    }
}

export default lang
