import icons from 'enl-api/images/icons';
import floors from 'enl-api/images/floors';
import messages from './messages';
import heatMapData from './heatMapCoords'

export const filters = [
  {
    filter: '',
    message: messages.view_all
  },
  {
    filter: 'apparels',
    message: messages.apparels
  },
  {
    filter: 'clothings',
    message: messages.clothings
  }
];

export const data = [
  {
    id: 'madagascar',
    title: 'Madagascar',
    icon: icons.madagascar,
    subgroups: [
      {
        id: 'diana',
        title: 'Diana',
        icon: icons.region,
        subgroups: [
          {
            id: 'ambanja',
            title: 'Ambanja',
            icon: icons.locality,
            subgroups: [
              {
                id: '1',
                title: 'building 1',
                icon: icons.building,
                category: 'apparels',
                subgroups: [
                  {
                    id: '1_1',
                    title: 'floor 1',
                    image: floors[0],
                    icon: icons.floor,
                    data: heatMapData[0],
                    width: 998,
                    height: 1000
                  },
                  {
                    id: '1_2',
                    title: 'atrium',
                    image: floors[1],
                    icon: icons.floor,
                    data: heatMapData[1],
                    width: 1000,
                    height: 1000
                  }
                ]
              },
              {
                id: '2',
                title: 'building 2',
                icon: icons.building,
                category: '',
                subgroups: [
                  {
                    id: '2_1',
                    title: 'floor 0',
                    image: floors[2],
                    icon: icons.floor,
                    data: heatMapData[2],
                    width: 1028,
                    height: 1000
                  },
                  {
                    id: '2_2',
                    title: 'hall',
                    image: floors[3],
                    icon: icons.floor,
                    data: heatMapData[3],
                    width: 1015,
                    height: 1000
                  },
                  {
                    id: '2_3',
                    title: 'floor 1',
                    image: floors[4],
                    icon: icons.floor,
                    data: heatMapData[4],
                    width: 1000,
                    height: 1000
                  },
                  {
                    id: '2_4',
                    title: 'floor 2',
                    image: floors[5],
                    icon: icons.floor,
                    data: heatMapData[5],
                    width: 1000,
                    height: 1000
                  },
                  {
                    id: '2_5',
                    title: 'food court',
                    image: floors[6],
                    icon: icons.floor,
                    data: heatMapData[6],
                    width: 1001,
                    height: 1000
                  },
                ]
              },
            ]
          },
          {
            id: 'antisiranana',
            title: 'Antisiranana',
            icon: icons.locality,
            subgroups: [
              {
                id: '3',
                title: 'building 3',
                icon: icons.building,
                category: 'clothings',
                subgroups: [
                  {
                    id: '3_1',
                    title: 'floor 1',
                    image: floors[7],
                    icon: icons.floor,
                    data: heatMapData[7],
                    width: 650,
                    height: 904
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'sava',
        title: 'Sava',
        icon: icons.region,
        subgroups: [
          {
            id: 'sambava',
            title: 'Sambava',
            icon: icons.locality,
            subgroups: [
              {
                id: '4',
                title: 'building 4',
                icon: icons.building,
                category: '',
                subgroups: [
                  {
                    id: '4_1',
                    title: 'floor 1',
                    image: floors[8],
                    icon: icons.floor,
                    data: heatMapData[8],
                    width: 1000,
                    height: 709
                  },
                  {
                    id: '4_2',
                    title: 'floor 2',
                    image: floors[9],
                    icon: icons.floor,
                    data: heatMapData[9],
                    width: 1000,
                    height: 709
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'chile',
    title: 'Chile',
    icon: icons.chile,
    subgroups: [
      {
        id: 'antofagasta',
        title: 'Antofagasta',
        icon: icons.region,
        subgroups: [
          {
            id: 'antofagasta',
            title: 'Antofagasta',
            icon: icons.locality,
            subgroups: [
              {
                id: '5',
                title: 'building 5',
                icon: icons.building,
                category: 'apparels',
                subgroups: [
                  {
                    id: '5_1',
                    title: 'floor 1',
                    image: floors[10],
                    icon: icons.floor,
                    data: heatMapData[10],
                    width: 1000,
                    height: 850
                  },
                  {
                    id: '5_2',
                    title: 'administration',
                    image: floors[11],
                    icon: icons.floor,
                    data: heatMapData[11],
                    width: 1000,
                    height: 850
                  },
                  {
                    id: '5_3',
                    title: 'floor 2',
                    image: floors[12],
                    icon: icons.floor,
                    data: heatMapData[12],
                    width: 1000,
                    height: 850
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
