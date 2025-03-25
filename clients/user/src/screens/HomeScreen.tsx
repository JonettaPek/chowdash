import * as React from 'react';
import Header from '../components/layout/Header';
import { Avatar } from '@heroui/avatar';

const HomeScreen = () => {
    return (
        <div>
            <Header />
            <div>HomeScreen</div>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
    );
}

export default HomeScreen;