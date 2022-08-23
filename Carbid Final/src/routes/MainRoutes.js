import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// Comments might not be accurate
// render - bidding page
const BiddingPage = Loadable(lazy(() => import('pages/bidding/index')));

// render - manage users admin page
const ManageUsersPage = Loadable(lazy(() => import('pages/manageUsers/index')));

// render - manage users admin page
const ManageBidsPage = Loadable(lazy(() => import('pages/manageBids/allBids/index')));

// render - select bid admin page
const SelectedBidsPage = Loadable(lazy(() => import('pages/manageBids/selectedBid/index')));

// render - award bid admin page
const AwardBidsPage = Loadable(lazy(() => import('pages/manageBids/awardBid/index')));

// render - dashboard
const FavouritePage = Loadable(lazy(() => import('pages/myFavourite')));

// render - sample home page
const HomePage = Loadable(lazy(() => import('pages/home/HomePage')));

// render - sample my bids page
const MyBidsPage = Loadable(lazy(() => import('pages/mybids/MyBids')));

// render - sample past biddings page
const PassBiddingsPage = Loadable(lazy(() => import('pages/pastBiddings/PastBiddings')));

// render - sample most popular cars page
const MostPopularCarsPage = Loadable(lazy(() => import('pages/popularCars/PopularCars')));

// render - sample add favourite page
const AddFavouritePage = Loadable(lazy(() => import('pages/myFavourite/AddFavourite')));

// render 
const BiddingCarsInfoPage = Loadable(lazy(() => import('pages/adminBidCars/BiddingCarsInfo')));
// ==============================|| MAIN ROUTING ||============================== //

// render -
const AllCarsPage = Loadable(lazy(() => import('pages/adminBidCars/AllCars')));

const EditBidCarsPage = Loadable(lazy(() => import('pages/adminBidCars/EditBidCars')));

// render - 
const AddBidCarsPage = Loadable(lazy(() => import('pages/adminBidCars/AddBidCars')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/home',
            element: <HomePage />
        },
        {
            path: 'home',
            children: [
                {
                    path: 'default',
                    element: <HomePage />
                }
            ]
        },
        {
            path: 'bidding',
            element: <BiddingPage />
        },
        {
            path: 'mybids',
            element: <MyBidsPage />
        },
        {
            path: 'favourite',
            element: <FavouritePage />
        },
        {
            path: 'pastbiddings',
            element: <PassBiddingsPage />
        },
        {
            path: 'popularcars',
            element: <MostPopularCarsPage />
        },
        {
            path: 'addfavourite',
            element: <AddFavouritePage />
        },
        {
            path: 'manageUsers',
            element: <ManageUsersPage />
        },
        {
            path: 'manageBids',
            element: <ManageBidsPage />
        },
        {
            path: 'selectBids',
            element: <SelectedBidsPage />
        },
        {
            path: 'awardBids',
            element: <AwardBidsPage />
        },
        {
            path: 'biddingcarsinfo',
            element: <BiddingCarsInfoPage />
        },
        {
            path: 'allcars',
            element: <AllCarsPage />
        },
        {
            path: 'editbidcars/:id',
            element: <EditBidCarsPage />
        },
        {
            path: 'addbidcars',
            element: <AddBidCarsPage />
        }
    ]
};

export default MainRoutes;
