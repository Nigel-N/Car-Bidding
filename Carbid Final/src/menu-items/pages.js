// assets
import { ClockCircleOutlined, FireOutlined } from '@ant-design/icons';

// icons
const icons = {
    FireOutlined,
    ClockCircleOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'usefulinfo',
    title: 'Useful Information',
    type: 'group',
    children: [
        {
            id: 'pastBidding',
            title: 'Past Biddings',
            type: 'item',
            url: '/pastbiddings',
            icon: icons.ClockCircleOutlined
        },
        {
            id: 'popularCars',
            title: 'Most Popular Cars',
            type: 'item',
            url: '/popularcars',
            icon: icons.FireOutlined
        }
    ]
};

export default pages;
