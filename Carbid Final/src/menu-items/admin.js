// assets
import { UserOutlined } from '@ant-design/icons';
import { SnippetsOutlined } from '@ant-design/icons';
import { ContainerOutlined } from '@ant-design/icons';


// icons
const icons = {
    UserOutlined,
    SnippetsOutlined,
    ContainerOutlined
};

// ==============================|| MENU ITEMS - ADMIN ||============================== //

const admin = {
    id: 'admin',
    title: 'Admin',
    type: 'group',
    children: [
        {
            id: 'manageusers',
            title: ' Manage Users',
            type: 'item',
            url: '/manageUsers',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'managebids',
            title: 'Manage Bids',
            type: 'item',
            url: '/manageBids',
            icon: icons.SnippetsOutlined,
            breadcrumbs: false
        },
        {
            id: 'bidding-cars-info',
            title: 'Cars Info',
            type: 'item',
            url: '/biddingcarsinfo',
            icon: icons.ContainerOutlined,
            breadcrumbs: false
        }
    ]
};

export default admin;
