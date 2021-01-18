export const getRegionCounts = (layout) => {
  switch (layout) {
    case 'layout1':
    case 'layout8':
      return [
        {
          width: '100.00%',
          height: '100.00%',
          top: '0',
          left: '0',
        },
      ];
    case 'layout3':
    case 'layout9':
      return [
        {
          width: '100.00%',
          height: '90.00%',
          top: '0',
          left: '0',
        },
        {
          width: '100.00%',
          height: '10.00%',
          top: '90.00%',
          left: '0',
        },
      ];
    case 'layout4':
      return [
        {
          width: '70.00%',
          height: '100.00%',
          top: '0',
          left: '0',
        },
        {
          width: '30.00%',
          height: '50.00%',
          top: '0',
          left: '70.00%',
        },
        {
          width: '30.00%',
          height: '50.00%',
          top: '50.00%',
          left: '70.00%',
        },
      ];
    case 'layout5':
      return [
        {
          width: '70.00%',
          height: '100.00%',
          top: '0',
          left: '0',
        },
        {
          width: '30.00%',
          height: '33.33%',
          top: '0',
          left: '70.00%',
        },
        {
          width: '30.00%',
          height: '33.34%',
          top: '33.33%',
          left: '70.00%',
        },
        {
          width: '30.00%',
          height: '33.33%',
          top: '66.67%',
          left: '70.00%',
        },
      ];
    case 'layout6':
      return [
        {
          width: '70.00%',
          height: '90.00%',
          top: '0',
          left: '0',
        },
        {
          width: '30.00%',
          height: '45.00%',
          top: '0',
          left: '70.00%',
        },
        {
          width: '30.00%',
          height: '45.00%',
          top: '45.00%',
          left: '70.00%',
        },
        {
          width: '100.00%',
          height: '10.00%',
          top: '90.00%',
          left: '0',
        },
      ];
    case 'layout10':
      return [
        {
          width: '100.00%',
          height: '45.00%',
          top: '0',
          left: '0',
        },
        {
          width: '100.00%',
          height: '45.00%',
          top: '45.00%',
          left: '0',
        },
        {
          width: '100.00%',
          height: '10.00%',
          top: '90.00%',
          left: '0',
        },
      ];
    case 'layout11':
      return [
        {
          width: '100.00%',
          height: '35.00%',
          top: '0',
          left: '0',
        },
        {
          width: '50.00%',
          height: '55.00%',
          top: '35.00%',
          left: '0',
        },
        {
          width: '50.00%',
          height: '55.00%',
          top: '35.00%',
          left: '50.00%',
        },
        {
          width: '100.00%',
          height: '10.00%',
          top: '90.00%',
          left: '0',
        },
      ];
    case 'layout12':
      return [
        {
          width: '100.00%',
          height: '20.00%',
          top: '0',
          left: '0',
        },
        {
          width: '100.00%',
          height: '20.00%',
          top: '20.00%',
          left: '0',
        },
        {
          width: '50.00%',
          height: '50.00%',
          top: '40.00%',
          left: '0',
        },
        {
          width: '50.00%',
          height: '50.00%',
          top: '40.00%',
          left: '50.00%',
        },
        {
          width: '100.00%',
          height: '10.00%',
          top: '90.00%',
          left: '0',
        },
      ];
    default:
      break;
  }
};

export const getRegionInfo = (layout) => {
  switch (layout) {
    case 'layout1':
    case 'layout8':
      return [
        {
          width: 1,
          height: 1,
          y: 0,
          x: 0,
        },
      ];
    case 'layout3':
    case 'layout9':
      return [
        {
          width: 1,
          height: 0.9,
          y: 0,
          x: 0,
        },
        {
          width: 1,
          height: 0.1,
          y: 0.9,
          x: 0,
        },
      ];
    case 'layout4':
      return [
        {
          width: 0.7,
          height: 1,
          y: 0,
          x: 0,
        },
        {
          width: 0.3,
          height: 0.5,
          y: 0,
          x: 0.7,
        },
        {
          width: 0.3,
          height: 0.5,
          y: 0.5,
          x: 0.7,
        },
      ];
    case 'layout5':
      return [
        {
          width: 0.7,
          height: 1,
          y: 0,
          x: 0,
        },
        {
          width: 0.3,
          height: 0.33,
          y: 0,
          x: 0.7,
        },
        {
          width: 0.3,
          height: 0.34,
          y: 0.33,
          x: 0.7,
        },
        {
          width: 0.3,
          height: 0.33,
          y: 0.67,
          x: 0.7,
        },
      ];
    case 'layout6':
      return [
        {
          width: 0.7,
          height: 0.9,
          y: 0,
          x: 0,
        },
        {
          width: 0.3,
          height: 0.45,
          y: 0,
          x: 0.7,
        },
        {
          width: 0.3,
          height: 0.45,
          y: 0.45,
          x: 0.7,
        },
        {
          width: 1,
          height: 0.1,
          y: 0.9,
          x: 0,
        },
      ];
    case 'layout10':
      return [
        {
          width: 1,
          height: 0.45,
          y: 0,
          x: 0,
        },
        {
          width: 1,
          height: 0.45,
          y: 0.45,
          x: 0,
        },
        {
          width: 1,
          height: 0.1,
          y: 0.9,
          x: 0,
        },
      ];
    case 'layout11':
      return [
        {
          width: 1,
          height: 0.35,
          y: 0,
          x: 0,
        },
        {
          width: 0.5,
          height: 0.55,
          y: 0.35,
          x: 0,
        },
        {
          width: 0.5,
          height: 0.55,
          y: 0.35,
          x: 0.5,
        },
        {
          width: 1,
          height: 0.1,
          y: 0.9,
          x: 0,
        },
      ];
    case 'layout12':
      return [
        {
          width: 1,
          height: 0.2,
          y: 0,
          x: 0,
        },
        {
          width: 1,
          height: 0.2,
          y: 0.2,
          x: 0,
        },
        {
          width: 0.5,
          height: 0.5,
          y: 0.4,
          x: 0,
        },
        {
          width: 0.5,
          height: 0.5,
          y: 0.4,
          x: 0.5,
        },
        {
          width: 1,
          height: 0.1,
          y: 0.9,
          x: 0,
        },
      ];
    default:
      break;
  }
};
