// assets
import { DashboardOutlined } from '@ant-design/icons';
import { HomeOutlined } from '@ant-design/icons';
import { ShopOutlined } from '@ant-design/icons';
import { SnippetsOutlined } from '@ant-design/icons';
import { HeartOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    HomeOutlined,
    ShopOutlined,
    SnippetsOutlined,
    HeartOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/home',
            icon: icons.HomeOutlined,
            breadcrumbs: false
        },
        {
            id: 'bidding',
            title: 'Bidding',
            type: 'item',
            url: '/bidding',
            icon: icons.ShopOutlined,
            breadcrumbs: false
        },
        {
            id: 'mybids',
            title: 'My Bids',
            type: 'item',
            url: '/mybids',
            icon: icons.SnippetsOutlined,
            breadcrumbs: false
        },
        {
            id: 'favourite',
            title: 'My Favourite',
            type: 'item',
            url: '/favourite',
            icon: icons.HeartOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
