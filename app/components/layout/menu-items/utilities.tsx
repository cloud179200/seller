// assets
import { TbTypography, TbPalette, TbShadow, TbWindmill } from 'react-icons/tb';

// constant
const icons = {
    TbTypography,
    TbPalette,
    TbShadow,
    TbWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Typography',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.TbTypography,
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.TbPalette,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.TbShadow,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Tbs',
            type: 'collapse',
            icon: icons.TbWindmill,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Tbs',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Tbs',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
