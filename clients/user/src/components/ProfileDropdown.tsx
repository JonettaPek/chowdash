import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";

const items = [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      key: "orders",
      label: "Orders",
    },
];

const ProfileDropdown = () => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar
                    as="button"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"  
                    showFallback  
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="light">
                <DropdownSection showDivider items={items}>
                    {(item) =>  (
                        <DropdownItem key={item.key}>{item.label}</DropdownItem>
                    )}
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem key="logout" className={"text-danger"}>{"Log Out"}</DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
 
export default ProfileDropdown;