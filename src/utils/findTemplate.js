import layout1 from '../assets/images/template/layout1.png';
import layout2 from '../assets/images/template/layout2.png';
import layout3 from '../assets/images/template/layout3.png';
import layout4 from '../assets/images/template/layout4.png';
import layout5 from '../assets/images/template/layout5.png';
import layout6 from '../assets/images/template/layout6.png';
import layout7 from '../assets/images/template/layout7.png';
import layout8 from '../assets/images/template/layout8.png';
import layout9 from '../assets/images/template/layout9.png';
import layout10 from '../assets/images/template/layout10.png';
import layout11 from '../assets/images/template/layout11.png';
import layout12 from '../assets/images/template/layout12.png';
import layout13 from '../assets/images/template/layout13.png';

export const findTemplate = (layout) => {
  switch (layout) {
    case 'layout1':
      return layout1;
    case 'layout2':
      return layout2;
    case 'layout3':
      return layout3;
    case 'layout4':
      return layout4;
    case 'layout5':
      return layout5;
    case 'layout6':
      return layout6;
    case 'layout7':
      return layout7;
    case 'layout8':
      return layout8;
    case 'layout9':
      return layout9;
    case 'layout10':
      return layout10;
    case 'layout11':
      return layout11;
    case 'layout12':
      return layout12;
    case 'layout13':
      return layout13;
    default:
      break;
  }
};
