import React from "react";
import { Container, Grid, Avatar, Typography, Button, Divider } from "@mui/material";
import { Bookmark, Groups, Newspaper, Event } from "@mui/icons-material";

const UserInfo = () => (
    <div className="bg-white text-black p-4 rounded-lg shadow">
        <div className="flex flex-col items-center text-center">
            <Avatar src="/profile.jpg" alt="User" className="w-24 h-24 mb-2 border-4 border-gray-300 rounded-full mx-auto" />
            <Typography variant="h6" className="font-semibold">Rakhmatilla Erkinov</Typography>
            <Typography variant="body2" className="text-gray-600">Student at New Uzbekistan University</Typography>
            <Typography variant="body2" className="text-gray-600 mb-2">Tashkent Region</Typography>
            <Typography variant="body2" className="font-medium">OY STARTECH LLC</Typography>
        </div>
        <Divider className="my-3 border-gray-300" />
        <div className="flex justify-between text-gray-600 text-sm">
            <Typography>Profile viewers</Typography>
            <Typography className="text-blue-500 font-semibold">13</Typography>
        </div>
        <Typography className="text-blue-500 text-sm cursor-pointer mt-1 hover:underline">View all analytics</Typography>
        <Divider className="my-3 border-gray-300" />
        <Typography className="text-gray-600 text-sm mb-2">Strengthen your profile with an AI writing assistant</Typography>
        <Button variant="contained" color="warning" className="mt-2 w-full py-2 text-sm font-semibold">Reactivate</Button>
        <Divider className="my-3 border-gray-300" />
        <div className="space-y-2 text-gray-600">
            <div className="flex items-center cursor-pointer hover:text-black">
                <Bookmark fontSize="small" className="mr-2" /> Saved items
            </div>
            <div className="flex items-center cursor-pointer hover:text-black">
                <Groups fontSize="small" className="mr-2" /> Groups
            </div>
            <div className="flex items-center cursor-pointer hover:text-black">
                <Newspaper fontSize="small" className="mr-2" /> Newsletters
            </div>
            <div className="flex items-center cursor-pointer hover:text-black">
                <Event fontSize="small" className="mr-2" /> Events
            </div>
        </div>
    </div>
);


const ExtraContent = () => (
    <div className="bg-white text-black p-4 rounded-lg shadow">
        <Typography variant="h6" className="font-semibold">Spending</Typography>
        <div className="flex justify-between items-center mt-2">
            <Typography variant="body2" className="text-gray-600">You Spent:</Typography>
            <Typography variant="h6" className="font-bold">$2,272.52</Typography>
        </div>
        <div className="flex justify-between items-center">
            <Typography variant="body2" className="text-gray-600">Total Receivable:</Typography>
            <Typography variant="h6" className="text-green-600 font-bold">+ $938.83</Typography>
        </div>
        <Divider className="my-3 border-gray-300" />
        <Typography variant="h6" className="font-semibold">Spending Breakdown</Typography>
        <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                <Typography variant="body2">Entertainment</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                <Typography variant="body2">Shopping</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                <Typography variant="body2">Dining</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                <Typography variant="body2">Uncategory</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-teal-400 rounded-full"></div>
                <Typography variant="body2">Transportation</Typography>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <Typography variant="body2">Others</Typography>
            </div>
        </div>
        <Divider className="my-3 border-gray-300" />
        <Typography variant="h6" className="font-semibold">Frequent Spend</Typography>
        <div className="bg-gray-100 p-4 rounded-lg mt-2">
            <Typography variant="body2">Bateaux Parisiens 3x - $322.50</Typography>
            <Typography variant="body2">Carrousel du Louvre 3x - $268.24</Typography>
            <Typography variant="body2">L'Ami Louis 2x - $260.00</Typography>
        </div>
    </div>
);

const Layout = ({ children }) => {
    return (
        <Container maxWidth="lg" className="h-screen flex items-start">
            <Grid container spacing={2} className="w-full">
                <Grid item xs={12} md={4}>
                    <UserInfo />
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="bg-white p-4 rounded-lg shadow">{children}</div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ExtraContent />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Layout;
